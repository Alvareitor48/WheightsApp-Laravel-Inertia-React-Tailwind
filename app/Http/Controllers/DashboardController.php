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

    public function getExercisesByMuscle(Request $request, $muscleName)
    {
        $today = Carbon::now()->endOfDay();
        $period = $request->input('period', 'week'); // Por defecto, última semana
        switch ($period) {
            case 'month':
                $startDate = Carbon::now()->subMonth()->startOfDay();
                break;
            case 'year':
                $startDate = Carbon::now()->subYear()->startOfDay();
                break;
            default:
                $startDate = Carbon::now()->subWeek()->startOfDay();
                break;
        }

        $muscle = Muscle::query()->where('name', $muscleName)->firstOrFail();

        $exerciseLogs = ExerciseLog::query()
            ->whereHas('routine_session', function ($query) use ($startDate, $today) {
                $query->where('user_id', auth()->id())
                    ->whereBetween('completed_at', [$startDate, $today]);
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
        
        return redirect()->route('dashboard')
            ->with('exercisesForMuscle', $finalLogs);
    }

    public function getMaxWeightsByMuscle(Request $request, $muscleName)
    {
        
        $today = Carbon::now()->endOfDay();
        $period = $request->input('period', 'week'); // Por defecto, última semana
        
        switch ($period) {
            case 'month':
                $startDate = Carbon::now()->subMonth()->startOfDay();
                break;
            case 'year':
                $startDate = Carbon::now()->subYear()->startOfDay();
                break;
            default:
                $startDate = Carbon::now()->subWeek()->startOfDay();
                break;
        }
        $muscle = Muscle::query()->where('name', $muscleName)->firstOrFail();
        $logsMaxWeights = ExerciseLog::query()
            ->whereHas('routine_session', function ($query) use ($startDate, $today) {
                $query->where('user_id', auth()->id());
            })
            ->whereHas('exercise.muscles', function ($query) use ($muscle) {
                $query->where('muscles.id', $muscle->id);
            })
            ->with(['exercise:id,name', 'routine_session:id,completed_at'])
            ->get()
            ->groupBy('exercise.name')
            ->map(function ($logs) {
                $maxLog = $logs->sortByDesc($maxLog = $logs->sortByDesc(function ($log) {
                    return $log->weight * $log->repetitions;
                }))->first();
                return (new MaxLogResource($maxLog))->toArray(request());
            })
            ->values();
            
        return redirect()->route('dashboard')
            ->with('logsMaxWeights', $logsMaxWeights);
    }
}