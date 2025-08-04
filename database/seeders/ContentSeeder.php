<?php

namespace Database\Seeders;

use App\Models\Content;
use App\Models\ContentCategory;
use App\Models\Destination;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Traits\HandlesMediaUploads;

class ContentSeeder extends Seeder
{
    use HandlesMediaUploads;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contentsData = [
            [
                'title' => 'İstanbul\'da Keşfedilmeyi Bekleyen Saklı Cennetler',
                'slug' => 'istanbulda-kesfedilmeyi-bekleyen-sakli-cennetler',
                'content' => '<p>İstanbul\'un kalabalığından uzaklaşabileceğiniz huzurlu köşeleri keşfedin. Tarihi sokaklar, gizli bahçeler ve çok daha fazlası...</p>',
                'published_at' => now(),
                'categories' => ['Gezi Rehberleri', 'Tarihi Yerler'],
                'destinations' => ['istanbul'],
                'alt_text' => "İstanbul'da Saklı Cennetler",
                'tags' => ['Şehir', 'Tarih', 'Kültür'], // Orijinal metin olarak etiketler
                'destination_slug_for_media' => 'istanbul',
                'image_url' => 'https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ],
            [
                'title' => 'Kapadokya\'da Balon Turu Rehberi: Bilmeniz Gereken Her Şey',
                'slug' => 'kapadokyada-balon-turu-rehberi',
                'content' => '<p>Kapadokya\'nın eşsiz manzarası üzerinde unutulmaz bir balon turu deneyimi için kapsamlı rehberimiz...</p>',
                'published_at' => now()->subDays(7),
                'categories' => ['Macera ve Doğa', 'Gezi Rehberleri'],
                'destinations' => ['kapadokya'],
                'alt_text' => "Kapadokya Balon Turu",
                'tags' => ['Balon', 'Doğa', 'Macera'], // Orijinal metin olarak etiketler
                'destination_slug_for_media' => 'kapadokya',
                'image_url' => 'https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ],
            [
                'title' => 'Türkiye\'de Mutlaka Ziyaret Edilmesi Gereken Antik Kentler',
                'slug' => 'turkiyede-mutlaka-ziyaret-edilmesi-gereken-antik-kentler',
                'content' => '<p>Efes\'ten Pamukkale\'ye, Türkiye\'nin zengin tarihini barındıran büyüleyici antik kentleri keşfedin.</p>',
                'published_at' => now()->subDays(14),
                'categories' => ['Tarihi Yerler', 'Kültür ve Sanat'],
                'destinations' => ['efes', 'pamukkale'],
                'alt_text' => "Antik Kentler Türkiye",
                'tags' => ['Antik', 'Tarih', 'Kültür'], // Orijinal metin olarak etiketler
                'destination_slug_for_media' => 'efes',
                'image_url' => 'https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ],
            // Yeni blog yazısı 1
            [
                'title' => 'İstanbul\'da Sonbahar Rüzgarları: Yapılacak En İyi Şeyler',
                'slug' => 'istanbulda-sonbahar-ruzgarlari',
                'content' => '<p>İstanbul sonbaharda bambaşka güzeldir. Tarihi dokusu, renklenen ağaçları ve serin havasıyla keşfedilmeyi bekleyen birçok aktivite sunar.</p><p>Boğaz turu yapabilir, Adalar\'da bisiklete binebilir veya tarihi yarımadayı gezebilirsiniz.</p>',
                'published_at' => now()->subDays(2),
                'categories' => ['Gezi Rehberleri', 'Şehir Rehberleri'],
                'destinations' => ['istanbul'],
                'alt_text' => "İstanbul Sonbahar",
                'tags' => ['İstanbul', 'Sonbahar', 'Gezi'],
                'destination_slug_for_media' => 'istanbul',
                'image_url' => 'https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ],
            // Yeni blog yazısı 2
            [
                'title' => 'Türkiye\'nin Gizli Kalmış Plajları: Keşfedilmeyi Bekleyen Koylar',
                'slug' => 'turkiyenin-gizli-plajlari',
                'content' => '<p>Türkiye\'nin gözlerden uzak, bakir kalmış plajlarını keşfetmeye hazır mısınız? Saklı kalmış koylar ve masmavi sular sizi bekliyor.</p><p>Ölüdeniz, Kelebekler Vadisi ve Kaputaş Plajı gibi popüler yerlerin yanı sıra, daha az bilinen cennet köşelerini de bu yazımızda bulabilirsiniz.</p>',
                'published_at' => now()->subDays(5),
                'categories' => ['Gezi Rehberleri', 'Plaj Rehberleri', 'Doğa'],
                'destinations' => ['fethiye', 'antalya', 'muğla'],
                'alt_text' => "Türkiye Gizli Plajlar",
                'tags' => ['Plaj', 'Deniz', 'Doğa', 'Koy'],
                'destination_slug_for_media' => 'fethiye',
                'image_url' => 'https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ],
            // Yeni blog yazısı 3
            [
                'title' => 'Gastronomi Cenneti Gaziantep: Lezzet Durakları Rehberi',
                'slug' => 'gaziantep-lezzet-duraklari',
                'content' => '<p>Türkiye\'nin gastronomi başkenti Gaziantep\'te damak çatlatan lezzetler sizi bekliyor. Baklavadan kebaplara, beyran çorbasından katmere kadar birçok özel tat.</p><p>Zeugma Mozaik Müzesi\'ni ziyaret ettikten sonra, tarihi çarşıları gezerek yöresel ürünler satın alabilirsiniz.</p>',
                'published_at' => now()->subDays(1),
                'categories' => ['Gastronomi', 'Şehir Rehberleri', 'Kültür ve Sanat'],
                'destinations' => ['gaziantep'],
                'alt_text' => "Gaziantep Lezzetleri",
                'tags' => ['Gaziantep', 'Yemek', 'Gastronomi', 'Kültür'],
                'destination_slug_for_media' => 'gaziantep',
                'image_url' => 'https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ],
        ];

        foreach ($contentsData as $contentData) {
            // Summary otomatik olarak content'in ilk paragrafından alınabilir veya boş bırakılabilir.
            $summary = !empty($contentData['summary']) ? $contentData['summary'] : Str::limit(strip_tags($contentData['content']), 200);

            $content = Content::updateOrCreate(
                ['slug' => $contentData['slug']],
                [
                    'title' => $contentData['title'],
                    'summary' => $summary, // summary alanı eklendi
                    'content' => $contentData['content'],
                    'published_at' => $contentData['published_at'],
                ]
            );

            // Her içeriğin kendi image_url'ini kullan
            $imageUrl = $contentData['image_url'] ?? null; 
            
            $destinationIdForMedia = null;
            if (isset($contentData['destination_slug_for_media'])) {
                $destination = Destination::where('slug', $contentData['destination_slug_for_media'])->first();
                if ($destination) {
                    $destinationIdForMedia = $destination->id;
                }
            }

            try {
                $media = $this->uploadAndSaveMedia(
                    $imageUrl,
                    [
                        // 'collection_name' artık yok
                        // 'alt_text' artık yok (dosya adı için kullanılabilecek, ancak db'ye kaydedilmeyecek)
                        // 'model_type' ve 'model_id' artık yok
                        'tags' => $contentData['tags'] ?? null, // Orijinal metin olarak etiketler
                        'destination_id' => $destinationIdForMedia,
                    ]
                );

                if ($media) {
                    // İçerik modelindeki image_id sütununu güncelle
                    $content->image_id = $media->id;
                    $content->save();

                    $this->command->info('İçerik görseli başarıyla eklendi: ' . $contentData['title'] . ' (ID: ' . $media->id . ')');
                } else {
                    $this->command->error('İçerik görseli eklenemedi: ' . $contentData['title'] . '. Detaylar için loglara bakın.');
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('İçerik görseli eklenirken hata oluştu: ' . $e->getMessage(), [
                    'content_title' => $contentData['title'],
                    'image_url' => $imageUrl,
                ]);
                $this->command->error('İçerik görseli eklenirken hata oluştu: ' . $contentData['title'] . ' - ' . $e->getMessage());
            }

            // Kategorileri ilişkilendir
            $categoryIds = [];
            foreach ($contentData['categories'] as $categoryName) {
                $category = ContentCategory::where('name', $categoryName)->first();
                if ($category) {
                    $categoryIds[] = $category->id;
                }
            }
            $content->contentCategories()->syncWithoutDetaching($categoryIds);

            // Destinasyonları ilişkilendir
            $destinationIds = [];
            foreach ($contentData['destinations'] as $destinationSlug) {
                $destination = Destination::where('slug', $destinationSlug)->first();
                if ($destination) {
                    $destinationIds[] = $destination->id;
                }
            }
            $content->destinations()->syncWithoutDetaching($destinationIds);
        }
    }
} 