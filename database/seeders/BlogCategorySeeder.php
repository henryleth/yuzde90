<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Gezi Rehberi', 'slug' => 'gezi-rehberi'],
            ['name' => 'Deneyim', 'slug' => 'deneyim'],
            ['name' => 'Kültür', 'slug' => 'kultur'],
            ['name' => 'Gastronomi', 'slug' => 'gastronomi'],
        ];

        foreach ($categories as $category) {
            BlogCategory::firstOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
