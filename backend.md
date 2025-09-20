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
-   `App\Http\Middleware\HandleInertiaRequests.php` içindeki `share` metodu, giriş yapmış kullanıcının rollerini ve yetkilerini de frontend'e gönderecek şekilde güncellendi. Bu, arayüzde yetki bazlı dinamik gösterim/gizleme işlemleri için kullanılır.

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

-   **`App\Models\User.php` (Güncellendi)**:
    -   Rol ve yetki yönetimi için `Spatie\Permission\Traits\HasRoles` trait'i eklendi.
    -   `$fillable` dizisine opsiyonel `phone` alanı eklendi.
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
-   **`App\Models\Tour.php` (Güncellendi)**:
    -   `$appends` dizisi güncellendi. `duration_days`, `duration_nights`, `min_participants`, `max_participants` gibi veritabanında zaten var olan alanlar, gereksiz yere "accessor" metodlarının tetiklenmesini önlemek için bu diziden kaldırıldı.

### Servisler (`App\Services`)

-   **`App\Services\SeoService.php` (Güncellendi)**:
    -   **`generateForModel($model)`**: Eloquent modelleri (`Tour`, `Destination`, `Content` vb.) için dinamik SEO verileri oluşturan yeni bir metod eklendi. Bu metod, modelin kendi üzerindeki SEO alanlarını (`HasSeo` trait'inden gelen) veya veritabanındaki genel şablonları kullanarak başlık, açıklama ve Open Graph etiketleri üretir. Bu, controller'lardaki SEO mantığını merkezileştirir ve basitleştirir.

### Controller'lar

#### Genel Controller Optimizasyonları

Sitenin genel performansını ve özellikle sunucu yanıt süresini (TTFB) iyileştirmek amacıyla `HomeController`, `TourController`, `DestinationController` ve `ContentController` dosyalarında kapsamlı veritabanı sorgu optimizasyonları yapılmıştır.

-   **Verimli Sütun Seçimi (`select()`):** Tüm sorgular, artık sadece frontend'de ihtiyaç duyulan sütunları seçecek şekilde güncellenmiştir. Bu, veritabanından PHP'ye aktarılan veri miktarını önemli ölçüde azaltır.
-   **N+1 Problemlerinin Çözümü (Eager Loading):** İlişkili veriler (`featuredMedia`, `destinations`, `image` vb.), artık `with()` metodu kullanılarak tek bir sorguda verimli bir şekilde yüklenmektedir. Bu, her bir kayıt için ayrı ayrı sorgu yapılmasını (N+1 problemi) önler.
-   **İlişki Anahtarlarının Seçimi:** `belongsTo` gibi ilişkilerin doğru çalışabilmesi için, `select()` ifadelerine `featured_media_id`, `image_id` gibi yabancı anahtar (foreign key) sütunları dahil edilmiştir.
-   **Gereksiz Kodların Temizlenmesi:** Performansı olumsuz etkileyebilecek `Log` ifadeleri ve gereksiz veri işleme adımları kaldırılmıştır.
-   **Fiyat Hesaplama Mantığı:** Tüm controller'larda turların en düşük fiyatı, tüm fiyat katmanlarındaki 1, 2 ve 3 kişilik fiyatlar arasından en düşüğü seçilerek hesaplanmaktadır. Bu sayede gerçek anlamda "en ucuz fiyat" gösterilir.
-   **Reviews Count Eksikliği Düzeltmesi:** `DestinationController`'da `reviews_count` alanı tur sorgularına eklenerek, destinasyon sayfasında tur kartlarında inceleme sayısının görünmesi sağlandı.

#### Admin Controller'ları (Yeni Eklenenler)

-   **`App\Http\Controllers\Admin\UserController.php`**:
    -   Admin panelindeki kullanıcılar için CRUD (Oluştur, Oku, Güncelle, Sil) işlemlerini yönetir.
    -   Kullanıcıları listeler, yeni kullanıcı oluşturur, mevcut kullanıcıları günceller ve siler.
    -   Kullanıcılara rol atama ve rollerini güncelleme işlemlerini (`syncRoles`) gerçekleştirir.
-   **`App\Http\Controllers\Admin\RoleController.php`**:
    -   Admin panelindeki roller için CRUD işlemlerini yönetir.
    -   Rolleri ve rollere atanmış yetkileri listeler.
    -   Yeni rol oluşturma, mevcut rolleri güncelleme ve silme işlemlerini yapar.
    -   Rollere yetki atama ve güncelleme işlemlerini (`syncPermissions`) gerçekleştirir.
