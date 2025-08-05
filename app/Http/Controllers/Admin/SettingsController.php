<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
class SettingsController extends Controller
{
    public function index()
    {
        // Tüm ayarları veritabanından çek ve anahtar-değer çifti olarak düzenle.
        $settings = Setting::all()->pluck('value', 'key');
        
        // Önbellek ayarını da ekle. Eğer veritabanında yoksa, varsayılan olarak '1' (aktif) kabul et.
        $settings['cache.enabled'] = $settings->get('cache.enabled', '1');

        return Inertia::render('Admin/Settings/Seo', [
            'settings' => $settings
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'settings' => 'required|array'
        ]);

        // Veritabanındaki eski cache durumunu al.
        $oldCacheStatus = Setting::where('key', 'cache.enabled')->value('value');

        foreach ($validatedData['settings'] as $key => $value) {
            // Gelen 'true'/'false' stringlerini veya boolean değerleri '1'/'0' olarak formatla.
            $formattedValue = is_bool($value) ? ($value ? '1' : '0') : $value;

            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $formattedValue]
            );
        }

        // Yeni cache durumunu al.
        $newCacheStatus = $validatedData['settings']['cache.enabled'] ?? $oldCacheStatus;
        // Gelen değeri '1'/'0' formatına çevir.
        $newCacheStatus = is_bool($newCacheStatus) ? ($newCacheStatus ? '1' : '0') : (string) $newCacheStatus;


        // Eğer önbellek durumu değiştirildiyse (açıktan kapalıya veya tersi), tüm SSR önbelleğini temizle.
        // Bu, eski durumdaki sayfaların (örneğin önbellekli veya önbelleksiz) sunulmasını engeller.
        if ($oldCacheStatus !== $newCacheStatus) {
            Cache::flush();
        }

        // SEO ayarları için özel önbelleği temizle.
        Cache::forget('seo_settings');

        return redirect()->back()->with('success', 'Ayarlar başarıyla kaydedildi.');
    }

    /**
     * Tüm uygulama önbelleğini temizler.
     * Bu işlem, SSR sayfaları, veritabanı sorguları ve diğer tüm Laravel
     * önbelleklerini sıfırlar. Yönetim panelinden manuel olarak tetiklenir.
     */
    public function clearCache()
    {
        // Tüm uygulama önbelleğini temizler.
        Cache::flush();

        // Rota ve config önbelleğini de temizlemek için Artisan komutlarını çağırır.
        // Bu komutlar sunucuda 'exec' fonksiyonunun aktif olmasını gerektirir.
        // Eğer sunucu kısıtlamaları varsa, bu satırları yorum satırı yapıp
        // bu komutları manuel olarak çalıştırmanız gerekebilir.
        \Artisan::call('route:clear');
        \Artisan::call('config:clear');
        \Artisan::call('view:clear');

        return redirect()->back()->with('success', 'Tüm uygulama önbelleği başarıyla temizlendi.');
    }

    /**
     * Önbelleğe alınmış SSR sayfalarının listesini döndürür.
     * HandleInertiaRequests middleware'ine göre, önbellek anahtarı 'ssr_page_' ön ekiyle oluşturulur
     * ve varsayılan önbellek sürücüsüne (bu projede 'database') kaydedilir.
     */
    public function listCachedPages(): JsonResponse
    {
        try {
            $prefix = config('cache.prefix');
            $searchKey = $prefix . 'ssr_page_%';

            $ssrItems = DB::table(config('cache.stores.database.table'))
                         ->where('key', 'like', $searchKey)
                         ->get();

            $cachedPages = $ssrItems->map(function ($item) {
                $cacheData = unserialize($item->value);

                // Yeni format ('url' ve 'content' içeren dizi) kontrolü
                if (is_array($cacheData) && isset($cacheData['url']) && isset($cacheData['content'])) {
                    $url = $cacheData['url'];
                    $size = round(strlen($cacheData['content']) / 1024, 2) . ' KB';
                } else {
                    // Eski format (sadece içerik string'i) için geriye dönük uyumluluk
                    $url = 'URL bilgisi yok (eski önbellek)';
                    $size = round(strlen($cacheData) / 1024, 2) . ' KB';
                }

                return [
                    'url' => $url,
                    'modified_at' => date('Y-m-d H:i:s', $item->expiration - 86400), // Yaklaşık oluşturma zamanı
                    'size' => $size,
                ];
            })->sortByDesc('modified_at')->values();

            return response()->json($cachedPages);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Önbellek verileri okunurken bir hata oluştu: ' . $e->getMessage()], 500);
        }
    }
}
