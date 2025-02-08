<?php

namespace Database\Seeders;

use App\Models\ExerciseRoutine;
use App\Models\Serie;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Routine;
use App\Models\RoutineSession;
use App\Models\Exercise;
use App\Models\ExerciseLog;
use Illuminate\Support\Carbon;

class RoutineSessionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $routine = Routine::create([
                'user_id' => $user->id,
                'name' => 'Rutina de prueba',
                'description' => 'Rutina generada automáticamente para pruebas.',
                'day' => 'Monday',
            ]);

            $exercises = Exercise::inRandomOrder()->limit(2)->get();
            $exerciseRoutines = [];

            foreach ($exercises as $exercise) {
                $exerciseRoutine = ExerciseRoutine::create([
                    'routine_id' => $routine->id,
                    'exercise_id' => $exercise->id,
                    'note' => 'Ejercicio de prueba en rutina',
                ]);
                $exerciseRoutines[] = $exerciseRoutine;
            }

            $dates = [
                Carbon::now()->subMonths(11),
                Carbon::now()->subMonths(2),
                Carbon::now()->subWeeks(3),
            ];

            foreach ($dates as $date) {
                $session = RoutineSession::create([
                    'user_id' => $user->id,
                    'routine_id' => $routine->id,
                    'duration' => gmdate('H:i:s', rand(1800, 7200)),
                    'completed_at' => $date,
                ]);

                foreach ($exerciseRoutines as $exerciseRoutine) {
                    $serie = Serie::create([
                        'exercises_routines_id' => $exerciseRoutine->id,
                        'repetitions' => rand(8, 15),
                        'weight' => rand(20, 100),
                        'RIR' => rand(0, 3),
                        'failure' => (bool)rand(0, 1),
                    ]);
                    for ($i = 0; $i < 3; $i++) {
                        ExerciseLog::create([
                            'routine_session_id' => $session->id,
                            'exercise_id' => $exerciseRoutine->exercise_id,
                            'repetitions' => $serie->repetitions,
                            'weight' => $serie->weight,
                            'RIR' => $serie->RIR,
                            'failure' => $serie->failure,
                        ]);
                    }
                }
            }
        }
    }
}