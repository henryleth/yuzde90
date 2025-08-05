<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TourController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\Auth\SimpleLoginController;

// Admin Controllers
use App\Http\Controllers\Admin\TourController as AdminTourController;
use App\Http\Controllers\Admin\ContentController as AdminContentController;
use App\Http\Controllers\Admin\ContentCategoryController as AdminContentCategoryController;
use App\Http\Controllers\Admin\DestinationController as AdminDestinationController;
use App\Http\Controllers\Admin\OptionalActivityController as AdminOptionalActivityController;
use App\Http\Controllers\Admin\MediaController as AdminMediaController;
use App\Http\Controllers\Admin\SettingsController as AdminSettingsController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Genel Rotalar
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get(config('dynamic_routes.tour_index', 'tours'), [TourController::class, 'index'])->name('tours.index');
Route::get(config('dynamic_routes.tour_show', 'tur-detay/{slug}'), [TourController::class, 'show'])->name('tour.show');

// İçerik Rotaları
Route::get(config('dynamic_routes.content_index', 'contents'), [ContentController::class, 'index'])->name('contents.index');
Route::get(config('dynamic_routes.content_show', 'contents/{slug}'), [ContentController::class, 'show'])->name('contents.show');

// Statik Sayfa Rotaları
Route::get(config('dynamic_routes.about_us', 'about'), function () {
    return Inertia::render('AboutUs');
})->name('about.us');

Route::get(config('dynamic_routes.contact_us', 'contact'), function () {
    return Inertia::render('ContactUs');
})->name('contact.us');

// Destinasyon Rotaları
Route::get(config('dynamic_routes.destination_index', 'destinations'), [DestinationController::class, 'index'])->name('destinations.index');
Route::get(config('dynamic_routes.destination_show', 'destinations/{slug}'), [DestinationController::class, 'show'])->name('destinations.show');


// Admin Rotaları
Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->name('admin.dashboard');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('tours', AdminTourController::class)->except(['show']);
    Route::resource('contents', AdminContentController::class)->except(['show']);
    Route::resource('content-categories', AdminContentCategoryController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('destinations', AdminDestinationController::class)->except(['show']);
    Route::resource('optional-activities', AdminOptionalActivityController::class)->except(['show']);
    Route::resource('media', AdminMediaController::class)->names('admin.media')->except(['show', 'edit', 'update']);

    // Ayarlar Rotaları
    Route::get('settings/seo', [AdminSettingsController::class, 'index'])->name('settings.seo.index');
    Route::post('settings/seo', [AdminSettingsController::class, 'store'])->name('settings.seo.store');
    Route::post('settings/cache/clear', [AdminSettingsController::class, 'clearCache'])->name('settings.cache.clear');
    Route::get('settings/cache/list', [AdminSettingsController::class, 'listCachedPages'])->name('settings.cache.list');
});
