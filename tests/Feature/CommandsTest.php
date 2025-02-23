<?php
use App\Models\ExerciseRoutine;
use App\Models\Routine;
use function Pest\Laravel\artisan;

it('deletes old exercises routines that were trashed more than a year ago', function () {
    $oldRoutine = ExerciseRoutine::factory()->create([
        'deleted_at' => now()->subYear()->subDay(),
    ]);

    $recentRoutine = ExerciseRoutine::factory()->create([
        'deleted_at' => now()->subMonths(11),
    ]);

    artisan('exercises-routines:delete-old')->assertExitCode(0);

    expect(ExerciseRoutine::withTrashed()->find($oldRoutine->id))->toBeNull();
    expect(ExerciseRoutine::withTrashed()->find($recentRoutine->id))->not->toBeNull();
});

it('deletes routines that were trashed more than 7 days ago', function () {
    $oldRoutine = Routine::factory()->create([
        'deleted_at' => now()->subDays(8),
    ]);

    $recentRoutine = Routine::factory()->create([
        'deleted_at' => now()->subDays(6),
    ]);

    artisan('routines:delete-old')->assertExitCode(0);

    expect(Routine::withTrashed()->find($oldRoutine->id))->toBeNull();
    expect(Routine::withTrashed()->find($recentRoutine->id))->not->toBeNull();
});
