<?php

use App\Models\Exercise;
use App\Models\RoutineSession;
use App\Models\ExerciseLog;
use App\Models\Serie;

test('exerciseLog belongs to exercise', function () {
    $exerciseLog = ExerciseLog::factory()
        ->has(Exercise::factory(), 'exercise')
        ->create();

    expect($exerciseLog->exercise)->toBeInstanceOf(Exercise::class);
});

test('exerciseLog belongs to routineSession', function () {
    $exerciseLog = ExerciseLog::factory()
        ->has(RoutineSession::factory(), 'routine_session')
        ->create();

    expect($exerciseLog->routine_session)->toBeInstanceOf(RoutineSession::class);
});
