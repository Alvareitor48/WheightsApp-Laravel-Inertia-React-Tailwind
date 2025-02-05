<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class MaxLogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'exercise' => $this->exercise->name,
                'weight' => $this->weight,
                'repetitions' => $this->repetitions,
                'date' => Carbon::parse($this->routine_session->completed_at)->format('d-m-Y'),
        ];
    }
}