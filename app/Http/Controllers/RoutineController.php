<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExerciseResource;
use App\Http\Resources\ExerciseRoutineResource;
use App\Http\Resources\SerieResource;
use App\Models\Exercise;
use App\Models\ExerciseRoutine;
use App\Models\Routine;
use App\Models\User;
use Inertia\Inertia;

class RoutineController extends Controller
{
    public function index(){
        $user = User::first();
        return Inertia::render('IndexRoutines', [
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
        return Inertia::render('AdminRoutines', [
            'routine' => $routine,
            'exercises' => $exerciseRoutinesWithDetails
        ]);
    }
}
