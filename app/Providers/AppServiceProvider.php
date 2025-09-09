<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router; // Router sınıfını dahil et
use Inertia\Inertia;
use App\Models\Content;

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
        
        // Footer için son blog yazılarını paylaş
        Inertia::share('recentPosts', function () {
            return Content::select(['id', 'title', 'slug', 'published_at', 'image_id'])
                ->with('image:id,disk,file_name,path')
                ->whereNotNull('published_at') // Yayınlanmış içerikleri getir
                ->orderByDesc('published_at')
                ->limit(6)
                ->get()
                ->map(fn ($post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'published_at' => $post->published_at,
                    'image_thumbnail_url' => $post->image->thumbnail_url ?? null,
                ]);
        });
    }
}
