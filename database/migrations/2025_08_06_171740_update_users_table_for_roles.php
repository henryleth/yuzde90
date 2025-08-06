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
        Schema::table('users', function (Blueprint $table) {
            // Telefon numarasını saklamak için nullable bir sütun ekliyoruz.
            // Opsiyonel olduğu için boş bırakılabilir.
            $table->string('phone')->nullable()->after('email');

            // E-posta doğrulama sütununu kaldırıyoruz çünkü kullanılmayacak.
            if (Schema::hasColumn('users', 'email_verified_at')) {
                $table->dropColumn('email_verified_at');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Geri alma işleminde 'phone' sütununu kaldırıyoruz.
            if (Schema::hasColumn('users', 'phone')) {
                $table->dropColumn('phone');
            }

            // E-posta doğrulama sütununu geri ekliyoruz.
            $table->timestamp('email_verified_at')->nullable();
        });
    }
};
