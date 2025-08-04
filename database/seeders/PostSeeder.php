<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\Destination;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = BlogCategory::all();
        $destinations = Destination::all();

        $postsData = [
            [
                'title' => "İstanbul'un Gizli Kalmış Köşeleri",
                'content' => "İstanbul'un kalabalığından uzakta, huzurlu sokakları ve tarihi yapılarıyla keşfedilmeyi bekleyen yerler. Bu yazıda, şehrin az bilinen güzelliklerini ve sakin köşelerini derinlemesine keşfedeceğiz. Tarihi yarımadanın daracık sokaklarından, Boğaz'ın serin sularına uzanan, her biri kendi hikayesini fısıldayan mekanlar...",
                'image' => "https://images.pexels.com/photos/1797241/pexels-photo-1797241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'published_at' => Carbon::now()->subDays(15),
                'categories' => ['Gezi Rehberi', 'Kültür'],
                'destinations' => ['İstanbul'],
            ],
            [
                'title' => "Kapadokya'da Balon Turu Deneyimi",
                'content' => "Kapadokya'nın eşsiz manzarasını balonla gökyüzünden izlemenin büyülü anları. Her yıl binlerce ziyaretçiyi kendine hayran bırakan bu eşsiz deneyim, güneşin doğuşuyla birlikte peri bacalarının üzerinde süzülmenin tadını çıkarmanızı sağlar. Bu yazıda, balon turu öncesi, sırası ve sonrası tüm detayları bulabilirsiniz.",
                'image' => "https://images.pexels.com/photos/16120895/pexels-photo-16120895/free-photo-of-cappadocia-turkey.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'published_at' => Carbon::now()->subDays(10),
                'categories' => ['Deneyim'],
                'destinations' => ['Kapadokya'],
            ],
            [
                'title' => "Ege'nin Sakin Kasabaları ve Lezzetleri",
                'content' => "Ege kıyılarının huzurlu atmosferi, şirin kasabaları ve lezzetli yemekleri. Bu bölge, zeytinyağlıları, taptaze deniz ürünleri ve misafirperver insanlarıyla tam bir kaçış noktası. Alaçatı'dan Cunda'ya, Şirince'den Foça'ya kadar Ege'nin en güzel köşelerini keşfedin.",
                'image' => "https://images.pexels.com/photos/3282255/pexels-photo-3282255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'published_at' => Carbon::now()->subDays(5),
                'categories' => ['Gezi Rehberi', 'Gastronomi'],
                'destinations' => ['Ege'],
            ],
            [
                'title' => "Doğu Ekspresi ile Kış Masalı",
                'content' => "Doğu Ekspresi'nin karlı manzaraları eşliğinde unutulmaz bir yolculuk. Türkiye'nin en popüler tren rotalarından biri olan Doğu Ekspresi, Kars'a uzanan masalsı bir serüven sunar. Kar kaplı köyler, donmuş göller ve eşsiz doğa manzaraları ile kış aylarında bambaşka bir deneyim.",
                'image' => "https://images.pexels.com/photos/20436853/pexels-photo-20436853/free-photo-of-bosphorus-bridge-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'published_at' => Carbon::now()->subDays(2),
                'categories' => ['Deneyim'],
                'destinations' => ['Doğu Anadolu'],
            ],
            [
                'title' => "Mardin'in Taş Konakları ve Tarihi Dokusu",
                'content' => "Güneydoğu Anadolu'nun incisi Mardin, taş işçiliğinin eşsiz örneklerini sergileyen konakları, dar sokakları ve binlerce yıllık tarihiyle ziyaretçilerini büyülüyor. Farklı medeniyetlere ev sahipliği yapmış bu şehirde, her köşe başında bir tarih ve kültürle karşılaşırsınız. Kiliseler, camiler, medreseler ve Süryani manastırları bir arada huzur içinde varlığını sürdürüyor.",
                'image' => "https://images.pexels.com/photos/6158781/pexels-photo-6158781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'published_at' => Carbon::now()->subDays(1),
                'categories' => ['Kültür'],
                'destinations' => ['Doğu Anadolu'],
            ],
        ];

        foreach ($postsData as $postData) {
            $post = Post::firstOrCreate(
                ['slug' => Str::slug($postData['title'])], // Benzersiz slug ile kontrol et
                [
                    'title' => $postData['title'],
                    'content' => $postData['content'],
                    'image' => $postData['image'] ?? null,
                    'published_at' => $postData['published_at'],
                ]
            );

            // Kategori ilişkilerini ekle
            if (isset($postData['categories'])) {
                $categoryIds = [];
                foreach ($postData['categories'] as $categoryName) {
                    $category = $categories->where('name', $categoryName)->first();
                    if ($category) {
                        $categoryIds[] = $category->id;
                    }
                }
                $post->blogCategories()->syncWithoutDetaching($categoryIds);
            }

            // Destinasyon ilişkilerini ekle
            if (isset($postData['destinations'])) {
                $destinationIds = [];
                foreach ($postData['destinations'] as $destinationName) {
                    $destination = $destinations->where('name', $destinationName)->first();
                    if ($destination) {
                        $destinationIds[] = $destination->id;
                    }
                }
                $post->destinations()->syncWithoutDetaching($destinationIds);
            }
        }
    }
}
