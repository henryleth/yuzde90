<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:user-management');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Kullanıcıları rolleriyle birlikte ve sayfalanmış olarak alıyoruz.
        $users = User::with('roles')->paginate(10);
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Tüm rolleri alıp view'e gönderiyoruz.
        return Inertia::render('Admin/Users/Create', [
            'roles' => Role::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Gelen veriyi doğruluyoruz.
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'roles' => ['required', 'array']
        ]);

        // Yeni kullanıcıyı oluşturuyoruz.
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
        ]);

        // Kullanıcıya seçilen rolleri atıyoruz.
        $user->syncRoles($request->roles);

        return redirect()->route('admin.users.index')->with('success', 'Kullanıcı başarıyla oluşturuldu.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // Kullanıcının mevcut rollerini ve tüm rolleri view'e gönderiyoruz.
        $user->load('roles');
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => Role::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // Gelen veriyi doğruluyoruz.
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'roles' => ['required', 'array'],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        // Kullanıcı bilgilerini güncelliyoruz.
        $user->update($request->only('name', 'email', 'phone'));

        // Eğer yeni bir şifre girildiyse, onu da güncelliyoruz.
        if ($request->filled('password')) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        // Kullanıcının rollerini güncelliyoruz.
        $user->syncRoles($request->roles);

        return redirect()->route('admin.users.index')->with('success', 'Kullanıcı başarıyla güncellendi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Kendini silmesini engelle
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.users.index')->with('error', 'Kendinizi silemezsiniz.');
        }
        
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'Kullanıcı başarıyla silindi.');
    }
}
