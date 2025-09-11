<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache; // Önbellekleme için Cache Facade'ı dahil edildi.
use Inertia\Middleware;

use App\Models\Setting;

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
                'user' => $request->user() ? tap($request->user()->load('roles'), function ($user) {
                    $user->permissions = $user->getAllPermissions()->pluck('name');
                }) : null,
            ],
            'translations' => function () use ($request) {
                if (str_starts_with($request->route()->getName(), 'admin.')) {
                    return null;
                }
                $locale = app()->getLocale();
                return [
                    'site' => trans('site', [], $locale)
                ];
            },
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
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, \Closure $next)
    {
        // Admin paneli rotaları için SSR'ı tamamen devre dışı bırak.
        // Bu, admin panelinde ham JSON çıktısı ve konsol hatalarını önler.
        if ($request->routeIs('admin.*') || $request->is('admin/*')) {
            config(['inertia.ssr.enabled' => false]);
            // Admin için farklı root view kullan
            $this->rootView = 'app-no-ssr';
        }
        
        // Önbellekleme ayarını, performansı artırmak için 1 saatliğine önbelleğe al.
        // Bu, her istekte veritabanına gitmeyi önler.
        $isCacheEnabled = Cache::remember('cache.enabled.status', 3600, function () {
            // Ayarı veritabanından bul, eğer yoksa varsayılan olarak '1' (aktif) kabul et.
            return Setting::where('key', 'cache.enabled')->value('value') ?? '1';
        });

        // Önbellekleme sadece şu koşulların hepsi sağlandığında çalışır:
        // 1. Genel önbellekleme ayarı aktif ('1') olmalı.
        // 2. İstek metodu 'GET' olmalı.
        // 3. İstek 'admin' ile başlayan bir rotaya ait olmamalı.
        // 4. İstek, bir sayfa içi Inertia gezinmesi olmamalı (sadece ilk sayfa yüklemesi).
        if ($isCacheEnabled === '1' && $request->isMethod('get') && !$request->routeIs('admin.*') && !$request->header('X-Inertia')) {
            $cacheKey = 'ssr_page_' . md5($request->fullUrl());

            if (Cache::has($cacheKey)) {
                $cachedData = Cache::get($cacheKey);
                // Geriye dönük uyumluluk için kontrol: Eğer veri bir dizi ve 'content' anahtarı varsa, yeni format.
                // Değilse, eski format (sadece string içerik).
                $content = is_array($cachedData) && isset($cachedData['content']) ? $cachedData['content'] : $cachedData;
                return response($content);
            }

            $response = parent::handle($request, $next);

            if ($response->isSuccessful()) {
                // URL'yi ve içeriği birlikte bir dizi olarak önbelleğe al.
                $cacheValue = [
                    'url' => $request->fullUrl(),
                    'content' => $response->getContent(),
                ];
                Cache::put($cacheKey, $cacheValue, 86400); // 24 saat
            }

            return $response;
        }
        
        // Önbellekleme koşulları sağlanmıyorsa, istek normal şekilde işlenir.
        return parent::handle($request, $next);
    }
}
