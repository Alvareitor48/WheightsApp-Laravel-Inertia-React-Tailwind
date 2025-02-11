<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExerciseResource;
use App\Models\Exercise;
use Illuminate\Http\Request;
class ExerciseApiController extends Controller
{
    public function index(Request $request)
    {
        $query = Exercise::query();

        if ($request->filled('equipment')) {
            $query->where('equipment', $request->equipment);
        }

        if ($request->filled('muscles')) {
            $muscles = explode(',', $request->muscles);
            $query->whereHas('muscles', function ($q) use ($muscles) {
                $q->whereIn('name', $muscles);
            });
        }

        if ($request->boolean('created_by_me') && auth()->check()) {
            $query->where('user_id', auth()->id());
        } elseif ($request->boolean('created_by_me')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $exercises = $query->paginate(10);
        return ExerciseResource::collection($exercises);
    }
    public function show($id)
    {
        $exercise = Exercise::find($id);

        if (!$exercise) {
            return response()->json(['message' => 'Ejercicio no encontrado'], 404);
        }
        if($exercise->user_id != auth()->id() && $exercise->user_id != null){
            if(!(auth()->hasRole('admin'))){
                return response()->json(['message' => 'Unauthorized to see this exercise'], 401);
            }
        }

        return new ExerciseResource($exercise);
    }
}
