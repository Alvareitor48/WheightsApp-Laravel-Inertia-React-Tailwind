<?php

use App\Models\Exercise;
use App\Models\Routine;
use App\Models\User;

test('routine belongs to user', function () {
    $routine = Routine::factory()
        ->has(User::factory(), 'user')
        ->create();

    expect($routine->user)->toBeInstanceOf(User::class);
});

test('routine belongs to many exercises', function () {
    $routine = Routine::factory()
        ->has(Exercise::factory(3), 'exercises')
        ->create();

    expect($routine->exercises)->toHaveCount(3)->each->toBeInstanceOf(Exercise::class);
});
