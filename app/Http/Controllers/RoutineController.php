<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExerciseResource;
use App\Http\Resources\ExerciseRoutineResource;
use App\Http\Resources\SerieResource;
use App\Http\Resources\StatisticsResource;
use App\Models\Exercise;
use App\Models\ExerciseLog;
use App\Models\ExerciseRoutine;
use App\Models\Routine;
use App\Models\RoutineSession;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UpdateRoutinesRequest;
use App\Http\Requests\StartRoutinesRequest;
use App\Http\Requests\ManageExerciseRequest;

class RoutineController extends Controller
{
    private function updateRoutineAndSeries(array $data)
    {
        $routine = Routine::query()->where('id', $data['routine']['id'])->firstOrFail();
        $routine->update([
            'name' => $data['routine']['name'],
            'description' => $data['routine']['description'],
            'day' => $data['routine']['day'],
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
    public function index(){
        return Inertia::render('routines/pages/IndexRoutines', [
            'routines' => auth()->user()->routines,
        ]);
    }
    public function show($id){
        $routineDetails = $this->getRoutineDetails($id);

        $sessions = RoutineSession::where('routine_id', $id)
            ->where('user_id',auth()->user()->id)
            ->with('exerciseLogs')
            ->get();
        $stadistics = StatisticsResource::collection($sessions)->toArray(request());
        $routineDetails['stadistics'] = $stadistics;

        return Inertia::render('routines/pages/AdminRoutines', $routineDetails);
    }

    public function edit($id){
        $routineDetails = $this->getRoutineDetails($id);
        return Inertia::render('routines/pages/UpdateRoutines', $routineDetails);
    }

    public function update(UpdateRoutinesRequest $request){
        $data = $request->all();
        $routineAndExercises = $this->updateRoutineAndSeries($data);
        if ($request->expectsJson()) {
            return response()->json(['status' => 'Rutina actualizada correctamente.']);
        }

        return redirect()->route('AdminRoutines', ['id' => $routineAndExercises['routine']->id])
            ->with('success', 'Rutina actualizada correctamente.');
    }

    public function start($id){
        $routineDetails = $this->getRoutineDetails($id);
        $routineDetails['routine']['durationInSeconds'] = 0;
        return Inertia::render('routines/pages/StartRoutines', $routineDetails);
    }

    public function session(StartRoutinesRequest $request){
        $data = $request->all();
        $updateData = $this->updateRoutineAndSeries($data);
        $routineSession = RoutineSession::create([
            'routine_id' => $updateData['routine']['id'],
            'user_id'=> auth()->user()->id,
            'duration' => Carbon::createFromTimestampUTC($data['routine']['durationInSeconds'])->toTimeString()
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

        return redirect()->route('AdminRoutines', ['id' => $updateData['routine']['id']])
            ->with('success', 'Rutina actualizada correctamente.');
    }

    public function addExercise(ManageExerciseRequest $request, $routineId){
        $data = $request->validated();
        $routine = Routine::query()->where('id', $routineId)->firstOrFail();
        $exercise = Exercise::query()->where('id', $data['exercise_id'])->firstOrFail();
        $exerciseRoutine = ExerciseRoutine::query()->where('exercise_id', $exercise->id)->where('routine_id', $routine->id);
        ExerciseRoutine::create([
            'routine_id' => $routine->id,
            'exercise_id' => $exercise->id,
            'note' => null,
        ]);

        switch ($data['redirect_to']) {
        case 'routines.start':
            return redirect()->route('routines.start', ['id' => $routineId]);
        case 'routines.edit':
            return redirect()->route('routines.edit', ['id' => $routineId]);
        default:
            return redirect()->route('IndexRoutines');
    }
        
    }

    public function deleteExercise(ManageExerciseRequest $request, $routineId)
{
    $routine = Routine::findOrFail($routineId);
    $exerciseId = $request->input('exercise_id');

    $exerciseRoutine = ExerciseRoutine::query()->where('id', $exerciseId)->where('routine_id', $routineId)->first();

    if (!$exerciseRoutine) {
        return back()->withErrors(['error' => 'El ejercicio no está en esta rutina']);
    }

    ExerciseRoutine::query()->where('routine_id', $routineId)->where('id', $exerciseId)->delete();
    
    switch ($request->input('redirect_to')) {
        case 'routines.start':
            return redirect()->route('routines.start', ['id' => $routineId]);
        case 'routines.edit':
            return redirect()->route('routines.edit', ['id' => $routineId]);
        default:
            return redirect()->route('IndexRoutines');
    }
}

public function createRoutine()
{
    $routine = Routine::create([
        'user_id' => auth()->id(),
        'name' => 'Nueva Rutina',
        'description' => '',
        'day' => 'Monday',
    ]);

    return redirect()->route('routines.edit', ['id' => $routine->id]);
}
}