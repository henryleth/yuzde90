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
        // Eğer mevcut 'media' tablosu varsa sil
        Schema::dropIfExists('media');

        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('file_name'); // Dosyanın sunucudaki gerçek adı
            $table->string('mime_type'); // Dosyanın MIME türü (image/jpeg, video/mp4 vb.)
            $table->string('path'); // Dosyanın disk üzerindeki göreceli yolu (örn: uploads/123/image.webp)
            $table->unsignedBigInteger('size'); // Dosya boyutu (bayt cinsinden)
            $table->string('disk')->default('public'); // Hangi depolama diskinde tutulduğu
            $table->json('tags')->nullable(); // Etiketler (JSON dizisi)

            // Destinasyon ilişkisi (opsiyonel)
            $table->foreignId('destination_id')->nullable()->constrained('destinations')->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
