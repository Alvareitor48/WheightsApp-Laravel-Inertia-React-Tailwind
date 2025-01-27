<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\ExerciseResource;

class ExerciseController extends Controller
{
    public function index()
    {
        $exercises = Exercise::query()->paginate(20);
        return Inertia::render('exercises/pages/IndexExercises', [
            'exercises' => ExerciseResource::collection($exercises)
        ]);
    }

    public function indexAddExercises($routineId)
    {
        $exercises = Exercise::query()->paginate(20);
        return Inertia::render('exercises/pages/AddExercises', [
            'exercises' => ExerciseResource::collection($exercises),
            'routineId' => $routineId
        ]);
    }
}