<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tour;
use App\Models\Destination;
use App\Services\SeoService;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index(SeoService $seoService)
    {
        // Sorgu optimizasyonu: Sadece gerekli alanları seç ve withMin ile N+1 problemini çöz.
        $popularTours = Tour::select([
                'id', 'title', 'slug', 'summary', 'rating', 'reviews_count', 
                'duration_days', 'duration_nights', 'min_participants', 'max_participants', 'is_popular', 'featured_media_id'
            ])
            ->with([
                // Sadece gerekli medya alanlarını seç
                'featuredMedia:id,disk,file_name,path',
                // Sadece gerekli destinasyon alanlarını seç
                'destinations:id,name,slug'
            ])
            // 'pricingTiers' ilişkisinden en düşük 'price_per_person_1' değerini al
            // ->withMin('pricingTiers', 'price_per_person_1') // Hata nedeniyle geçici olarak kaldırıldı
            ->with('pricingTiers') // Geçici olarak tüm katmanları yükle
            ->where('is_published', true)
            ->orderByDesc('rating')
            ->limit(3)
            ->get();

        // Sorgu optimizasyonu: Sadece gerekli alanları seç
        $popularDestinations = Destination::select(['id', 'name', 'slug', 'description', 'summary', 'image_id'])
            ->withCount('tours')
            ->where('is_popular', 1)
            ->with(['image:id,disk,file_name,path']) // Sadece gerekli medya alanlarını seç
            ->limit(8)
            ->get();

        return Inertia::render('Home', [
            'seo' => $seoService->generateForPage('home'),
            'tours' => $popularTours->map(function ($tour) {
                return [
                    'id' => $tour->id,
                    'title' => $tour->title,
                    'slug' => $tour->slug,
                    'summary' => $tour->summary,
                    // Media modelindeki original_url ve thumbnail_url accessors'larını kullan
                    'image' => $tour->featuredMedia ? [
                        'original_url' => $tour->featuredMedia->original_url,
                        'thumbnail_url' => $tour->featuredMedia->thumbnail_url,
                    ] : null,
                    'rating' => $tour->rating,
                    'reviews_count' => $tour->reviews_count,
                    // withMin kaldırıldığı için eski yönteme dönüldü
                    'price_from' => $tour->pricingTiers->min('price_per_person_1'),
                    'duration_days' => $tour->duration_days,
                    'min_participants' => $tour->min_participants,
                    'max_participants' => $tour->max_participants,
                    'is_popular' => $tour->is_popular,
                    'destinations' => $tour->destinations->map(function ($destination) {
                        return [
                            'name' => $destination->name,
                            'slug' => $destination->slug,
                        ];
                    }),
                ];
            }),
            'popularDestinations' => $popularDestinations->map(function ($destination) {
                return [
                    'id' => $destination->id,
                    'name' => $destination->name,
                    'slug' => $destination->slug,
                    'summary' => $destination->summary, // summary alanı eklendi
                    'description' => $destination->description,
                    'image' => $destination->image ? [
                        'original_url' => $destination->image->original_url,
                        'thumbnail_url' => $destination->image->thumbnail_url,
                    ] : null,
                    'tours_count' => $destination->tours_count,
                ];
            }),
        ]);
    }
}
