<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreApiExerciseRequest;
use App\Http\Resources\ExerciseResource;
use App\Models\Exercise;
use App\Models\Muscle;
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
    public function store(StoreApiExerciseRequest $request)
    {
        $data = $request->validated();

        $muscles = explode(',', $data['muscles']);
        $muscles = array_map('trim', $muscles);

        $file = $data['media'];
        $originalExtension = $file->getClientOriginalExtension();

        $sanitizedName = preg_replace('/[^a-zA-Z0-9]/', '_', strtolower($request->name));
        $sanitizedDescription = substr(preg_replace('/[^a-zA-Z0-9]/', '_', strtolower($request->description)), 0, 30); // Máx 30 caracteres
        $timestamp = time();

        $fileName = "{$sanitizedName}_{$sanitizedDescription}_{$timestamp}.{$originalExtension}";

        $destinationPath = public_path("exercises_video_images/custom/");

        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0777, true);
        }

        $file->move($destinationPath, $fileName);

        $publicUrl = "exercises_video_images/custom/{$fileName}";

        $exercise = Exercise::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'url' => $publicUrl,
            'equipment' => $data['equipment'] ?? null,
            'user_id' => auth()->id(),
            'is_private' => true,
        ]);

        if (!empty($muscles)) {
            $muscleIds = Muscle::whereIn('name', $muscles)->pluck('id')->toArray();
            $exercise->muscles()->attach($muscleIds);
        }

        return new ExerciseResource($exercise);
    }
}
