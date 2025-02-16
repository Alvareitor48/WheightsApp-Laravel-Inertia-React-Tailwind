<?php

use App\Models\Routine;
use App\Models\User;

test('user has routines', function () {
    $user = User::factory()
        ->has(Routine::factory()->count(3), 'routines')
        ->create();

    expect($user->routines)
        ->toHaveCount(3);
});
