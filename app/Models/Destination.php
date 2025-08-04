<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // BelongsTo ilişkisi için eklendi
use App\Traits\HasSeo;

class Destination extends Model
{
    use HasFactory, HasSeo;

    protected $fillable = [
        'name',
        'slug',
        'summary', // Özet alanı eklendi
        'description',
        'is_popular',
        'image_id', // Yeni eklenen alan
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'is_popular' => 'boolean',
    ];

    protected $appends = []; // image_url ve original_image_url accessors kaldırıldı

    /**
     * Destinasyonun öne çıkan görselinin URL'sini döndürür (Thumbnail versiyonu).
     */
    // public function getImageUrlAttribute(): ?string
    // {
    //     return $this->image ? $this->image->thumbnail_url : null;
    // }

    /**
     * Destinasyonun orijinal boyutlu öne çıkan görselinin URL'sini döndürür (Hero Section için).
     */
    // public function getOriginalImageUrlAttribute(): ?string
    // {
    //     return $this->image ? $this->image->original_url : null;
    // }

    /**
     * Destinasyonun ana görseliyle ilişki.
     */
    public function image(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'image_id');
    }

    /**
     * Destinasyona ait turlar.
     */
    public function tours(): BelongsToMany
    {
        return $this->belongsToMany(Tour::class, 'tour_destination');
    }

    /**
     * Destinasyona ait içerikler.
     */
    public function contents(): BelongsToMany
    {
        return $this->belongsToMany(Content::class, 'content_destination');
    }

    /**
     * Modelin SEO ayar anahtarı için ön ekini döndürür.
     */
    protected function getSeoKeyPrefix(): string
    {
        return 'destination.show';
    }
}
