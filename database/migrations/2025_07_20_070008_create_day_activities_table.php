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
        Schema::create('day_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tour_day_id')->constrained('tour_days')->onDelete('cascade');
            $table->integer('order');
            $table->text('description');
            $table->boolean('is_highlight')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('day_activities');
    }
};
