<?php

use App\Models\Exercise;
use App\Models\Routine;
use App\Models\User;
use App\Models\Muscle;
use Inertia\Testing\AssertableInertia;
use Spatie\Permission\Models\Role;
use Illuminate\Http\UploadedFile;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

beforeEach(function () {
    $this->user = User::factory()->create();
    Role::create(['name' => 'user']);
    $this->user->assignRole('user');
    $this->actingAs($this->user);
});

test('guest user can list exercises', function () {
    $exercises = Exercise::factory(3)->create();

    get(route('exercises.index'))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
        $page->has('exercises.data', 3)
            ->where('exercises.data.0.id', $exercises[0]->id)
            ->where('exercises.data.0.name', $exercises[0]->name)
            ->where('exercises.data.0.description', $exercises[0]->description)
            ->where('exercises.data.1.id', $exercises[1]->id)
            ->where('exercises.data.1.name', $exercises[1]->name)
            ->where('exercises.data.1.description', $exercises[1]->description)
            ->where('exercises.data.2.id', $exercises[2]->id)
            ->where('exercises.data.2.name', $exercises[2]->name)
            ->where('exercises.data.2.description', $exercises[2]->description)
            ->has('muscles')
        );
});

test('user can list exercises to add', function () {
    $this->routine = Routine::factory()->create(['user_id' => $this->user->id]);
    $exercises = Exercise::factory(3)->create();

    get(route('routines.add.exercises',['routineId' => $this->routine->id, 'redirect_to' => 'routines.edit']))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
        $page->has('exercises.data', 3)
            ->where('exercises.data.0.id', $exercises[0]->id)
            ->where('exercises.data.0.name', $exercises[0]->name)
            ->where('exercises.data.0.description', $exercises[0]->description)
            ->where('exercises.data.1.id', $exercises[1]->id)
            ->where('exercises.data.1.name', $exercises[1]->name)
            ->where('exercises.data.1.description', $exercises[1]->description)
            ->where('exercises.data.2.id', $exercises[2]->id)
            ->where('exercises.data.2.name', $exercises[2]->name)
            ->where('exercises.data.2.description', $exercises[2]->description)
            ->has('muscles')
        );
});

test('user can filter exercises by equipment', function () {
    $this->routine = Routine::factory()->create(['user_id' => $this->user->id]);
    Exercise::factory(3)->create([
        'equipment' => 'Dumbbell'
    ]);

    get(route('routines.add.exercises', ['routineId' => $this->routine->id, 'redirect_to' => 'routines.edit', 'equipment' => 'Dumbbell']))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
        $page->has('exercises.data', 3)
        ->where('exercises.data.0.equipment', 'Dumbbell')
        );
});


test('user can filter exercises by muscle', function () {
    $this->routine = Routine::factory()->create(['user_id' => $this->user->id]);
    $muscle = "Bíceps";
    $exercise = Exercise::factory()
        ->has(Muscle::factory()->state(function () use ($muscle) {
            return [
                'name' => $muscle,
            ];
        }), 'muscles')
        ->create();

    get(route('routines.add.exercises', ['routineId' => $this->routine->id, 'redirect_to' => 'routines.edit', 'muscle' => $muscle]))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
        $page->has('exercises.data', 1)
            ->where('exercises.data.0.id', $exercise->id)
            ->where('exercises.data.0.name', $exercise->name)
            ->where('exercises.data.0.description', $exercise->description)
            ->where('exercises.data.0.muscles.0', $muscle)
        );
});

test('user can filter exercises by my exercises', function () {
    $this->routine = Routine::factory()->create(['user_id' => $this->user->id]);
    $exercises = Exercise::factory(3)->create([
        'user_id' => $this->user->id
    ]);

    get(route('routines.add.exercises', ['routineId' => $this->routine->id, 'redirect_to' => 'routines.edit', 'my_exercises' => 'Mis ejercicios']))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
        $page->has('exercises.data', 3)
            ->where('exercises.data.0.id', $exercises[0]->id)
            ->where('exercises.data.0.name', $exercises[0]->name)
            ->where('exercises.data.0.description', $exercises[0]->description)
            ->where('exercises.data.1.id', $exercises[1]->id)
            ->where('exercises.data.1.name', $exercises[1]->name)
            ->where('exercises.data.1.description', $exercises[1]->description)
            ->where('exercises.data.2.id', $exercises[2]->id)
            ->where('exercises.data.2.name', $exercises[2]->name)
            ->where('exercises.data.2.description', $exercises[2]->description)
            ->has('muscles')
        );
});

test('user can filter exercises by normal exercises', function () {
    $this->routine = Routine::factory()->create(['user_id' => $this->user->id]);
    $exercises = Exercise::factory(3)->create([
        'user_id' => null
    ]);

    get(route('routines.add.exercises', ['routineId' => $this->routine->id, 'redirect_to' => 'routines.edit', 'my_exercises' => 'Ejercicios normales']))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
        $page->has('exercises.data', 3)
            ->where('exercises.data.0.id', $exercises[0]->id)
            ->where('exercises.data.0.name', $exercises[0]->name)
            ->where('exercises.data.0.description', $exercises[0]->description)
            ->where('exercises.data.1.id', $exercises[1]->id)
            ->where('exercises.data.1.name', $exercises[1]->name)
            ->where('exercises.data.1.description', $exercises[1]->description)
            ->where('exercises.data.2.id', $exercises[2]->id)
            ->where('exercises.data.2.name', $exercises[2]->name)
            ->where('exercises.data.2.description', $exercises[2]->description)
            ->has('muscles')
        );
});

test('user can filter exercises by equipment and muscle', function () {
    $this->routine = Routine::factory()->create(['user_id' => $this->user->id]);
    $muscle = "Bíceps";
    $equipment = "Dumbbell";
    $exercise1 = Exercise::factory()
        ->has(Muscle::factory()->state(function () use ($muscle) {
            return [
                'name' => $muscle,
            ];
        }), 'muscles')
        ->create(['equipment' => $equipment]);
    Exercise::factory()
        ->has(Muscle::factory()->state(function () {
            return [
                'name' => 'Abdominales',
            ];
        }), 'muscles')
        ->create(['equipment' => $equipment]);

    get(route('routines.add.exercises', ['routineId' => $this->routine->id, 'redirect_to' => 'routines.edit', 'equipment' => $equipment, 'muscle' => $muscle]))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
        $page->has('exercises.data', 1)
            ->where('exercises.data.0.id', $exercise1->id)
            ->where('exercises.data.0.name', $exercise1->name)
            ->where('exercises.data.0.description', $exercise1->description)
            ->where('exercises.data.0.muscles.0', $muscle)
            ->where('exercises.data.0.equipment', $equipment)
        );
});

test('user can view an exercise', function () {
    $exercise = Exercise::factory()->create();
    $muscle1 = Muscle::factory()->create(['name' => 'Bíceps']);
    $muscle2 = Muscle::factory()->create(['name' => 'Tríceps']);
    $exercise->muscles()->attach([$muscle1->id, $muscle2->id]);

    get(route('exercises.show', $exercise->id))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
        $page->has('exercise', fn ($exerciseData) =>
        $exerciseData->where('id', $exercise->id)
            ->where('name', $exercise->name)
            ->where('description', $exercise->description)
            ->where('url', $exercise->url)
            ->where('equipment', $exercise->equipment)
            ->has('muscles', 2)
            ->where('muscles.0', $muscle1->name)
            ->where('muscles.1', $muscle2->name)
        )
        );
});

test('user can access the page to create a new exercise', function () {
    $user = User::factory()->create();
    Role::create(['name' => 'premium']);
    $user->assignRole('premium');
    $this->actingAs($user);

    Muscle::factory()->create(['name' => 'Bíceps']);
    Muscle::factory()->create(['name' => 'Tríceps']);
    Exercise::factory()->create(['equipment' => 'Barbell']);
    Exercise::factory()->create(['equipment' => 'Dumbbell']);

    get(route('routines.create.exercise', ['routineId' => 1, 'redirect_to' => 'routines.edit']))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
        $page->has('equipments', 2)
        ->where('equipments.0', 'Barbell')
            ->where('equipments.1', 'Dumbbell')
            ->has('muscles', 2)
            ->where('muscles.0', 'Bíceps')
            ->where('muscles.1', 'Tríceps')
            ->where('redirect_to', 'routines.edit')  // Verificar el valor de `redirect_to`
        );
});

test('user can create a new exercise', function () {
    $user = User::factory()->create();
    Role::create(['name' => 'premium']);
    $user->assignRole('premium');
    $this->actingAs($user);

    $muscles = Muscle::factory(3)->create();

    $exerciseData = [
        'name' => 'Ejercicio de prueba',
        'description' => 'Descripción del ejercicio',
        'media' => UploadedFile::fake()->create('video.mp4', 1024), // Crear un archivo falso
        'muscles' => $muscles->pluck('name')->toArray(),
        'equipment' => 'Barbell',
    ];

    post(route('routines.store.exercise', ['routineId' => 1, 'redirect_to' => 'routines.edit']), $exerciseData)
        ->assertStatus(302)
        ->assertRedirect(route('routines.add.exercises', [
            'routineId' => 1,
            'redirect_to' => 'routines.edit',
        ]));

    $this->assertDatabaseHas('exercises', [
        'name' => $exerciseData['name'],
        'description' => $exerciseData['description'],
        'equipment' => $exerciseData['equipment'],
    ]);
});
