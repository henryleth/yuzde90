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
}
