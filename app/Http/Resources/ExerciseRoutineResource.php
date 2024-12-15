<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExerciseRoutineResource extends JsonResource
{
    protected $series;
    protected $exercise;

    public function __construct($resource, $series, $exercise)
    {
        parent::__construct($resource);
        $this->series = $series;
        $this->exercise = $exercise;
    }

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'exercise' => $this->exercise, // Incluye el recurso de ejercicio
            'series' => $this->series,     // Incluye el recurso de series
        ];
    }
}

