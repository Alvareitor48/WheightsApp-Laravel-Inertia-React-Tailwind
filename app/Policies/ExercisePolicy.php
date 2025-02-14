<?php

namespace App\Policies;

use App\Models\Exercise;
use App\Models\Routine;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ExercisePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Exercise $exercise): bool
    {
        if($user->hasRole('user')){
            return $exercise->user_id === null;
        }

        if($user->hasRole('premium')){
            return $exercise->user_id === null || $exercise->user_id === $user->id;
        }

        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'premium']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Exercise $exercise): bool
    {
        return $user->hasRole('admin') || $exercise->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Exercise $exercise): bool
    {
        return $user->hasRole('admin') || $exercise->user_id === $user->id;
    }
}
