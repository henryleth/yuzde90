<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // dd('DatabaseSeeder is running'); // Debugging için eklendi - Kaldırıldı

        // Yabancı anahtar kısıtlamalarını geçici olarak devre dışı bırak
        Schema::disableForeignKeyConstraints();

        // Mevcut kullanıcı seederını koruyun veya kaldırın ihtiyaca göre
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Yeni seederları çağır
        $this->call([
            RolesAndPermissionsSeeder::class, // Kullanıcı rolleri ve yetkileri için eklendi
            ContentCategorySeeder::class, // BlogCategorySeeder yerine ContentCategorySeeder
            DestinationSeeder::class,
            ContentSeeder::class, // PostSeeder yerine ContentSeeder
            TourSeeder::class,
            SettingSeeder::class, // Yeni eklenen SettingSeeder
        ]);

        // Yabancı anahtar kısıtlamalarını tekrar etkinleştir
        Schema::enableForeignKeyConstraints();
    }
}
