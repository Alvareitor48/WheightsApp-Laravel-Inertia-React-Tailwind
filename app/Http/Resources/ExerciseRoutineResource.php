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
            'note' => $this->note,
            'exercise' => $this->exercise->toArray($request),
            'series' => $this->series->toArray($request),
        ];
    }
}

