<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BodyHighLightDataResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->first()->exercise->name,
            'muscles' => $this->first()->exercise->muscles->pluck('name')->map(fn($muscle) => self::translateExercisesInvert($muscle))->toArray(),
            'frequency' => count($this->resource),
        ];
    }

    /**
     * Traduce los nombres de los músculos al formato esperado
     */
    private static function translateExercisesInvert($muscle)
    {
        $translations = [
            "Espalda Alta y Trapecio" => "trapezius",
            "Dorsales" => "upper-back",
            "Espalda Baja" => "lower-back",
            "Pecho" => "chest",
            "Bíceps" => "biceps",
            "Tríceps" => "triceps",
            "Antebrazos" => "forearm",
            "Deltoides Posterior" => "back-deltoids",
            "Deltoides Frontal" => "front-deltoids",
            "Abdominales" => "abs",
            "Oblicuos" => "obliques",
            "Aductores" => "adductor",
            "Femoral" => "hamstring",
            "Cuádriceps" => "quadriceps",
            "Abductores" => "abductors",
            "Gemelos" => "calves",
            "Glúteo" => "gluteal",
        ];

        return $translations[$muscle] ?? $muscle;
    }
}