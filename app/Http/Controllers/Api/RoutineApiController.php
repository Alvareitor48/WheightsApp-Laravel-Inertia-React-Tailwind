<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Routine;
use App\Services\RoutineDetailsService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
/**
 * @OA\Tag(
 *     name="Routines",
 *     description="Endpoints para la gestión de rutinas"
 * )
 */
class RoutineApiController extends Controller
{
    use AuthorizesRequests;
    private RoutineDetailsService $routineDetailsService;

    public function __construct(RoutineDetailsService $routineDetailsService)
    {
        $this->routineDetailsService = $routineDetailsService;
    }
    /**
     * @OA\Get(
     *     path="/routines/{id}",
     *     summary="Obtiene los detalles de una rutina",
     *     tags={"Routines"},
     *     security={{"sanctum": {}}},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID de la rutina", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Detalles de la rutina"),
     *     @OA\Response(response=404, description="Rutina no encontrada")
     * )
     */
    public function show($id)
    {
        $routine = Routine::findOrFail($id);
        $this->authorize('view', $routine);
        return response()->json($this->routineDetailsService->getRoutineDetails($id));
    }
    /**
     * @OA\Get(
     *     path="/routines/{id}/chart-data",
     *     summary="Obtiene datos para gráficos de una rutina",
     *     tags={"Routines"},
     *     security={{"sanctum": {}}},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID de la rutina", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Datos de la rutina para gráficos")
     * )
     */

    public function chartData(Request $request,$id)
    {
        $routine = Routine::findOrFail($id);
        $this->authorize('view', $routine);

        $user = auth()->user();

        $premiumPeriods = ['3months', 'year'];

        $period = in_array($request->period, $premiumPeriods) && $user->hasRole(['premium', 'admin'])
            ? $request->period
            : 'month';
        return response()->json($this->routineDetailsService->chartData($period,$id));
    }
}
