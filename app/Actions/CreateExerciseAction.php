<?php


namespace App\Actions;

use App\Models\Exercise;
use App\Models\Muscle;
use App\Services\ExerciseService;

class CreateExerciseAction
{
    private ExerciseService $exerciseService;

    public function __construct(ExerciseService $exerciseService)
    {
        $this->exerciseService = $exerciseService;
    }

    public function execute(array $data, ?array $muscles = null): Exercise
    {
        $equipment = ($data['equipment'] === 'Sin equipamiento') ? null : $data['equipment'];
        $muscles = $muscles ?? $data['muscles'];

        $exercise = $this->exerciseService->createExercise(
            $data['media'],
            $data['name'],
            $data['description'],
            $equipment
        );
        $muscleIds = Muscle::whereIn('name', $muscles)->pluck('id')->toArray();
        $exercise->muscles()->attach($muscleIds);
        return $exercise;
    }
}

