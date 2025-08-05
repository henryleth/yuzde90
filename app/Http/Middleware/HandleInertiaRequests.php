<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache; // Önbellekleme için Cache Facade'ı dahil edildi.
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [ // Flash mesajları eklendi
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'message' => fn () => $request->session()->get('message'), // Genel mesajlar için
            ],
            'errors' => fn () => $request->session()->get('errors')
                ? $request->session()->get('errors')->getBag('default')->getMessages()
                : (object) [],
            'routes' => config('dynamic_routes'), // Dinamik rotaları frontend'e aktar
            'canonical' => fn () => $request->url(),
        ];
    }

    /**
     * Gelen Inertia isteğini ele alır ve misafir kullanıcılar için SSR çıktısını önbelleğe alır.
     * Bu metod, bir sayfanın sunucu taraflı oluşturulmuş (SSR) HTML çıktısını önbelleğe alarak
     * sonraki isteklerde daha hızlı yanıt verilmesini sağlar.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, \Closure $next)
    {
        // Önbellekleme sadece şu koşullarda çalışır:
        // 1. İstek metodu 'GET' olmalı.
        // 2. İstek 'admin' ile başlayan bir rotaya ait olmamalı.
        // 3. İstek, bir sayfa içi Inertia gezinmesi olmamalı (sadece ilk sayfa yüklemesi).
        if ($request->isMethod('get') && !$request->routeIs('admin.*') && !$request->header('X-Inertia')) {
            $cacheKey = 'ssr_page_' . md5($request->fullUrl());

            // Eğer sayfa önbellekte varsa, direkt olarak önbellekteki HTML'i döndür.
            if (Cache::has($cacheKey)) {
                return response(Cache::get($cacheKey));
            }

            // Sayfa önbellekte yoksa, normal vòngüyü çalıştırarak yanıtı oluştur.
            $response = parent::handle($request, $next);

            // Yanıt başarılı ise (örneğin bir yönlendirme değilse) içeriğini önbelleğe al.
            if ($response->isSuccessful()) {
                // Sadece yanıtın içeriği olan HTML metnini önbelleğe alıyoruz, tüm nesneyi değil.
                // Bu, "Serialization of 'Closure' is not allowed" hatasını çözer.
                Cache::put($cacheKey, $response->getContent(), 86400); // 24 saat
            }

            // Oluşturulan orijinal yanıtı döndür.
            return $response;
        }
        
        // Önbellekleme koşulları sağlanmıyorsa, istek normal şekilde işlenir.
        return parent::handle($request, $next);
    }
}
