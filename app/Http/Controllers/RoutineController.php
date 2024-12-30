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

class RoutineController extends Controller
{
    public function index(){
        $user = User::first();
        return Inertia::render('routines/pages/IndexRoutines', [
            'routines' => $user->routines,
        ]);
    }
    public function show($id){
        $routine = Routine::with('user')->where('id', $id)->firstOrFail();
        $exerciseRoutines = ExerciseRoutine::with('series')->where('routine_id',$routine->id)->get();
        $series = $exerciseRoutines->map(function ($exerciseRoutine) {
            return SerieResource::collection($exerciseRoutine->series);
        });
        $exercises = $exerciseRoutines->map(function ($exerciseRoutine) {
            return new ExerciseResource(Exercise::query()->where('id',$exerciseRoutine->exercise_id)->first());
        });
        $exerciseRoutinesWithDetails = $exerciseRoutines->map(function ($exerciseRoutine, $index) use ($series, $exercises) {
            return new ExerciseRoutineResource($exerciseRoutine, $series, $exercises);
        });
        return Inertia::render('routines/pages/AdminRoutines', [
            'routine' => $routine,
            'exercises' => $exerciseRoutinesWithDetails
        ]);
    }

    public function edit($id){
        $routine = Routine::with('user')->where('id', $id)->firstOrFail();
        $exerciseRoutines = ExerciseRoutine::with('series')->where('routine_id',$routine->id)->get();
        $series = $exerciseRoutines->map(function ($exerciseRoutine) {
            return SerieResource::collection($exerciseRoutine->series);
        });
        $exercises = $exerciseRoutines->map(function ($exerciseRoutine) {
            return new ExerciseResource(Exercise::query()->where('id',$exerciseRoutine->exercise_id)->first());
        });
        $exerciseRoutinesWithDetails = $exerciseRoutines->map(function ($exerciseRoutine, $index) use ($series, $exercises) {
            return new ExerciseRoutineResource($exerciseRoutine, $series, $exercises);
        });
        return Inertia::render('routines/pages/UpdateRoutines', [
            'routine' => $routine,
            'exercises' => $exerciseRoutinesWithDetails
        ]);
    }

    public function update(Request $request){
        $validated = $request->validate([
            'routine.id' => 'required|integer|exists:routines,id',
            'routine.name' => 'required|string|max:255',
            'routine.description' => 'nullable|string|max:1000',
            'routine.day' => 'required|string|in:Monday,Tuesday,Wednesday,Thursday,Friday',
            'exercises.*.data.id' => 'required|integer|exists:exercises_routines,id',
            'exercises.*.data.note' => 'required|string|max:255',
            'exercises.*.data.exercise.*.id' => 'required|integer|exists:exercises,id',
            'exercises.*.data.exercise.*.name' => 'required|string|max:255',
            'exercises.*.data.series.*.*.id' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (!is_numeric($value) && !preg_match('/^[0-9a-fA-F-]{36}$/', $value)) {
                        $fail("El campo $attribute debe ser un número entero o un UUID válido.");
                    }
                },
            ],
            'exercises.*.data.series.*.*.repetitions' => 'required|integer',
            'exercises.*.data.series.*.*.RIR' => 'required|in:0,1,2,3,4,5',
            'exercises.*.data.series.*.*.failure' => 'required|boolean',
            'exercises.*.data.series.*.*.weight' => 'required|numeric',
        ]);
        $routine = Routine::query()->where('id', $validated['routine']['id'])->firstOrFail();
        $routine->update([
            'name' => $validated['routine']['name'],
            'description' => $validated['routine']['description'],
            'day' => $validated['routine']['day'],
        ]);


        $count = 0;
        foreach ($validated['exercises'] as $exerciseData) {
            $count++;
            $exerciseRoutine = ExerciseRoutine::findOrFail($exerciseData['data']['id']);
            $exerciseRoutine->update([
                'note' => $exerciseData['data']['note'],
            ]);
            if (!empty($exerciseData['data']['series'][$count - 1])) {
                
                $seriesIds = collect($exerciseData['data']['series'][$count - 1])
                    ->filter(function ($seriesData) {
                        return is_numeric($seriesData['id']);
                    })
                    ->map(function ($seriesData) {
                        return $seriesData['id'];
                    });


                
            } else {
                $seriesIds = [];
            }
            $exerciseRoutine->series()->whereNotIn('id', $seriesIds)->delete();
            
            if (!empty($exerciseData['data']['series'][$count - 1])) {
                foreach ($exerciseData['data']['series'][$count-1] as $seriesData) {
                    if (is_numeric($seriesData['id'])) {
                        $series = $exerciseRoutine->series()->where('id', $seriesData['id'])->firstOrFail();
                        $series->update([
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
