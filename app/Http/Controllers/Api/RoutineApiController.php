<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Routine;
use App\Services\RoutineDetailsService;
class RoutineApiController extends Controller
{
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
}
