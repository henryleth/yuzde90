<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Önceki çalıştırmalarda oluşturulmuş olabilecek rolleri ve yetkileri temizle
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Gerekli Yetkileri Oluştur
        $permissions = [
            'user-management',
            'role-management',
            'tour-management',
            'content-management',
            'destination-management',
            'settings-management',
            'reservation-management',
            'view-dashboard'
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Rolleri Oluştur ve Yetkileri Ata

        // Satış Rolü
        $salesRole = Role::firstOrCreate(['name' => 'Satış']);
        $salesRole->givePermissionTo([
            'view-dashboard',
            'reservation-management'
        ]);

        // Admin Rolü (Tüm yetkilere sahip)
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminRole->givePermissionTo(Permission::all());

        // Varsayılan Admin Kullanıcısını Oluştur
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('selimselim'),
            ]
        );
        $adminUser->assignRole($adminRole);
    }
}
