<?php

namespace App\Console\Commands;

use App\Models\Content;
use Illuminate\Console\Command;

class CleanContentLinks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'content:clean-links';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mevcut içeriklerdeki link attribute\'larını temizler (target="_blank" ve rel="noopener noreferrer")';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('İçerik link attribute\'ları temizleniyor...');
        
        $contents = Content::whereNotNull('content')->get();
        $updatedCount = 0;
        
        $bar = $this->output->createProgressBar($contents->count());
        $bar->start();
        
        foreach ($contents as $content) {
            $originalContent = $content->content;
            $cleanedContent = $this->cleanLinkAttributes($originalContent);
            
            if ($originalContent !== $cleanedContent) {
                $content->update(['content' => $cleanedContent]);
                $updatedCount++;
            }
            
            $bar->advance();
        }
        
        $bar->finish();
        
        $this->newLine(2);
        $this->info("Toplam {$contents->count()} içerik kontrol edildi.");
        $this->info("{$updatedCount} içerik güncellendi.");
        
        if ($updatedCount > 0) {
            $this->comment('Güncellenen içerikler:');
            
            Content::whereNotNull('content')->get()->each(function ($content) {
                if (strpos($content->content, 'target=') === false && strpos($content->content, 'rel=') === false) {
                    // Bu içerik temizlenmiş olabilir, kontrol et
                    $this->line("- {$content->title}");
                }
            });
        }
        
        $this->success('Link attribute\'ları başarıyla temizlendi!');
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
