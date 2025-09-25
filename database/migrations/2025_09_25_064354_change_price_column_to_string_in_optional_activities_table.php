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
        Schema::table('optional_activities', function (Blueprint $table) {
            // Price sütununu string tipine değiştir
            $table->string('price', 255)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('optional_activities', function (Blueprint $table) {
            // Geri alma: price sütununu decimal tipine döndür
            $table->decimal('price', 10, 2)->nullable()->change();
        });
    }
};