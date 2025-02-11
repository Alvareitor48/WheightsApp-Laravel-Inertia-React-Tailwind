<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExerciseRequest;
use App\Http\Resources\ExerciseResource;
use App\Models\Exercise;
use App\Models\Muscle;
use App\Models\Routine;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        if ($request->filled('my_exercises')) {
            if ($request->my_exercises === 'Mis ejercicios'){
                $query->where(function ($query) {
                    $query->where('user_id', auth()->id());
                });
            }else if($request->my_exercises === 'Ejercicios normales') {
                $query->where(function ($query) {
                    $query->whereNull('user_id');
                });
            }
        }else{
            $query->where(function ($query) {
                $query->whereNull('user_id');
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
        if ($request->filled('my_exercises')) {
            if ($request->my_exercises === 'Mis ejercicios'){
                $query->where(function ($query) {
                    $query->where('user_id', auth()->id());
                });
            }else if($request->my_exercises === 'Ejercicios normales') {
                $query->where(function ($query) {
                    $query->whereNull('user_id');
                });
            }
        }else{
            $query->where(function ($query) {
                $query->whereNull('user_id');
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

    public function create($routineId, $redirect_to)
    {
        return Inertia::render('exercises/pages/CreateExercise',[
            'routineId' => $routineId,
            'redirect_to' => $redirect_to,
            'equipments' => Exercise::distinct()->pluck('equipment')->filter()->values(),
            'muscles' => Muscle::pluck('name')->toArray()
        ]);
    }


    public function store(StoreExerciseRequest $request, $routineId, $redirect_to)
    {
        $data = $request->validated();
        if ($data['equipment'] === 'Sin equipamiento') {
            $equipment = null;
        } else {
            $equipment = $data['equipment'];
        }

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
            'equipment' => $equipment,
            'user_id' => auth()->id(),
            'is_private' => true,
        ]);

        $muscleIds = Muscle::whereIn('name', $request->muscles)->pluck('id')->toArray();
        $exercise->muscles()->attach($muscleIds);

        return redirect()->route('routines.add.exercises',[
            'routineId' => $routineId,
            'redirect_to' => $redirect_to,
        ]);
    }

}
