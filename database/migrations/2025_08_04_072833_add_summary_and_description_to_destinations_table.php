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
        Schema::table('destinations', function (Blueprint $table) {
            // Özet alanı, kısa bir metin içerecek ve 'description' sütunundan sonra eklenecek.
            $table->string('summary')->nullable()->after('description');
            // Açıklama alanı, uzun metin içerecek ve 'summary' sütunundan sonra eklenecek.
            $table->text('description')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('destinations', function (Blueprint $table) {
            // Geri alma işleminde 'summary' sütununu kaldırır.
            $table->dropColumn('summary');
            // 'description' sütununu eski haline getirir (eğer bir değişiklik yapıldıysa).
            $table->text('description')->nullable(false)->change();
        });
    }
};
