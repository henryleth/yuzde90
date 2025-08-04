<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DayActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'tour_day_id',
        'order',
        'description',
        'is_highlight',
    ];

    protected $casts = [
        'is_highlight' => 'boolean',
        'description' => 'string',
    ];

    /**
     * Get the tour day that owns the day activity.
     */
    public function tourDay(): BelongsTo
    {
        return $this->belongsTo(TourDay::class);
    }
}
