<?php

use App\Models\Exercise;
use App\Models\Routine;
use App\Models\User;
use App\Models\Muscle;

test('exercise belongs to many muscles', function () {
    $exercise = Exercise::factory()
        ->has(Muscle::factory(3), 'muscles')
        ->create();

    expect($exercise->muscles)->toHaveCount(3)->each->toBeInstanceOf(Muscle::class);
});

test('exercise belongs to many routines', function () {
    $exercise = Exercise::factory()
        ->has(Routine::factory(3), 'routines')
        ->create();

    expect($exercise->routines)->toHaveCount(3)->each->toBeInstanceOf(Routine::class);
});
