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
        // Önce mevcut destination_id verilerini destination_ids'e taşı
        DB::table('media')
            ->whereNotNull('destination_id')
            ->whereNull('destination_ids')
            ->get()
            ->each(function ($media) {
                DB::table('media')
                    ->where('id', $media->id)
                    ->update([
                        'destination_ids' => json_encode([$media->destination_id])
                    ]);
            });

        // Sonra destination_id sütununu kaldır
        Schema::table('media', function (Blueprint $table) {
            $table->dropForeign(['destination_id']);
            $table->dropColumn('destination_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Geri alma işleminde destination_id sütununu tekrar ekle
        Schema::table('media', function (Blueprint $table) {
            $table->unsignedBigInteger('destination_id')->nullable()->after('tags');
            $table->foreign('destination_id')->references('id')->on('destinations')->onDelete('set null');
        });

        // destination_ids'deki ilk değeri destination_id'ye taşı
        DB::table('media')
            ->whereNotNull('destination_ids')
            ->get()
            ->each(function ($media) {
                $destination_ids = json_decode($media->destination_ids, true);
                if (!empty($destination_ids)) {
                    DB::table('media')
                        ->where('id', $media->id)
                        ->update([
                            'destination_id' => $destination_ids[0]
                        ]);
                }
            });
    }
};
