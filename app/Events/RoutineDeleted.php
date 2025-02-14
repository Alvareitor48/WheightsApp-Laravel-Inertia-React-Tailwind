<?php

namespace App\Events;

use App\Models\Routine;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RoutineDeleted
{
    use Dispatchable, SerializesModels;

    public $routine;

    /**
     * Create a new event instance.
     */
    public function __construct(Routine $routine)
    {
        $this->routine = $routine;
    }

}
