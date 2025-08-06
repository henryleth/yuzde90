# Backend API Dokümantasyonu

Bu doküman, projenin Laravel backend yapısını, controller'larını, modellerini ve API yanıt formatlarını detaylandırmaktadır.

### Backend Mimarisi Genel Bakış (PHP ve Laravel)

-   **Controllerlar**: HTTP isteklerini işleyen ve uygun yanıtları döndüren Laravel sınıflarıdır. İş mantığını ve veri akışını yönetirler.
-   **Modeller**: Veritabanı tablolarıyla etkileşim kuran ve iş mantığını içeren Laravel Eloquent ORM sınıflarıdır.
-   **Rotalar**: Uygulama URL'lerini belirli controller aksiyonlarına veya kapatmalara yönlendiren kurallaradır.
-   **Konfigürasyon (`config/`)**: Sezon ve kategori gibi sabit ama özelleştirilebilir veriler bu klasörde tutulur.
-   **Inertia SSR Yönetimi**: `App\Http\Middleware\HandleInertiaRequests.php` içindeki `resolveView` metodu, admin paneli rotaları (`Admin/*` ile başlayan component'ler) için SSR'ı devre dışı bırakır. Bu, admin panelinin her zaman istemci tarafında işlenmesini sağlar.
-   `App\Http\Middleware\HandleInertiaRequests.php` içindeki `share` metodu güncellenerek çeviri verilerinin çift JSON kodlamasını önlemek amacıyla `json_encode` kullanımı kaldırıldı.
-   `App\Http\Middleware\HandleInertiaRequests.php` içindeki `share` metodu, flash mesajların (`success`, `error`, `message`) ve doğrulama hata mesajlarının HTML özel karakterlerini kaçırarak (htmlspecialchars ile) güvenli hale getirilmesi için güncellendi. Bu, frontend tarafında JSON ayrıştırma hatalarını önlemeyi amaçlar.

### Dinamik Rota Yönetimi (Permalink)

Uygulamanın ana modüllerine ait URL yapıları (permalink'ler), `.env` dosyasından yönetilmektedir. Bu, kod değişikliği yapmadan URL'leri esnek bir şekilde değiştirmeyi sağlar.

-   **`config/dynamic_routes.php`**: Bu dosya, `.env` dosyasındaki rota değişkenlerini okur ve eğer tanımlı değillerse varsayılan değerleri atar.
    ```php
    // Örnek yapı
    return [
        'tour_index' => env('ROUTE_TOUR_INDEX', 'tours'),
        'tour_show' => env('ROUTE_TOUR_SHOW', 'tur-detay/{slug}'),
        // ...
    ];
    ```
-   **`routes/web.php`**: Rota tanımlamaları, `config('dynamic_routes.anahtar')` fonksiyonu aracılığıyla bu konfigürasyon dosyasından dinamik olarak okunur.
    ```php
    // Örnek kullanım
    Route::get(config('dynamic_routes.tour_index'), [TourController::class, 'index'])->name('tours.index');
    ```
-   **`.env` Dosyası**: URL yapılarını değiştirmek için bu dosyaya ilgili değişkenlerin eklenmesi yeterlidir. Değişikliklerin aktif olması için `php artisan config:clear` komutu çalıştırılmalıdır.
    ```env
    # Örnek .env değişkenleri
    ROUTE_TOUR_INDEX="seyahatler"
    ROUTE_TOUR_SHOW="seyahat/{slug}"
    ```

### Modeller

-   **`App\Models\Setting.php`**: `key` ve `value` çiftleri olarak genel uygulama ayarlarını tutar.
-   **`App\Models\Tour.php`**: `pricingTiers()` ilişkisi aracılığıyla `TourPricingTier` modeline bağlanır. Sezonlarla doğrudan bir ilişkisi kalmamıştır.
-   **`App\Models\TourPricingTier.php`**: Fiyatlandırma katmanlarını temsil eder. 
    -   `season_id` sütunu kaldırılmıştır.
    -   `category` sütunu `category_name` olarak yeniden adlandırılmıştır.
    -   `season_name` (string) ve `category_name` (string) sütunlarını içerir. Bu veriler `config/tour.php` dosyasından gelir.
    -   `season()` ilişkisi kaldırılmıştır.
-   **`App\Models\Season.php`**: Bu model ve ilişkili veritabanı tablosu (`seasons`) **tamamen kaldırılmıştır**.
-   **`App\Models\Destination.php` (Güncellendi)**:
    -   `summary` (string) ve `description` (text) alanları eklendi. `summary` kısa bir özet, `description` ise HTML içerik barındırır.
    -   `is_popular` (boolean) alanı eklendi. Bu alan, destinasyonun anasayfada gösterilip gösterilmeyeceğini belirler.
    -   `$fillable` dizisine `summary`, `description` ve `is_popular` eklendi.
    -   `$casts` dizisine `is_popular` alanı `