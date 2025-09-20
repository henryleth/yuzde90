<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use App\Models\Content;
use App\Models\Destination;
use Illuminate\Http\Response;
use Carbon\Carbon;

class SitemapController extends Controller
{
    /**
     * Dinamik sitemap.xml oluşturur
     */
    public function index()
    {
        // XML header with stylesheet
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
        $xml .= 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

        // Ana sayfa
        $xml .= $this->createUrl(
            url('/'),
            Carbon::now()->toIso8601String(),
            'daily',
            '1.0'
        );

        // Statik sayfalar - dinamik route'lardan al
        $staticPages = [
            ['route' => 'tours.index', 'changefreq' => 'daily', 'priority' => '0.9'],
            ['route' => 'destinations.index', 'changefreq' => 'weekly', 'priority' => '0.8'],
            ['route' => 'contents.index', 'changefreq' => 'daily', 'priority' => '0.7'],
            ['route' => 'about.us', 'changefreq' => 'monthly', 'priority' => '0.5'],
            ['route' => 'contact.us', 'changefreq' => 'monthly', 'priority' => '0.5'],
        ];

        foreach ($staticPages as $page) {
            $xml .= $this->createUrl(
                route($page['route']),
                Carbon::now()->toIso8601String(),
                $page['changefreq'],
                $page['priority']
            );
        }

        // Turlar
        $tours = Tour::where('is_published', true)
            ->select(['slug', 'updated_at', 'featured_media_id'])
            ->with(['featuredMedia:id,path,file_name'])
            ->get();

        foreach ($tours as $tour) {
            $xml .= $this->createUrl(
                route('tour.show', $tour->slug),
                $tour->updated_at->toIso8601String(),
                'weekly',
                '0.9',
                $tour->featuredMedia ? url('storage/' . $tour->featuredMedia->path) : null
            );
        }

        // Destinasyonlar
        $destinations = Destination::select(['slug', 'updated_at', 'image_id'])
            ->with(['image:id,path,file_name'])
            ->get();

        foreach ($destinations as $destination) {
            $xml .= $this->createUrl(
                route('destinations.show', $destination->slug),
                $destination->updated_at->toIso8601String(),
                'weekly',
                '0.8',
                $destination->image ? url('storage/' . $destination->image->path) : null
            );
        }

        // Blog yazıları
        $contents = Content::whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->select(['slug', 'updated_at', 'image_id'])
            ->with(['image:id,path,file_name'])
            ->get();

        foreach ($contents as $content) {
            $xml .= $this->createUrl(
                route('contents.show', $content->slug),
                $content->updated_at->toIso8601String(),
                'monthly',
                '0.6',
                $content->image ? url('storage/' . $content->image->path) : null
            );
        }

        $xml .= '</urlset>';

        return response($xml, 200)
            ->header('Content-Type', 'application/xml');
    }

    /**
     * Sitemap URL elementi oluşturur
     */
    private function createUrl($loc, $lastmod, $changefreq = 'weekly', $priority = '0.5', $image = null)
    {
        $url = '<url>';
        $url .= '<loc>' . htmlspecialchars($loc) . '</loc>';
        $url .= '<lastmod>' . $lastmod . '</lastmod>';
        $url .= '<changefreq>' . $changefreq . '</changefreq>';
        $url .= '<priority>' . $priority . '</priority>';
        
        // Görsel varsa ekle
        if ($image) {
            $url .= '<image:image>';
            $url .= '<image:loc>' . htmlspecialchars($image) . '</image:loc>';
            $url .= '</image:image>';
        }
        
        
        $url .= '</url>';
        
        return $url;
    }
}
