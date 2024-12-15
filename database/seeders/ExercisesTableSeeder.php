<?php

namespace Database\Seeders;

use App\Models\Exercise;
use Illuminate\Database\Seeder;

class ExercisesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Exercise::create([
            'name'=> 'Bench Press',
            'description'=> 'This is bench press exercise',
            'gif' => 'bench-press',
            'muscle' => 'chest'
        ]);
    }
}
