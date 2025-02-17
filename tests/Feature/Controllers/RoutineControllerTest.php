<?php

use App\Models\User;
use App\Models\Routine;
use App\Models\Exercise;
use App\Models\ExerciseRoutine;
use App\Models\ExerciseLog;
use App\Models\Serie;
use App\Models\RoutineSession;
use Carbon\Carbon;
use Spatie\Permission\Models\Role;
use Inertia\Testing\AssertableInertia;
use Illuminate\Support\Facades\Queue;
use App\Jobs\GenerateRoutinePdfJob;
use Illuminate\Support\Facades\Event;
use App\Events\RoutineDeleted;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;
use function Pest\Laravel\delete;

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

test('user can list their routines', function () {
    $routines = Routine::factory(3)->create(['user_id' => $this->user->id]);

    get(route('routines.index'))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
            $page->has('auth.user', fn ($user) =>
                $user->where('id', $this->user->id)
                    ->where('name', $this->user->name)
                    ->where('email', $this->user->email)
                    ->has('roles', 1)
                    ->where('roles.0.name', $this->user->getRoleNames()->first())
            )
            ->has('routines', 4)
            ->where('routines.1.name', $routines[0]->name)
            ->where('routines.2.name', $routines[1]->name)
            ->where('routines.3.name', $routines[2]->name)
        );
});

test('user can view a routine', function () {
    get(route('routines.show', $this->routine->id))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
            $page->has('auth.user', fn ($user) =>
                $user->where('id', $this->user->id)
                    ->where('name', $this->user->name)
                    ->where('email', $this->user->email)
                    ->has('roles', 1)
                    ->where('roles.0.name', $this->user->getRoleNames()->first())
            )
            ->where('routine.id', $this->routine->id)
            ->where('routine.name', $this->routine->name)
            ->where('routine.description', $this->routine->description)
            ->has('exercises', 2)
            ->where('exercises.0.exercise.id', $this->routine->exercises->first()->id)
            ->where('exercises.0.exercise.name', $this->routine->exercises->first()->name)
            ->where('exercises.0.exercise.description', $this->routine->exercises->first()->description)
            ->where('exercises.1.exercise.id', $this->routine->exercises->last()->id)
            ->where('exercises.1.exercise.name', $this->routine->exercises->last()->name)
            ->where('exercises.1.exercise.description', $this->routine->exercises->last()->description)
            ->where('stadistics.0.date',Carbon::parse($this->routineSession->completed_at)->format('d-m-Y'))
        );
});

test('user can edit a routine', function () {
    get(route('routines.edit', $this->routine->id))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
            $page->has('auth.user', fn ($user) =>
                $user->where('id', $this->user->id)
                    ->where('name', $this->user->name)
                    ->where('email', $this->user->email)
                    ->has('roles', 1)
                    ->where('roles.0.name', $this->user->getRoleNames()->first())
            )
            ->where('routine.id', $this->routine->id)
            ->where('routine.name', $this->routine->name)
            ->where('routine.description', $this->routine->description)
            ->has('exercises', 2)
            ->where('exercises.0.exercise.id', $this->routine->exercises->first()->id)
            ->where('exercises.0.exercise.name', $this->routine->exercises->first()->name)
            ->where('exercises.0.exercise.description', $this->routine->exercises->first()->description)
            ->where('exercises.1.exercise.id', $this->routine->exercises->last()->id)
            ->where('exercises.1.exercise.name', $this->routine->exercises->last()->name)
            ->where('exercises.1.exercise.description', $this->routine->exercises->last()->description)
            ->missing('stadistics')
        );
});

test('user can update a routine', function () {
    $updatedData = [
        'routine' => [
            'id' => $this->routine->id,
            'name' => 'Rutina Actualizada',
            'description' => 'Nueva descripción de la rutina',
        ],
        'exercises' => $this->routine->exercises->map(fn ($exercise) => [
            'id' => $this->exerciseRoutine->id, // ID en exercises_routines
            'note' => 'Nueva nota',
            'exercise' => [
                'id' => $exercise->id,
                'name' => $exercise->name,
            ],
            'series' => $this->exerciseRoutine->series->map(fn ($serie) => [
                'id' => $serie->id,
                'repetitions' => 12,
                'RIR' => 3,
                'failure' => false,
                'weight' => 50.5,
            ])->toArray(),
        ])->toArray(),
    ];

    put(route('routines.update',$this->routine->id), $updatedData)
        ->assertRedirect(route('routines.show', ['id' => $this->routine->id]))
        ->assertStatus(302);

    $this->assertDatabaseHas('routines', [
        'id' => $this->routine->id,
        'name' => 'Rutina Actualizada',
        'description' => 'Nueva descripción de la rutina',
    ]);

    foreach ($updatedData['exercises'] as $updatedExercise) {
        $this->assertDatabaseHas('exercises_routines', [
            'id' => $updatedExercise['id'],
            'note' => 'Nueva nota',
        ]);

        foreach ($updatedExercise['series'] as $updatedSerie) {
            $this->assertDatabaseHas('series', [
                'id' => $updatedSerie['id'],
                'repetitions' => 12,
                'RIR' => 3,
                'failure' => false,
                'weight' => 50.5,
            ]);
        }
    }
});

test('user can start a routine', function () {
    get(route('routines.start', $this->routine->id))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
        $page->has('auth.user', fn ($user) =>
        $user->where('id', $this->user->id)
            ->where('name', $this->user->name)
            ->where('email', $this->user->email)
            ->has('roles', 1)
            ->where('roles.0.name', $this->user->getRoleNames()->first())
        )
            ->where('routine.id', $this->routine->id)
            ->where('routine.name', $this->routine->name)
            ->where('routine.description', $this->routine->description)
            ->has('routine.durationInSeconds')
            ->where('routine.durationInSeconds', 0)
            ->has('exercises', 2)
            ->where('exercises.0.exercise.id', $this->routine->exercises->first()->id)
            ->where('exercises.0.exercise.name', $this->routine->exercises->first()->name)
            ->where('exercises.0.exercise.description', $this->routine->exercises->first()->description)
            ->where('exercises.1.exercise.id', $this->routine->exercises->last()->id)
            ->where('exercises.1.exercise.name', $this->routine->exercises->last()->name)
            ->where('exercises.1.exercise.description', $this->routine->exercises->last()->description)
            ->missing('stadistics')
        );
});

test('user can complete a routine session', function () {
    $validData = [
        'routine' => [
            'id' => $this->routine->id,
            'name' => $this->routine->name,
            'description' => $this->routine->description,
        ],
        'durationInSeconds' => 3600, // 1 hora en segundos
        'exercises' => $this->routine->exercises->map(fn ($exercise) => [
            'id' => $this->exerciseRoutine->id, // ID en exercises_routines
            'note' => 'Ejemplo de nota',
            'exercise' => [
                'id' => $exercise->id,
                'name' => $exercise->name,
            ],
            'series' => $this->exerciseRoutine->series->map(fn ($serie) => [
                'id' => $serie->id,
                'repetitions' => 10,
                'RIR' => 2,
                'failure' => false,
                'weight' => 40.0,
            ])->toArray(),
        ])->toArray(),
    ];

    put(route('routines.start.session', $this->routine->id), $validData)
        ->assertStatus(302)
        ->assertRedirect(route('routines.show', ['id' => $this->routine->id]));

    $this->assertDatabaseHas('routine_sessions', [
        'routine_id' => $this->routine->id,
        'user_id' => $this->user->id,
    ]);
    $routineSession = RoutineSession::where(
        'duration',Carbon::createFromTimestampUTC($validData['durationInSeconds'])->toTimeString()
    )->first();

    foreach ($validData['exercises'] as $updatedExercise) {
        foreach ($updatedExercise['series'] as $updatedSerie) {
            $this->assertDatabaseHas('exercise_logs', [
                'routine_session_id' => $routineSession->id,
                'exercise_id' => $updatedExercise['exercise']['id'],
                'repetitions' => 10,
                'RIR' => 2,
                'failure' => false,
                'weight' => 40.0,
            ]);
        }
    }
});

test('user can add an exercise to a routine', function () {
    $exercise = Exercise::factory()->create();

    $requestData = [
        'exercise_id' => $exercise->id,
        'redirect_to' => 'routines.edit',
    ];

    put(route('routines.add.exercise', $this->routine->id), $requestData)
        ->assertStatus(302)
        ->assertRedirect(route('routines.edit', ['id' => $this->routine->id]));

    $this->assertDatabaseHas('exercises_routines', [
        'routine_id' => $this->routine->id,
        'exercise_id' => $exercise->id,
        'note' => null,
    ]);
});

test('user can delete an exercise from a routine', function () {
    $exercise = Exercise::factory()->create();
    $exerciseRoutine = ExerciseRoutine::factory()->create([
        'routine_id' => $this->routine->id,
        'exercise_id' => $exercise->id,
    ]);

    delete(route('routines.delete.exercise', ['routineId' => $this->routine->id, 'redirect_to' => 'routines.edit']), [
        'exercise_id' => $exerciseRoutine->id,
    ])
        ->assertStatus(302)
        ->assertRedirect(route('routines.edit', ['id' => $this->routine->id]));

    $this->assertDatabaseMissing('exercises_routines', [
        'id' => $exerciseRoutine->id,
        'routine_id' => $this->routine->id,
        'exercise_id' => $exercise->id,
    ]);
});

test('user can create a routine', function () {
    post(route('routines.store'))
        ->assertStatus(302)
        ->assertRedirect(route('routines.edit', [
            'id' => Routine::whereNot('id', $this->routine->id)->first()->id
        ]));
    $this->assertDatabaseHas('routines', [
        'user_id' => $this->user->id,
        'name' => 'Nueva Rutina',
        'description' => '',
    ]);
});

test('user cant update routine chart data', function () {
    $requestData = [
        'period' => 'month',
    ];

    get(route('routines.update.chart', $this->routine->id), $requestData)
        ->assertStatus(403);


    $this->assertEmpty(session('stadistics'));

    $this->assertFalse(session()->has('stadistics'));
});

test('user premium can update routine chart data', function () {
    $user = User::factory()->create();
    Role::create(['name' => 'premium']);
    $user->assignRole('premium');
    $this->actingAs($user);

    $this->routine = Routine::factory()
        ->has(Exercise::factory(), 'exercises')
        ->create(['user_id' => $user->id]);
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
        'user_id' => $user->id,
    ]);

    $this->exerciseLogs = ExerciseLog::factory(2)->create([
        'routine_session_id' => $this->routineSession->id,
        'exercise_id' => $this->routine->exercises->random()->id,
    ]);

    $requestData = [
        'period' => 'month',
    ];

    get(route('routines.update.chart', $this->routine->id), $requestData)
        ->assertStatus(302)
        ->assertRedirect(route('routines.show', ['id' => $this->routine->id]));


    $this->assertNotEmpty(session('stadistics'));

    $this->assertTrue(session()->has('stadistics'));
});


test('user premium can generate a routine PDF', function () {
    Queue::fake();
    $user = User::factory()->create();
    Role::create(['name' => 'premium']);
    $user->assignRole('premium');
    $this->actingAs($user);

    $this->routine = Routine::factory()
        ->has(Exercise::factory(), 'exercises')
        ->create(['user_id' => $user->id]);
    $this->routine->exercises->each(fn ($exercise) =>
    $this->exerciseRoutine = ExerciseRoutine::factory()
        ->has(Serie::factory(3), 'series')
        ->create([
            'routine_id' => $this->routine->id,
            'exercise_id' => $exercise->id,
        ])
    );
    post(route('routines.generate.pdf', $this->routine->id))
        ->assertStatus(200);

    Queue::assertPushed(GenerateRoutinePdfJob::class);
});


test('user can delete a routine', function () {
    Event::fake();

    $routine = Routine::factory()->create(['user_id' => $this->user->id]);

    delete(route('routines.destroy', $routine->id))
        ->assertRedirect(route('routines.index'));

    $this->assertSoftDeleted('routines', ['id' => $routine->id]);

    Event::assertDispatched(RoutineDeleted::class);
});

test('user can restore a deleted routine', function () {
    $routine = Routine::factory()->create(['user_id' => $this->user->id, 'deleted_at' => now()]);

    get(route('routines.restore', $routine->id))
        ->assertRedirect(route('routines.index'));

    $this->assertDatabaseHas('routines', [
        'id' => $routine->id,
        'deleted_at' => null,
    ]);
});

test('user cannot view a routine they do not own', function () {
    $anotherUser = User::factory()->create();
    $this->actingAs($anotherUser);

    get(route('routines.show', $this->routine->id))
        ->assertStatus(403);
});

test('user cannot edit a routine they do not own', function () {
    $anotherUser = User::factory()->create();
    $this->actingAs($anotherUser);

    get(route('routines.edit', $this->routine->id))
        ->assertStatus(403);
});

test('user cannot update a routine they do not own', function () {
    $anotherUser = User::factory()->create();
    $this->actingAs($anotherUser);

    $updatedData = [
        'routine' => [
            'id' => $this->routine->id,
            'name' => 'Nombre no permitido',
            'description' => 'Descripción no permitida',
        ],
    ];

    put(route('routines.update', $this->routine->id), $updatedData)
        ->assertStatus(403);
});

test('user cannot delete a routine they do not own', function () {
    $anotherUser = User::factory()->create();
    $this->actingAs($anotherUser);

    delete(route('routines.destroy', $this->routine->id))
        ->assertStatus(403);
});


test('non-premium user cannot generate a routine PDF', function () {
    $this->actingAs($this->user);

    post(route('routines.generate.pdf', $this->routine->id))
        ->assertStatus(403);
});

test('non-premium user cannot download a routine PDF', function () {
    $this->actingAs($this->user);

    get(route('routines.download.pdf', $this->routine->id))
        ->assertStatus(403);
});

