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
        // 'tours' tablosuna SEO sütunlarını ekle
        Schema::table('tours', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('slug');
            $table->text('meta_description')->nullable()->after('meta_title');
        });

        // 'contents' tablosuna SEO sütunlarını ekle
        Schema::table('contents', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('slug');
            $table->text('meta_description')->nullable()->after('meta_title');
        });

        // 'destinations' tablosuna SEO sütunlarını ekle
        Schema::table('destinations', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('slug');
            $table->text('meta_description')->nullable()->after('meta_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 'tours' tablosundan SEO sütunlarını kaldır
        Schema::table('tours', function (Blueprint $table) {
            $table->dropColumn(['meta_title', 'meta_description']);
        });

        // 'contents' tablosundan SEO sütunlarını kaldır
        Schema::table('contents', function (Blueprint $table) {
            $table->dropColumn(['meta_title', 'meta_description']);
        });

        // 'destinations' tablosundan SEO sütunlarını kaldır
        Schema::table('destinations', function (Blueprint $table) {
            $table->dropColumn(['meta_title', 'meta_description']);
        });
    }
};
