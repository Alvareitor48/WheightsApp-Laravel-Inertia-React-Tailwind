<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StatisticsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'date' => $this->completed_at,
            'repetitionsCount' => $this->exerciseLogs->sum('repetitions'),
            'weightCount' => $this->exerciseLogs->sum('weight'),
        ];
    }
}