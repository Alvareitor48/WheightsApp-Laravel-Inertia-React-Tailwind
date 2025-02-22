<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Routine;
use App\Services\RoutineDetailsService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class RoutineApiController extends Controller
{
    use AuthorizesRequests;
    private RoutineDetailsService $routineDetailsService;

    public function __construct(RoutineDetailsService $routineDetailsService)
    {
        $this->routineDetailsService = $routineDetailsService;
    }
    public function show($id)
    {
        $routine = Routine::findOrFail($id);
        $this->authorize('view', $routine);
        return response()->json($this->routineDetailsService->getRoutineDetails($id));
    }

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
