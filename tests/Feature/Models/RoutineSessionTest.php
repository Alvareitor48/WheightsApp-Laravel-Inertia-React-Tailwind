<?php

use App\Models\Exercise;
use App\Models\RoutineSession;
use App\Models\ExerciseLog;
use App\Models\Routine;

test('routineSession belongs to routine', function () {
    $routineSession = RoutineSession::factory()
        ->has(Routine::factory(), 'routine')
        ->create();

    expect($routineSession->routine)->toBeInstanceOf(Routine::class);
});

test('routineSession has many exerciseLogs', function () {
    $routineSession = RoutineSession::factory()
        ->has(ExerciseLog::factory(3), 'exerciseLogs')
        ->create();

    expect($routineSession->exerciseLogs)
        ->toHaveCount(3)
        ->each
        ->toBeInstanceOf(ExerciseLog::class);
});
