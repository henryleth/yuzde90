# Veritabanı Şeması

Bu belge, uygulamanın veritabanı şemasını açıklamaktadır.

## Tablolar

### users
- `id`: Kullanıcı ID (Primary Key, Auto-increment)
- `name`: Kullanıcının adı ve soyadı
- `email`: Kullanıcının e-posta adresi (Unique)
- `phone`: Kullanıcının telefon numarası (Opsiyonel, Nullable)
- `password`: Kullanıcının şifresi (Hashed)
- `remember_token`: "Beni Hatırla" özelliği için token (Nullable)
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı

### roles
- `id`: Rol ID (Primary Key, Auto-increment)
- `name`: Rolün adı (örn: "Admin", "Satış", Unique)
- `guard_name`: Kullanılan guard'ın adı (Genellikle "web")
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı

### permissions
- `id`: Yetki ID (Primary Key, Auto-increment)
- `name`: Yetkinin adı (örn: "user-management", Unique)
- `guard_name`: Kullanılan guard'ın adı (Genellikle "web")
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı

### model_has_roles (Pivot Tablosu)
- `role_id`: Rol ID (Foreign Key to `roles`)
- `model_type`: İlişkili modelin sınıf adı (örn: `App\Models\User`)
- `model_id`: İlişkili modelin ID'si
- `(role_id, model_type, model_id)`: Primary Key

### model_has_permissions (Pivot Tablosu)
- `permission_id`: Yetki ID (Foreign Key to `permissions`)
- `model_type`: İlişkili modelin sınıf adı (örn: `App\Models\User`)
- `model_id`: İlişkili modelin ID'si
- `(permission_id, model_type, model_id)`: Primary Key

### role_has_permissions (Pivot Tablosu)
- `permission_id`: Yetki ID (Foreign Key to `permissions`)
- `role_id`: Rol ID (Foreign Key to `roles`)
- `(permission_id, role_id)`: Primary Key

### tours
- `id`: Tur ID (Primary Key, Auto-increment)
- `title`: Turun ana başlığı (önceden `name`)
- `slug`: Tur için URL dostu benzersiz adı (Unique)
- `summary`: Turun kısa özeti (Nullable)
- `description`: Turun detaylı açıklaması (HTML editör ile düzenlenecek, Nullable)
- `min_participants`: Minimum katılımcı sayısı (Nullable)
- `max_participants`: Maksimum katılımcı sayısı (Nullable)
- `duration_days`: Turun gün cinsinden süresi
- `duration_nights`: Turun gece cinsinden süresi
- `language`: Turun ana dili (örn: "Türkçe", "English")
- `rating`: Turun ortalama puanı (decimal(3,1), Nullable)
- `reviews_count`: Tur için yapılan değerlendirme sayısı (Default 0)
- `is_published`: Turun yayınlanma durumu (Default false)
- `inclusions_html`: Fiyata dahil olan hizmetlerin HTML içeriği (HTML editör ile düzenlenecek, Nullable)
- `exclusions_html`: Fiyata dahil olmayan hizmetlerin HTML içeriği (HTML editör ile düzenlenecek, Nullable)
- `hotels`: Otel bilgileri (JSON formatında: `{"city": {"category": ["hotel1", "hotel2"]}}`)
- `is_popular`: Turun popülerlik durumu (Default false)
- `meta_title`: Sayfaya özel SEO başlığı (String, Nullable)
- `meta_description`: Sayfaya özel SEO açıklaması (Text, Nullable)
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı

### media
- `id`: Medya ID (Primary Key, Auto-increment)
- `model_type`: İlişkili modelin sınıf adı (örn: `App\\Models\\Tour`)
- `model_id`: İlişkili modelin ID'si
- `uuid`: Medya için evrensel benzersiz tanımlayıcı (Unique, Nullable)
- `collection_name`: Medyanın ait olduğu koleksiyon (örn: `tour_images`, `gallery_images`)
- `name`: Medyanın orijinal adı
- `file_name`: Medya dosyasının sistemdeki adı
- `mime_type`: Medya dosyasının MIME tipi (Nullable)
- `disk`: Dosyanın saklandığı depolama diski (örn: `public`)
- `size`: Dosya boyutu (Nullable)
- `manipulations`: Medya dönüşümleri (thumbnail, watermark vb.) için JSON verisi
- `custom_properties`: Modele özgü veya ilişkiye özel ek meta veriler için JSON verisi (genellikle boş bırakılacak)
- `generated_conversions`: Oluşturulan dönüşümlerle ilgili JSON verisi
- `responsive_images`: Duyarlı görüntü dönüşümleri için JSON verisi
- `order_column`: Medyaların koleksiyon içindeki sıralanması için (Nullable)
- `tags`: Medyanın kendisine ait, değişmeyen etiketleri (JSON dizisi olarak saklanacak: `["doğa", "manzara"]`, Nullable)
- `destination_id`: Medyanın kendisine ait, değişmeyen destinasyonu (Foreign Key to `destinations` table, `onDelete('set null')`, Nullable)
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı

### tour_pricing_tiers
- `id`: Tur Fiyatlandırma Katmanı ID (Primary Key, Auto-increment)
- `tour_id`: Ait olduğu tur ID'si (Foreign Key to `tours`, `onDelete('cascade')`)
- `season_name`: Sezon adı (String, örn: 'Düşük Sezon'). Bu bilgi `config/tour.php` dosyasından gelir.
- `category_name`: Fiyatlandırma kategorisi (String, örn: 'Category A'). Bu bilgi `config/tour.php` dosyasından gelir.
- `price_per_person_1`: 1 kişi için fiyat (Decimal(10,2)).
- `price_per_person_2`: 2 kişi için fiyat (Decimal(10,2), Nullable).
- `price_per_person_3`: 3 kişi için fiyat (Decimal(10,2), Nullable).
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı

### tour_days
- `id`: Tur Günü ID (Primary Key, Auto-increment)
- `tour_id`: Ait olduğu tur ID'si (Foreign Key to `tours`, `onDelete('cascade')`)
- `day_number`: Günün sırası (örn: 1, 2, ...)
- `title`: Günün başlığı (örn: "İstanbul'a Varış ve Şehir Turu")
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı

### day_activities
- `id`: Günlük Aktivite ID (Primary Key, Auto-increment)
- `tour_day_id`: Ait olduğu gün ID'si (Foreign Key to `tour_days`, `onDelete('cascade')`)
- `order`: Aktivitenin gün içindeki görüntülenme sırası
- `description`: Aktivitenin tam açıklaması (HTML editör ile düzenlenecek)
- `is_highlight`: Aktivitenin "Günün Etkinliği" olarak vurgulanıp vurgulanmadığını belirtir (Default false)
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı

### optional_activities
- `id`: Opsiyonel Etkinlik ID (Primary Key, Auto-increment)
- `name`: Opsiyonel etkinliğin adı
- `description`: Etkinliğin açıklaması (HTML editör ile düzenlenecek, Nullable)
- `price`: Etkinliğin fiyatı (decimal(10,2), Nullable)
- `is_published`: Etkinliğin yayınlanma durumu (Default false)
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı 

### tour_optional_activity (Pivot Tablosu)
- `tour_id`: Tur ID (Foreign Key to `tours`)
- `optional_activity_id`: Opsiyonel Etkinlik ID (Foreign Key to `optional_activities`)
- `(tour_id, optional_activity_id)`: Primary Key

### content_categories
- `id`: İçerik Kategori ID (Primary Key, Auto-increment)
- `name`: Kategori adı (Unique)
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı

### destinations
- `id`: Destinasyon ID (Primary Key, Auto-increment)
- `name`: Destinasyon adı (Unique)
- `slug`: Destinasyon için URL dostu benzersiz adı (Unique)
- `summary`: Destinasyonun kısa özeti (String, Nullable)
- `description`: Destinasyonun detaylı açıklaması (HTML editör ile düzenlenecek, Nullable)
- `is_popular`: Destinasyonun popüler olup olmadığını belirtir (Boolean, Default: false)
- `meta_title`: Sayfaya özel SEO başlığı (String, Nullable)
- `meta_description`: Sayfaya özel SEO açıklaması (Text, Nullable)
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı

### contents
- `id`: İçerik ID (Primary Key, Auto-increment)
- `title`: İçeriğin başlığı (Unique)
- `slug`: İçerik için URL dostu benzersiz adı (Unique)
- `meta_title`: Sayfaya özel SEO başlığı (String, Nullable)
- `meta_description`: Sayfaya özel SEO açıklaması (Text, Nullable)
- `summary`: İçeriğin kısa özeti (Nullable)
- `content`: İçeriğin ana metni (HTML editör ile düzenlenecek)
- `published_at`: İçeriğin yayınlanma tarihi (Nullable)
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı

### content_content_category (Pivot Tablosu)
- `content_id`: İçerik ID (Foreign Key to `contents`)
- `content_category_id`: İçerik Kategori ID (Foreign Key to `content_categories`)
- `(content_id, content_category_id)`: Primary Key

### content_destination (Pivot Tablosu)
- `content_id`: İçerik ID (Foreign Key to `contents`, `onDelete('cascade')`)
- `destination_id`: Destinasyon ID (Foreign Key to `destinations`, `onDelete('cascade')`)
- `(content_id, destination_id)`: Primary Key

### tour_destination (Pivot Tablosu)
- `tour_id`: Tur ID (Foreign Key to `tours`, `onDelete('cascade')`)
- `destination_id`: Destinasyon ID (Foreign Key to `destinations`, `onDelete('cascade')`)
- `(tour_id, destination_id)`: Primary Key 

### settings
- `id`: Ayar ID (Primary Key, Auto-increment)
- `key`: Ayarın benzersiz adı (örn: `site_name`, `admin_email`, `seo.defaults.title`, Unique)
- `value`: Ayarın değeri (Text, Nullable)
- `created_at`: Oluşturulma zamanı
- `updated_at`: Güncellenme zamanı

### Seeders
- `SettingSeeder`: Uygulamanın temel admin ve SEO ayarlarını veritabanına ekler.
- `RolesAndPermissionsSeeder`: `Admin` ve `Satış` rollerini, ilgili yetkileri ve varsayılan admin kullanıcısını oluşturur.

### `tours` Tablosu Değişiklikleri

- **`hotels`**: Artık `JSON` formatında (`LONGTEXT` olarak saklanıyor) otel verilerini tutar. Yapı: `şehir > kategori > oteller`.
  Örnek: `{"istanbul":{"Category A":[{"name":"Antusa Palace Hotel"},{"name":"Dersaadet Hotel"}]}}`
- **`title`**: `name` sütunu `title` olarak yeniden adlandırıldı. (String)
- **`price`**: Sütun tamamen kaldırıldı. Tur fiyatlandırması `pricingTiers` (kategori fiyat matrisi) üzerinden türetilir.
- **`featured_media_id`**: Tura ait öne çıkan görselin `media` tablosundaki ID'sini tutar. Boş bırakılabilir (`nullable`). `media` tablosuna yabancı anahtar (`foreignId`) olarak ilişkilidir.
- **`gallery_media_ids`**: Tura ait galeri görsellerinin `media` tablosundaki ID'lerini tutan bir JSON dizisidir. Boş bırakılabilir (`nullable`).

### `media` Tablosu (Özel Medya Sistemi)

Spatie MediaLibrary yerine özel bir medya yönetim sistemi kullanıldığı için `media` tablosunun yapısı değişti. Bu tablo, yüklenen tüm görsellerin meta verilerini tutar.

- **`id`**: (Primary Key) Medya öğesinin benzersiz kimliği.
- **`file_name`**: (String) Görselin SEO dostu ve benzersiz dosya adı (örn: `istanbul-bogaz-turu-galeri-1.webp`). Orijinal dosya adı, etiketler ve destinasyon slug'ı baz alınarak otomatik oluşturulur.
- **`mime_type`**: (String) Dosyanın MIME türü (örn: `image/webp`).
- **`path`**: (String) Dosyanın `storage/app/public/` dizini altındaki tam yolu (örn: `uploads/1/istanbul-bogaz-turu.webp`).
- **`size`**: (unsignedBigInteger) Dosya boyutu (byte).
- **`disk`**: (String) Dosyanın depolandığı disk (varsayılan: `public`).
- **`collection_name`**: (String, `nullable`) Medya öğesinin hangi koleksiyona ait olduğunu belirtir (örn: `featured_image`, `gallery`, `category_image`, `destination_image`). Bu, aynı fiziksel dosyanın farklı bağlamlarda kullanımını kategorize etmeye yardımcı olur.
- **`alt_text`**: (String, `nullable`) Görselin alternatif metni. SEO ve erişilebilirlik için önemlidir.
- **`tags`**: (JSON, `nullable`) Görselle ilişkili etiketler dizisi.
- **`model_type`**: (String, `nullable`) Medyanın ilişkili olduğu modelin sınıf adı (Polimorfik ilişki için kullanılır).
- **`model_id`**: (unsignedBigInteger, `nullable`) Medyanın ilişkili olduğu modelin ID'si (Polimorfik ilişki için kullanılır).
- **`destination_id`**: (Foreign Key, `nullable`) Medyanın ilişkili olduğu `destinations` tablosundaki ID. Destinasyon silindiğinde `null` olur (`onDelete('set null')`).
- **`created_at`, `updated_at`**: (Timestamps)
