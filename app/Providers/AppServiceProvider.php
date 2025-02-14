<?php

namespace App\Providers;

use App\Http\Middleware\AlwaysAcceptJson;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleMiddleware;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(Router $router): void
    {
        app('router')->middlewareGroup('api', [
            EnsureFrontendRequestsAreStateful::class, // Middleware de Sanctum
            ThrottleRequests::class . ':api',
        ]);
        $router->middlewareGroup('api', [
            AlwaysAcceptJson::class,
        ]);
        $router->aliasMiddleware('role', RoleMiddleware::class);
        $router->aliasMiddleware('permission', PermissionMiddleware::class);
        Vite::prefetch(concurrency: 3);
        Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::check() ? [
                        'id' => Auth::user()->id,
                        'name' => Auth::user()->name,
                        'email' => Auth::user()->email,
                        'role' => Auth::user()->getRoleNames()->first()
                    ] : null,
                ];
            },
        ]);

        $this->app->booted(function () {
            $schedule = app(Schedule::class);

            $schedule->command('routines:delete-old')->daily();
        });
    }
}