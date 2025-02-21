<?php

namespace App\Http\Controllers\Web;

use App\Actions\CreateExerciseAction;
use App\Actions\FilterExercisesAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExerciseRequest;
use App\Http\Resources\ExerciseResource;
use App\Models\Exercise;
use App\Models\Muscle;
use App\Models\Routine;
use App\Services\ExerciseService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ExerciseController extends Controller
{
    use AuthorizesRequests;
    private ExerciseService $exerciseService;
    private FilterExercisesAction $filterExercisesAction;

    public function __construct(ExerciseService $exerciseService, FilterExercisesAction $filterExercisesAction)
    {
        $this->exerciseService = $exerciseService;
        $this->filterExercisesAction = $filterExercisesAction;
    }
    public function index(Request $request)
    {
        $this->authorize('viewAny', Exercise::class);
        return Inertia::render('exercises/pages/IndexExercises', $this->getExerciseDataForRender($request));
    }

    public function indexAddExercises(Request $request, $routineId, $redirect_to)
    {
        $routine = Routine::findOrFail($routineId);
        $this->authorize('addExercise', $routine);
        return Inertia::render('exercises/pages/AddExercises', array_merge([
            'routineId' => $routineId,
            'redirect_to' => $redirect_to,
        ],$this->getExerciseDataForRender($request)));
    }

    public function show($id){
        $exercise = Exercise::findOrFail($id);
        $this->authorize('view', $exercise);
        return Inertia::render('exercises/pages/ShowExercise',[
            'exercise' => (new ExerciseResource($exercise))->toArray(request())
        ]);
    }

    public function create($routineId, $redirect_to)
    {
        $this->authorize('create', Exercise::class);
        return Inertia::render('exercises/pages/CreateExercise', array_merge([
            'routineId' => $routineId,
            'redirect_to' => $redirect_to,
        ], $this->getEquipmentsAndMuscles()));
    }


    public function store(StoreExerciseRequest $request, $routineId, $redirect_to, CreateExerciseAction $action)
    {
        $this->authorize('create', Exercise::class);
        $action->execute($request->validated());
        return redirect()->route('routines.add.exercises',[
            'routineId' => $routineId,
            'redirect_to' => $redirect_to,
        ]);
    }


    private function getEquipmentsAndMuscles()
    {
        return [
            'equipments' => Exercise::distinct()->pluck('equipment')->filter()->values(),
            'muscles' => Muscle::pluck('name')->toArray(),
        ];
    }

    private function getExerciseDataForRender(Request $request)
    {
        return array_merge([
            'exercises' => ExerciseResource::collection($this->filterExercisesAction->execute($request)),
        ], $this->getEquipmentsAndMuscles());
    }

}
