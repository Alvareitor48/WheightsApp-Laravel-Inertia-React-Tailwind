<?php
namespace App\Actions;

use App\Models\RoutineSession;
use Carbon\Carbon;

class CreateRoutineSessionAction
{
    public function execute(int $routineId, int $userId, int $durationInSeconds): RoutineSession
    {
        return RoutineSession::create([
            'routine_id' => $routineId,
            'user_id'=> $userId,
            'duration' => Carbon::createFromTimestampUTC($durationInSeconds)->toTimeString()
        ]);
    }
}
