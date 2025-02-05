<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExerciseLogByExercisesResource;
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
        $today = Carbon::now()->toDateString();
        $previousMonth = Carbon::now()->subMonth()->toDateString();
        $sessions = RoutineSession::query()
            ->where('user_id',auth()->id())
            ->whereDate('completed_at', '>=', $previousMonth)
            ->whereDate('completed_at', '<=', $today)
            ->with('routine')
            ->get();

        return Inertia::render('profile/pages/Dashboard',[
            'sessions'=>SessionsForCalendarResource::collection($sessions)->toArray(request()),
            'exercisesForMuscle' => session('exercisesForMuscle') ?? []
        ]);
    }

    public function exercisesByMuscle($muscleName){
        $today = Carbon::now()->toDateString();
        $previousMonth = Carbon::now()->subWeek()->toDateString();
        $muscle = Muscle::query()->where('name',$muscleName)->firstOrFail();
        $exerciseLogs = ExerciseLog::query()
            ->whereHas('routine_session', function ($query) use ($previousMonth, $today) {
                $query->where('user_id', auth()->id())
                ->whereBetween('completed_at', [$previousMonth, $today]);
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
        return redirect()->route('dashboard')->with('exercisesForMuscle', $finalLogs);
    }
}