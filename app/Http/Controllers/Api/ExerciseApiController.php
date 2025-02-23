<?php

namespace App\Http\Controllers\Api;

use App\Actions\CreateExerciseAction;
use App\Actions\FilterExercisesAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreApiExerciseRequest;
use App\Http\Resources\ExerciseResource;
use App\Models\Exercise;
use App\Services\ExerciseService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
/**
 * @OA\Info(
 *      title="Weights Technology API",
 *      version="1.0",
 *      description="Documentación de la API para la gestión de rutinas y ejercicios."
 *  ),
 * @OA\Server(
 *      url=L5_SWAGGER_CONST_BASE_URL,
 *      description="API Base URL"
 *  )
 * @OA\Tag(
 *     name="Exercises",
 *     description="Endpoints para la gestión de ejercicios"
 * )
 */
class ExerciseApiController extends Controller
{
    use AuthorizesRequests;
    private ExerciseService $exerciseService;
    public function __construct(ExerciseService $exerciseService)
    {
        $this->exerciseService = $exerciseService;
    }
    /**
     * @OA\Get(
     *     path="/exercises",
     *     summary="Obtiene una lista de ejercicios",
     *     tags={"Exercises"},
     *     @OA\Parameter(name="muscles", in="query", description="Filtrar por grupo muscular", required=false, @OA\Schema(type="string")),
     *     @OA\Parameter(name="equipment", in="query", description="Filtrar por equipamiento", required=false, @OA\Schema(type="string")),
     *     @OA\Parameter(name="mine", in="query", description="Filtrar solo ejercicios creados por el usuario autenticado", required=false, @OA\Schema(type="boolean")),
     *     @OA\Response(response=200, description="Lista de ejercicios"),
     *     @OA\Response(response=401, description="No autenticado")
     * )
     */
    public function index(Request $request, FilterExercisesAction $action)
    {
        $this->authorize('viewAny', Exercise::class);
        return ExerciseResource::collection($action->execute($request, true));
    }
    /**
     * @OA\Get(
     *     path="/exercises/{id}",
     *     summary="Obtiene los detalles de un ejercicio",
     *     tags={"Exercises"},
     *     security={{"sanctum": {}}},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID del ejercicio", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Detalles del ejercicio"),
     *     @OA\Response(response=404, description="Ejercicio no encontrado")
     * )
     */
    public function show($id)
    {
        $exercise = Exercise::find($id);
        if (!$exercise) {
            return response()->json(['message' => 'Ejercicio no encontrado'], 404);
        }
        $this->authorize('view', $exercise);
        if($exercise->user_id != auth()->id() && $exercise->user_id != null){
            if(!(auth()->hasRole('admin'))){
                return response()->json(['message' => 'Unauthorized to see this exercise'], 401);
            }
        }

        return new ExerciseResource($exercise);
    }
    /**
     * @OA\Post(
     *     path="/exercises",
     *     summary="Crea un nuevo ejercicio",
     *     tags={"Exercises"},
     *     security={{"sanctum": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"name", "muscle_group", "media"},
     *                 @OA\Property(property="name", type="string", example="Push-Up"),
     *                 @OA\Property(property="description", type="string", example="Ejercicio de flexiones"),
     *                 @OA\Property(property="muscle_group", type="string", example="chest"),
     *                 @OA\Property(
     *                     property="media",
     *                     type="string",
     *                     format="binary",
     *                     description="Archivo de media en formato .mp4 o .webp"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response=201, description="Ejercicio creado correctamente"),
     *     @OA\Response(response=403, description="No autorizado")
     * )
     */
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
