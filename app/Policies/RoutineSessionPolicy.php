<?php

namespace App\Policies;

use App\Models\RoutineSession;
use App\Models\User;

class RoutineSessionPolicy
{
    /**
     * Create a new policy instance.
     */
    public function view(User $user, RoutineSession $routineSession): bool
    {
        return $routineSession->routine->user_id === $user->id || $user->hasRole('admin');
    }
}
