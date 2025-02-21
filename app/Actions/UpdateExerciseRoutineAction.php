<?php

namespace App\Actions;

use App\Models\ExerciseRoutine;

class UpdateExerciseRoutineAction
{
    public function execute(int $exerciseRoutineId, ?string $note): ExerciseRoutine
    {
        $exerciseRoutine = ExerciseRoutine::findOrFail($exerciseRoutineId);
        $exerciseRoutine->update(['note' => $note]);

        return $exerciseRoutine;
    }
}
