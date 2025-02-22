<?php

namespace Tests\Feature\Controllers\Api;

use App\Models\Exercise;
use App\Models\Muscle;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    $this->user = User::factory()->create();
    Role::create(['name' => 'user']);
    $this->user->assignRole('user');
    $this->actingAs($this->user);
});

test('user can list exercises', function () {
    Exercise::factory(3)->create();

    $this->getJson(route('api.exercises.index'))
        ->assertStatus(200)
        ->assertJsonCount(3, 'data')
        ->assertJsonPath('data.0.id', Exercise::first()->id)
        ->assertJsonPath('data.0.name', Exercise::first()->name)
        ->assertJsonPath('data.0.description', Exercise::first()->description);
});

test('user can view a specific exercise', function () {
    $exercise = Exercise::factory()->create();

    $this->getJson(route('api.exercises.show', $exercise->id))
        ->assertStatus(200)
        ->assertJsonPath('data.id', $exercise->id)
        ->assertJsonPath('data.name', $exercise->name)
        ->assertJsonPath('data.description', $exercise->description)
        ->assertJsonPath('data.url', $exercise->url)
        ->assertJsonPath('data.equipment', $exercise->equipment);
});

test('returns 404 if exercise does not exist', function () {
    $this->getJson(route('api.exercises.show', 999))
        ->assertStatus(404)
        ->assertJsonPath('message', 'Ejercicio no encontrado');
});

test('returns 403 if user is not authorized to view an exercise', function () {
    $exercise = Exercise::factory()->create(['user_id' => User::factory()->create()->id]);

    $this->getJson(route('api.exercises.show', $exercise->id))
        ->assertStatus(403)
        ->assertJsonPath('message', 'This action is unauthorized.');
});

test('admin can view any exercise', function () {
    Role::create(['name' => 'admin']);
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    $this->actingAs($admin);

    $exercise = Exercise::factory()->create(['user_id' => $admin->id]);

    $this->getJson(route('api.exercises.show', $exercise->id))
        ->assertStatus(200)
        ->assertJsonPath('data.id', $exercise->id)
        ->assertJsonPath('data.name', $exercise->name);
});

test('premium user can create a new exercise', function () {
    $user = User::factory()->create();
    Role::create(['name' => 'premium']);
    $user->assignRole('premium');
    $this->actingAs($user);

    $muscles = Muscle::factory(3)->create();

    $exerciseData = [
        'name' => 'Ejercicio de prueba',
        'description' => 'Descripción del ejercicio',
        'media' => UploadedFile::fake()->create('video.mp4', 1024),
        'muscles' => $muscles->pluck('name')->implode(', '),
        'equipment' => 'Barbell',
    ];

    $response = $this->postJson(route('api.exercises.store'), $exerciseData);

    $response->assertStatus(201)
        ->assertJsonPath('data.name', $exerciseData['name'])
        ->assertJsonPath('data.description', $exerciseData['description'])
        ->assertJsonPath('data.equipment', $exerciseData['equipment'])
        ->assertJsonCount(3, 'data.muscles')
        ->assertJsonFragment(['muscles' => $muscles->pluck('name')->toArray()]);

    $this->assertDatabaseHas('exercises', [
        'name' => $exerciseData['name'],
        'description' => $exerciseData['description'],
        'equipment' => $exerciseData['equipment'],
    ]);
});

test('normal user can not create a new exercise', function () {
    $muscles = Muscle::factory(3)->create();
    $exerciseData = [
        'name' => 'Ejercicio de prueba',
        'description' => 'Descripción del ejercicio',
        'media' => UploadedFile::fake()->create('video.mp4', 1024),
        'muscles' => $muscles->pluck('name')->implode(', '),
        'equipment' => 'Barbell',
    ];

    $this->postJson(route('api.exercises.store'), $exerciseData)
        ->assertStatus(403);
});


