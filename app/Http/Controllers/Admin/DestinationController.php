<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\Media;
use App\Models\Tour; // Tour modeli eklendi
use App\Models\Content; // Content modeli eklendi
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Traits\HandlesMediaUploads;
use Illuminate\Support\Facades\DB; // DB Facade eklendi

class DestinationController extends Controller
{
    use HandlesMediaUploads;

    public function __construct()
    {
        $this->middleware('can:destination-management');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $destinations = Destination::with('image')->latest()->paginate(10);
        return Inertia::render('Admin/Destinations/Index', [
            'destinations' => $destinations->through(function ($destination) {
                return [
                    'id' => $destination->id,
                    'name' => $destination->name,
                    'slug' => $destination->slug,
                    'image_id' => $destination->image_id,
                    'image' => $destination->image ? [
                        'id' => $destination->image->id,
                        'file_name' => $destination->image->file_name,
                        'original_url' => $destination->image->original_url,
                        'thumbnail_url' => $destination->image->thumbnail_url,
                    ] : null,
                ];
            }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Destinations/Edit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:destinations',
            'summary' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_id' => 'nullable|exists:media,id',
            'is_popular' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        try {
            $destination = Destination::create($validated);

            // Eğer image_id varsa, destinasyon ile ilişkilendir
            if (isset($validated['image_id'])) {
                $media = Media::find($validated['image_id']);
                if ($media) {
                    $destination->image()->associate($media);
                    $destination->save();
                }
            }

            return redirect()->back()->with('success', 'Destinasyon başarıyla oluşturuldu.');
        } catch (\Exception $e) {
            Log::error('Destinasyon oluşturma hatası: ' . $e->getMessage());
            return redirect()->back()->withErrors(['general' => 'Destinasyon oluşturulurken bir hata oluştu.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Destination $destination)
    {
        $destination->load('image'); // Destinasyon ile ilişkili görseli yükle
        return Inertia::render('Admin/Destinations/Edit', [
            'destination' => $destination,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Destination $destination)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('destinations')->ignore($destination->id)],
            'summary' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_id' => 'nullable|exists:media,id',
            'is_popular' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        try {
            $destination->update($validated);

            // Eğer image_id varsa, destinasyon ile ilişkilendir veya kaldır
            if (isset($validated['image_id'])) {
                $media = Media::find($validated['image_id']);
                if ($media) {
                    $destination->image()->associate($media);
                } else {
                    $destination->image()->dissociate();
                }
                $destination->save();
            } else {
                // image_id null gelirse mevcut ilişkiyi kaldır
                $destination->image()->dissociate();
                $destination->save();
            }

            return redirect()->route('admin.destinations.index')->with('success', 'Destinasyon başarıyla güncellendi.');
        } catch (\Exception $e) {
            Log::error('Destinasyon güncelleme hatası: ' . $e->getMessage());
            return redirect()->back()->withErrors(['general' => 'Destinasyon güncellenirken bir hata oluştu.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Destination $destination)
    {
        DB::transaction(function () use ($destination) {
            // İlişkili Tour, Content ve Media kayıtlarındaki destination_id'yi null yap
            // Tour ve Content modelleri için pivot tablodaki ilişkileri kaldır
            $destination->tours()->detach();
            $destination->contents()->detach();

            // Media kayıtlarındaki destination_id'yi null yap
            Media::where('destination_id', $destination->id)->update(['destination_id' => null]);

            $destination->delete();
        });

        return redirect()->back()->with('success', 'Destinasyon başarıyla silindi.');
    }
}
