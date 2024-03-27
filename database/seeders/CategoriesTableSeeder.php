<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;



// database/seeders/CategoriesTableSeeder.php


use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        // Define categories
        $categories = [
            ['name' => 'Beach'],
            ['name' => 'Mountain'],
            ['name' => 'River'],
            ['name' => 'Monument'],
            // Add more categories as needed
        ];

        // Insert categories into the database
        Category::insert($categories);
    }
}

