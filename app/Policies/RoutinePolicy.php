<?php

namespace App\Policies;

use App\Models\Routine;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RoutinePolicy
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
    public function view(User $user, Routine $routine): bool
    {
        return $routine->user_id === $user->id || $user->hasRole('admin');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if ($user->hasRole('admin') || $user->hasRole('premium')) {
            return true;
        }
        return $user->routines()->count() < 2;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Routine $routine): bool
    {
        return $routine->user_id === $user->id || $user->hasRole('admin');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Routine $routine): bool
    {
        return $routine->user_id === $user->id || $user->hasRole('admin');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function startRoutine(User $user, Routine $routine): bool
    {
        return $routine->user_id === $user->id || $user->hasRole('admin');
    }

    public function generatePDF(User $user, Routine $routine): bool
    {
        if($user->hasRole('premium')){
            return $routine->user_id === $user->id;
        }
        return $user->hasRole('admin');
    }

    public function addExercise(User $user, Routine $routine): bool
    {
        return $user->hasRole('admin') || $routine->user_id === $user->id;
    }

    public function updateChart(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'premium']);
    }
}
