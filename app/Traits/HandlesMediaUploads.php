<?php

namespace App\Traits;

use App\Models\Media;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;
use Intervention\Image\Encoders\WebpEncoder;
use App\Models\Destination;
use Illuminate\Support\Facades\Config;

trait HandlesMediaUploads
{
    protected function uploadAndSaveMedia($fileSource, array $options = []): ?Media
    {
        try {
            $isUrl = is_string($fileSource) && filter_var($fileSource, FILTER_VALIDATE_URL);
            $fileContent = null;
            $originalFileName = null;

            if ($isUrl) {
                $fileContent = file_get_contents($fileSource);
                $originalFileName = pathinfo(parse_url($fileSource, PHP_URL_PATH), PATHINFO_BASENAME);
            } elseif ($fileSource instanceof UploadedFile) {
                $fileContent = file_get_contents($fileSource->getRealPath());
                $originalFileName = $fileSource->getClientOriginalName();
            } else {
                throw new \Exception('Geçersiz dosya kaynağı sağlandı.');
            }

            if (!$fileContent) {
                throw new \Exception('Dosya içeriği alınamadı.');
            }

            $tempPath = tempnam(sys_get_temp_dir(), 'media_upload');
            file_put_contents($tempPath, $fileContent);

            $mimeType = mime_content_type($tempPath);
            $fileSize = filesize($tempPath);

            $media = new Media([
                'file_name' => '',
                'mime_type' => $mimeType,
                'path' => '',
                'size' => $fileSize,
                'disk' => 'public',
                'tags' => $options['tags'] ?? null,
                'destination_id' => $options['destination_id'] ?? null,
            ]);
            $media->save();

            $nameParts = [];
            $destinationSlugForFileName = null; // Destinasyon slug'ını burada saklayacağız

            // Etiketleri dosya adına ekle (varsa) - Etiketlerin slug'ları kullanılacak
            if (!empty($options['tags'])) {
                foreach ($options['tags'] as $tag) {
                    $nameParts[] = Str::slug($tag);
                }
            }

            // Destinasyon slug'ını al (varsa)
            if (isset($options['destination_id'])) {
                $destination = Destination::find($options['destination_id']);
                if ($destination) {
                    $destinationSlugForFileName = $destination->slug;
                    $nameParts[] = $destinationSlugForFileName; // Destinasyon slug'ını nameParts'e de ekle
                }
            }

            // Eğer etiket veya destinasyon bilgisi yoksa, orijinal dosya adının slug'ını kullan, yoksa 'medya'
            if (empty($nameParts)) {
                $originalFileNameBase = pathinfo($originalFileName, PATHINFO_FILENAME);
                $nameParts[] = Str::slug($originalFileNameBase) ?: 'medya';
            }

            $initialFileNameBase = implode('_', array_unique($nameParts));

            // Sonek ekle (sadece destinasyon bilgisi varsa ve sonek tanımlıysa)
            $tourSuffix = Config::get('media.tour_suffix');
            if (!empty($destinationSlugForFileName) && !empty($tourSuffix)) {
                $initialFileNameBase .= $tourSuffix;
            }

            $extension = 'webp'; // Her zaman webp
            $finalFileName = $initialFileNameBase . '.' . $extension;

            // Aynı dosya adından kaçınmak için benzersizlik kontrolü
            $counter = 0;
            $uploadPath = 'uploads/' . $media->id . '/';
            $uniqueFileName = $finalFileName;
            while (Storage::disk('public')->exists($uploadPath . $uniqueFileName)) {
                $counter++;
                $uniqueFileName = $initialFileNameBase . '-' . $counter . '.' . $extension;
            }
            $finalFileName = $uniqueFileName;

            $fullPath = $uploadPath . $finalFileName;

            // Orijinal görseli kaydet (WebP olarak %90 kalite)
            $image = Image::read($tempPath);
            $encodedImage = $image->encode(new WebpEncoder(quality: 80));
            Storage::disk('public')->put($fullPath, $encodedImage);

            // Thumbnail oluştur ve kaydet (%75 kalite WebP)
            $thumbnailPath = $uploadPath . 'thumbnail/' . $finalFileName;
            $imageForThumbnail = Image::read($tempPath); // Yeni bir Image nesnesi oluştur
            $imageForThumbnail->scaleDown(width: 320); // En boy oranını koruyarak genişliği 300 piksele düşür
            $imageForThumbnail->sharpen(5); // Thumbnail'i keskinleştir (derece: 10)
            $encodedThumbnail = $imageForThumbnail->encode(new WebpEncoder(quality: 98));
            Storage::disk('public')->put($thumbnailPath, $encodedThumbnail);

            // Medya yolunu güncelle
            $media->file_name = $finalFileName;
            $media->path = $fullPath;
            $media->save();

            unlink($tempPath);

            return $media;
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Medya yüklenirken veya kaydedilirken hata oluştu: ' . $e->getMessage(), [
                'file_source' => $isUrl ? $fileSource : 'UploadedFile',
                'options' => $options,
                'trace' => $e->getTraceAsString(),
            ]);
            return null;
        }
    }
} 