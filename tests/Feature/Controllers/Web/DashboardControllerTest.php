<?php

use App\Models\User;
use App\Models\RoutineSession;
use App\Models\ExerciseLog;
use App\Models\Exercise;
use App\Models\Muscle;
use Spatie\Permission\Models\Role;
use Inertia\Testing\AssertableInertia;
use Carbon\Carbon;
use function Pest\Laravel\get;

test('user can access their dashboard', function () {
    $user = User::factory()->create();
    Role::create(['name' => 'premium']);
    $user->assignRole('premium');
    $this->actingAs($user);

    $session = RoutineSession::factory()->create([
        'user_id' => $user->id,
        'completed_at' => Carbon::now()->subDay(),
    ]);

    $exercise = Exercise::factory()
        ->has(Muscle::factory()->state(function () {
            return [
                'name' => 'Abdominales',
            ];
        }), 'muscles')
        ->create();
    $exerciseLog = ExerciseLog::factory()->create([
        'routine_session_id' => $session->id,
        'exercise_id' => $exercise->id,
    ]);

    get(route('dashboard'))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) =>
        $page->has('sessions', 1)
        ->where('sessions.0.id', $session->id)
            ->where('sessions.0.date', Carbon::parse($session->completed_at)->format('Y-m-d'))
            ->where('sessions.0.name', $session->routine->name)
            ->has('bodyHighLightData', 1)
            ->where('bodyHighLightData.0.name', $exercise->name)
            ->where('bodyHighLightData.0.muscles.0', 'abs')
            ->where('bodyHighLightData.0.frequency', 1)
        );
});


test('user can filter exercises by muscle and period', function () {
    $user = User::factory()->create();
    Role::create(['name' => 'premium']);
    $user->assignRole('premium');
    $this->actingAs($user);

    $session = RoutineSession::factory()->create([
        'user_id' => $user->id,
        'completed_at' => Carbon::now()->subDay(),
    ]);

    $exercise = Exercise::factory()
        ->has(Muscle::factory()->state(function () {
            return [
                'name' => 'Abdominales',
            ];
        }), 'muscles')
        ->create();
    $exerciseLog = ExerciseLog::factory()->create([
        'routine_session_id' => $session->id,
        'exercise_id' => $exercise->id,
    ]);

    get(route('exercises.by.muscle', ['muscleName' => 'Abdominales', 'period' => 'month']))
        ->assertStatus(302)
        ->assertRedirect(route('dashboard'));

    $exercisesForMuscle = session('exercisesForMuscle');
    $this->assertCount(1, $exercisesForMuscle);

    $this->assertEquals($exerciseLog->id, $exercisesForMuscle[0]['exercises'][0]['series'][0]['id']);
});

test('user can get max and min weights by muscle and period', function () {
    $user = User::factory()->create();
    Role::create(['name' => 'premium']);
    $user->assignRole('premium');
    $this->actingAs($user);

    $session = RoutineSession::factory()->create([
        'user_id' => $user->id,
        'completed_at' => Carbon::now()->subDay(),
    ]);

    $exercise = Exercise::factory()
        ->has(Muscle::factory()->state(function () {
            return [
                'name' => 'Abdominales',
            ];
        }), 'muscles')
        ->create();

    ExerciseLog::factory()->create([
        'routine_session_id' => $session->id,
        'exercise_id' => $exercise->id,
        'weight' => 50,
        'repetitions' => 10,
    ]);

    $exerciseLog2 = ExerciseLog::factory()->create([
        'routine_session_id' => $session->id,
        'exercise_id' => $exercise->id,
        'weight' => 20,
        'repetitions' => 5,
    ]);

    $exerciseLog3 = ExerciseLog::factory()->create([
        'routine_session_id' => $session->id,
        'exercise_id' => $exercise->id,
        'weight' => 605,
        'repetitions' => 88,
    ]);

    get(route('max.weights.by.muscle', ['muscleName' => 'Abdominales', 'period' => 'month']))
        ->assertStatus(302)
        ->assertRedirect(route('dashboard'));

    $logsMaxWeights = session('logsMaxWeights');

    $this->assertCount(1, $logsMaxWeights);

    $maxLog = $logsMaxWeights[0]['max'];
    $minLog = $logsMaxWeights[0]['min'];

    $this->assertEquals($exercise->name, $maxLog['exercise']);
    $this->assertEquals(605, $maxLog['weight']);
    $this->assertEquals(88, $maxLog['repetitions']);
    $this->assertEquals(Carbon::parse($exerciseLog3->routine_session->completed_at)->format('d-m-Y'), $maxLog['date']);

    $this->assertEquals($exercise->name, $minLog['exercise']);
    $this->assertEquals(20, $minLog['weight']);
    $this->assertEquals(5, $minLog['repetitions']);
    $this->assertEquals(Carbon::parse($exerciseLog2->routine_session->completed_at)->format('d-m-Y'), $minLog['date']);
});


