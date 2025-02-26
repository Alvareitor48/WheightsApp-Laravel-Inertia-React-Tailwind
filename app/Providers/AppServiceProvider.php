<?php

namespace App\Providers;

use App\Http\Middleware\AlwaysAcceptJson;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\URL;

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

        $this->app->booted(function () {
            $schedule = app(Schedule::class);

            $schedule->command('routines:delete-old')->daily();
            $schedule->command('exercises-routines:delete-old')->monthlyOn(1);
        });

        if (config('app.env') !== 'local') {
            URL::forceScheme('https');
        }
    }
}