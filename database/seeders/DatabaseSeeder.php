<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\ExerciseRoutine;
use App\Models\Routine;
use App\Models\Serie;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UsersTableSeeder::class,
            ExercisesTableSeeder::class,
        ]);

        $user = User::first();
        $exercise = Exercise::first();

        $routine = Routine::create([
            'user_id' => $user->id,
            'name' => 'Routine',
            'description' => 'Routine',
            'day' => 'Tuesday'
        ]);

        $exercises_routines = ExerciseRoutine::create([
            'routine_id' => $routine->id,
            'exercise_id' => $exercise->id,
            'description' => 'Description random'
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines->id,
            'repetitions' => 5,
            'duration' => Carbon::createFromTime(0, 0, 50),
            'RIR'=>2,
            'failure' => false,
            'weight' => 22.5
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines->id,
            'repetitions' => 6,
            'duration' => Carbon::createFromTime(0, 0, 50),
            'RIR'=>2,
            'failure' => false,
            'weight' => 20
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines->id,
            'repetitions' => 5,
            'duration' => Carbon::createFromTime(0, 0, 50),
            'RIR'=>0,
            'failure' => true,
            'weight' => 20
        ]);

        $exercises_routines2 = ExerciseRoutine::create([
            'routine_id' => $routine->id,
            'exercise_id' => $exercise->id,
            'description' => 'Description random 2'
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines2->id,
            'repetitions' => 3,
            'duration' => Carbon::createFromTime(0, 0, 50),
            'RIR'=>2,
            'failure' => false,
            'weight' => 22.5
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines2->id,
            'repetitions' => 4,
            'duration' => Carbon::createFromTime(0, 0, 50),
            'RIR'=>2,
            'failure' => false,
            'weight' => 20
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines2->id,
            'repetitions' => 2,
            'duration' => Carbon::createFromTime(0, 0, 50),
            'RIR'=>0,
            'failure' => true,
            'weight' => 20
        ]);


    }
}
