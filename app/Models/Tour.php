<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\HasSeo;

class Tour extends Model
{
    use HasFactory, HasSeo;

    protected $fillable = [
        'title',
        'slug',
        'summary',
        'description',
        'min_participants',
        'max_participants',
        'duration_days',
        'duration_nights',
        'language',
        'rating',
        'reviews_count',
        'is_published',
        'is_popular',
        'inclusions_html',
        'exclusions_html',
        'hotels',
        'featured_media_id',
        'gallery_media_ids',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'is_popular' => 'boolean',
        'hotels' => 'array',
        'gallery_media_ids' => 'array',
    ];

    // featured_image_url, destinations_names, gallery_images_urls, card_display_image_url gibi eklenen öznitelikler
    // Yeni standart: original_image (detay) ve thumbnail_image (liste)
    protected $appends = ['destinations_names', 'duration_days', 'duration_nights', 'min_participants', 'max_participants', 'gallery_images_urls', 'price_from'];

    /**
     * Turun öne çıkan görselinin URL'sini döndürür (Thumbnail versiyonu).
     */
    // public function getImageUrlAttribute(): ?string
    // {
    //     return $this->featuredMedia ? $this->featuredMedia->thumbnail_url : null;
    // }

    /**
     * Turun orijinal boyutlu öne çıkan görselinin URL'sini döndürür (Hero Section için).
     */
    // public function getOriginalImageUrlAttribute(): ?string
    // {
    //     return $this->featuredMedia ? $this->featuredMedia->original_url : null;
    // }

    /**
     * Galeri görsellerinin URL'lerini döndürür.
     * gallery_media_ids JSON sütunundaki ID'leri kullanarak medya öğelerini çeker.
     */
    public function getGalleryImagesUrlsAttribute(): array
    {
        if (empty($this->gallery_media_ids)) {
            return [];
        }

        // Get all media items in a single query
        $mediaItems = Media::whereIn('id', $this->gallery_media_ids)->get()->keyBy('id');

        $orderedMedia = [];
        foreach ($this->gallery_media_ids as $mediaId) {
            if (isset($mediaItems[$mediaId])) {
                $media = $mediaItems[$mediaId];
                $orderedMedia[] = [
                    'id' => $media->id,
                    'thumbnail_url' => $media->thumbnail_url,
                    'original_url' => $media->original_url,
                    'alt' => $media->name ?: $media->file_name,
                    'title' => $media->name ?: $media->file_name,
                ];
            }
        }

        return $orderedMedia;
    }

    /**
     * Turun ilişkili destinasyonlarının adlarını döndürür.
     */
    public function getDestinationsNamesAttribute(): array
    {
        return $this->destinations->pluck('name')->toArray();
    }

    /**
     * Gün cinsinden süreyi döndürür.
     */
    public function getDurationDaysAttribute(): int
    {
        return $this->attributes['duration_days'];
    }

    /**
     * Gece cinsinden süreyi döndürür.
     */
    public function getDurationNightsAttribute(): int
    {
        return $this->attributes['duration_nights'];
    }

    /**
     * Minimum katılımcı sayısını döndürür.
     */
    public function getMinParticipantsAttribute(): int
    {
        return $this->attributes['min_participants'];
    }

    /**
     * Maksimum katılımcı sayısını döndürür.
     */
    public function getMaxParticipantsAttribute(): int
    {
        return $this->attributes['max_participants'];
    }

    /**
     * Fiyatlandırma kademelerinden en düşük fiyatı döndürür.
     */
    public function getPriceFromAttribute(): ?float
    {
        if ($this->relationLoaded('pricingTiers') && $this->pricingTiers->isNotEmpty()) {
            return $this->pricingTiers->min('price_per_person_1');
        }
        return null;
    }

    /**
     * Turun öne çıkan medyasıyla ilişki.
     */
    public function featuredMedia(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'featured_media_id');
    }

    /**
     * Turun ilişkili destinasyonları.
     */
    public function destinations(): BelongsToMany
    {
        return $this->belongsToMany(Destination::class, 'tour_destination');
    }

    /**
     * Turun fiyatlandırma kademeleri.
     */
    public function pricingTiers(): HasMany
    {
        return $this->hasMany(TourPricingTier::class);
    }

    /**
     * Tur günleri.
     */
    public function tourDays(): HasMany
    {
        return $this->hasMany(TourDay::class);
    }

    /**
     * Turun opsiyonel aktiviteleri.
     */
    public function optionalActivities(): BelongsToMany
    {
        return $this->belongsToMany(OptionalActivity::class, 'tour_optional_activity');
    }

    /**
     * Modelin SEO ayar anahtarı için ön ekini döndürür.
     */
    protected function getSeoKeyPrefix(): string
    {
        return 'tour.show';
    }
}
