<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Muscle>
 */
class MuscleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement([
                'Espalda Alta y Trapecio',
                'Dorsales',
                'Espalda Baja',
                'Pecho',
                'Bíceps',
                'Tríceps',
                'Antebrazos',
                'Deltoides Posterior',
                'Deltoides Frontal',
                'Abdominales',
                'Oblicuos',
                'Aductores',
                'Femoral',
                'Cuádriceps',
                'Abductores',
                'Gemelos',
                'Glúteo'
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
