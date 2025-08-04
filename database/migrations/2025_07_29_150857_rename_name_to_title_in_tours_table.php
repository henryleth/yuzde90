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
            // 'name' sütununu 'title' olarak yeniden adlandır
            $table->renameColumn('name', 'title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            // Geri alma işlemi için 'title' sütununu tekrar 'name' olarak yeniden adlandır
            $table->renameColumn('title', 'name');
        });
    }
};
