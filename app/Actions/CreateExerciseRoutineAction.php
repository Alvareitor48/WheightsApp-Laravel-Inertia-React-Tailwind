<?php

namespace App\Actions;

use App\Models\Exercise;
use App\Models\ExerciseRoutine;

class CreateExerciseRoutineAction
{
    public function execute(int $routineId, int $exerciseId, ?string $note = null): ExerciseRoutine
    {
        $exercise = Exercise::findOrFail($exerciseId);

        return ExerciseRoutine::create([
            'routine_id' => $routineId,
            'exercise_id' => $exercise->id,
            'note' => $note,
        ]);
    }
}
