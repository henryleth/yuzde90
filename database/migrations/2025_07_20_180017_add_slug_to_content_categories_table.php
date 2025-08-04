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
        Schema::table('content_categories', function (Blueprint $table) {
            $table->string('slug')->unique()->after('name'); // 'name' sütunundan sonra slug ekle
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('content_categories', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
