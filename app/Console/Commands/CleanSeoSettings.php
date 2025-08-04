<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Setting;
use Illuminate\Support\Facades\Cache;

class CleanSeoSettings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seo:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deletes all SEO-related settings from the database and clears the cache.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Deleting old SEO settings from the database...');
        
        // Deletes all settings where the key starts with 'seo.'
        $deletedRows = Setting::where('key', 'like', 'seo.%')->delete();
        
        // Also delete legacy keys that might not have the prefix
        $legacyKeys = [
            'tours.index.title', 'tours.index.description', 'tour.show.title', 'tour.show.description',
            'contents.index.title', 'contents.index.description', 'content.show.title', 'content.show.description',
            'destinations.index.title', 'destinations.index.description', 'destination.show.title', 'destination.show.description'
        ];
        $deletedLegacyRows = Setting::whereIn('key', $legacyKeys)->delete();

        $totalDeleted = $deletedRows + $deletedLegacyRows;

        if ($totalDeleted > 0) {
            $this->info("Successfully deleted {$totalDeleted} SEO setting(s).");
        } else {
            $this->comment('No old SEO settings found to delete.');
        }

        $this->info('Clearing SEO settings cache...');
        Cache::forget('seo_settings');
        $this->info('SEO settings cache cleared.');

        $this->comment('Please re-enter your desired SEO settings in the admin panel.');
        
        return 0;
    }
}
