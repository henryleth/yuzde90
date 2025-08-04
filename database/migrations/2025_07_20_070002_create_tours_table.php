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
        Schema::create('tours', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // 'title' sütunu 'name' olarak değiştirildi
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->default(0.00); // price sütunu eklendi
            $table->integer('min_participants')->nullable();
            $table->integer('max_participants')->nullable();
            $table->integer('duration_days');
            $table->integer('duration_nights');
            $table->string('language');
            $table->decimal('rating', 3, 1)->nullable();
            $table->integer('reviews_count')->default(0);
            $table->boolean('is_published')->default(false);
            $table->text('inclusions_html')->nullable();
            $table->text('exclusions_html')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tours');
    }
};
