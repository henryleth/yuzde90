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
        Schema::dropIfExists('seasons');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('seasons', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('months')->nullable();
            $table->timestamps();
        });
    }
};
