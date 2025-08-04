<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Media extends Model
{
    use HasFactory;

    // Medya tablosunun adını belirt
    protected $table = 'media';

    // Toplu atama (mass assignment) için doldurulabilir sütunlar
    protected $fillable = [
        'file_name',
        'mime_type',
        'path',
        'size',
        'disk',
        'tags',
        'destination_id',
    ];

    // Otomatik olarak diziye dönüştürülecek sütunlar
    protected $casts = [
        'tags' => 'array',
    ];

    // Eklenen (appended) öznitelikler
    protected $appends = ['original_url', 'thumbnail_url'];

    /**
     * Orijinal görselin tam URL'sini döndürür.
     *
     * @return string
     */
    public function getOriginalUrlAttribute(): string
    {
        $url = asset('storage/' . $this->path);
        \Illuminate\Support\Facades\Log::info('Generated Original URL', ['media_id' => $this->id, 'file_name' => $this->file_name, 'url' => $url]);
        return $url;
    }

    /**
     * Medyanın thumbnail URL'sini döndürür.
     */
    public function getThumbnailUrlAttribute(): string
    {
        $fileNameWithoutExtension = pathinfo($this->file_name, PATHINFO_FILENAME);
        $thumbnailPath = str_replace($this->file_name, 'thumbnail/' . $fileNameWithoutExtension . '.webp', $this->path);
        $url = asset('storage/' . $thumbnailPath);
        // Log::info('Generated Thumbnail URL', ['file_name' => $this->file_name, 'thumbnail_path' => $thumbnailPath, 'url' => $url]); // Bu log zaten vardı
        \Illuminate\Support\Facades\Log::info('Generated Thumbnail URL', ['media_id' => $this->id, 'file_name' => $this->file_name, 'thumbnail_path' => $thumbnailPath, 'url' => $url]);
        return $url;
    }

    /**
     * Medyanın ait olduğu destinasyonu getirir.
     */
    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }
}
