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
        // Önce mevcut veriyi join ile al
        $oldData = DB::table('tour_pricing_tiers')
            ->join('seasons', 'tour_pricing_tiers.season_id', '=', 'seasons.id')
            ->select('tour_pricing_tiers.id', 'seasons.name as season_name', 'tour_pricing_tiers.category as category_name')
            ->get();

        Schema::table('tour_pricing_tiers', function (Blueprint $table) {
            // Yeni sütunları ekle
            $table->string('season_name')->after('tour_id')->nullable();
            $table->string('category_name')->after('season_name')->nullable();
            
            // Eski sütunu ve ilişkiyi kaldır
            if (Schema::hasColumn('tour_pricing_tiers', 'season_id')) {
                $table->dropForeign(['season_id']);
                $table->dropColumn('season_id');
            }
             if (Schema::hasColumn('tour_pricing_tiers', 'category')) {
                $table->dropColumn('category');
            }
        });

        // Yedeklenen veriyi yeni sütunlara yaz
        foreach ($oldData as $data) {
            DB::table('tour_pricing_tiers')
                ->where('id', $data->id)
                ->update([
                    'season_name' => $data->season_name,
                    'category_name' => $data->category_name,
                ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // down metodu için eski veriyi yedekle
        $oldData = DB::table('tour_pricing_tiers')->select('id', 'season_name', 'category_name')->get();

        Schema::table('tour_pricing_tiers', function (Blueprint $table) {
            if (!Schema::hasColumn('tour_pricing_tiers', 'season_id')) {
                $table->foreignId('season_id')->constrained('seasons')->onDelete('cascade');
            }
            if (!Schema::hasColumn('tour_pricing_tiers', 'category')) {
                $table->string('category');
            }
            $table->dropColumn(['season_name', 'category_name']);
        });

        // Geri alma işlemi için veriyi eski sütunlara yaz
        foreach ($oldData as $data) {
             // Sezon adından ID'yi bul veya oluştur
            $season = DB::table('seasons')->where('name', $data->season_name)->first();
            if (!$season) {
                $seasonId = DB::table('seasons')->insertGetId(['name' => $data->season_name]);
            } else {
                $seasonId = $season->id;
            }
            
            DB::table('tour_pricing_tiers')
                ->where('id', $data->id)
                ->update([
                    'season_id' => $seasonId,
                    'category' => $data->category_name,
                ]);
        }
    }
};
