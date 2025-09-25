<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OptionalActivity;
use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OptionalActivityController extends Controller
{
    public function index()
    {
        $activities = OptionalActivity::with('image')->latest()->paginate(10);
        return Inertia::render('Admin/OptionalActivities/Index', [
            'activities' => $activities->through(function ($activity) {
                return [
                    'id' => $activity->id,
                    'name' => $activity->name,
                    'price' => $activity->price,
                    'is_published' => $activity->is_published,
                    'image' => $activity->image ? [
                        'thumbnail_url' => $activity->image->thumbnail_url,
                    ] : null,
                ];
            }),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/OptionalActivities/Create', [
            'media_files' => Media::all()->map(fn($media) => [
                'id' => $media->id,
                'file_name' => $media->file_name,
                'original_url' => $media->original_url,
                'thumbnail_url' => $media->thumbnail_url,
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:optional_activities',
            'description' => 'nullable|string',
            'price' => 'nullable|string|max:255',
            'is_published' => 'boolean',
            'image_id' => 'nullable|exists:media,id',
        ]);

        OptionalActivity::create($validated);

        return redirect()->route('admin.optional-activities.index')->with('success', 'Aktivite başarıyla oluşturuldu.');
    }

    public function edit(OptionalActivity $optionalActivity)
    {
        $optionalActivity->load('image');
        return Inertia::render('Admin/OptionalActivities/Edit', [
            'activity' => $optionalActivity,
            'media_files' => Media::all()->map(fn($media) => [
                'id' => $media->id,
                'file_name' => $media->file_name,
                'original_url' => $media->original_url,
                'thumbnail_url' => $media->thumbnail_url,
            ]),
        ]);
    }

    public function update(Request $request, OptionalActivity $optionalActivity)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('optional_activities')->ignore($optionalActivity->id)],
            'description' => 'nullable|string',
            'price' => 'nullable|string|max:255',
            'is_published' => 'boolean',
            'image_id' => 'nullable|exists:media,id',
        ]);

        $optionalActivity->update($validated);

        return redirect()->route('admin.optional-activities.index')->with('success', 'Aktivite başarıyla güncellendi.');
    }

    public function destroy(OptionalActivity $optionalActivity)
    {
        $optionalActivity->delete();
        return redirect()->route('admin.optional-activities.index')->with('success', 'Aktivite başarıyla silindi.');
    }
}
