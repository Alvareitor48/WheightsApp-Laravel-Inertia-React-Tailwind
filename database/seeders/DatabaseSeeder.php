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
            RoleSeeder::class,
            UsersTableSeeder::class,
            ExercisesTableSeeder::class,
            RoutineSessionsSeeder::class,
        ]);
    }
}
