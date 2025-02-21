<?php

namespace App\Http\Controllers\Api;

use App\Actions\CreateExerciseAction;
use App\Actions\FilterExercisesAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreApiExerciseRequest;
use App\Http\Resources\ExerciseResource;
use App\Models\Exercise;
use App\Services\ExerciseService;
use Illuminate\Http\Request;
class ExerciseApiController extends Controller
{
    private ExerciseService $exerciseService;
    public function __construct(ExerciseService $exerciseService)
    {
        $this->exerciseService = $exerciseService;
    }
    public function index(Request $request, FilterExercisesAction $action)
    {
        $this->authorize('viewAny', Exercise::class);
        return ExerciseResource::collection($action->execute($request, true));
    }
    public function show($id)
    {
        $exercise = Exercise::find($id);
        $this->authorize('view', $exercise);
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
    public function store(StoreApiExerciseRequest $request, CreateExerciseAction $action)
    {
        $data = $request->validated();
        $this->authorize('create', Exercise::class);
        $muscles = explode(',', $data['muscles']);
        $muscles = array_map('trim', $muscles);
        $exercise = $action->execute($request->validated(),$muscles);
        return new ExerciseResource($exercise);
    }
}
