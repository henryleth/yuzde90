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
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'tags' => 'nullable|string',
            'destination_id' => 'nullable|exists:destinations,id',
        ]);

        try {
            $file = $request->file('file');
            $tags = $request->input('tags') ? json_decode($request->input('tags'), true) : [];
            $destinationId = $request->input('destination_id');

            $media = $this->uploadAndSaveMedia($file, $tags, $destinationId);

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

            // Medya dosyasını diskten sil
            $media->delete(); // Spatie MediaLibrary paketi dosyayı otomatik siler

            return response()->json(['message' => 'Medya başarıyla silindi.'], 200);
        } catch (\Exception $e) {
            Log::error('Medya silme hatası: ' . $e->getMessage());
            return response()->json(['error' => 'Medya silinirken bir hata oluştu.', 'details' => $e->getMessage()], 500);
        }
    }
} 