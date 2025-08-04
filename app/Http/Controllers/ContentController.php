<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Content;
use App\Models\ContentCategory;
use App\Models\Destination;
use App\Services\SeoService;
use Illuminate\Support\Facades\Log;

class ContentController extends Controller
{
    /**
     * Display a listing of the contents.
     */
    public function index(Request $request, SeoService $seoService)
    {
        $filters = $request->only(['category', 'destination', 'search']);

        $query = Content::query();

        // Kategoriye göre filtreleme
        if ($filters['category'] ?? false) {
            $query->whereHas('contentCategories', function ($q) use ($filters) {
                $q->where('slug', $filters['category']);
            });
        }

        // Destinasyona göre filtreleme
        if ($filters['destination'] ?? false) {
            $query->whereHas('destinations', function ($q) use ($filters) {
                $q->where('slug', $filters['destination']);
            });
        }

        // Arama terimine göre filtreleme
        if ($filters['search'] ?? false) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('summary', 'like', '%' . $filters['search'] . '%');
            });
        }

        $contents = $query->with(['contentCategories', 'destinations', 'image'])
                            ->orderByDesc('published_at')
                            ->paginate(10)
                            ->through(function ($content) {
                                return [
                                    'id' => $content->id,
                                    'title' => $content->title,
                                    'slug' => $content->slug,
                                    'summary' => $content->summary,
                                    'content' => $content->content,
                                    'published_at' => $content->published_at,
                                    'image' => $content->image ? [
                                        'original_url' => $content->image->original_url,
                                        'thumbnail_url' => $content->image->thumbnail_url,
                                    ] : null,
                                    'content_categories' => $content->contentCategories->map(fn($cat) => ['id' => $cat->id, 'name' => $cat->name, 'slug' => $cat->slug]),
                                    'destinations' => $content->destinations->map(fn($dest) => ['id' => $dest->id, 'name' => $dest->name, 'slug' => $dest->slug]),
                                ];
                            })
                            ->withQueryString();

        $contentCategories = ContentCategory::all();
        $destinations = Destination::all();

        return Inertia::render('Contents', [
            'seo' => $seoService->generateForPage('contents.index'),
            'posts' => $contents,
            'categories' => $contentCategories,
            'destinations' => $destinations,
            'filters' => $filters,
        ]);
    }

    /**
     * Display the specified content.
     */
    public function show(string $slug, SeoService $seoService) // Content $content yerine string $slug
    {
        // Slug'a göre içeriği bul
        $content = Content::where('slug', $slug)->first();

        // Eğer içerik bulunamazsa hata logu ve yönlendirme
        if (!$content) {
            Log::warning('Content not found for slug: ' . $slug);
            // İstersen burada bir 404 sayfası döndürebilirsin veya ana sayfaya yönlendirebilirsin
            // return Inertia::render('Error', ['status' => 404]);
            // return redirect()->route('home');
            return Inertia::render('ContentDetail', [
                'seo' => $seoService->generateForPage('contents.index'), // Varsayılan SEO
                'post' => null, // Post verisi yok
                'relatedPosts' => [],
                'allCategories' => ContentCategory::all(['id', 'name', 'slug']),
                'allDestinations' => Destination::all(['id', 'name', 'slug']),
            ]);
        }

        // İçeriği ilişkili verilerle birlikte yükle
        $content->load(['contentCategories', 'destinations', 'image']);

        // Hata ayıklama için içeriğin tamamını loglayalım
        Log::info('Content Detail Page Data for ID: ' . ($content->id ?? 'N/A') . ' and Image ID: ' . ($content->image_id ?? 'N/A'), $content->toArray());

        // İlgili içerikleri al (aynı kategorideki diğer yazılar)
        $relatedContents = Content::where('id', '!=', $content->id)
            ->whereHas('contentCategories', function ($query) use ($content) {
                $query->whereIn('id', $content->contentCategories->pluck('id'));
            })
            ->with('image')
            ->orderByDesc('published_at')
            ->limit(5)
            ->get()
            ->map(function ($related) {
                return [
                    'id' => $related->id,
                    'title' => $related->title,
                    'slug' => $related->slug,
                    'image_thumbnail' => $related->image ? $related->image->thumbnail_url : null,
                ];
            });

        // İçerik destinasyonlarıyla ilgili turları al
        $relatedTours = collect();
        if ($content->destinations->isNotEmpty()) {
            $relatedTours = \App\Models\Tour::whereHas('destinations', function ($query) use ($content) {
                $query->whereIn('id', $content->destinations->pluck('id'));
            })
            ->with('featuredMedia')
            ->where('is_published', true)
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(function ($tour) {
                return [
                    'id' => $tour->id,
                    'title' => $tour->title,
                    'slug' => $tour->slug,
                    'image_thumbnail' => $tour->featuredMedia ? $tour->featuredMedia->thumbnail_url : null,
                ];
            });
        }

        // Son içerikleri al (mevcut içerik hariç)
        $recentContents = Content::where('id', '!=', $content->id)
            ->with('image')
            ->orderByDesc('published_at')
            ->limit(5)
            ->get()
            ->map(function ($recent) {
                return [
                    'id' => $recent->id,
                    'title' => $recent->title,
                    'slug' => $recent->slug,
                    'image_thumbnail' => $recent->image ? $recent->image->thumbnail_url : null,
                ];
            });

        // Tüm kategorileri ve destinasyonları al
        $allCategories = ContentCategory::all(['id', 'name', 'slug']);
        $allDestinations = Destination::all(['id', 'name', 'slug']);

        // Inertia'ya verileri gönder
        return Inertia::render('ContentDetail', [
            'seo' => [
                'title' => $content->seo_title,
                'description' => $content->seo_description,
                'og_title' => $content->og_title,
                'og_description' => $content->og_description,
                'og_image' => $content->og_image,
                'og_url' => $content->og_url,
            ],
            'post' => [
                'id' => $content->id,
                'title' => $content->title,
                'slug' => $content->slug,
                'summary' => $content->summary,
                'content' => $content->content,
                'published_at' => $content->published_at,
                'image' => $content->image ? [
                    'original_url' => $content->image->original_url,
                    'thumbnail_url' => $content->image->thumbnail_url,
                ] : null,
                'image_original_url' => $content->image ? $content->image->original_url : null,
                'image_thumbnail_url' => $content->image ? $content->image->thumbnail_url : null,
                'content_categories' => $content->contentCategories->map(fn($cat) => ['id' => $cat->id, 'name' => $cat->name, 'slug' => $cat->slug]),
                'destinations' => $content->destinations->map(fn($dest) => ['id' => $dest->id, 'name' => $dest->name, 'slug' => $dest->slug]),
            ],
            'relatedPosts' => $relatedContents,
            'relatedTours' => $relatedTours, // Yeni eklenen
            'recentContents' => $recentContents, // Yeni eklenen
            'allCategories' => $allCategories,
            'allDestinations' => $allDestinations,
        ]);
    }
}
