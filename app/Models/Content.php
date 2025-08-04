<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\HasSeo;

class Content extends Model
{
    use HasFactory, HasSeo;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'summary',
        'published_at',
        'image_id',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    protected $appends = []; // image_url accessor kaldırıldı

    /**
     * İçeriğin ana görselinin URL'sini döndürür.
     */
    // public function getImageUrlAttribute(): ?string
    // {
    //     return $this->image ? $this->image->original_url : null;
    // }

    /**
     * İçeriğin kategorileriyle ilişki.
     */
    public function contentCategories(): BelongsToMany
    {
        return $this->belongsToMany(ContentCategory::class, 'content_content_category');
    }

    /**
     * İçeriğin destinasyonlarıyla ilişki.
     */
    public function destinations(): BelongsToMany
    {
        return $this->belongsToMany(Destination::class, 'content_destination');
    }

    /**
     * İçeriğin ana görseliyle ilişki.
     */
    public function image(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'image_id');
    }

    /**
     * Modelin SEO ayar anahtarı için ön ekini döndürür.
     */
    protected function getSeoKeyPrefix(): string
    {
        return 'content.show';
    }
}
