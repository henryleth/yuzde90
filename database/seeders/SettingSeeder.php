<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::updateOrCreate(
            ['key' => 'admin_email'],
            ['value' => 'admin@example.com']
        );

        Setting::updateOrCreate(
            ['key' => 'site_name'],
            ['value' => 'Yüzde 90']
        );

        Setting::updateOrCreate(
            ['key' => 'contact_phone'],
            ['value' => '+90 555 123 45 67']
        );

        Setting::updateOrCreate(
            ['key' => 'contact_address'],
            ['value' => 'Örnek Mah. Örnek Cad. No:123, Örnek İlçe, Örnek Şehir']
        );

        Setting::updateOrCreate(
            ['key' => 'social_facebook'],
            ['value' => 'https://facebook.com/yuzde90']
        );

        Setting::updateOrCreate(
            ['key' => 'social_twitter'],
            ['value' => 'https://twitter.com/yuzde90']
        );

        Setting::updateOrCreate(
            ['key' => 'social_instagram'],
            ['value' => 'https://instagram.com/yuzde90']
        );

        Setting::updateOrCreate(
            ['key' => 'social_linkedin'],
            ['value' => 'https://linkedin.com/yuzde90']
        );

        Setting::updateOrCreate(
            ['key' => 'seo.defaults.title'],
            ['value' => 'TUR10']
        );

        Setting::updateOrCreate(
            ['key' => 'seo.defaults.description'],
            ['value' => null]
        );

        Setting::updateOrCreate(
            ['key' => 'seo.tours.index.title'],
            ['value' => 'Turlar']
        );

        Setting::updateOrCreate(
            ['key' => 'seo.tours.index.description'],
            ['value' => null]
        );

        Setting::updateOrCreate(
            ['key' => 'seo.tour.show.title'],
            ['value' => 'T: {tour_title}']
        );

        Setting::updateOrCreate(
            ['key' => 'seo.tour.show.description'],
            ['value' => null]
        );

        Setting::updateOrCreate(
            ['key' => 'seo.contents.index.title'],
            ['value' => 'İçerikler']
        );

        Setting::updateOrCreate(
            ['key' => 'seo.contents.index.description'],
            ['value' => null]
        );

        Setting::updateOrCreate(
            ['key' => 'seo.content.show.title'],
            ['value' => 'İ: {content_title}']
        );

        Setting::updateOrCreate(
            ['key' => 'seo.content.show.description'],
            ['value' => null]
        );

        Setting::updateOrCreate(
            ['key' => 'seo.destinations.index.title'],
            ['value' => 'Destinasyonlar']
        );

        Setting::updateOrCreate(
            ['key' => 'seo.destinations.index.description'],
            ['value' => null]
        );

        Setting::updateOrCreate(
            ['key' => 'seo.destination.show.title'],
            ['value' => 'D: {destination_name}']
        );

        Setting::updateOrCreate(
            ['key' => 'seo.destination.show.description'],
            ['value' => null]
        );
    }
}