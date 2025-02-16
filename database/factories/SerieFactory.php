<?php

namespace Database\Factories;

use App\Models\ExerciseRoutine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Series>
 */
class SerieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'exercises_routines_id' => ExerciseRoutine::factory(),
            'repetitions' => $this->faker->numberBetween(6, 15),
            'RIR' => $this->faker->optional()->numberBetween(0, 3),
            'failure' => $this->faker->boolean(30),
            'weight' => $this->faker->optional()->randomFloat(2, 5, 100),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
