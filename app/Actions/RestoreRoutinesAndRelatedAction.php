<?php

namespace App\Actions;

use App\Models\Exercise;
use App\Models\ExerciseLog;
use App\Models\Routine;
use App\Models\RoutineSession;
use Illuminate\Http\Request;
class RestoreRoutinesAndRelatedAction
{
    public function execute(Routine $routine): void
    {
        $routine->restore();
        $routineSessions = RoutineSession::onlyTrashed()
            ->where('routine_id', $routine->id)
            ->get();
        RoutineSession::onlyTrashed()
            ->whereIn('id', $routineSessions->pluck('id'))
            ->restore();
        ExerciseLog::onlyTrashed()
            ->whereIn('routine_session_id', $routineSessions->pluck('id'))
            ->restore();
    }
}
