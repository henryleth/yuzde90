<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('media', function (Blueprint $table) {
            // Yeni JSON sütunu ekle - birden fazla destinasyon ID'si tutabilir
            $table->json('destination_ids')->nullable()->after('destination_id');
        });

        // Mevcut destination_id verilerini destination_ids'e taşı
        DB::table('media')
            ->whereNotNull('destination_id')
            ->get()
            ->each(function ($media) {
                DB::table('media')
                    ->where('id', $media->id)
                    ->update([
                        'destination_ids' => json_encode([$media->destination_id])
                    ]);
            });

        // Eski destination_id sütununu kaldır (opsiyonel - şimdilik bırakıyoruz geriye uyumluluk için)
        // Schema::table('media', function (Blueprint $table) {
        //     $table->dropForeign(['destination_id']);
        //     $table->dropColumn('destination_id');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // destination_ids'deki ilk değeri destination_id'ye geri taşı
        DB::table('media')
            ->whereNotNull('destination_ids')
            ->get()
            ->each(function ($media) {
                $destinationIds = json_decode($media->destination_ids, true);
                if (!empty($destinationIds)) {
                    DB::table('media')
                        ->where('id', $media->id)
                        ->update([
                            'destination_id' => $destinationIds[0]
                        ]);
                }
            });

        Schema::table('media', function (Blueprint $table) {
            $table->dropColumn('destination_ids');
        });
    }
};