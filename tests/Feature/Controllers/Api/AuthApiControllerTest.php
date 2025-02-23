<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use function Pest\Laravel\postJson;

beforeEach(function () {
    Role::create(['name' => 'user']);
    $this->user = User::factory()->create([
        'email' => 'user@example.com',
        'password' => Hash::make('password123'),
    ]);
});
it('allows a user to register', function () {
    $userData = [
        'name' => 'John Doe',
        'email' => 'johndoe@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ];

    $response = postJson(route('api.register'), $userData);

    expect(User::where('email', 'johndoe@example.com')->exists())->toBeTrue();

    $response->assertStatus(201);
});

it('returns 422 if registration data is invalid', function () {
    $response = postJson(route('api.register'), [
        'name' => '',
        'email' => 'invalid-email',
        'password' => '123',
        'password_confirmation' => 'wrong',
    ]);

    $response->assertStatus(422);
});

it('allows a user to log in with correct credentials', function () {
    $response = postJson(route('api.login'), [
        'email' => 'user@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'message',
            'user' => ['id', 'name', 'email'],
            'token'
        ]);
});

it('returns 401 for invalid login credentials', function () {
    $response = postJson(route('api.login'), [
        'email' => 'user@example.com',
        'password' => 'wrongpassword',
    ]);

    $response->assertStatus(401)
        ->assertJson([
            'message' => 'Credenciales incorrectas'
        ]);
});
