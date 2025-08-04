<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ContentCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = ContentCategory::latest()->paginate(10);
        return response()->json($categories); // Inertia.render yerine JSON döndürüldü
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() { /* Boş */ }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:content_categories',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        try {
            ContentCategory::create($validated);
            return redirect()->back()->with('success', 'Kategori başarıyla oluşturuldu.');
        } catch (\Exception $e) {
            Log::error('Kategori oluşturma hatası: ' . $e->getMessage());
            return redirect()->back()->withErrors(['general' => 'Kategori oluşturulurken bir hata oluştu.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) { /* Boş */ }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) { /* Boş */ }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ContentCategory $contentCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('content_categories')->ignore($contentCategory->id)],
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        try {
            $contentCategory->update($validated);
            return redirect()->back()->with('success', 'Kategori başarıyla güncellendi.');
        } catch (\Exception $e) {
            Log::error('Kategori güncelleme hatası: ' . $e->getMessage());
            return redirect()->back()->withErrors(['general' => 'Kategori güncellenirken bir hata oluştu.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContentCategory $contentCategory)
    {
        try {
            $contentCategory->delete();
            return redirect()->back()->with('success', 'Kategori başarıyla silindi.');
        } catch (\Exception $e) {
            Log::error('Kategori silme hatası: ' . $e->getMessage());
            return redirect()->back()->withErrors(['general' => 'Kategori silinirken bir hata oluştu.']);
        }
    }
}
