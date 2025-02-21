<?php

namespace App\Actions;

use App\Models\ExerciseLog;

class CreateExerciseLogAction
{
    public function execute(int $routineSessionId, int $exerciseId, array $seriesData): ExerciseLog
    {
        return ExerciseLog::create([
            'routine_session_id' => $routineSessionId,
            'exercise_id' => $exerciseId,
            'repetitions' => $seriesData['repetitions'],
            'RIR' => $seriesData['RIR'],
            'failure' => $seriesData['failure'],
            'weight' => $seriesData['weight'],
        ]);
    }
}
