<?php

namespace App\Http\Controllers\Web;

use App\Actions\CreateExerciseLogAction;
use App\Actions\CreateExerciseRoutineAction;
use App\Actions\CreateRoutineSessionAction;
use App\Actions\DestroyRoutinesAndRelatedAction;
use App\Actions\RestoreRoutinesAndRelatedAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\ManageExerciseRemoveRequest;
use App\Http\Requests\ManageExerciseRequest;
use App\Http\Requests\StartRoutinesRequest;
use App\Http\Requests\UpdateRoutinesRequest;
use App\Jobs\GenerateRoutinePdfJob;
use App\Models\Exercise;
use App\Models\ExerciseLog;
use App\Models\ExerciseRoutine;
use App\Models\Routine;
use App\Models\RoutineSession;
use App\Services\RoutineDetailsService;
use App\Services\RoutineService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Events\RoutineDeleted;
use App\Actions\CreateRoutineAction;

class RoutineController extends Controller
{
    use AuthorizesRequests;
    private RoutineService $routineService;
    private RoutineDetailsService $routineDetailsService;

    public function __construct(RoutineService $routineService, RoutineDetailsService  $routineDetailsService)
    {
        $this->routineService = $routineService;
        $this->routineDetailsService = $routineDetailsService;
    }
    public function index(){
        $this->authorize('viewAny', Exercise::class);
        return Inertia::render('routines/pages/IndexRoutines', [
            'routines' => auth()->user()->routines,
        ]);
    }
    public function show($id){
        $routine = Routine::findOrFail($id);
        $this->authorize('view', $routine);
        $routineDetails = $this->routineDetailsService->getRoutineDetails($id);
        $routineDetails['stadistics'] = $this->getShowStadistics($id);
        return Inertia::render('routines/pages/AdminRoutines', $routineDetails);
    }

    public function edit($id){
        $routine = Routine::findOrFail($id);
        $this->authorize('update', $routine);
        $routineDetails = $this->routineDetailsService->getRoutineDetails($id);
        return Inertia::render('routines/pages/UpdateRoutines', $routineDetails);
    }

    public function update(UpdateRoutinesRequest $request,$id){
        $data = $request->all();
        $routine = Routine::findOrFail($id);
        $this->authorize('update', $routine);
        $this->routineService->updateRoutineAndSeries($data);
        if ($request->expectsJson()) return response()->json(['status' => 'Rutina actualizada correctamente.']);
        return redirect()->route('routines.show', ['id' => $id]);
    }

    public function start($id){
        $routine = Routine::findOrFail($id);
        $this->authorize('startRoutine', $routine);
        $routineDetails = $this->routineDetailsService->getRoutineDetails($id);
        $routineDetails['routine']['durationInSeconds'] = 0;
        return Inertia::render('routines/pages/StartRoutines', $routineDetails);
    }

    public function session(StartRoutinesRequest $request,$id,CreateRoutineSessionAction $sessionAction, CreateExerciseLogAction $logAction){
        $data = $request->all();
        $routine = Routine::findOrFail($id);
        $this->authorize('startRoutine', $routine);
        $updateDataId = $this->setSessionDataAndGetId($data,$sessionAction,$logAction);
        return redirect()->route('routines.show', ['id' => $updateDataId]);
    }

    public function addExercise(ManageExerciseRequest $request, $routineId, CreateExerciseRoutineAction $action){
        $routine = Routine::findOrFail($routineId);
        $this->authorize('addExercise', $routine);
        $this->addExerciseWithData($request->validated(), $routine, $action);
        return $this->redirect_to($request->input('redirect_to'), $routineId);
    }


    public function deleteExercise(ManageExerciseRemoveRequest $request, $routineId, $redirect_to)
{
    $routine = Routine::findOrFail($routineId);
    $this->authorize('addExercise', $routine);
    $deleted = $this->removeExerciseFromRoutine($routineId, $request->input('exercise_id'));
    if (!$deleted) return back()->withErrors(['error' => 'El ejercicio no está en esta rutina']);
    return $this->redirect_to($redirect_to, $routineId);
}

public function store(CreateRoutineAction $action)
{
    $this->authorize('create', Routine::class);
    $routine = $action->execute(auth()->id());
    return redirect()->route('routines.edit', ['id' => $routine->id]);
}
    public function updateChart(Request $request, $id)
    {
        $routine = Routine::findOrFail($id);
        $this->authorize('updateChart', $routine);
        session(['stadistics' => $this->routineDetailsService->chartData($request->input('period'))]);
        return redirect()->route('routines.show', ['id' => $id]);
    }
    public function generatePDF($id)
    {
        $routine = Routine::findOrFail($id);
        $this->authorize('generatePDF', $routine);
        $routineDetails = $this->routineDetailsService->getRoutineDetails($id);
        GenerateRoutinePdfJob::dispatch($routineDetails,$id);
    }
    public function downloadPDF($id)
    {
        $filePath = "pdfs/rutina_{$id}.pdf";
        if (DB::table('jobs')->where('payload', 'like', "%GenerateRoutinePdfJob%")->exists()) {
            return null;
        }

        if (!Storage::disk('public')->exists($filePath)) {
            return null;
        }

        $pdfContent = Storage::disk('public')->path($filePath);
        return response()->download($pdfContent, "rutina_{$id}.pdf");
    }
    public function destroy($id, DestroyRoutinesAndRelatedAction $action)
    {
        $routine = Routine::findOrFail($id);
        $this->authorize('delete',$routine);
        event(new RoutineDeleted($routine));
        $action->execute($routine);
        return redirect()->route('routines.index');
    }
    public function restore($id, RestoreRoutinesAndRelatedAction $action)
    {
        $routine = Routine::onlyTrashed()->findOrFail($id);
        $this->authorize('delete', $routine);
        $action->execute($routine);
        return redirect()->route('routines.index');
    }
    private function setSessionDataAndGetId($data, CreateRoutineSessionAction $sessionAction, CreateExerciseLogAction $logAction)
    {
        $updateData = $this->routineService->updateRoutineAndSeries($data);
        $routineSession = $sessionAction->execute($updateData['routine']['id'],auth()->id(),$data['durationInSeconds']);
        foreach ($updateData['exercises'] as $exercise) {
            foreach ($exercise['series'] as $series) {
                $logAction->execute($routineSession->id,$exercise['exercise']['id'],$series->toArray(request()));
            }
        }
        return $updateData['routine']['id'];
    }
    private function addExerciseWithData($data, Routine $routine, CreateExerciseRoutineAction $action)
    {
        $action->execute($routine->id,$data['exercise_id'],$data['note'] ?? null);
    }
    private function removeExerciseFromRoutine($routineId, $exerciseId)
    {
        $exerciseRoutine = ExerciseRoutine::byRoutineAndExercise($routineId, $exerciseId)->first();
        if (!$exerciseRoutine) return false;
        ExerciseRoutine::byRoutineAndExercise($routineId, $exerciseId)->delete();
        return true;
    }
    private function getShowStadistics($id)
    {
        if (session()->has('stadistics')) {
            $stadistics = session('stadistics');
            session()->forget('stadistics');
            return $stadistics;
        } else {
            return $this->routineDetailsService->chartData('month',$id);
        }
    }
    private function redirect_to($redirect, $routineId){
        switch ($redirect) {
            case 'routines.start':
                return redirect()->route('routines.start', ['id' => $routineId]);
            case 'routines.edit':
                return redirect()->route('routines.edit', ['id' => $routineId]);
            default:
                return redirect()->route('routines.index');
        }
    }
}
