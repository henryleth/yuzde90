<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TourDay extends Model
{
    use HasFactory;

    protected $fillable = [
        'tour_id',
        'day_number',
        'title',
    ];

    /**
     * Get the tour that owns the tour day.
     */
    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }

    /**
     * Get the day activities for the tour day.
     */
    public function dayActivities(): HasMany
    {
        return $this->hasMany(DayActivity::class);
    }
}
