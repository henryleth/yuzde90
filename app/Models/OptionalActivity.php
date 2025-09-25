<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // BelongsTo ilişkisi için eklendi

class OptionalActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'is_published',
        'image_id', // Yeni eklenen alan
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    protected $appends = []; // original_image accessor kaldırıldı

    /**
     * Opsiyonel aktivite orijinal görselinin URL'sini döndürür.
     */
    // public function getOriginalImageAttribute(): ?string
    // {
    //     return $this->image ? $this->image->original_url : null;
    // }

    /**
     * Opsiyonel aktivitenin ana görseliyle ilişki.
     */
    public function image(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'image_id');
    }

    /**
     * Opsiyonel aktivitenin ait olduğu turlar.
     */
    public function tours(): BelongsToMany
    {
        return $this->belongsToMany(Tour::class, 'tour_optional_activity');
    }
}
