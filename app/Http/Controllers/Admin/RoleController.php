<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:role-management');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Rolleri yetkileriyle birlikte ve sayfalanmış olarak alıyoruz.
        $roles = Role::with('permissions')->paginate(10);
        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Tüm yetkileri alıp view'e gönderiyoruz.
        return Inertia::render('Admin/Roles/Create', [
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Gelen veriyi doğruluyoruz.
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => ['sometimes', 'array']
        ]);

        // Yeni rolü oluşturuyoruz.
        $role = Role::create(['name' => $request->name]);

        // Role seçilen yetkileri atıyoruz.
        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return redirect()->route('admin.roles.index')->with('success', 'Rol başarıyla oluşturuldu.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        // Rolün mevcut yetkilerini ve tüm yetkileri view'e gönderiyoruz.
        $role->load('permissions');
        return Inertia::render('Admin/Roles/Edit', [
            'role' => $role,
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        // Gelen veriyi doğruluyoruz.
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'permissions' => ['sometimes', 'array']
        ]);

        // Rolü güncelliyoruz.
        $role->update(['name' => $request->name]);
        
        // Rolün yetkilerini güncelliyoruz.
        $role->syncPermissions($request->permissions);

        return redirect()->route('admin.roles.index')->with('success', 'Rol başarıyla güncellendi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        // 'Admin' rolünün silinmesini engelle
        if ($role->name === 'Admin') {
            return redirect()->route('admin.roles.index')->with('error', 'Admin rolü silinemez.');
        }

        $role->delete();
        return redirect()->route('admin.roles.index')->with('success', 'Rol başarıyla silindi.');
    }
}
