# Backend API Dokümantasyonu

Bu doküman, projenin Laravel backend yapısını, controller'larını, modellerini ve API yanıt formatlarını detaylandırmaktadır.

### Backend Mimarisi Genel Bakış (PHP ve Laravel)

-   **Controllerlar**: HTTP isteklerini işleyen ve uygun yanıtları döndüren Laravel sınıflarıdır. İş mantığını ve veri akışını yönetirler.
-   **Modeller**: Veritabanı tablolarıyla etkileşim kuran ve iş mantığını içeren Laravel Eloquent ORM sınıflarıdır.
-   **Rotalar**: Uygulama URL'lerini belirli controller aksiyonlarına veya kapatmalara yönlendiren kurallaradır.
-   **Konfigürasyon (`config/`)**: Sezon ve kategori gibi sabit ama özelleştirilebilir veriler bu klasörde tutulur.
-   **Viewler (Inertia.js)**: Laravel ile React frontend arasında köprü görevi gören, sunucu tarafında oluşturulan tek sayfa uygulama (SPA) görünümleridir. Veriyi backend'den frontend'e iletmek için kullanılır.

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
    -   `$casts` dizisine `is_popular` alanı `boolean` olarak eklendi.

### Konfigürasyon Dosyaları

-   **`config/tour.php` (Güncellendi)**: 
    -   Proje genelindeki sabit sezon ve kategori isimlerini merkezi olarak yönetir.
    -   `seasons` dizisi, anahtar-değer yapısına dönüştürüldü. Anahtar sezon adını, değer ise sezonun kapsadığı ayları belirtir. (Örn: `'Düşük Sezon' => 'Kasım - Mart'`).
    -   `categories` dizisi: Fiyatlandırma matrisinde kullanılacak kategori adlarını içerir (örn: 'Category A').
-   **`config/dynamic_routes.php` (YENİ)**: Yukarıda "Dinamik Rota Yönetimi" bölümünde detaylandırılmıştır.

### Kontrolcü Değişiklikleri

-   **`App\Http\Controllers\Admin\TourController.php`**: 
    -   `create()` ve `edit()` metodları: Frontend'e `config('tour.seasons')` verisini gönderirken artık `array_keys()` kullanarak sadece sezon isimlerini (dizi olarak) gönderir. Bu, frontend'deki `forEach` hatasını önler.
    -   `store()` ve `update()` metodları: `pricing_tiers` için validasyon kuralı, `Rule::in(array_keys(config('tour.seasons')))` olarak güncellenmiştir.
-   **`App\Http\Controllers\TourController.php` (Güncellendi)**:
    -   `show()` metodu: Artık Inertia.js üzerinden `TourDetail` bileşenine `seo` verilerini (başlık ve açıklama) sağlamaktadır.
-   **`App\Http\Controllers\Admin\DestinationController.php` (Güncellendi)**:
    -   `store` ve `update` metodlarındaki validasyon kurallarına `is_popular` (boolean) alanı eklendi.
-   **`App\Http\Controllers\HomeController.php` (Güncellendi)**:
    -   `index` metodu, anasayfada gösterilecek destinasyonları çekerken artık `->where('is_popular', 1)` koşulunu kullanarak sadece popüler olarak işaretlenmiş olanları listeler.

(Diğer controller ve model açıklamaları bu refaktörden etkilenmemiştir ve aynı kalmıştır.)

### ContentController'da Yapılan Değişiklikler

- `show` metodunda, `post` verisine `image_original_url` ve `image_thumbnail_url` alanları doğrudan eklendi. Bu, frontend'de `post.image?.original_url` ve `post.image_thumbnail` yerine doğrudan bu alanlara erişimi sağlar.
- Loglama satırına içeriğin ID'si eklenerek, logların daha anlamlı hale getirilmesi sağlandı.

### ContentDetail.jsx'te Yapılan Değişiklikler

- `post.image_thumbnail` yerine `post.image_thumbnail_url` kullanıldı.
- `post.image?.original_url` yerine `post.image_original_url` kullanıldı.
