<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\MediaController; // MediaController'ı import et
use App\Http\Controllers\DestinationController; // DestinationController'ı import et
use App\Http\Controllers\BookingController; // BookingController'ı import et

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

// Medya API rotaları
Route::prefix('admin')->group(function () { // auth:sanctum middleware kaldırıldı
    Route::get('media', [MediaController::class, 'index']);
    Route::post('media', [MediaController::class, 'store']);
    Route::delete('media/{id}', [MediaController::class, 'destroy']); // Medya silme rotası eklendi
});

// Destinasyonlar için API rotası (Admin paneli için gerekli olmayabilir ama genel kullanım için)
Route::get('destinations', [DestinationController::class, 'apiIndex']);

// Rezervasyon talebi API rotası (web.php'ye taşındı)

// Test rotası - Laravel'in api.php dosyasını yükleyip yüklemediğini kontrol etmek için
// Route::get('test-api-route', function () {
//     return response()->json(['message' => 'API test route works!']);
// }); 