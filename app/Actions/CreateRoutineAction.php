<?php
namespace App\Actions;

use App\Models\Routine;

class CreateRoutineAction
{
    public function execute(int $userId): Routine
    {
        return Routine::create([
            'user_id' => $userId,
            'name' => 'Nueva Rutina',
            'description' => '',
        ]);
    }
}
