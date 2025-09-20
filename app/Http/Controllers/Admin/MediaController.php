<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Media as MediaModel; // Kendi MediaModel'imizi kullanıyoruz
use App\Models\Destination;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Traits\HandlesMediaUploads; // Trait'i dahil et
use Illuminate\Support\Facades\Storage; // Storage facade'ini dahil et

class MediaController extends Controller
{
    use HandlesMediaUploads; // Trait'i kullan

    /**
     * Medya kütüphanesindeki tüm medyaları listeler.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        // destination ilişkisini yüklüyoruz çünkü medya modalında filtreleme için kullanılıyor.
        $media = MediaModel::with('destination')->get();

        return response()->json([
            'media' => $media,
        ]);
    }

    /**
     * Yeni bir medya öğesi yükle ve kaydet.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'sometimes|required|file|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'url' => 'sometimes|required|url',
            'tags' => 'nullable|string',
            'destination_id' => 'nullable|exists:destinations,id',
        ]);

        try {
            $options = [
                'tags' => $request->input('tags') ? json_decode($request->input('tags'), true) : [],
                'destination_id' => $request->input('destination_id'),
            ];
            $source = null;

            if ($request->hasFile('file')) {
                $source = $request->file('file');
            } elseif ($request->has('url')) {
                $source = $request->input('url');
            } else {
                return response()->json(['error' => 'Yüklenecek bir dosya veya URL sağlanmadı.'], 400);
            }
            
            $media = $this->uploadAndSaveMedia($source, $options);

            if (!$media) {
                return response()->json(['error' => 'Medya yüklenirken bir hata oluştu. Lütfen URL\'nin geçerli bir resim olduğundan ve sunucunun erişilebilir olduğundan emin olun.'], 500);
            }

            return response()->json(['message' => 'Medya başarıyla yüklendi.', 'media' => $media], 201);
        } catch (\Exception $e) {
            Log::error('Medya yükleme hatası: ' . $e->getMessage());
            return response()->json(['error' => 'Medya yüklenirken bir hata oluştu.', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Belirtilen medya öğesini veritabanından ve diskten kaldırır.
     */
    public function destroy($id)
    {
        try {
            $media = MediaModel::find($id);

            if (!$media) {
                return response()->json(['error' => 'Medya öğesi bulunamadı.'], 404);
            }

            // Fiziksel dosyaları silmeyi dene (varsa)
            try {
                // Ana dosyayı silmeyi dene
                if ($media->path && Storage::disk($media->disk ?? 'public')->exists($media->path)) {
                    Storage::disk($media->disk ?? 'public')->delete($media->path);
                }

                // Thumbnail dosyasını silmeyi dene
                $fileNameWithoutExtension = pathinfo($media->file_name, PATHINFO_FILENAME);
                $thumbnailPath = str_replace($media->file_name, 'thumbnail/' . $fileNameWithoutExtension . '.webp', $media->path);
                
                if (Storage::disk($media->disk ?? 'public')->exists($thumbnailPath)) {
                    Storage::disk($media->disk ?? 'public')->delete($thumbnailPath);
                }
            } catch (\Exception $fileException) {
                // Dosya silme hatası olsa bile devam et
                Log::warning('Medya dosyası silinemedi (dosya bulunamıyor olabilir): ' . $fileException->getMessage());
            }

            // Veritabanından her durumda sil
            $media->delete();

            return response()->json(['message' => 'Medya başarıyla silindi.'], 200);
        } catch (\Exception $e) {
            Log::error('Medya silme hatası: ' . $e->getMessage());
            return response()->json(['error' => 'Medya silinirken bir hata oluştu.', 'details' => $e->getMessage()], 500);
        }
    }
} 