<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');
        return Inertia::render('Admin/Settings/Seo', [
            'settings' => $settings
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'settings' => 'required|array'
        ]);

        foreach ($validatedData['settings'] as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        // Ayarlar güncellendiğinde önbelleği temizle
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
}
