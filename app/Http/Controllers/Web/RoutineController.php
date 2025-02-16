<?php

namespace App\Http\Controllers\Web;

use App\Helpers\DateHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\ManageExerciseRequest;
use App\Http\Requests\StartRoutinesRequest;
use App\Http\Requests\UpdateRoutinesRequest;
use App\Http\Resources\ExerciseResource;
use App\Http\Resources\ExerciseRoutineResource;
use App\Http\Resources\SerieResource;
use App\Http\Resources\StatisticsResource;
use App\Jobs\GenerateRoutinePdfJob;
use App\Models\Exercise;
use App\Models\ExerciseLog;
use App\Models\ExerciseRoutine;
use App\Models\Routine;
use App\Models\RoutineSession;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Events\RoutineDeleted;

class RoutineController extends Controller
{
    use AuthorizesRequests;
    public function index(){
        $this->authorize('viewAny', Exercise::class);
        return Inertia::render('routines/pages/IndexRoutines', [
            'routines' => auth()->user()->routines,
        ]);
    }
    public function show($id){
        $routine = Routine::findOrFail($id);
        $this->authorize('view', $routine);
        $routineDetails = $this->getRoutineDetails($id);
        $routineDetails['stadistics'] = $this->getShowStadistics($id);

        return Inertia::render('routines/pages/AdminRoutines', $routineDetails);
    }

    public function edit($id){
        $routine = Routine::findOrFail($id);
        $this->authorize('update', $routine);
        $routineDetails = $this->getRoutineDetails($id);
        return Inertia::render('routines/pages/UpdateRoutines', $routineDetails);
    }

    public function update(UpdateRoutinesRequest $request){
        $data = $request->all();
        $routine = Routine::findOrFail($data['routine']['id']);
        $this->authorize('update', $routine);
        $routineAndExercises = $this->updateRoutineAndSeries($data);
        if ($request->expectsJson()) {
            return response()->json(['status' => 'Rutina actualizada correctamente.']);
        }

        return redirect()->route('routines.show', ['id' => $routineAndExercises['routine']->id])
            ->with('success', 'Rutina actualizada correctamente.');
    }

    public function start($id){
        $routine = Routine::findOrFail($id);
        $this->authorize('startRoutine', $routine);
        $routineDetails = $this->getRoutineDetails($id);
        $routineDetails['routine']['durationInSeconds'] = 0;
        return Inertia::render('routines/pages/StartRoutines', $routineDetails);
    }

    public function session(StartRoutinesRequest $request){
        $data = $request->all();
        $routine = Routine::findOrFail($data['routine']['id']);
        $this->authorize('generatePDF', $routine);
        $updateDataId = $this->setSessionDataAndGetId($data);

        return redirect()->route('routines.show', ['id' => $updateDataId]);
    }

    public function addExercise(ManageExerciseRequest $request, $routineId){
        $routine = Routine::findOrFail($routineId);
        $this->authorize('addExercise', $routine);
        $this->addExerciseWithData($request->validated(), $routine);
        return $this->redirect_to($request->input('redirect_to'), $routineId);
    }


    public function deleteExercise(ManageExerciseRequest $request, $routineId)
{
    $routine = Routine::findOrFail($routineId);
    $this->authorize('addExercise', $routine);
    $deleted = $this->removeExerciseFromRoutine($routineId, $request->input('exercise_id'));

    if (!$deleted) {
        return back()->withErrors(['error' => 'El ejercicio no está en esta rutina']);
    }

    return $this->redirect_to($request->input('redirect_to'), $routineId);
}

public function store()
{
    $this->authorize('create', Routine::class);
    $routine = Routine::create([
        'user_id' => auth()->id(),
        'name' => 'Nueva Rutina',
        'description' => '',
    ]);

    return redirect()->route('routines.edit', ['id' => $routine->id]);
}

    public function updateChart(Request $request, $id)
    {
        $routine = Routine::findOrFail($id);
        $this->authorize('updateChart', $routine);

        session(['stadistics' => $this->chartData($request->input('period'))]);

        return redirect()->route('routines.show', ['id' => $id]);
    }

    public function generatePDF($id)
    {
        $routine = Routine::findOrFail($id);
        $this->authorize('generatePDF', $routine);
        $routineDetails = $this->getRoutineDetails($id);
        GenerateRoutinePdfJob::dispatch($routineDetails,$id);
    }

    public function downloadPDF($id)
    {
        $filePath = "pdfs/rutina_{$id}.pdf";
        if (DB::table('jobs')->where('payload', 'like', "%GenerateRoutinePdfJob%")->exists()) {
            return;
        }

        if (!Storage::disk('public')->exists($filePath)) {
            return;
        }

        $pdfContent = Storage::disk('public')->path($filePath);
        Storage::disk('public')->delete($filePath);
        return response()->download($pdfContent, "rutina_{$id}.pdf");
    }

    public function destroy($id)
    {
        $routine = Routine::findOrFail($id);
        $this->authorize('delete',$routine);
        event(new RoutineDeleted($routine));
        $routine->delete();

        return redirect()->route('routines.index');
    }

    public function restore($id)
    {
        $routine = Routine::onlyTrashed()->findOrFail($id);
        $this->authorize('delete', $routine);
        $routine->restore();

        return redirect()->route('routines.index');
    }
    private function setSessionDataAndGetId($data)
    {
        $updateData = $this->updateRoutineAndSeries($data);
        $routineSession = RoutineSession::create([
            'routine_id' => $updateData['routine']['id'],
            'user_id'=> auth()->user()->id,
            'duration' => Carbon::createFromTimestampUTC($data['durationInSeconds'])->toTimeString()
        ]);

        foreach ($updateData['exercises'] as $exercise) {
            foreach ($exercise['series'] as $series) {
                ExerciseLog::create([
                    'routine_session_id' => $routineSession->id,
                    'exercise_id' => $exercise['exercise']['id'],
                    'repetitions' => $series['repetitions'],
                    'RIR' => $series['RIR'],
                    'failure' => $series['failure'],
                    'weight' => $series['weight'],
                ]);
            }
        }
        return $updateData['routine']['id'];
    }

    private function addExerciseWithData($data, Routine $routine)
    {
        $exercise = Exercise::query()->where('id', $data['exercise_id'])->firstOrFail();
        ExerciseRoutine::create([
            'routine_id' => $routine->id,
            'exercise_id' => $exercise->id,
            'note' => null,
        ]);
    }

    private function removeExerciseFromRoutine($routineId, $exerciseId)
    {
        $exerciseRoutine = ExerciseRoutine::query()
            ->where('id', $exerciseId)
            ->where('routine_id', $routineId)
            ->first();

        if (!$exerciseRoutine) {
            return false;
        }

        ExerciseRoutine::query()
            ->where('routine_id', $routineId)
            ->where('id', $exerciseId)
            ->delete();

        return true;
    }

    private function getShowStadistics($id)
    {
        if (session()->has('stadistics')) {
            $stadistics = session('stadistics');
            session()->forget('stadistics');
            return $stadistics;
        } else {
            $today = \Illuminate\Support\Carbon::now()->endOfDay();
            $startDate = \Illuminate\Support\Carbon::now()->subMonth()->startOfDay();

            $sessions = RoutineSession::where('routine_id', $id)
                ->where('user_id', auth()->user()->id)
                ->whereBetween('completed_at', [$startDate, $today])
                ->with('exerciseLogs')
                ->get();

            return StatisticsResource::collection($sessions)->toArray(request());
        }
    }

    private function chartData($period)
    {
        [$today, $startDate] = DateHelper::getDays($period);
        $sessions = RoutineSession::where('user_id', auth()->user()->id)
            ->whereBetween('completed_at', [$startDate, $today])
            ->with('exerciseLogs')
            ->get();
        return StatisticsResource::collection($sessions)->toArray(request());
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

    private function updateRoutineAndSeries(array $data)
    {
        $routine = Routine::query()->where('id', $data['routine']['id'])->firstOrFail();
        $routine->update([
            'name' => $data['routine']['name'],
            'description' => $data['routine']['description'],
        ]);

        $updatedExercises = [];

        foreach ($data['exercises'] as $exerciseData) {
            $exerciseRoutine = ExerciseRoutine::findOrFail($exerciseData['id']);
            $exerciseRoutine->update([
                'note' => $exerciseData['note'],
            ]);

            $seriesGroups = $exerciseData['series'] ?? [];
            $seriesIds = collect($seriesGroups)
                ->filter(fn($seriesData) => is_numeric($seriesData['id']))
                ->pluck('id')
                ->toArray();
            $exerciseRoutine->series()->whereNotIn('id', $seriesIds)->delete();

            $updatedSeries = [];

            if (!empty($exerciseData['series'])) {
                foreach ($exerciseData['series'] as $seriesData) {
                    if (is_numeric($seriesData['id'])) {
                        $series = $exerciseRoutine->series()->find($seriesData['id']);
                        $series?->update([
                            'repetitions' => $seriesData['repetitions'],
                            'weight' => $seriesData['weight'],
                            'RIR' => $seriesData['RIR'],
                            'failure' => $seriesData['failure'],
                        ]);
                        $updatedSeries[] = $series;
                    } elseif (preg_match('/^[0-9a-fA-F-]{36}$/', $seriesData['id'])) {
                        $series = $exerciseRoutine->series()->create([
                            'repetitions' => $seriesData['repetitions'],
                            'weight' => $seriesData['weight'],
                            'RIR' => $seriesData['RIR'],
                            'failure' => $seriesData['failure'],
                        ]);
                        $updatedSeries[] = $series;
                    }
                }
            }

            $updatedExercises[] = [
                'id' => $exerciseRoutine->id,
                'note' => $exerciseRoutine->note,
                'exercise' => new ExerciseResource(Exercise::find($exerciseRoutine->exercise_id)),
                'series' => SerieResource::collection($updatedSeries),
            ];
        }

        return [
            'routine' => $routine,
            'exercises' => $updatedExercises,
        ];
    }


    private function getRoutineDetails($id){
        $routine = Routine::with('user')->where('id', $id)->firstOrFail();
        $exerciseRoutines = ExerciseRoutine::with('series')->where('routine_id',$routine->id)->get();
        $series = $exerciseRoutines->map(function ($exerciseRoutine) {
            return SerieResource::collection($exerciseRoutine->series);
        });
        $exercises = $exerciseRoutines->map(function ($exerciseRoutine) {
            return new ExerciseResource(Exercise::query()->where('id',$exerciseRoutine->exercise_id)->first());
        });
        $exerciseRoutinesWithDetails = $exerciseRoutines->map(function ($exerciseRoutine, $index) use ($series, $exercises) {
            return (new ExerciseRoutineResource($exerciseRoutine, $series[$index], $exercises[$index]))->toArray(request());
        });
        return [
            'routine' => $routine,
            'exercises' => $exerciseRoutinesWithDetails,
        ];
    }

}
