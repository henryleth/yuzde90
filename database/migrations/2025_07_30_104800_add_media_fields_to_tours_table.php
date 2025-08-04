<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            // featured_media_id sütunu ekle (media tablosuna yabancı anahtar)
            $table->foreignId('featured_media_id')
                  ->nullable()
                  ->constrained('media') // media tablosuna referans ver
                  ->onDelete('set null') // Medya silindiğinde bu alanı null yap
                  ->after('is_published'); // İstediğin bir sütundan sonra ekle

            // gallery_media_ids sütunu ekle (JSON tipi)
            $table->json('gallery_media_ids')->nullable()->after('featured_media_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            $table->dropForeign(['featured_media_id']);
            $table->dropColumn(['featured_media_id', 'gallery_media_ids']);
        });
    }
};
