<?php

namespace Database\Seeders;

use App\Models\ContentCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Traits\HandlesMediaUploads;

class ContentCategorySeeder extends Seeder
{
    use HandlesMediaUploads;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Gezi Rehberleri',
            'Kültür ve Sanat',
            'Macera ve Doğa',
            'Gastronomi',
            'Tarihi Yerler',
        ];

        foreach ($categories as $categoryName) {
            $slug = Str::slug($categoryName);
            $category = ContentCategory::updateOrCreate(
                ['name' => $categoryName],
                ['slug' => $slug]
            );
            
            $imageUrl = 'https://images.pexels.com/photos/1018698/pexels-photo-1018698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
            try {
                $media = $this->uploadAndSaveMedia(
                    $imageUrl,
                    [
                        // 'collection_name' artık yok
                        // 'alt_text' artık yok
                        'tags' => ['Kategori', $categoryName], // Orijinal metin olarak etiketler
                        // 'model_type' ve 'model_id' artık yok
                    ]
                );

                if ($media) {
                    // Kategori modelindeki image_id sütununu güncelle
                    $category->image_id = $media->id;
                    $category->save();

                    $this->command->info('Kategori görseli başarıyla eklendi: ' . $category->name . ' (ID: ' . $media->id . ')');
                } else {
                    $this->command->error('Kategori görseli eklenemedi: ' . $category->name . '. Detaylar için loglara bakın.');
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Kategori görseli eklenirken hata oluştu: ' . $e->getMessage(), [
                    'category_name' => $category->name,
                    'image_url' => $imageUrl,
                ]);
                $this->command->error('Kategori görseli eklenirken hata oluştu: ' . $category->name . ' - ' . $e->getMessage());
            }
        }
    }
} 