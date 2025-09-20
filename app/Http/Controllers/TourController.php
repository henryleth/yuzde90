<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tour;
use App\Models\OptionalActivity;
use App\Models\Destination;
use App\Services\SeoService;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class TourController extends Controller
{
    /**
     * Display a listing of the tours.
     */
    public function index(Request $request, SeoService $seoService)
    {
        $filters = $request->only(['destinations', 'duration_range', 'price_range', 'sort_by']);

        if (isset($filters['destinations']) && is_string($filters['destinations'])) {
            $filters['destinations'] = explode(',', $filters['destinations']);
        }

        if (isset($filters['duration_range']) && is_string($filters['duration_range'])) {
            $filters['duration_range'] = explode(',', $filters['duration_range']);
        }

        if (isset($filters['price_range']) && is_string($filters['price_range'])) {
            $filters['price_range'] = explode(',', $filters['price_range']);
        }

        // Sorgu optimizasyonu: Sadece gerekli alanları seç ve withMin kullan
        $query = Tour::query()
            ->select([
                'id', 'title', 'slug', 'summary', 'min_participants', 'max_participants', 
                'duration_days', 'duration_nights', 'language', 'rating', 'reviews_count', 
                'is_popular', 'created_at', 'featured_media_id'
            ])
            ->with([
                'featuredMedia:id,disk,file_name,path', 
                'destinations:id,slug,name'
            ])
            // ->withMin('pricingTiers', 'price_per_person_1') // Hata nedeniyle geçici olarak kaldırıldı
            ->with('pricingTiers'); // Geçici olarak tüm katmanları yükle

        if (!empty($filters['destinations'])) {
            $query->whereHas('destinations', function ($q) use ($filters) {
                $q->whereIn('slug', $filters['destinations']);
            });
        }

        if (!empty($filters['duration_range'])) {
            $query->where(function ($q) use ($filters) {
                foreach ($filters['duration_range'] as $range) {
                    [$minDays, $maxDays] = explode('-', $range);
                    if ($maxDays === '1000') {
                        $q->orWhere('duration_days', '>=', (int)$minDays);
                    } else {
                        $q->orWhereBetween('duration_days', [(int)$minDays, (int)$maxDays]);
                    }
                }
            });
        }

        // Fiyat aralığı filtresi güncellendi
        if (!empty($filters['price_range'])) {
            $query->whereHas('pricingTiers', function ($q) use ($filters) {
                $q->where(function ($priceQuery) use ($filters) {
                    foreach ($filters['price_range'] as $range) {
                        // '2000+' gibi aralıkları yönetmek için kontrol
                        if (str_contains($range, '+')) {
                            $minPrice = (float)str_replace('+', '', $range);
                            $priceQuery->orWhere('price_per_person_1', '>=', $minPrice);
                        } else {
                            [$minPrice, $maxPrice] = explode('-', $range);
                            $priceQuery->orWhereBetween('price_per_person_1', [(float)$minPrice, (float)$maxPrice]);
                        }
                    }
                });
            });
        }

        switch ($filters['sort_by'] ?? 'recommended') { // Varsayılan sıralama 'recommended' olarak değiştirildi
            case 'oldest': // Kaldırılan seçenek
                // Bu seçenek artık frontend'de sunulmuyor, ancak eski filtreler için bırakıldı (kaldırılabilir)
                $query->orderBy('created_at', 'asc');
                break;
            case 'price_asc':
                $query->orderBy(function ($query) {
                    $query->selectRaw('MIN(price_per_person_1)')
                          ->from('tour_pricing_tiers')
                          ->whereColumn('tour_id', 'tours.id');
                }, 'asc');
                break;
            case 'price_desc':
                $query->orderBy(function ($query) {
                    $query->selectRaw('MIN(price_per_person_1)') // MAX yerine MIN olarak değiştirildi
                          ->from('tour_pricing_tiers')
                          ->whereColumn('tour_id', 'tours.id');
                }, 'desc');
                break;
            case 'recommended': // Yeni önerilen sıralama mantığı
                $query->orderBy('is_popular', 'desc') // Popüler turları önceliklendir
                      ->orderBy('created_at', 'desc'); // Sonra oluşturulma tarihine göre azalan
                break;
            case 'latest': // Kaldırılan seçenek
            default: // Varsayılanı artık önerilen olacak şekilde ayarlıyoruz
                $query->orderBy('created_at', 'desc'); // Varsayılan olarak kalacak, ama artık recommended öncelikli
                break;
        }

        // Arama motoru botları için tüm turları, diğerleri için sayfalamayı getir
        $userAgent = $request->header('User-Agent');
        $isCrawler = Str::contains($userAgent, ['bot', 'crawl', 'slurp', 'spider', 'mediapartners']);

        if ($isCrawler) {
            $tours = $query->get();
        } else {
            $tours = $query->paginate(6)->withQueryString();
        }

        // Sadece gerekli alanları seç
        $allDestinations = Destination::select(['slug', 'name'])->get();

        $transformedTours = $tours->through(function ($tour) {
            return [
                'id' => $tour->id,
                'title' => $tour->title,
                'slug' => $tour->slug,
                'summary' => $tour->summary,
                'min_participants' => $tour->min_participants,
                'max_participants' => $tour->max_participants,
                'duration_days' => $tour->duration_days,
                'duration_nights' => $tour->duration_nights,
                'language' => $tour->language,
                'rating' => (float) $tour->rating,
                'reviews_count' => $tour->reviews_count,
                'image' => $tour->featuredMedia ? [
                    'original_url' => $tour->featuredMedia->original_url,
                    'thumbnail_url' => $tour->featuredMedia->thumbnail_url,
                ] : null,
                'price_from' => $tour->pricingTiers->map(function($tier) {
                    return collect([
                        $tier->price_per_person_1,
                        $tier->price_per_person_2,
                        $tier->price_per_person_3
                    ])->min();
                })->min(),
                'destinations' => $tour->destinations->map(fn($dest) => ['slug' => $dest->slug, 'name' => $dest->name]),
            ];
        });

        if ($request->expectsJson()) {
            return $transformedTours;
        }

        return Inertia::render('Tours', [
            'seo' => $seoService->generateForPage('tours.index'),
            'tours' => $transformedTours,
            'allDestinations' => $allDestinations->map(fn($dest) => ['slug' => $dest->slug, 'name' => $dest->name]),
            'filters' => $filters,
        ]);
    }

    /**
     * Display the specified tour.
     */
    public function show($slug, SeoService $seoService)
    {
        // Sorgu optimizasyonu: Gerekli tüm ilişkileri `with` ile yükle ve sadece gerekli alanları seç.
        $tour = Tour::where('slug', $slug)
            ->with([
                'featuredMedia:id,disk,file_name,path',
                'tourDays:id,tour_id,day_number,title',
                'tourDays.dayActivities:id,tour_day_id,description,is_highlight,order',
                'pricingTiers:tour_id,category_name,price_per_person_1,price_per_person_2,price_per_person_3,season_name',
                'optionalActivities:id,name,description,price,is_published',
                'optionalActivities.image:id,disk,file_name,path',
                'destinations:id,name,slug'
            ])
            ->firstOrFail();

        $tourData = [
            'id' => $tour->id,
            'title' => $tour->title,
            'slug' => $tour->slug,
            'summary' => $tour->summary,
            'description' => $tour->description,
            'min_participants' => $tour->min_participants,
            'max_participants' => $tour->max_participants,
            'duration_days' => $tour->duration_days,
            'duration_nights' => $tour->duration_nights,
            'language' => $tour->language,
            'rating' => $tour->rating,
            'reviews_count' => $tour->reviews_count,
            'is_published' => $tour->is_published,
            'inclusions_html' => $tour->inclusions_html,
            'exclusions_html' => $tour->exclusions_html,
            'image' => $tour->featuredMedia ? [
                'original_url' => $tour->featuredMedia->original_url,
                'thumbnail_url' => $tour->featuredMedia->thumbnail_url,
            ] : null,
            'gallery_images_urls' => $tour->gallery_images_urls,
            'itinerary' => $tour->tourDays->map(function ($day) {
                return [
                    'day_number' => $day->day_number,
                    'title' => $day->title,
                    'activities' => $day->dayActivities->map(function ($activity) {
                        return [
                            'description' => $activity->description,
                            'is_highlight' => $activity->is_highlight,
                            'order' => $activity->order,
                        ];
                    }),
                ];
            }),
            'pricing_tiers' => $tour->pricingTiers->map(function ($tier) {
                return [
                    'category_name' => $tier->category_name,
                    'price_per_person_1' => $tier->price_per_person_1,
                    'price_per_person_2' => $tier->price_per_person_2,
                    'price_per_person_3' => $tier->price_per_person_3,
                    'season_name' => $tier->season_name,
                ];
            }),
            'hotel_options' => $tour->hotels ?? null,
            'optional_activities' => $tour->optionalActivities->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'name' => $activity->name,
                    'description' => $activity->description,
                    'price' => $activity->price,
                    'is_published' => $activity->is_published,
                    'image_url' => $activity->image?->thumbnail_url,
                ];
            }),
            'destinations' => $tour->destinations->map(function ($destination) {
                return [
                    'name' => $destination->name,
                    'slug' => $destination->slug,
                ];
            }),
        ];

        return Inertia::render('TourDetail', [
            'tour' => $tourData,
            'config' => [
                'seasons' => config('tour.seasons'),
                'categories' => config('tour.categories'),
                'recaptchaLevel' => (int)env('RECAPTCHA_LEVEL', 0),
            ],
            'seo' => $seoService->generateForModel($tour),
        ]);
    }
}
