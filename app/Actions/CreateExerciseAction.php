<?php


namespace App\Actions;

use App\Models\Muscle;
use App\Services\ExerciseService;

class CreateExerciseAction
{
    private ExerciseService $exerciseService;

    public function __construct(ExerciseService $exerciseService)
    {
        $this->exerciseService = $exerciseService;
    }

    public function execute(array $data): void
    {
        $equipment = ($data['equipment'] === 'Sin equipamiento') ? null : $data['equipment'];

        $exercise = $this->exerciseService->createExercise(
            $data['media'],
            $data['name'],
            $data['description'],
            $equipment
        );

        $muscleIds = Muscle::whereIn('name', $data['muscles'])->pluck('id')->toArray();
        $exercise->muscles()->attach($muscleIds);
    }
}

