<?php

use App\Models\Routine;
use App\Models\User;
use App\Models\Exercise;
use App\Models\Serie;
use App\Models\ExerciseLog;
use App\Models\ExerciseRoutine;
use App\Models\RoutineSession;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;
use function Pest\Laravel\getJson;

beforeEach(function () {
    $this->user = User::factory()->create();
    Role::create(['name' => 'user']);
    $this->user->assignRole('user');
    $this->actingAs($this->user);

    $this->routine = Routine::factory()
        ->has(Exercise::factory(), 'exercises')
        ->create(['user_id' => $this->user->id]);
    $this->routine->exercises->each(fn ($exercise) =>
    $this->exerciseRoutine = ExerciseRoutine::factory()
        ->has(Serie::factory(3), 'series')
        ->create([
            'routine_id' => $this->routine->id,
            'exercise_id' => $exercise->id,
        ])
    );

    $this->routineSession = RoutineSession::factory()->create([
        'routine_id' => $this->routine->id,
        'user_id' => $this->user->id,
    ]);

    $this->exerciseLogs = ExerciseLog::factory(2)->create([
        'routine_session_id' => $this->routineSession->id,
        'exercise_id' => $this->routine->exercises->random()->id,
    ]);
});

test('user can view a routine', function () {
    getJson(route('api.routines.show', $this->routine->id))
        ->assertStatus(200)
        ->assertJsonPath('routine.id', $this->routine->id)
        ->assertJsonPath('routine.name', $this->routine->name)
        ->assertJsonPath('routine.description', $this->routine->description)
        ->assertJsonCount(2, 'exercises')
        ->assertJsonPath('exercises.0.exercise.id', $this->routine->exercises->first()->id)
        ->assertJsonPath('exercises.0.exercise.name', $this->routine->exercises->first()->name)
        ->assertJsonPath('exercises.0.exercise.description', $this->routine->exercises->first()->description)
        ->assertJsonPath('exercises.1.exercise.id', $this->routine->exercises->last()->id)
        ->assertJsonPath('exercises.1.exercise.name', $this->routine->exercises->last()->name)
        ->assertJsonPath('exercises.1.exercise.description', $this->routine->exercises->last()->description);
});

test('user can view routine chart data', function () {
    $repsCount = $this->exerciseLogs->sum(fn ($log) => $log->repetitions ?? 0);
    $weightsCount = $this->exerciseLogs->sum(fn ($log) => $log->weight ?? 0);
    $this->actingAs($this->user)
        ->getJson(route('api.routines.chartData', ['id' => $this->routine->id, 'period' => 'month']))
        ->assertStatus(200)
        ->assertJsonPath('0.date', Carbon::parse($this->routineSession->completed_at)->format('d-m-Y'))
        ->assertJsonPath('0.Repeticiones Totales', $repsCount)
        ->assertJsonPath('0.Peso Levantado', $weightsCount);

});


test('premium user can view routine chart data year', function () {
    Role::create(['name' => 'admin']);
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    $routine = Routine::factory()
        ->has(Exercise::factory(), 'exercises')
        ->create(['user_id' => $this->user->id]);
    $routine->exercises->each(fn ($exercise) =>
    ExerciseRoutine::factory()
        ->has(Serie::factory(3), 'series')
        ->create([
            'routine_id' => $routine->id,
            'exercise_id' => $exercise->id,
        ])
    );

    $routineSession = RoutineSession::factory()->create([
        'routine_id' => $routine->id,
        'user_id' => $admin->id,
    ]);

    $exerciseLogs = ExerciseLog::factory(2)->create([
        'routine_session_id' => $routineSession->id,
        'exercise_id' => $routine->exercises->random()->id,
    ]);
    $repsCount = $exerciseLogs->sum(fn ($log) => $log->repetitions ?? 0);
    $weightsCount = $exerciseLogs->sum(fn ($log) => $log->weight ?? 0);
    $this->actingAs($admin)
        ->getJson(route('api.routines.chartData', ['id' => $routine->id, 'period' => 'year']))
        ->assertStatus(200)
        ->assertJsonPath('0.date', Carbon::parse($routineSession->completed_at)->format('d-m-Y'))
        ->assertJsonPath('0.Repeticiones Totales', $repsCount)
        ->assertJsonPath('0.Peso Levantado', $weightsCount);

});
