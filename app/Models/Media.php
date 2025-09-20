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
        'destination_ids', // Birden fazla destinasyon desteği
    ];

    // Otomatik olarak diziye dönüştürülecek sütunlar
    protected $casts = [
        'tags' => 'array',
        'destination_ids' => 'array', // JSON sütununu diziye dönüştür
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
        return asset('storage/' . $this->path);
    }

    /**
     * Medyanın thumbnail URL'sini döndürür.
     */
    public function getThumbnailUrlAttribute(): string
    {
        $fileNameWithoutExtension = pathinfo($this->file_name, PATHINFO_FILENAME);
        $thumbnailPath = str_replace($this->file_name, 'thumbnail/' . $fileNameWithoutExtension . '.webp', $this->path);
        return asset('storage/' . $thumbnailPath);
    }

    /**
     * Medyanın ait olduğu destinasyonları getirir.
     * destination_ids JSON array'inden Destination modellerini döndürür.
     */
    public function destinations()
    {
        // destination_ids JSON sütunundaki ID'leri kullanarak destinasyonları getir
        if (!empty($this->destination_ids)) {
            return Destination::whereIn('id', $this->destination_ids)->get();
        }
        return collect();
    }
}
