<?php

namespace Database\Factories;

use App\Models\Exercise;
use App\Models\RoutineSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExerciseLog>
 */
class ExerciseLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'routine_session_id' => RoutineSession::factory(),
            'exercise_id' => Exercise::factory(),
            'repetitions' => $this->faker->numberBetween(6, 15),
            'RIR' => $this->faker->numberBetween(0, 3),
            'failure' => $this->faker->boolean(30),
            'weight' => $this->faker->randomFloat(2, 5, 100),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
