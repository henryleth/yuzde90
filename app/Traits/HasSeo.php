<?php

namespace App\Traits;

use App\Services\SeoService;

trait HasSeo
{
    /**
     * Get the model's SEO title.
     *
     * @return string
     */
    public function getSeoTitleAttribute(): string
    {
        $seoService = app(SeoService::class);

        // 1. Modele özel meta_title varsa onu kullan
        if (!empty($this->meta_title)) {
            return $seoService->replacePlaceholders($this->meta_title, $this->toArray());
        }

        // 2. Yoksa, genel ayarlardan şablonu çek
        $key = 'seo.' . $this->getSeoKeyPrefix() . '.title';
        $template = $seoService->get($key);

        // Şablon varsa ve boş değilse, onu kullan
        if (!empty($template)) {
            return $seoService->replacePlaceholders($template, $this->toArray());
        }

        // 3. O da yoksa, modelin kendi başlığını (title/name) fallback olarak kullan
        $defaultTitle = $this->title ?? $this->name ?? '';
        return $seoService->replacePlaceholders('{site_title} | {tour_title}', ['title' => $defaultTitle]);
    }

    /**
     * Get the model's SEO description.
     *
     * @return string
     */
    public function getSeoDescriptionAttribute(): string
    {
        $seoService = app(SeoService::class);

        // 1. Modele özel meta_description varsa onu kullan
        if (!empty($this->meta_description)) {
            return $seoService->replacePlaceholders($this->meta_description, $this->toArray());
        }

        // 2. Yoksa, genel ayarlardan şablonu çek
        $key = 'seo.' . $this->getSeoKeyPrefix() . '.description';
        $template = $seoService->get($key);

        if (!empty($template)) {
            return $seoService->replacePlaceholders($template, $this->toArray());
        }

        // 3. O da yoksa, modelin özetinden (summary) bir parça al
        if (!empty($this->summary)) {
            return \Illuminate\Support\Str::limit(strip_tags($this->summary), 160);
        }

        // 4. O da yoksa, ana içerikten (content/description) bir parça al (nihai fallback)
        $content = $this->content ?? $this->description ?? '';
        if (!empty($content)) {
            return \Illuminate\Support\Str::limit(strip_tags($content), 160);
        }
        
        return '';
    }


    /**
     * Modelin SEO ayar anahtarı için ön ekini döndürür.
     * Bu metodun her modelde implemente edilmesi gerekir.
     * 
     * @return string
     */
    abstract protected function getSeoKeyPrefix(): string;

    /**
     * Get the model's Open Graph title.
     */
    public function getOgTitleAttribute(): string
    {
        return $this->getSeoTitleAttribute(); // SEO title'ı OG title olarak kullan
    }

    /**
     * Get the model's Open Graph description.
     */
    public function getOgDescriptionAttribute(): string
    {
        return $this->getSeoDescriptionAttribute(); // SEO description'ı OG description olarak kullan
    }

    /**
     * Get the model's Open Graph image.
     */
    public function getOgImageAttribute(): ?string
    {
        $seoService = app(SeoService::class);

        // Modele bağlı olarak öne çıkan görseli bul
        if ($this->featuredMedia) {
            return $this->featuredMedia->original_url;
        }
        if ($this->image) {
            return $this->image->original_url;
        }
        
        return $seoService->get('seo.defaults.image') ?: null;
    }

    /**
     * Get the model's canonical URL for Open Graph.
     */
    public function getOgUrlAttribute(): string
    {
        // Modelin rotasına göre tam URL'yi oluştur
        $routeName = $this->getSeoKeyPrefix();
        if (\Illuminate\Support\Facades\Route::has($routeName)) {
            return route($routeName, $this->slug);
        }
        return url()->current();
    }
}
