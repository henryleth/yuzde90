<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Destination;
use App\Models\Media;
use App\Services\SeoService;
use Illuminate\Support\Facades\Log;

class DestinationController extends Controller
{
    /**
     * Display a listing of the destinations.
     */
    public function index(SeoService $seoService)
    {
        $destinations = Destination::with(['image', 'tours.pricingTiers'])->get();

        return Inertia::render('Destinations', [
            'seo' => $seoService->generateForPage('destinations.index'),
            'destinations' => $destinations->map(fn($destination) => [
                'id' => $destination->id,
                'name' => $destination->name,
                'slug' => $destination->slug,
                'summary' => $destination->summary,
                'description' => $destination->description,
                'image' => $destination->image ? [
                    'original_url' => $destination->image->original_url,
                    'thumbnail_url' => $destination->image->thumbnail_url,
                ] : null, // image objesini doğrudan geçir
                'tours_count' => $destination->tours_count,
                'lowest_tour_price' => $destination->tours->isNotEmpty() // Eğer destinasyona bağlı tur varsa
                    ? $destination->tours->flatMap(fn($tour) => $tour->pricingTiers->pluck('price_per_person_1'))
                                       ->filter(fn($price) => is_numeric($price) && $price > 0)
                                       ->min() // Tüm turların 1 kişilik en düşük fiyatını bul
                    : null,
            ]),
        ]);
    }

    /**
     * Display the specified destination.
     */
    public function show($slug)
    {
        $destination = Destination::where('slug', $slug)->firstOrFail();

        // İlişkileri eager load et: image, tours.featuredMedia, contents.image, contentCategories, destinations
        $destination->load(['image', 'tours.featuredMedia', 'contents.image', 'contents.contentCategories', 'contents.destinations', 'tours.pricingTiers']); // tours.pricingTiers eklendi

        // Destinasyona özel galeri görsellerini çek
        $galleryImages = Media::where('destination_id', $destination->id)->get()->map(fn($media) => [
            'id' => $media->id,
            'file_name' => $media->file_name,
            'original_url' => $media->original_url,
            'thumbnail_url' => $media->thumbnail_url,
        ]);

        $destinationData = [
            'id' => $destination->id,
            'name' => $destination->name,
            'slug' => $destination->slug,
            'summary' => $destination->summary,
            'description' => $destination->description,
            'image' => $destination->image ? [
                'original_url' => $destination->image->original_url,
                'thumbnail_url' => $destination->image->thumbnail_url,
            ] : null, // image objesini doğrudan geçir
            'tours' => $destination->tours->map(function ($tour) {
                Log::info('Destination Detail Tour Data', ['id' => $tour->id, 'title' => $tour->title, 'featuredMedia' => $tour->featuredMedia ? ['original_url' => $tour->featuredMedia->original_url, 'thumbnail_url' => $tour->featuredMedia->thumbnail_url] : null, 'price_from' => $tour->pricingTiers->min('price_per_person_1'), 'min_participants' => $tour->min_participants, 'max_participants' => $tour->max_participants, 'rating' => $tour->rating]); // Ek loglama eklendi
                return [
                    'id' => $tour->id,
                    'title' => $tour->title,
                    'slug' => $tour->slug,
                    'summary' => $tour->summary,
                    'image' => $tour->featuredMedia ? [
                        'original_url' => $tour->featuredMedia->original_url,
                        'thumbnail_url' => $tour->featuredMedia->thumbnail_url,
                    ] : null, // featuredMedia objesini doğrudan geçir
                    'min_participants' => $tour->min_participants,
                    'max_participants' => $tour->max_participants,
                    'duration_days' => $tour->duration_days,
                    'rating' => (float) $tour->rating,
                    'price_from' => $tour->pricingTiers->min('price_per_person_1'),
                ];
            }),

            'contents' => $destination->contents->map(function ($content) {
                Log::info('Destination Detail Content Data', ['id' => $content->id, 'title' => $content->title, 'image' => $content->image ? ['original_url' => $content->image->original_url, 'thumbnail_url' => $content->image->thumbnail_url] : null]);
                return [
                    'id' => $content->id,
                    'title' => $content->title,
                    'slug' => $content->slug,
                    'summary' => $content->summary, // summary eklendi
                    'image' => $content->image ? [
                        'original_url' => $content->image->original_url,
                        'thumbnail_url' => $content->image->thumbnail_url,
                    ] : null, // image objesini doğrudan geçir
                    'content_categories' => $content->contentCategories->map(fn($cat) => ['id' => $cat->id, 'name' => $cat->name]), // Kategoriler eklendi
                    'destinations' => $content->destinations->map(fn($dest) => ['id' => $dest->id, 'name' => $dest->name]), // Destinasyonlar eklendi
                ];
            }),
            'gallery_images' => $galleryImages, // Galeri görselleri eklendi
        ];

        Log::info('Destination Tours Data (Final)', ['tours' => $destinationData['tours']]);
        Log::info('Destination Contents Data (Final)', ['contents' => $destinationData['contents']]);
        Log::info('Destination Gallery Data (Final)', ['gallery_images' => $destinationData['gallery_images']]);

        return Inertia::render('DestinationDetail', [
            'destination' => $destinationData,
            'seo' => [
                'title' => $destination->seo_title,
                'description' => $destination->seo_description,
                'og_title' => $destination->og_title,
                'og_description' => $destination->og_description,
                'og_image' => $destination->og_image,
                'og_url' => $destination->og_url,
            ],
        ]);
    }

    public function apiIndex()
    {
        $destinations = Destination::select('id', 'name', 'slug')->get();

        return response()->json($destinations);
    }
}
