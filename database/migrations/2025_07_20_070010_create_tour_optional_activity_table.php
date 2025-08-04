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
        Schema::create('tour_optional_activity', function (Blueprint $table) {
            $table->foreignId('tour_id')->constrained('tours')->onDelete('cascade');
            $table->foreignId('optional_activity_id')->constrained('optional_activities')->onDelete('cascade');
            $table->primary(['tour_id', 'optional_activity_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tour_optional_activity');
    }
};
