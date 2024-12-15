<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SerieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'repetitions'=>$this->repetitions,
            'duration'=>$this->duration,
            'RIR'=>$this->RIR,
            'failure'=>$this->failure,
            'weight'=>$this->weight
        ];
    }
}