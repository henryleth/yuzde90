<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router; // Router sınıfını dahil et

class AppServiceProvider extends ServiceProvider
{
    /**
     * Tüm uygulama hizmetlerini kaydet.
     */
    public function register(): void
    {
        //
    }

    /**
     * Tüm uygulama hizmetlerini başlat.
     */
    public function boot(Router $router): void // Router bağımlılığını enjekte et
    {
        // is.admin middleware'ini doğrudan alias olarak kaydet
        $router->aliasMiddleware('is.admin', \App\Http\Middleware\IsAdmin::class);
    }
}
