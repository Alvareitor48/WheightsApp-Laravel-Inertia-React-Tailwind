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
}