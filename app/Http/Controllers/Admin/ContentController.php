<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\ContentCategory;
use App\Models\Destination;
use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log; // Log sınıfını import et
use Carbon\Carbon; // Carbon'u import et

class ContentController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:content-management')->except(['show']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contents = Content::with('contentCategories', 'image')->latest()->paginate(10);
        return Inertia::render('Admin/Contents/Index', [
            'contents' => $contents->through(function ($content) {
                return [
                    'id' => $content->id,
                    'title' => $content->title,
                    'slug' => $content->slug,
                    'summary' => $content->summary,
                    'content' => $content->content,
                    'published_at' => $content->published_at,
                    'image_id' => $content->image_id,
                    'image' => $content->image ? [
                        'id' => $content->image->id,
                        'file_name' => $content->image->file_name,
                        'original_url' => $content->image->original_url,
                        'thumbnail_url' => $content->image->thumbnail_url,
                    ] : null,
                    'content_categories' => $content->contentCategories->map(fn($cat) => ['id' => $cat->id, 'name' => $cat->name, 'slug' => $cat->slug]),
                    'destinations' => $content->destinations->map(fn($dest) => ['id' => $dest->id, 'name' => $dest->name, 'slug' => $dest->slug]),
                ];
            }),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $content = Content::where('slug', $slug)
            ->with(['featuredMedia', 'gallery', 'contentCategories', 'destinations'])
            ->firstOrFail();

        return Inertia::render('ContentDetail', [
            'post' => [
                'id' => $content->id,
                'title' => $content->title,
                'slug' => $content->slug,
                'summary' => $content->summary,
                'content' => $content->content,
                'published_at' => $content->published_at,
                'image' => $content->featuredMedia ? [
                    'id' => $content->featuredMedia->id,
                    'file_name' => $content->featuredMedia->file_name,
                    'original_url' => $content->featuredMedia->original_url,
                    'thumbnail_url' => $content->featuredMedia->thumbnail_url,
                ] : null,
                'gallery_images_urls' => $content->gallery->map(fn($media) => [
                    'id' => $media->id,
                    'file_name' => $media->file_name,
                    'original_url' => $media->original_url,
                    'thumbnail_url' => $media->thumbnail_url,
                ])->toArray(),
                'content_categories' => $content->contentCategories->map(fn($cat) => ['id' => $cat->id, 'name' => $cat->name, 'slug' => $cat->slug]),
                'destinations' => $content->destinations->map(fn($dest) => ['id' => $dest->id, 'name' => $dest->name, 'slug' => $dest->slug]),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Contents/Create', [
            'contentCategories' => ContentCategory::all(),
            'destinations' => Destination::all(),
            'media_files' => Media::all()->map(fn($media) => [ // Media Manager için tüm medyayı çekiyoruz
                'id' => $media->id,
                'file_name' => $media->file_name,
                'original_url' => $media->original_url,
                'thumbnail_url' => $media->thumbnail_url,
            ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:contents',
            'content' => 'nullable|string',
            'summary' => 'nullable|string',
            'published_at' => 'nullable|date',
            'image_id' => 'nullable|exists:media,id',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:content_categories,id',
            'destinations' => 'nullable|array',
            'destinations.*' => 'integer|exists:destinations,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            // published_at değerini formatla
            if (isset($validated['published_at'])) {
                $validated['published_at'] = Carbon::parse($validated['published_at'])->format('Y-m-d H:i:s');
            }

            // HTML içeriğine hiç müdahale etme - kullanıcının yazdığı gibi kaydet
            // if (isset($validated['content'])) {
            //     $validated['content'] = $this->cleanLinkAttributes($validated['content']);
            // }

            $content = Content::create($validated);

            if (!empty($validated['categories'])) {
                $content->contentCategories()->sync($validated['categories']);
            }
            if (!empty($validated['destinations'])) {
                // Frontend'ten gelen nested array'i düzleştir
                $destinationIds = collect($validated['destinations'])->flatten()->filter()->unique()->values()->toArray();
                $content->destinations()->sync($destinationIds);
            }

            DB::commit();
            return redirect()->route('admin.contents.index')->with('success', 'İçerik başarıyla oluşturuldu.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('İçerik oluşturma hatası: ' . $e->getMessage());
            return back()->withErrors(['general' => 'İçerik oluşturulurken bir hata oluştu: ' . $e->getMessage()]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Content $content)
    {
        $content->load(['contentCategories', 'destinations', 'image']);
        return Inertia::render('Admin/Contents/Edit', [
            'content' => $content,
            'contentCategories' => ContentCategory::all(),
            'destinations' => Destination::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Content $content)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => ['required', 'string', 'max:255', Rule::unique('contents')->ignore($content->id)],
            'content' => 'nullable|string',
            'summary' => 'nullable|string',
            'published_at' => 'nullable|date',
            'image_id' => 'nullable|exists:media,id',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:content_categories,id',
            'destinations' => 'nullable|array',
            'destinations.*' => 'integer|exists:destinations,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            // published_at değerini formatla
            if (isset($validated['published_at'])) {
                $validated['published_at'] = Carbon::parse($validated['published_at'])->format('Y-m-d H:i:s');
            }

            // HTML içeriğine hiç müdahale etme - kullanıcının yazdığı gibi kaydet
            // if (isset($validated['content'])) {
            //     $validated['content'] = $this->cleanLinkAttributes($validated['content']);
            // }

            $content->update($validated);

            $content->contentCategories()->sync($validated['categories'] ?? []);
            
            // Frontend'ten gelen nested array'i düzleştir
            $destinationIds = isset($validated['destinations']) 
                ? collect($validated['destinations'])->flatten()->filter()->unique()->values()->toArray()
                : [];
            $content->destinations()->sync($destinationIds);

            DB::commit();
            return redirect()->route('admin.contents.index')->with('success', 'İçerik başarıyla güncellendi.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('İçerik güncelleme hatası: ' . $e->getMessage());
            return back()->withErrors(['general' => 'İçerik güncellenirken bir hata oluştu: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Content $content)
    {
        try {
            $content->delete();
            return redirect()->route('admin.contents.index')->with('success', 'İçerik başarıyla silindi.');
        } catch (\Exception $e) {
            Log::error('İçerik silme hatası: ' . $e->getMessage());
            return back()->withErrors(['general' => 'İçerik silinirken bir hata oluştu: ' . $e->getMessage()]);
        }
    }

    /**
     * Sadece otomatik eklenen gereksiz link attribute'larını temizler
     * Diğer tüm HTML attribute'larına dokunmaz (id, class, style vb.)
     */
    private function cleanLinkAttributes($content)
    {
        if (empty($content)) {
            return $content;
        }

        // Sadece target="_blank" kaldır (diğer target değerlerine dokunma)
        $content = preg_replace('/\s+target\s*=\s*["\']_blank["\']/i', '', $content);
        
        // Sadece rel="noopener noreferrer" veya benzer kombinasyonları kaldır
        $content = preg_replace('/\s+rel\s*=\s*["\'](?:noopener\s*noreferrer|noreferrer\s*noopener|noopener|noreferrer)["\']/i', '', $content);
        
        // Fazla boşlukları temizle ama içeriği değiştirme
        $content = preg_replace('/\s{2,}/', ' ', $content);
        
        return trim($content);
    }
}
