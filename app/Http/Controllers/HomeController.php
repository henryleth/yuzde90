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
        $popularTours = Tour::with(['featuredMedia', 'pricingTiers', 'destinations'])
            ->where('is_published', true)
            ->orderByDesc('rating')
            ->limit(3)
            ->get();

        $popularDestinations = Destination::withCount('tours')
            ->where('is_popular', 1) // Sadece popüler olanları getir (boolean 1)
            ->with(['image']) // Destinasyon görselleri için yeni 'image' ilişkisini yükle
            ->limit(8) // Limiti 8'e çıkaralım ki daha fazla popüler destinasyon görünsün
            ->get();

        return Inertia::render('Home', [
            'seo' => $seoService->generateForPage('home'),
            'tours' => $popularTours->map(function ($tour) {
                Log::info('Home Controller Tour Data', ['id' => $tour->id, 'title' => $tour->title, 'featuredMedia' => $tour->featuredMedia ? ['original_url' => $tour->featuredMedia->original_url, 'thumbnail_url' => $tour->featuredMedia->thumbnail_url] : null]);
                return [
                    'id' => $tour->id,
                    'title' => $tour->title,
                    'slug' => $tour->slug,
                    'summary' => $tour->summary,
                    'image' => $tour->featuredMedia ? [
                        'original_url' => $tour->featuredMedia->original_url,
                        'thumbnail_url' => $tour->featuredMedia->thumbnail_url,
                    ] : null, // featuredMedia objesini doğrudan geçir
                    'rating' => $tour->rating,
                    'reviews_count' => $tour->reviews_count,
                    'price_from' => $tour->pricingTiers->min('price_per_person_1'),
                    'duration_days' => $tour->duration_days,
                    'min_participants' => $tour->min_participants,
                    'max_participants' => $tour->max_participants,
                    'is_featured' => $tour->is_featured, // Eksik olan is_featured alanı eklendi
                    'destinations' => $tour->destinations->map(function ($destination) { // Doğru destinasyon verisi eklendi
                        return [
                            'name' => $destination->name,
                            'slug' => $destination->slug,
                        ];
                    }),
                ];
            }),
            'popularDestinations' => $popularDestinations->map(function ($destination) {
                Log::info('Home Controller Destination Data', ['id' => $destination->id, 'name' => $destination->name, 'image' => $destination->image ? ['original_url' => $destination->image->original_url, 'thumbnail_url' => $destination->image->thumbnail_url] : null]);
                return [
                    'id' => $destination->id,
                    'name' => $destination->name,
                    'slug' => $destination->slug,
                    'description' => $destination->description,
                    'image' => $destination->image ? [
                        'original_url' => $destination->image->original_url,
                        'thumbnail_url' => $destination->image->thumbnail_url,
                    ] : null, // image objesini doğrudan geçir
                    'tours_count' => $destination->tours_count,
                ];
            }),
        ]);
    }
}
