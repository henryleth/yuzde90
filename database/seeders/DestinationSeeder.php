<?php

namespace Database\Seeders;

use App\Models\Destination;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Traits\HandlesMediaUploads;
use App\Models\Media;

class DestinationSeeder extends Seeder
{
    use HandlesMediaUploads;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $destinationsData = [
            [
                'name' => 'İstanbul',
                'slug' => 'istanbul',
                'description' => 'Tarihin ve modernliğin buluştuğu şehir',
                'is_popular' => true,
                'image_url' => 'https://images.pexels.com/photos/7529416/pexels-photo-7529416.jpeg',
                'tags' => ['Şehir', 'Tarih', 'İstanbul'], // Orijinal metin olarak etiketler
            ],
            [
                'name' => 'Kapadokya',
                'slug' => 'kapadokya',
                'description' => 'Peri bacaları ve balon turları',
                'is_popular' => true,
                'image_url' => 'https://images.pexels.com/photos/3889704/pexels-photo-3889704.jpeg',
                'tags' => ['Doğa', 'Macera', 'Kapadokya'],
            ],
            [
                'name' => 'Pamukkale',
                'slug' => 'pamukkale',
                'description' => 'Beyaz cennet traververleri',
                'is_popular' => true,
                'image_url' => 'https://images.pexels.com/photos/27829278/pexels-photo-27829278.jpeg',
                'tags' => ['Doğa', 'Termal', 'Pamukkale'],
            ],
            [
                'name' => 'Antalya',
                'slug' => 'antalya',
                'description' => 'Türkiye\'nin incisi',
                'is_popular' => true,
                'image_url' => 'https://images.pexels.com/photos/6342158/pexels-photo-6342158.jpeg',
                'tags' => ['Plaj', 'Tarih', 'Antalya'],
            ],
            [
                'name' => 'Efes',
                'slug' => 'efes',
                'description' => 'Antik çağların izinde',
                'is_popular' => true,
                'image_url' => 'https://images.pexels.com/photos/14474360/pexels-photo-14474360.jpeg',
                'tags' => ['Antik', 'Tarih', 'Efes'],
            ],
            [
                'name' => 'Trabzon',
                'slug' => 'trabzon',
                'description' => 'Karadeniz\'in incisi',
                'is_popular' => true,
                'image_url' => 'https://images.pexels.com/photos/17183114/pexels-photo-17183114.jpeg',
                'tags' => ['Doğa', 'Karadeniz', 'Trabzon'],
            ],
            [
                'name' => 'Ege', 
                'slug' => 'ege', 
                'description' => 'Ege bölgesinin eşsiz güzellikleri', 
                'is_popular' => false, 
                'image_url' => 'https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'tags' => ['Ege', 'Deniz', 'Güneş'],
            ],
            [
                'name' => 'Doğu Anadolu',
                'slug' => 'dogu-anadolu',
                'description' => "Doğu Anadolu'nun tarihi ve doğal zenginlikleri",
                'is_popular' => false,
                'image_url' => 'https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'tags' => ['Dağ', 'Kış', 'Tarih'],
            ],
        ];

        foreach ($destinationsData as $destinationData) {
            $destination = Destination::updateOrCreate(
                ['slug' => $destinationData['slug']],
                [
                    'name' => $destinationData['name'],
                    'description' => $destinationData['description'],
                    'is_popular' => $destinationData['is_popular'],
                ]
            );

            $imageUrl = $destinationData['image_url'];

            try {
                // Sadece görsel yoksa ekle (image_id kontrolü üzerinden)
                if (is_null($destination->image_id)) {
                    $media = $this->uploadAndSaveMedia(
                        $imageUrl,
                        [
                            'tags' => $destinationData['tags'] ?? null, // Orijinal metin olarak etiketler
                            'destination_id' => $destination->id, // Destinasyon slug'ını dosya adında kullanmak için
                        ]
                    );

                    if ($media) {
                        // Destinasyon modelindeki image_id sütununu güncelle
                        $destination->image_id = $media->id;
                        $destination->save();

                        $this->command->info('Destinasyon görseli başarıyla eklendi: ' . $destination->name . ' (ID: ' . $media->id . ')');
                    } else {
                        $this->command->error('Destinasyon görseli eklenemedi: ' . $destination->name . '. Detaylar için loglara bakın.');
                    }
                } else {
                    $this->command->info('Destinasyon görseli zaten mevcut: ' . $destination->name . ' (Mevcut ID: ' . $destination->image_id . ')');
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Destinasyon görseli eklenirken hata oluştu: ' . $e->getMessage(), [
                    'destination_name' => $destination->name,
                    'image_url' => $imageUrl,
                    'trace' => $e->getTraceAsString(),
                ]);
                $this->command->error('Destinasyon görseli eklenirken hata oluştu: ' . $destination->name . ' - ' . $e->getMessage() . ' (Detaylar için loglara bakın)');
            }
        }
    }
}
