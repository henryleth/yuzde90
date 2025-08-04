<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/dashboard';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            // Dinamik route yapılandırmasını yükle
            $dynamicRoutes = config('dynamic_routes');

            // Varsayılan API rotaları
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            // Web rotaları
            Route::middleware('web')
                ->group(base_path('routes/web.php'));

            // Tour rotaları
            Route::middleware('web')
                ->prefix($dynamicRoutes['tour_list_prefix'])
                ->group(function () use ($dynamicRoutes) {
                    Route::get('/', [\App\Http\Controllers\TourController::class, 'index'])->name('tours.index');
                    Route::get($dynamicRoutes['tour_detail_pattern'], [\App\Http\Controllers\TourController::class, 'show'])->name('tours.show');
                });

            // Blog rotaları
            Route::middleware('web')
                ->prefix($dynamicRoutes['blog_list_prefix'])
                ->group(function () use ($dynamicRoutes) {
                    Route::get('/', [\App\Http\Controllers\ContentController::class, 'index'])->name('contents.index'); // blog.index yerine contents.index
                    Route::get($dynamicRoutes['content_detail_pattern'], [\App\Http\Controllers\ContentController::class, 'show'])->name('contents.show'); // blog.show yerine contents.show
                });

            // Destination rotaları (yeni eklendi)
            Route::middleware('web')
                ->prefix($dynamicRoutes['destination_list_prefix'])
                ->group(function () use ($dynamicRoutes) {
                    Route::get('/', [\App\Http\Controllers\DestinationController::class, 'index'])->name('destinations.index');
                    Route::get($dynamicRoutes['destination_detail_pattern'], [\App\Http\Controllers\DestinationController::class, 'show'])->name('destinations.show');
                });
        });
    }

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
} 