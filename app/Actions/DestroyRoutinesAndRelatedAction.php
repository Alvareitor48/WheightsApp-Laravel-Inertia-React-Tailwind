<?php

namespace App\Actions;

use App\Models\Exercise;
use App\Models\ExerciseLog;
use App\Models\Routine;
use App\Models\RoutineSession;
use Illuminate\Http\Request;
class DestroyRoutinesAndRelatedAction
{
    public function execute(Routine $routine): void
    {
        $routine->delete();
        $routineSessions = RoutineSession::where('routine_id', $routine->id)->get();
        $sessionIds = $routineSessions->pluck('id');
        ExerciseLog::whereIn('routine_session_id', $sessionIds)->delete();
        RoutineSession::whereIn('id', $sessionIds)->delete();
    }
}
