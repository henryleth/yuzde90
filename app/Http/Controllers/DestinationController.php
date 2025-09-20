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
        $destinations = Destination::select(['id', 'name', 'slug', 'summary', 'description', 'image_id'])
            ->withCount('tours')
            ->with(['image:id,disk,file_name,path'])
            ->get();

        // Not: En düşük fiyatı getirme mantığı, N+1 problemine yol açtığı için
        // ve karmaşık olduğu için geçici olarak kaldırıldı.
        // Bu, daha sonra daha verimli bir alt sorgu ile eklenebilir.
        // Şimdilik, sayfanın çalışmasını sağlamak önceliklidir.

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
                ] : null,
                'tours_count' => $destination->tours_count,
                'lowest_tour_price' => null, // Geçici olarak null ayarlandı
            ]),
        ]);
    }

    /**
     * Display the specified destination.
     */
    public function show($slug, SeoService $seoService)
    {
        $destination = Destination::where('slug', $slug)
            ->with([
                'image:id,disk,file_name,path', // model_id ve model_type kaldırıldı, path eklendi
                // galleryImages accessor'ı kullanılacağı için with'den kaldırıldı
                'tours' => function ($query) {
                    $query->select(['tours.id', 'title', 'slug', 'summary', 'min_participants', 'max_participants', 'duration_days', 'duration_nights', 'rating', 'reviews_count', 'featured_media_id'])
                          ->with(['pricingTiers', 'featuredMedia:id,disk,file_name,path']); // pricingTiers eklendi, en düşük fiyatı bulmak için
                },
                'contents' => function ($query) {
                    $query->select(['contents.id', 'title', 'slug', 'summary', 'published_at', 'image_id'])
                          ->with(['image:id,disk,file_name,path', 'contentCategories:id,name']); // model_id ve model_type kaldırıldı, path eklendi
                }
            ])
            ->firstOrFail();

        $destinationData = [
            'id' => $destination->id,
            'name' => $destination->name,
            'slug' => $destination->slug,
            'summary' => $destination->summary,
            'description' => $destination->description,
            'image' => $destination->image ? [
                'original_url' => $destination->image->original_url,
                'thumbnail_url' => $destination->image->thumbnail_url,
            ] : null,
            'tours' => $destination->tours->map(function ($tour) {
                return [
                    'id' => $tour->id,
                    'title' => $tour->title,
                    'slug' => $tour->slug,
                    'summary' => $tour->summary,
                    'image' => $tour->featuredMedia ? [
                        'original_url' => $tour->featuredMedia->original_url,
                        'thumbnail_url' => $tour->featuredMedia->thumbnail_url,
                    ] : null,
                    'min_participants' => $tour->min_participants,
                    'max_participants' => $tour->max_participants,
                    'duration_days' => $tour->duration_days,
                    'rating' => (float) $tour->rating,
                    'reviews_count' => $tour->reviews_count,
                    'price_from' => $tour->pricingTiers->map(function($tier) {
                        return collect([
                            $tier->price_per_person_1,
                            $tier->price_per_person_2,
                            $tier->price_per_person_3
                        ])->min();
                    })->min(),
                ];
            }),
            'contents' => $destination->contents->map(function ($content) {
                return [
                    'id' => $content->id,
                    'title' => $content->title,
                    'slug' => $content->slug,
                    'summary' => $content->summary,
                    'published_at' => $content->published_at,
                    'image' => $content->image ? [
                        'original_url' => $content->image->original_url,
                        'thumbnail_url' => $content->image->thumbnail_url,
                    ] : null,
                    'content_categories' => $content->contentCategories->map(fn($cat) => ['id' => $cat->id, 'name' => $cat->name]),
                ];
            }),
            'gallery_images' => $destination->galleryImages->map(fn($media) => [
                'id' => $media->id,
                'file_name' => $media->file_name,
                'original_url' => $media->original_url,
                'thumbnail_url' => $media->thumbnail_url,
            ]),
        ];

        return Inertia::render('DestinationDetail', [
            'destination' => $destinationData,
            'seo' => $seoService->generateForModel($destination),
        ]);
    }

    public function apiIndex()
    {
        $destinations = Destination::select('id', 'name', 'slug')->get();

        return response()->json($destinations);
    }
}
