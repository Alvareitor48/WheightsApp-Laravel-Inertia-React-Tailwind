<?php

namespace App\Providers;

use App\Models\Exercise;
use App\Models\Routine;
use App\Models\RoutineSession;
use App\Policies\ExercisePolicy;
use App\Policies\RoutinePolicy;
use App\Policies\RoutineSessionPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Exercise::class => ExercisePolicy::class,
        Routine::class => RoutinePolicy::class,
        RoutineSession::class => RoutineSessionPolicy::class,
    ];

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        foreach ($this->policies as $model => $policy) {
            Gate::policy($model, $policy);
        }
    }
}
