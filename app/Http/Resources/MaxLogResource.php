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
    protected $max;
    protected $min;
    public function __construct($max, $min)
    {
        $this->max = $max;
        $this->min = $min;
    }
    public function toArray(Request $request): array
    {
        return [
            'max' => [
                'exercise' => $this->max->exercise->name,
                'weight' => $this->max->weight,
                'repetitions' => $this->max->repetitions,
                'date' => Carbon::parse($this->max->routine_session->completed_at)->format('d-m-Y')
            ],
            'min' => [
                'exercise' => $this->min->exercise->name,
                'weight' => $this->min->weight,
                'repetitions' => $this->min->repetitions,
                'date' => Carbon::parse($this->min->routine_session->completed_at)->format('d-m-Y')
            ]
        ];
    }
}
