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
        // tours tablosuna hotels (JSON) sütunu ekle
        Schema::table('tours', function (Blueprint $table) {
            $table->json('hotels')->nullable()->after('is_popular'); // JSON sütunu ekliyorum
        });

        // hotels tablosunu kaldır
        Schema::dropIfExists('hotels');

        // tour_hotels ara tablosunu kaldır
        Schema::dropIfExists('tour_hotels');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // hotels sütununu tours tablosundan kaldır
        Schema::table('tours', function (Blueprint $table) {
            $table->dropColumn('hotels');
        });

        // hotels tablosunu yeniden oluştur (rollback için)
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('city')->nullable();
            $table->string('category')->nullable();
            $table->timestamps();
        });

        // tour_hotels tablosunu yeniden oluştur (rollback için)
        Schema::create('tour_hotels', function (Blueprint $table) {
            $table->foreignId('tour_id')->constrained()->onDelete('cascade');
            $table->foreignId('hotel_id')->constrained()->onDelete('cascade');
            $table->string('category')->nullable(); // Pivot tabloya category alanı eklenmişti
            $table->primary(['tour_id', 'hotel_id']);
        });
    }
};
