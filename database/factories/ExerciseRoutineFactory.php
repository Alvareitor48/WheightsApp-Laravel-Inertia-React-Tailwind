<?php

namespace Database\Factories;

use App\Models\Exercise;
use App\Models\Routine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExerciseRoutine>
 */
class ExerciseRoutineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'exercise_id' => Exercise::factory(),
            'routine_id' => Routine::factory(),
            'note' => $this->faker->optional()->sentence(5),
            'rest_time' => $this->faker->optional()->time(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
