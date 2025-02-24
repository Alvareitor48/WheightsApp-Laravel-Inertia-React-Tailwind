<?php

namespace App\Http\Controllers\Web;

use App\Helpers\DateHelper;
use App\Http\Controllers\Controller;
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
        [$today, $previousMonth, $previousWeek] = $this->getIndexDates();
        $sessions = $this->getSessions($previousMonth, $today);
        $exerciseLogs = $this->getExerciseLogsByDateRange($previousWeek, $today);

        return Inertia::render('profile/pages/Dashboard',[
            'sessions'=>SessionsForCalendarResource::collection($sessions)->toArray(request()),
            'bodyHighLightData'=> BodyHighLightDataResource::collection($exerciseLogs)->toArray(request()),
            'exercisesForMuscle' => session('exercisesForMuscle') ?? [],
            'logsMaxWeights' => session('logsMaxWeights') ?? []
        ]);
    }

    public function getExercisesByMuscle(Request $request, $muscleName)
    {
        [$today, $startDate] = DateHelper::getDays($request->input('period', 'month'));
        $muscle = Muscle::query()->where('name', $muscleName)->firstOrFail();
        $exerciseLogs = $this->logsFilter($muscle, $today, $startDate);
        $finalLogs = $this->groupByCompletedDate($exerciseLogs);

        return redirect()->route('dashboard')
            ->with('exercisesForMuscle', $finalLogs);
    }

    public function getMaxWeightsByMuscle(Request $request, $muscleName)
    {
        [$today, $startDate] = DateHelper::getDays($request->input('period', 'month'));
        $muscle = Muscle::query()->where('name', $muscleName)->firstOrFail();
        $logsMaxWeights = $this->logsFilter($muscle, $today, $startDate);
        $processedLogs = $this->getMaxAndMinWeights($logsMaxWeights);

        return redirect()->route('dashboard')
            ->with('logsMaxWeights', $processedLogs);
    }

    private function getIndexDates()
    {
        return [
            Carbon::now()->endOfDay(),
            Carbon::now()->subMonth()->startOfDay(),
            Carbon::now()->subWeek()->startOfDay()
        ];
    }

    private function getSessions($startDate, $endDate)
    {
        $sessionsQuery = RoutineSession::query()
            ->where('user_id', auth()->id());

        if (!(auth()->user()->hasRole('admin') || auth()->user()->hasRole('premium'))) {
            $sessionsQuery->whereDate('completed_at', '>=', $startDate);
        }else{
            $sessionsQuery->whereDate('completed_at', '>=', Carbon::now()->subYear());
        }

        return $sessionsQuery->whereDate('completed_at', '<=', $endDate)
            ->with('routine')
            ->get();
    }

    private function getExerciseLogsByDateRange($startDate, $endDate)
    {
        return ExerciseLog::query()
            ->whereHas('routine_session', function ($query) use ($startDate, $endDate) {
                $query->where('user_id', auth()->id())
                    ->whereBetween('completed_at', [$startDate, $endDate]);
            })
            ->with('exercise:id,name')
            ->get()
            ->groupBy('exercise.name')
            ->values();
    }

    private function groupByCompletedDate($exerciseLogs)
    {
        return $exerciseLogs->groupBy(fn($log) => $log->routine_session->completed_at)
            ->map(fn($logs) => (new ExerciseLogByExercisesResource($logs))->toArray(request()))
            ->values()
            ->toArray();
    }

    private function getMaxAndMinWeights($logs)
    {
        return $logs->groupBy('exercise.name')
            ->map(function ($logs) {
                $maxLog = $logs->sortByDesc(fn($log) => $log->weight * $log->repetitions)->first();
                $minLog = $logs->sortBy(fn($log) => $log->weight * $log->repetitions)->first();
                return (new MaxLogResource($maxLog, $minLog))->toArray(request());
            })
            ->values();
    }

    private function logsFilter($muscle, $today, $startDate)
    {
        return ExerciseLog::query()
            ->whereHas('routine_session', function ($query) use ($startDate, $today) {
                $query->where('user_id', auth()->id())
                    ->whereBetween('completed_at', [$startDate, $today]);
            })
            ->whereHas('exercise.muscles', function ($query) use ($muscle) {
                $query->where('muscles.id', $muscle->id);
            })
            ->with(['exercise:id,name', 'routine_session:id,completed_at'])
            ->get();
    }
}
