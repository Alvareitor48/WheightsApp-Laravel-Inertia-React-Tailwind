<?php

namespace App\Http\Controllers;

use App\Http\Resources\BodyHighLightDataResource;
use App\Http\Resources\ExerciseLogByExercisesResource;
use App\Http\Resources\MaxLogResource;
use App\Http\Resources\SessionsForCalendarResource;
use App\Models\ExerciseLog;
use App\Models\Muscle;
use App\Models\RoutineSession;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::now()->endOfDay();
        $previousMonth = Carbon::now()->subMonth()->startOfDay();
        $previousWeek = Carbon::now()->subWeek()->startOfDay();
        $sessions = RoutineSession::query()
            ->where('user_id',auth()->id())
            ->whereDate('completed_at', '>=', $previousMonth)
            ->whereDate('completed_at', '<=', $today)
            ->with('routine')
            ->get();

        $exerciseLogs = ExerciseLog::query()
            ->whereHas('routine_session', function ($query) use ($previousWeek, $today) {
                $query->where('user_id', auth()->id())
                    ->whereBetween('completed_at', [$previousWeek, $today]);
            })->with('exercise:id,name')
            ->get()
            ->groupBy('exercise.name')
            ->values();

        return Inertia::render('profile/pages/Dashboard',[
            'sessions'=>SessionsForCalendarResource::collection($sessions)->toArray(request()),
            'bodyHighLightData'=> BodyHighLightDataResource::collection($exerciseLogs)->toArray(request()),
            'exercisesForMuscle' => session('exercisesForMuscle') ?? [],
            'logsMaxWeights' => session('logsMaxWeights') ?? []
        ]);
    }

    public function exercisesByMuscle($muscleName){
        $today = Carbon::now()->endOfDay();
        $previousWeek = Carbon::now()->subWeek()->startOfDay();
        $muscle = Muscle::query()->where('name',$muscleName)->firstOrFail();
        $exerciseLogs = ExerciseLog::query()
            ->whereHas('routine_session', function ($query) use ($previousWeek, $today) {
                $query->where('user_id', auth()->id())
                ->whereBetween('completed_at', [$previousWeek, $today]);
            })
            ->whereHas('exercise.muscles', function ($query) use ($muscle) {
                $query->where('muscles.id', $muscle->id);
            })
            ->with(['exercise:id,name', 'routine_session:id,completed_at'])
            ->get();

        $groupedByDate = $exerciseLogs->groupBy(function ($log) {
            return $log->routine_session->completed_at;
        });
        $finalLogs = [];

        foreach ($groupedByDate as $logs) {
            $finalLogs[] = (new ExerciseLogByExercisesResource($logs))->toArray(request());
        }

        $logsMaxWeights = ExerciseLog::query()
            ->whereHas('routine_session', function ($query) use ($previousWeek, $today) {
                $query->where('user_id', auth()->id());
            })
            ->whereHas('exercise.muscles', function ($query) use ($muscle){
                $query->where('muscles.id',$muscle->id);
            })
            ->with(['exercise:id,name', 'routine_session:id,completed_at'])
            ->get()
            ->groupBy('exercise.name')
            ->map(function ($logs) {
                $maxLog = $logs->sortByDesc(function ($log) {
                    return $log->weight * $log->repetitions;
                })->first();
                return (new MaxLogResource($maxLog))->toArray(request());
            })
            ->values();
        return redirect()->route('dashboard')->with('exercisesForMuscle', $finalLogs)->with('logsMaxWeights', $logsMaxWeights);
    }
}