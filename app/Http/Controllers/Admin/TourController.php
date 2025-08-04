<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Destination;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Media;
use App\Models\TourDay;
use App\Models\DayActivity;
use App\Models\TourPricingTier;
use App\Models\OptionalActivity;

class TourController extends Controller
{
    /**
     * Admin paneli için turları listeleme.
     */
    public function index()
    {
        $tours = Tour::with(['featuredMedia'])->paginate(10);
        return Inertia::render('Admin/Tours/Index', [
            'tours' => $tours->through(function ($tour) {
                return [
                    'id' => $tour->id,
                    'title' => $tour->title,
                    'slug' => $tour->slug,
                    'is_published' => $tour->is_published,
                    'image' => $tour->featuredMedia ? [
                        'id' => $tour->featuredMedia->id,
                        'file_name' => $tour->featuredMedia->file_name,
                        'original_url' => $tour->featuredMedia->original_url,
                        'thumbnail_url' => $tour->featuredMedia->thumbnail_url,
                    ] : null,
                ];
            }),
        ]);
    }

    /**
     * Yeni tur oluşturma formunu gösterme.
     */
    public function create()
    {
        return Inertia::render('Admin/Tours/Create', [
            'tour' => null,
            'destinations' => Destination::all(),
            'optionalActivities' => OptionalActivity::all(),
            'media_files' => Media::all()->map(fn($media) => [
                'id' => $media->id,
                'file_name' => $media->file_name,
                'original_url' => $media->original_url,
                'thumbnail_url' => $media->thumbnail_url,
            ]),
            'config_seasons' => array_keys(config('tour.seasons')), // Sadece anahtarları (isimleri) gönder
            'config_categories' => config('tour.categories'), // Kategoriler zaten bir dizi
        ]);
    }

    /**
     * Belirli bir turu düzenleme sayfasını gösterme.
     */
    public function edit(Tour $tour)
    {
        $tour->load(['destinations', 'featuredMedia', 'pricingTiers', 'tourDays.dayActivities', 'optionalActivities']);
        
        return Inertia::render('Admin/Tours/Edit', [
            'tour' => $tour,
            'destinations' => Destination::all(),
            'optionalActivities' => OptionalActivity::all(),
            'media_files' => Media::all()->map(fn($media) => [
                'id' => $media->id,
                'file_name' => $media->file_name,
                'original_url' => $media->original_url,
                'thumbnail_url' => $media->thumbnail_url,
            ]),
            'config_seasons' => array_keys(config('tour.seasons')), // Sadece anahtarları (isimleri) gönder
            'config_categories' => config('tour.categories'), // Kategoriler zaten bir dizi
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $this->validateTourData($request);

        DB::beginTransaction();
        try {
            $tour = Tour::create([
                'title' => $validated['title'],
                'slug' => $validated['slug'],
                'summary' => $validated['summary'],
                'description' => $validated['description'],
                'is_popular' => $validated['is_popular'] ?? false,
                'duration_days' => $validated['duration_days'],
                'duration_nights' => $validated['duration_nights'],
                'language' => $validated['language'] ?? 'tr',
                'min_participants' => $validated['min_participants'],
                'max_participants' => $validated['max_participants'],
                'is_published' => $validated['is_published'] ?? false,
                'inclusions_html' => $validated['inclusions_html'] ?? null,
                'exclusions_html' => $validated['exclusions_html'] ?? null,
                'hotels' => $validated['hotels'] ?? [],
                'featured_media_id' => $validated['featured_media_id'] ?? null,
                'gallery_media_ids' => $validated['gallery_media_ids'] ?? [],
            ]);

            if (isset($validated['destinations'])) {
                $tour->destinations()->sync($validated['destinations']);
            }
            
            $this->syncDailyProgram($tour, $validated['daily_program'] ?? []);
            $this->syncPricingTiers($tour, $validated['pricing_tiers'] ?? []);

            if (isset($validated['optional_activity_ids'])) {
                $tour->optionalActivities()->sync($validated['optional_activity_ids']);
            }

            DB::commit();
            return redirect()->route('admin.tours.index')->with('success', 'Tur başarıyla oluşturuldu!');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Tur oluşturma hatası:', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return back()->withErrors(['general' => 'Tur oluşturulurken bir hata oluştu: ' . $e->getMessage()])->withInput();
        }
    }

    public function update(Request $request, Tour $tour)
    {
        $validated = $this->validateTourData($request, $tour->id);
        
        DB::beginTransaction();
        try {
            $tour->update([
                'title' => $validated['title'],
                'slug' => $validated['slug'],
                'summary' => $validated['summary'],
                'description' => $validated['description'],
                'is_popular' => $validated['is_popular'] ?? false,
                'duration_days' => $validated['duration_days'],
                'duration_nights' => $validated['duration_nights'],
                'language' => $validated['language'] ?? 'tr',
                'min_participants' => $validated['min_participants'],
                'max_participants' => $validated['max_participants'],
                'is_published' => $validated['is_published'] ?? false,
                'inclusions_html' => $validated['inclusions_html'] ?? null,
                'exclusions_html' => $validated['exclusions_html'] ?? null,
                'hotels' => $validated['hotels'],
                'featured_media_id' => $validated['featured_media_id'] ?? null,
                'gallery_media_ids' => $validated['gallery_media_ids'] ?? [],
                'meta_title' => $validated['meta_title'] ?? null,
                'meta_description' => $validated['meta_description'] ?? null,
            ]);

            if (isset($validated['destinations'])) {
                $tour->destinations()->sync($validated['destinations']);
            }

            $this->syncDailyProgram($tour, $validated['daily_program'] ?? []);
            $this->syncPricingTiers($tour, $validated['pricing_tiers'] ?? []);

            if (isset($validated['optional_activity_ids'])) {
                $tour->optionalActivities()->sync($validated['optional_activity_ids']);
            } else {
                $tour->optionalActivities()->sync([]);
            }

            DB::commit();
            return back()->with('success', 'Tur başarıyla güncellendi!');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Tur güncelleme hatası:', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return back()->withErrors(['general' => 'Tur güncellenirken bir hata oluştu: ' . $e->getMessage()]);
        }
    }

    private function validateTourData(Request $request, $tourId = null)
    {
        $slugRule = ['required', 'string', 'max:255'];
        if ($tourId) {
            $slugRule[] = Rule::unique('tours')->ignore($tourId);
        } else {
            $slugRule[] = 'unique:tours,slug';
        }

        return $request->validate([
            'title' => 'required|string|max:255',
            'slug' => $slugRule,
            'summary' => 'nullable|string',
            'description' => 'nullable|string',
            'is_popular' => 'boolean',
            'duration_days' => 'required|integer|min:0',
            'duration_nights' => 'required|integer|min:0',
            'language' => 'required|string|max:255',
            'min_participants' => 'nullable|integer|min:0',
            'max_participants' => 'nullable|integer|min:0',
            'is_published' => 'boolean',
            'inclusions_html' => 'nullable|string',
            'exclusions_html' => 'nullable|string',
            'hotels' => 'nullable|array',
            'destinations' => 'nullable|array',
            'destinations.*' => 'exists:destinations,id',
            'featured_media_id' => 'nullable|exists:media,id',
            'gallery_media_ids' => 'nullable|array',
            'gallery_media_ids.*' => 'integer|exists:media,id',
            'daily_program' => 'nullable|array',
            'daily_program.*.day_number' => 'required|integer|min:1',
            'daily_program.*.title' => 'required|string|max:255',
            'daily_program.*.activities' => 'present|array',
            'daily_program.*.activities.*.description' => 'required|string',
            'daily_program.*.activities.*.is_highlight' => 'boolean',
            'daily_program.*.activities.*.order' => 'integer',
            'pricing_tiers' => 'nullable|array',
            'pricing_tiers.*.season_name' => ['required', 'string', Rule::in(array_keys(config('tour.seasons')))],
            'pricing_tiers.*.category_name' => ['required', 'string', Rule::in(config('tour.categories'))],
            'pricing_tiers.*.price_per_person_1' => 'nullable|numeric|min:0',
            'pricing_tiers.*.price_per_person_2' => 'nullable|numeric|min:0',
            'pricing_tiers.*.price_per_person_3' => 'nullable|numeric|min:0',
            'optional_activity_ids' => 'nullable|array',
            'optional_activity_ids.*' => 'exists:optional_activities,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);
    }

    private function syncDailyProgram(Tour $tour, array $dailyProgramData)
    {
        $existingTourDayIds = $tour->tourDays->pluck('id')->toArray();
        $updatedTourDayIds = [];

        foreach ($dailyProgramData as $dayData) {
            $tourDayId = $dayData['id'] ?? null;
            $tourDay = null;
            if ($tourDayId && !str_starts_with($tourDayId, 'temp-') && in_array($tourDayId, $existingTourDayIds)) {
                $tourDay = TourDay::find($tourDayId);
                if ($tourDay) {
                    $tourDay->update(['day_number' => $dayData['day_number'], 'title' => $dayData['title']]);
                }
            } else {
                $tourDay = $tour->tourDays()->create(['day_number' => $dayData['day_number'], 'title' => $dayData['title']]);
            }

            if ($tourDay) {
                $updatedTourDayIds[] = $tourDay->id;
                $existingActivityIds = $tourDay->dayActivities->pluck('id')->toArray();
                $updatedActivityIds = [];

                foreach ($dayData['activities'] ?? [] as $activityData) {
                    $activityId = $activityData['id'] ?? null;
                    $dayActivity = null;
                    $activityPayload = [
                        'description' => $activityData['description'],
                        'is_highlight' => $activityData['is_highlight'],
                        'order' => $activityData['order'],
                    ];

                    if ($activityId && !str_starts_with($activityId, 'temp-activity-') && in_array($activityId, $existingActivityIds)) {
                        $dayActivity = DayActivity::find($activityId);
                        if ($dayActivity) {
                            $dayActivity->update($activityPayload);
                        }
                    } else {
                        $dayActivity = $tourDay->dayActivities()->create($activityPayload);
                    }
                    if ($dayActivity) {
                        $updatedActivityIds[] = $dayActivity->id;
                    }
                }
                DayActivity::where('tour_day_id', $tourDay->id)->whereNotIn('id', $updatedActivityIds)->delete();
            }
        }
        $tour->tourDays()->whereNotIn('id', $updatedTourDayIds)->delete();
    }

    private function syncPricingTiers(Tour $tour, array $pricingTiersData)
    {
        // Önce turun mevcut tüm fiyatlandırmasını temizle
        $tour->pricingTiers()->delete();
        
        // Yeni fiyatlandırma verilerini ekle
        foreach ($pricingTiersData as $tierData) {
            // Sadece fiyatı olanları ekle
            if (isset($tierData['price_per_person_1']) || isset($tierData['price_per_person_2']) || isset($tierData['price_per_person_3'])) {
                 TourPricingTier::create([
                    'tour_id' => $tour->id,
                    'season_name' => $tierData['season_name'],
                    'category_name' => $tierData['category_name'],
                    'price_per_person_1' => $tierData['price_per_person_1'] ?? null,
                    'price_per_person_2' => $tierData['price_per_person_2'] ?? null,
                    'price_per_person_3' => $tierData['price_per_person_3'] ?? null,
                ]);
            }
        }
    }

    public function destroy(Tour $tour)
    {
        try {
            $tour->delete();
            return redirect()->route('admin.tours.index')->with('success', 'Tur başarıyla silindi.');
        } catch (\Exception $e) {
            Log::error('Tur silme hatası: ' . $e->getMessage());
            return back()->withErrors(['general' => 'Tur silinirken bir hata oluştu.']);
        }
    }
}
