<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;

class SeoService
{
    protected $settings;

    public function __construct()
    {
        // HATA AYIKLAMA: Önbelleği tamamen devre dışı bırak ve her istekte veritabanından oku.
        $this->settings = Setting::all()->pluck('value', 'key')->all();
    }

    /**
     * Belirtilen anahtar için SEO ayarını alır.
     */
    public function get(string $key, string $default = ''): string
    {
        return $this->settings[$key] ?? $default;
    }

    /**
     * Bir şablondaki yer tutucuları verilen verilerle değiştirir.
     */
    public function replacePlaceholders(string $template, array $data = []): string
    {
        $siteTitle = $this->get('seo.defaults.title', config('app.name', 'Laravel'));

        $replacements = [
            '{site_title}' => $siteTitle,
            '{tour_title}' => $data['title'] ?? '',
            '{tour_summary}' => $data['summary'] ?? '',
            '{content_title}' => $data['title'] ?? '',
            '{content_summary}' => $data['summary'] ?? '',
            '{destination_name}' => $data['name'] ?? '',
            '{destination_description}' => $data['description'] ?? '',
        ];

        return str_replace(array_keys($replacements), array_values($replacements), $template);
    }

    /**
     * Listeleme sayfaları gibi, modele bağlı olmayan sayfalar için SEO verilerini oluşturur.
     */
    public function generateForPage(string $pageKey): array
    {
        // Sayfaya özel başlık şablonunu al, yoksa genel varsayılanı kullan.
        $titleTemplate = $this->get("seo.{$pageKey}.title");
        if (empty($titleTemplate)) {
            $titleTemplate = $this->get('seo.defaults.title', config('app.name'));
        }

        // Sayfaya özel açıklama şablonunu al, yoksa genel varsayılanı kullan.
        $descriptionTemplate = $this->get("seo.{$pageKey}.description");
        if (empty($descriptionTemplate)) {
            $descriptionTemplate = $this->get('seo.defaults.description', '');
        }

        $title = $this->replacePlaceholders($titleTemplate);
        $description = $this->replacePlaceholders($descriptionTemplate);

        return [
            'title' => $title,
            'description' => $description,
            'og_title' => $title,
            'og_description' => $description,
            'og_image' => $this->get('seo.defaults.image'),
            'og_url' => url()->current(),
        ];
    }

    /**
     * Eloquent modeli gibi dinamik bir veri kaynağına dayalı sayfalar için SEO verilerini oluşturur.
     */
    public function generateForModel($model): array
    {
        // Modelin sınıf adından SEO anahtarını belirle (örn: 'App\Models\Tour' -> 'tour')
        $modelType = strtolower(class_basename($model));
        $pageKey = "{$modelType}.show";

        // Modelin kendi SEO alanlarını (HasSeo trait'inden gelen) veya veritabanındaki şablonları kullan
        $titleTemplate = $model->seo_title ?: $this->get("seo.{$pageKey}.title", '{' . $modelType . '_title} | {site_title}');
        $descriptionTemplate = $model->seo_description ?: $this->get("seo.{$pageKey}.description", '{' . $modelType . '_summary}');

        // Model verilerini diziye çevirerek yer tutucuları doldur
        $modelData = $model->toArray();
        $title = $this->replacePlaceholders($titleTemplate, $modelData);
        $description = $this->replacePlaceholders($descriptionTemplate, $modelData);

        // Open Graph (OG) etiketleri için modelin kendi alanlarını önceliklendir
        $ogTitle = $model->og_title ?: $title;
        $ogDescription = $model->og_description ?: $description;
        
        // Farklı medya ilişki adlarını kontrol et (featuredMedia, image)
        $media = $model->featuredMedia ?? $model->image ?? null;
        $ogImage = $model->og_image ?: ($media->original_url ?? $this->get('seo.defaults.image'));

        return [
            'title' => $title,
            'description' => $description,
            'og_title' => $ogTitle,
            'og_description' => $ogDescription,
            'og_image' => $ogImage,
            'og_url' => url()->current(),
        ];
    }
}
