<?php

namespace App\Http\Resources;

use App\Models\Serie;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ExerciseLogByExercisesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'date' =>Carbon::parse($this->first()->routine_session->completed_at)->format('d-m-Y'),
            'exercises' => $this->mapExercises($this->resource),
        ];
    }

    private function mapExercises($exercises)
    {
            return $exercises->groupBy('exercise.name')->map(function ($exerciseLogs, $exerciseName) {
            return [
                'exercise' => $exerciseName,
                'series' => ExerciseLogResource::collection($exerciseLogs)->toArray(request()),
            ];
        })->values();
    }
}