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
     * Link attribute'larını temizleyen helper fonksiyon
     */
    private function cleanLinkAttributes($content)
    {
        if (empty($content)) {
            return $content;
        }

        // target="_blank" attribute'unu kaldır
        $content = preg_replace('/\s*target\s*=\s*["\'][^"\']*["\']/i', '', $content);
        
        // rel="noopener noreferrer" attribute'unu kaldır
        $content = preg_replace('/\s*rel\s*=\s*["\'][^"\']*["\']/i', '', $content);
        
        // Çift boşlukları tek boşluğa çevir
        $content = preg_replace('/\s+/', ' ', $content);
        
        // Link tag'lerindeki fazla boşlukları temizle
        $content = preg_replace('/<a\s+([^>]+)>/i', '<a $1>', $content);
        
        return $content;
    }
}
