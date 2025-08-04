<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Hotel; // Hotel modelini import et

class TourHotel extends Model // Model adını TourHotel olarak değiştirdim
{
    use HasFactory;

    protected $table = 'tour_hotels'; // Tablo adını manuel olarak belirttim

    protected $fillable = [
        'tour_id',
        'hotel_id',
        'category', // category sütununu ekledim
    ];

    /**
     * Get the tour that owns the hotel option.
     */
    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }

    /**
     * Get the hotel associated with the tour hotel option.
     */
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }
}
