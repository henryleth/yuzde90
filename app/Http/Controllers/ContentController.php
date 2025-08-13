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

        $query = Content::query()->select([
            'id', 'title', 'slug', 'summary', 'content', 'published_at', 'image_id'
        ]);

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

        $contents = $query->with([
                                'contentCategories:id,name,slug', 
                                'destinations:id,name,slug', 
                                'image:id,disk,file_name,path'
                            ])
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

        $contentCategories = ContentCategory::select(['id', 'name', 'slug'])->get();
        $destinations = Destination::select(['id', 'name', 'slug'])->get();

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
    public function show(string $slug, SeoService $seoService)
    {
        $content = Content::where('slug', $slug)
            ->with([
                'contentCategories:id,name,slug', 
                'destinations:id,name,slug', 
                'image:id,disk,file_name,path'
            ])
            ->first();

        if (!$content) {
            return Inertia::render('ContentDetail', [
                'seo' => $seoService->generateForPage('contents.index'),
                'post' => null,
                'relatedPosts' => [],
                'allCategories' => ContentCategory::select(['id', 'name', 'slug'])->get(),
                'allDestinations' => Destination::select(['id', 'name', 'slug'])->get(),
            ]);
        }

        $categoryIds = $content->contentCategories->pluck('id');
        $destinationIds = $content->destinations->pluck('id');

        $relatedContents = Content::select(['id', 'title', 'slug', 'image_id'])
            ->where('id', '!=', $content->id)
            ->whereHas('contentCategories', fn($q) => $q->whereIn('id', $categoryIds))
            ->with('image:id,disk,file_name,path')
            ->orderByDesc('published_at')
            ->limit(5)
            ->get()
            ->map(fn ($related) => [
                'id' => $related->id,
                'title' => $related->title,
                'slug' => $related->slug,
                'image_thumbnail_url' => $related->image->thumbnail_url ?? null,
            ]);

        $relatedTours = collect();
        if ($destinationIds->isNotEmpty()) {
            $relatedTours = \App\Models\Tour::select(['id', 'title', 'slug', 'featured_media_id'])
                ->whereHas('destinations', fn($q) => $q->whereIn('id', $destinationIds))
                ->with('featuredMedia:id,disk,file_name,path')
                ->where('is_published', true)
                ->orderByDesc('created_at')
                ->limit(5)
                ->get()
                ->map(fn ($tour) => [
                    'id' => $tour->id,
                    'title' => $tour->title,
                    'slug' => $tour->slug,
                    'image_thumbnail' => $tour->featuredMedia->thumbnail_url ?? null,
                ]);
        }

        $recentContents = Content::select(['id', 'title', 'slug', 'image_id'])
            ->where('id', '!=', $content->id)
            ->with('image:id,disk,file_name,path')
            ->orderByDesc('published_at')
            ->limit(5)
            ->get()
            ->map(fn ($recent) => [
                'id' => $recent->id,
                'title' => $recent->title,
                'slug' => $recent->slug,
                'image_thumbnail_url' => $recent->image->thumbnail_url ?? null,
            ]);

        return Inertia::render('ContentDetail', [
            'seo' => $seoService->generateForModel($content),
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
                'image_original_url' => $content->image->original_url ?? null,
                'image_thumbnail_url' => $content->image->thumbnail_url ?? null,
                'content_categories' => $content->contentCategories->map(fn($cat) => ['id' => $cat->id, 'name' => $cat->name, 'slug' => $cat->slug]),
                'destinations' => $content->destinations->map(fn($dest) => ['id' => $dest->id, 'name' => $dest->name, 'slug' => $dest->slug]),
            ],
            'relatedPosts' => $relatedContents,
            'relatedTours' => $relatedTours,
            'recentContents' => $recentContents,
            'allCategories' => ContentCategory::select(['id', 'name', 'slug'])->get(),
            'allDestinations' => Destination::select(['id', 'name', 'slug'])->get(),
        ]);
    }
}
