<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TourPricingTier extends Model
{
    use HasFactory;

    protected $fillable = [
        'tour_id',
        'season_name',
        'category_name',
        'price_per_person_1',
        'price_per_person_2',
        'price_per_person_3',
    ];

    protected $casts = [
        'price_per_person_1' => 'float',
        'price_per_person_2' => 'float',
        'price_per_person_3' => 'float',
    ];

    /**
     * Get the tour that owns the pricing tier.
     */
    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }
}
