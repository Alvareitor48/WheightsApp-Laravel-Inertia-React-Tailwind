<?php

use App\Models\Serie;
use App\Models\ExerciseRoutine;

test('serie belongs to exerciseRoutine', function () {
    $serie = Serie::factory()
        ->has(ExerciseRoutine::factory(), 'exerciseRoutine')
        ->create();

    expect($serie->exerciseRoutine)->toBeInstanceOf(ExerciseRoutine::class);
});
