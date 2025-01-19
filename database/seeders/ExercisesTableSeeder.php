<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\Muscle;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Seeder;

class ExercisesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonDirectory = resource_path('data');
        $jsonFiles = File::files($jsonDirectory);

        foreach ($jsonFiles as $jsonFile) {
            $json = File::get($jsonFile);
            $exercises = json_decode($json, true);

            foreach ($exercises as $exerciseData) {
                $exercise = Exercise::create([
                    'name' => $exerciseData['name'],
                    'description' => $exerciseData['description'],
                    'gif' => $exerciseData['gif'],
                    'equipment' => $exerciseData['equipment'],
                ]);

                foreach ($exerciseData['muscles'] as $muscleName) {
                    $muscle = Muscle::firstOrCreate(['name' => $muscleName]);
                    $exercise->muscles()->attach($muscle);
                }
            }
        }
    }
}