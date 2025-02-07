<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\ExerciseRoutine;
use App\Models\Routine;
use App\Models\Serie;
use App\Models\User;
use App\Models\RoutineSession;
use App\Models\ExerciseLog;
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
            RoleSeeder::class,
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
            'note' => 'Description random',
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines->id,
            'repetitions' => 5,
            'RIR'=>2,
            'failure' => false,
            'weight' => 22.5
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines->id,
            'repetitions' => 6,
            'RIR'=>2,
            'failure' => false,
            'weight' => 20
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines->id,
            'repetitions' => 5,
            'RIR'=>0,
            'failure' => true,
            'weight' => 20
        ]);

        $exercises_routines2 = ExerciseRoutine::create([
            'routine_id' => $routine->id,
            'exercise_id' => $exercise->id,
            'note' => 'Description random 2',
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines2->id,
            'repetitions' => 3,
            'RIR'=>2,
            'failure' => false,
            'weight' => 22.5
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines2->id,
            'repetitions' => 4,
            'RIR'=>2,
            'failure' => false,
            'weight' => 20
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines2->id,
            'repetitions' => 2,
            'RIR'=>0,
            'failure' => true,
            'weight' => 20
        ]);

        $routineSession1 = RoutineSession::create([
            'user_id' => $user->id,
            'routine_id' => $routine->id,
            'duration' => '00:45:00',
            'completed_at' => now(),
        ]);

        foreach ($exercises_routines->series as $serie) {
            ExerciseLog::create([
                'routine_session_id' => $routineSession1->id,
                'exercise_id' => $exercises_routines->exercise_id,
                'repetitions' => $serie->repetitions,
                'RIR' => $serie->RIR,
                'failure' => $serie->failure,
                'weight' => $serie->weight,
            ]);
        }

        foreach ($exercises_routines2->series as $serie) {
            ExerciseLog::create([
                'routine_session_id' => $routineSession1->id,
                'exercise_id' => $exercises_routines2->exercise_id,
                'repetitions' => $serie->repetitions,
                'RIR' => $serie->RIR,
                'failure' => $serie->failure,
                'weight' => $serie->weight,
            ]);
        }

        $routine2 = Routine::create([
            'user_id' => $user->id,
            'name' => 'Routine 2',
            'description' => 'Routine 2',
            'day' => 'Monday'
        ]);

        $exercises_routines3 = ExerciseRoutine::create([
            'routine_id' => $routine2->id,
            'exercise_id' => $exercise->id,
            'note' => 'Description random 3',
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines3->id,
            'repetitions' => 5,
            'RIR'=>2,
            'failure' => false,
            'weight' => 22.5
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines3->id,
            'repetitions' => 6,
            'RIR'=>2,
            'failure' => false,
            'weight' => 20
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines3->id,
            'repetitions' => 5,
            'RIR'=>0,
            'failure' => true,
            'weight' => 20
        ]);

        $exercises_routines4 = ExerciseRoutine::create([
            'routine_id' => $routine2->id,
            'exercise_id' => $exercise->id,
            'note' => 'Description random 4',
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines4->id,
            'repetitions' => 3,
            'RIR'=>2,
            'failure' => false,
            'weight' => 22.5
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines4->id,
            'repetitions' => 4,
            'RIR'=>2,
            'failure' => false,
            'weight' => 20
        ]);

        Serie::create([
            'exercises_routines_id' => $exercises_routines4->id,
            'repetitions' => 2,
            'RIR'=>0,
            'failure' => true,
            'weight' => 20
        ]);

        $routineSession2 = RoutineSession::create([
            'user_id' => $user->id,
            'routine_id' => $routine2->id,
            'duration' => '00:45:00',
            'completed_at' => now(),
        ]);

        foreach ($exercises_routines3->series as $serie) {
            ExerciseLog::create([
                'routine_session_id' => $routineSession2->id,
                'exercise_id' => $exercises_routines3->exercise_id,
                'repetitions' => $serie->repetitions,
                'RIR' => $serie->RIR,
                'failure' => $serie->failure,
                'weight' => $serie->weight,
            ]);
        }

        foreach ($exercises_routines4->series as $serie) {
            ExerciseLog::create([
                'routine_session_id' => $routineSession2->id,
                'exercise_id' => $exercises_routines4->exercise_id,
                'repetitions' => $serie->repetitions,
                'RIR' => $serie->RIR,
                'failure' => $serie->failure,
                'weight' => $serie->weight,
            ]);
        }

    }
}
