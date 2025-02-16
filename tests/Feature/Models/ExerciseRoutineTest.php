<?php

use App\Models\Exercise;
use App\Models\Routine;
use App\Models\ExerciseRoutine;
use App\Models\Serie;

test('exerciseRoutine belongs to exercise', function () {
    $exerciseRoutine = ExerciseRoutine::factory()
        ->has(Exercise::factory(), 'exercise')
        ->create();

    expect($exerciseRoutine->exercise)->toBeInstanceOf(Exercise::class);
});

test('exerciseRoutine belongs to routine', function () {
    $exerciseRoutine = ExerciseRoutine::factory()
        ->has(Routine::factory(), 'routine')
        ->create();

    expect($exerciseRoutine->routine)->toBeInstanceOf(Routine::class);
});

test('exerciseRoutine has many series', function () {
    $exerciseRoutine = ExerciseRoutine::factory()
        ->has(Serie::factory(4), 'series')
        ->create();

    expect($exerciseRoutine->series)->toHaveCount(4)->each->toBeInstanceOf(Serie::class);
});
