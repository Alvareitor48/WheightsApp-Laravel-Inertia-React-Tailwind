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


        $count = 0;
        foreach ($data['exercises'] as $exerciseData) {
            $count++;
            $exerciseRoutine = ExerciseRoutine::findOrFail($exerciseData['data']['id']);
            $exerciseRoutine->update([
                'note' => $exerciseData['data']['note'],
            ]);
            $seriesGroups = $exerciseData['data']['series'][$count - 1] ?? [];
            $seriesIds = collect($seriesGroups)
                ->filter(fn($seriesData) => is_numeric($seriesData['id']))
                ->pluck('id')
                ->toArray();

            $exerciseRoutine->series()->whereNotIn('id', $seriesIds)->delete();

            
            if (!empty($exerciseData['data']['series'][$count - 1])) {
                foreach ($exerciseData['data']['series'][$count-1] as $seriesData) {
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
        return redirect()->route('AdminRoutines', ['id' => $routine->id])
            ->with('success', 'Rutina actualizada correctamente.');
    }
}
