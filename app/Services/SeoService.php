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
}
