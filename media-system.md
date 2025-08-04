# Medya Sistemi Dokümantasyonu

Bu doküman, projede kullanılan özel medya yükleme ve yönetim sistemini ayrıntılı olarak açıklamaktadır. Spatie MediaLibrary yerine neden özel bir çözüme geçildiği, sistemin mimarisi, veritabanı entegrasyonu, görsel işleme süreçleri ve frontend entegrasyonu hakkında bilgi vermektedir.

## 1. Genel Bakış

Daha önce kullanılan Spatie MediaLibrary, esneklik ve kontrol kısıtlamaları nedeniyle terk edilmiş ve yerine Laravel'in yerel dosya depolama yetenekleri ve Intervention Image kütüphanesi kullanılarak özel bir medya sistemi geliştirilmiştir. Bu yeni sistem, görsellerin depolanması, işlenmesi ve ilişkili modellerle yönetilmesi üzerinde tam kontrol sağlamaktadır.

## 2. Veritabanı Yapısı

Yeni medya sistemi için temel tablo `media` tablosudur. Bu tablo, görsellerin meta verilerini saklar. İlişkili modeller (`tours`, `destinations`, `contents`, `content_categories`, `optional_activities`) ise görsellere doğrudan ID referansları aracılığıyla bağlanır.

### `media` Tablosu (`database/migrations/2025_07_30_092426_create_new_media_table.php`)

| Sütun Adı      | Tür        | Açıklama                                                                |
| :------------- | :--------- | :---------------------------------------------------------------------- |
| `id`           | `BIGINT`   | Otomatik artan birincil anahtar.                                       |
| `file_name`    | `VARCHAR`  | SEO dostu, benzersiz dosya adı (sluglaştırılmış etiket ve destinasyon ile). |
| `mime_type`    | `VARCHAR`  | Dosyanın MIME türü (örn: `image/webp`).                               |
| `path`         | `VARCHAR`  | Dosyanın depolama diskindeki tam yolu (örn: `uploads/1/gorsel.webp`). |
| `size`         | `BIGINT`   | Dosya boyutu (byte).                                                    |
| `disk`         | `VARCHAR`  | Dosyanın depolandığı disk adı (örn: `public`).                        |
| `tags`         | `JSON`     | Görselle ilişkili etiketler (metin olarak, slug değil).                  |
| `destination_id`| `BIGINT`   | İsteğe bağlı, görselin ilişkili olduğu destinasyonun ID'si (`destinations` tablosuna FK). |
| `created_at`   | `TIMESTAMP`| Oluşturulma zamanı.                                                     |
| `updated_at`   | `TIMESTAMP`| Son güncelleme zamanı.                                                 |

**Not:** `collection_name`, `alt_text`, `model_type`, `model_id` gibi Spatie'ye özgü sütunlar bu tablodan kaldırılmıştır.

### İlişkili Modellerde Medya Alanları

Görsel referansları doğrudan ilgili modelin kendi tablosunda tutulur:

*   **`tours` Tablosu (`database/migrations/2025_07_30_104800_add_media_fields_to_tours_table.php`)**
    *   `featured_media_id`: `BIGINT` (Nullable, `media` tablosuna FK). Turun öne çıkan görselinin ID'si.
    *   `gallery_media_ids`: `JSON` (Nullable). Tur galerisindeki görsellerin ID'lerinin dizisi.
*   **`destinations` Tablosu (`database/migrations/2025_07_30_124354_add_image_id_to_destinations_table.php`)**
    *   `image_id`: `BIGINT` (Nullable, `media` tablosuna FK). Destinasyonun görselinin ID'si.
*   **`contents` Tablosu (`database/migrations/2025_07_30_124412_add_image_id_to_contents_table.php`)**
    *   `image_id`: `BIGINT` (Nullable, `media` tablosuna FK). İçeriğin görselinin ID'si.
*   **`content_categories` Tablosu (`database/migrations/2025_07_30_124426_add_image_id_to_content_categories_table.php`)**
    *   `image_id`: `BIGINT` (Nullable, `media` tablosuna FK). İçerik kategorisinin görselinin ID'si.
*   **`optional_activities` Tablosu (`database/migrations/2025_07_30_124441_add_image_id_to_optional_activities_table.php`)**
    *   `image_id`: `BIGINT` (Nullable, `media` tablosuna FK). Opsiyonel aktivitenin görselinin ID'si.

## 3. Dosya Depolama

Görsel dosyaları, Laravel'in yerel `public` diski kullanılarak depolanır. Depolama yolu aşağıdaki gibidir:

`storage/app/public/uploads/{media_id}/`

Her görsel kendi benzersiz `media_id`'sine sahip bir klasörde saklanır. Thumbnail'ler ise `uploads/{media_id}/thumbnail/` alt klasöründe bulunur.

## 4. Görsel Manipülasyon (`App\Traits\HandlesMediaUploads.php`)

Görsel işleme ve depolama mantığı, yeniden kullanılabilirlik için `App\Traits\HandlesMediaUploads.php` trait'i içinde kapsüllenmiştir. Bu trait, `uploadAndSaveMedia` metodunu sağlar.

### `uploadAndSaveMedia` Metodu

Bu metod, bir görsel dosyasını (URL veya `UploadedFile` olarak) alır ve aşağıdaki işlemleri gerçekleştirir:

1.  **Geçici Dosya Oluşturma:** Yüklenen görselden geçici bir dosya oluşturulur.
2.  **Medya Modeli Oluşturma:** Yeni bir `App\Models\Media` kaydı oluşturulur ve `file_name`, `mime_type`, `path`, `size`, `disk`, `tags` ve `destination_id` gibi meta verilerle doldurulur. `save()` çağrısı yapılarak `media_id` elde edilir.
3.  **SEO Dostu Dosya Adı Oluşturma (`file_name`):**
    *   `tags` ve ilişkili `destination_id` bilgileri kullanılarak benzersiz ve SEO dostu bir slug oluşturulur.
    *   Format: `{tag_slug}_{tag_slug}_{destination_slug}-turu.webp`
    *   Eğer etiket veya destinasyon bilgisi yoksa, orijinal dosya adının slug'ı veya varsayılan olarak `medya` kullanılır.
    *   Dosya adı sonuna `.webp` uzantısı eklenir (her zaman WebP formatında).
    *   Aynı dosya adının çakışmasını önlemek için `-1`, `-2` gibi bir sayaç eklenir.
    *   **Tur Soneki (`-turu`):** `.env` dosyasında `MEDIA_TOUR_SUFFIX` olarak tanımlanan sonek (`config/media.php` tarafından okunur) yalnızca `destination_id` mevcutsa ve bir destinasyon bulunursa dosya adına eklenir.
4.  **Görsel Formatlama ve Boyutlandırma (Intervention Image v3):**
    *   **Orijinal Görsel:** Geçici dosya, `Intervention\Image\Laravel\Facades\Image::read()` ile okunur. `%85` kalitesinde `WebpEncoder` kullanılarak WebP formatına dönüştürülür ve `uploads/{media_id}/` klasörüne kaydedilir.
    *   **Thumbnail Görsel:** Orijinal görsel tekrar okunur. `scaleDown(width: 320)` metodu ile genişliği `320px`'e düşürülürken en boy oranı korunur. Ardından `sharpen(5)` metodu ile keskinleştirme uygulanır. Son olarak `%98` kalitesinde `WebpEncoder` kullanılarak WebP formatına dönüştürülür ve `uploads/{media_id}/thumbnail/` klasörüne kaydedilir.
5.  **Medya Yolu Güncelleme:** Oluşturulan dosya adları ve yolları `Media` modeline kaydedilir.
6.  **Geçici Dosya Silme:** İşlem bittikten sonra geçici dosya silinir.

### `config/media.php`

Bu yeni yapılandırma dosyası, `.env` dosyasındaki `MEDIA_TOUR_SUFFIX` değerini okuyarak özel medya sistemi ayarlarını merkezi olarak yönetir.

```php
<?php

return [
    'tour_suffix' => env('MEDIA_TOUR_SUFFIX', '-turu'),
];
```

## 5. Backend Entegrasyonu (Kontrolcüler)

### `App\Http\Controllers\Admin\MediaController.php`

Bu kontrolcü, frontend'den gelen medya ile ilgili API isteklerini (listeleme ve yükleme) yönetir:

*   **`index()` Metodu:** Tüm medya öğelerini listeler. Medya modelinin `original_url`, `thumbnail_url` accessor'larını ve `tags`, `destination` ilişkilerini içeren formatlanmış JSON yanıtı döndürür.
*   **`store()` Metodu:** Yeni bir görsel yükleme isteğini işler. `file`, `destination_id` ve `tags` verilerini doğrular. `HandlesMediaUploads` trait'indeki `uploadAndSaveMedia` metodunu kullanarak dosyayı yükler ve veritabanına kaydeder.

### Diğer Kontrolcüler

`TourController`, `HomeController`, `DestinationController`, `ContentController`, `ContentCategoryController`, `OptionalActivityController` gibi ilgili kontrolcüler, kendi model verilerini frontend'e gönderirken yeni medya ilişkilerini (örneğin `featuredMedia`, `image`) yükler. Artık Spatie MediaLibrary'ye özgü `->addMedia()` veya `->getFirstMediaUrl()` gibi metodlar kullanılmaz; bunun yerine modellerdeki özel accessor'lar (`featured_image_url`, `image_url`, `gallery_images_urls`, `card_display_image_url`) doğrudan kullanılır.

**Örnek (`Admin\TourController.php`):**

```php
// Tur düzenleme sayfasında öne çıkan medyayı yükleme
$tour->load(['destinations', 'featuredMedia']);

// Tur güncelleme sırasında featured_media_id'yi doğrudan güncelleme
$tour->update([
    // ... diğer alanlar
    'featured_media_id' => $validated['featured_media_id'] ?? null,
]);
```

## 6. Frontend Entegrasyonu (React/Inertia.js)

Medya sistemi frontend'de React ve Inertia.js kullanılarak entegre edilmiştir.

### `resources/js/Components/MediaManagerModal.jsx`

Bu bileşen, WordPress benzeri bir medya kütüphanesi modalı sağlar. Temel işlevleri:

*   **Medya Listeleme:** `/api/admin/media` API'sinden mevcut medya öğelerini çeker ve görüntüler.
*   **Filtreleme:** `destination` ve `tags`'e göre medya öğelerini filtreleme yeteneği sunar.
*   **Yeni Medya Yükleme:** Dosya yükleme formunu ve mantığını içerir. Dosyaları `/api/admin/media` endpoint'ine gönderir.
*   **Medya Seçimi:** Seçilen medya öğelerini (`onMediaSelect` callback'i aracılığıyla) ana bileşene geri gönderir. `isMultiSelect` prop'una göre tekli veya çoklu seçim yapılabilir.
*   **UI/UX:** Shadcn UI bileşenlerini kullanarak modern ve kullanıcı dostu bir arayüz sağlar (Dialog, Tabs, Input, Button, Card vb.).

### `resources/js/Pages/Admin/Tours/Edit.jsx`

Tur düzenleme sayfasında medya yöneticisi entegrasyonu:

*   **State Yönetimi:**
    *   `featured_media_id`: `useForm` state'inde öne çıkan görselin ID'sini tutar.
    *   `featured_media_url`: `useForm` state'inde öne çıkan görselin URL'sini tutar.
    *   `gallery_media_ids`: `useForm` state'inde galeri görsellerinin ID'lerini bir dizi olarak tutar.
    *   `gallery_media_urls`: `useForm` state'inde galeri görsellerinin tam medya objelerini bir dizi olarak tutar.
    *   `selectedFeaturedMedia`: Öne çıkan görsel için yerel React state'i (`useState`).
    *   `selectedGalleryMedia`: Galeri görselleri için yerel React state'i (`useState`).
*   **Veri Başlatma:** `tour.featuredMedia` ve `tour.gallery_images_urls` prop'larından başlangıç değerleri alınır. `optional chaining (?.)` kullanılarak güvenli erişim sağlanır.
*   **`useEffect` Senkronizasyonu:** `tour` prop'u değiştiğinde `selectedFeaturedMedia` ve `selectedGalleryMedia` durumları güncellenir.
*   **Görsel Seçim Fonksiyonları:**
    *   `handleFeaturedMediaSelect`: Medya yöneticisinden seçilen öne çıkan görseli alır ve `selectedFeaturedMedia` ile `useForm` state'ini günceller.
    *   `handleGalleryMediaSelect`: Medya yöneticisinden seçilen galeri görsellerini alır ve `selectedGalleryMedia` ile `useForm` state'ini günceller.
    *   `removeGalleryMedia`: Galeri görselini listeden çıkarır.
*   **UI Entegrasyonu:**
    *   "Genel Bilgiler" ve "Oteller" sekmelerine ek olarak yeni bir "Görseller" sekmesi oluşturulmuştur.
    *   "Öne Çıkan Görsel" ve "Galeri Görselleri" bölümleri bu yeni sekmenin içine taşınmıştır.
    *   `MediaManagerModal` her iki bölüm için de bir düğme aracılığıyla açılır ve ilgili seçimleri yönetir.

### Görsel URL'lerine Erişim (Model Accessor'ları)

Frontend'de görselleri görüntülemek için, Laravel modellerinde tanımlanan accessor'lar (`getFeaturedImageUrlAttribute`, `getThumbnailUrlAttribute`, `getOriginalUrlAttribute` vb.) kullanılır. Bu accessor'lar, `App\Models\Media` modelindeki `path` ve `file_name` bilgilerini kullanarak tam URL'leri dinamik olarak oluşturur.

**Örnek (`App\Models\Media.php`):**

```php
public function getOriginalUrlAttribute(): string
{
    return asset('storage/' . $this->path);
}

public function getThumbnailUrlAttribute(): string
{
    // Thumbnail yolu için 'thumbnail/' alt klasörünü ekler
    $thumbPath = Str::replaceLast($this->file_name, 'thumbnail/' . $this->file_name, $this->path);
    return asset('storage/' . $thumbPath);
}
```

Bu yapı, medya dosyalarının merkezi bir şekilde yönetilmesini, özelleştirilmiş görsel işleme süreçlerinin uygulanmasını ve frontend'de kolay entegrasyonu sağlamaktadır. 

## 7. Depolama Bağlantısı (Symlink)

Laravel'in `public` diskini kullanarak depolanan medya dosyalarının web tarayıcıları tarafından doğrudan erişilebilir olması için `public/storage` dizinine bir sembolik bağlantı oluşturulması gerekmektedir. Bu bağlantı, `storage/app/public` dizinini `public/storage` olarak web kök dizinine bağlar.

Eğer resimler "Forbidden" hatası veriyorsa veya yüklenen resimler görünmüyorsa, bu sembolik bağlantının eksik veya bozuk olma ihtimali yüksektir. Bu durumu düzeltmek için aşağıdaki Artisan komutu kullanılır:

```bash
php artisan storage:link
```

Bu komut, `public` dizini altında `storage` adında bir sembolik bağlantı oluşturur. Eğer daha önce `public/storage` adında bir dizin mevcutsa ve bu bir sembolik bağlantı değilse, komutu çalıştırmadan önce bu dizinin silinmesi gerekebilir.

Bu işlem, uygulamanın yüklediği tüm medya dosyalarının (örneğin `uploads` klasöründeki) web üzerinden erişilebilir olmasını sağlar. 