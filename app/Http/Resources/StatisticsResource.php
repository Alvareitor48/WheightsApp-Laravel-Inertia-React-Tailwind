<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

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
            'date' => Carbon::parse($this->completed_at)->format('d-m-Y'),
            'Repeticiones Totales' => $this->exerciseLogs->sum('repetitions'),
            'Peso Levantado' => $this->exerciseLogs->sum('weight'),
        ];
    }
}