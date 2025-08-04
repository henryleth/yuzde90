<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'image_id',
    ];

    protected $appends = ['original_image'];

    /**
     * Kategori orijinal görsel URL'sini döndürür.
     */
    public function getOriginalImageAttribute(): ?string
    {
        return $this->image ? $this->image->original_url : null;
    }

    /**
     * İçeriğin kategorileriyle ilişki.
     */
    public function contents(): BelongsToMany
    {
        return $this->belongsToMany(Content::class, 'content_content_category');
    }

    /**
     * Kategoriye ait medya ilişkisi.
     */
    public function image(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'image_id');
    }
}
