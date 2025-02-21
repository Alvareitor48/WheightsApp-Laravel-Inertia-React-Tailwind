<?php

namespace App\Actions;

use App\Models\Routine;

class UpdateRoutineAction
{
    public function execute(int $routineId,string $name,string $description = null): Routine
    {
        $routine = Routine::findOrFail($routineId);
        $routine->update([
            'name' => $name,
            'description' => $description,
        ]);

        return $routine->fresh();
    }
}
