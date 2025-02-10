<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Muscle;
use App\Models\Routine;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\ExerciseResource;

class ExerciseController extends Controller
{
    public function index(Request $request)
    {
        $query = Exercise::query();

        if ($request->filled('equipment')) {
            if ($request->equipment === 'Sin equipamiento') {
                $query->whereNull('equipment');
            } else {
                $query->where('equipment', $request->equipment);
            }
        }


        if ($request->filled('muscle')) {
            $query->whereHas('muscles', function ($query) use ($request) {
                $query->where('name', $request->muscle);
            });
        }

        $exercises = $query->paginate(20);
        return Inertia::render('exercises/pages/IndexExercises', [
            'exercises' => ExerciseResource::collection($exercises),
            'equipments' => Exercise::distinct()->pluck('equipment')->filter()->values(),
            'muscles' => Muscle::pluck('name')->toArray()
        ]);
    }

    public function indexAddExercises(Request $request, $routineId, $redirect_to)
    {
        $routine = Routine::findOrFail($routineId);
        if ($routine->user_id !== auth()->id() && !auth()->user()->hasRole('admin')) {
            abort(403, 'No tienes permiso para añadir ejercicios aqui.');
        }
        $query = Exercise::query();

        if ($request->filled('equipment')) {
            if ($request->equipment === 'Sin equipamiento') {
                $query->whereNull('equipment');
            } else {
                $query->where('equipment', $request->equipment);
            }
        }

        if ($request->filled('muscle')) {
            $query->whereHas('muscles', function ($query) use ($request) {
                $query->where('name', $request->muscle);
            });
        }

        $exercises = $query->paginate(20);
        return Inertia::render('exercises/pages/AddExercises', [
            'exercises' => ExerciseResource::collection($exercises),
            'routineId' => $routineId,
            'redirect_to' => $redirect_to,
            'equipments' => Exercise::distinct()->pluck('equipment')->filter()->values(),
            'muscles' => Muscle::pluck('name')->toArray()
        ]);
    }

    public function show($id){
        $exercise = Exercise::findOrFail($id);
        return Inertia::render('exercises/pages/ShowExercise',[
            'exercise' => (new ExerciseResource($exercise))->toArray(request())
        ]);
    }
}