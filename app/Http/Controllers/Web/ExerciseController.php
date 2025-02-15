<?php

namespace App\Http\Controllers\Web;

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
        $this->authorize('create', auth()->user());
        return Inertia::render('exercises/pages/CreateExercise', array_merge([
            'routineId' => $routineId,
            'redirect_to' => $redirect_to,
        ], $this->getEquipmentsAndMuscles()));
    }


    public function store(StoreExerciseRequest $request, $routineId, $redirect_to)
    {
        $this->authorize('create', auth()->user());
        $data = $request->validated();
        $equipment = ($data['equipment'] === 'Sin equipamiento') ? null : $data['equipment'];
        $exercise = $this->exerciseService->createExercise(
            $data['media'],
            $data['name'],
            $data['description'],
            $equipment
        );

        $muscleIds = Muscle::whereIn('name', $request->muscles)->pluck('id')->toArray();
        $exercise->muscles()->attach($muscleIds);

        return redirect()->route('routines.add.exercises',[
            'routineId' => $routineId,
            'redirect_to' => $redirect_to,
        ]);
    }

    private function filterExercises(Request $request)
    {
        $query = Exercise::query();

        if ($request->filled('equipment')) {
            $query->where('equipment', $request->equipment === 'Sin equipamiento' ? null : $request->equipment);
        }

        if ($request->filled('muscle')) {
            $query->whereHas('muscles', function ($query) use ($request) {
                $query->where('name', $request->muscle);
            });
        }

        if ($request->filled('my_exercises')) {
            if ($request->my_exercises === 'Mis ejercicios') {
                $query->where('user_id', auth()->id());
            } elseif ($request->my_exercises === 'Ejercicios normales') {
                $query->whereNull('user_id');
            }
        } else {
            $query->whereNull('user_id');
        }

        return $query->paginate(20);
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
            'exercises' => ExerciseResource::collection($this->filterExercises($request)),
        ], $this->getEquipmentsAndMuscles());
    }

}
