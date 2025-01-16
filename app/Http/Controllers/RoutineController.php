<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExerciseResource;
use App\Http\Resources\ExerciseRoutineResource;
use App\Http\Resources\SerieResource;
use App\Models\Exercise;
use App\Models\ExerciseRoutine;
use App\Models\Routine;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UpdateRoutinesRequest;

class RoutineController extends Controller
{
    public function index(){
        $user = User::first();
        return Inertia::render('routines/pages/IndexRoutines', [
            'routines' => $user->routines,
        ]);
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
    public function show($id){
        $routineDetails = $this->getRoutineDetails($id);
        return Inertia::render('routines/pages/AdminRoutines', $routineDetails);
    }

    public function edit($id){
        $routineDetails = $this->getRoutineDetails($id);
        return Inertia::render('routines/pages/UpdateRoutines', $routineDetails);
    }

    public function update(UpdateRoutinesRequest $request){
        $data = $request->all();
        $routine = Routine::query()->where('id', $data['routine']['id'])->firstOrFail();
        $routine->update([
            'name' => $data['routine']['name'],
            'description' => $data['routine']['description'],
            'day' => $data['routine']['day'],
        ]);

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
                    } elseif (preg_match('/^[0-9a-fA-F-]{36}$/', $seriesData['id'])) {
                        $exerciseRoutine->series()->create([
                            'repetitions' => $seriesData['repetitions'],
                            'weight' => $seriesData['weight'],
                            'RIR' => $seriesData['RIR'],
                            'failure' => $seriesData['failure'],
                        ]);
                    }
                }
            }
        }
        if ($request->expectsJson()) {
            return response()->json(['status' => 'Rutina actualizada correctamente.']);
        }
    
        return redirect()->route('AdminRoutines', ['id' => $routine->id])
            ->with('success', 'Rutina actualizada correctamente.');
    }

    public function start($id){
        $routineDetails = $this->getRoutineDetails($id);
        return Inertia::render('routines/pages/StartRoutines', $routineDetails);
    }

    public function session(UpdateRoutinesRequest $request){
        dd();
    }
}