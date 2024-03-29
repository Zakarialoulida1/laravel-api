<?php

namespace Database\Factories;

use App\Models\Itinerary;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItineraryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Itinerary::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(), // Assuming you have a User model
            'title' => $this->faker->sentence,
            'category_id' => \App\Models\Category::factory(), // Assuming you have a Category model
            'duration' => $this->faker->randomNumber(2),
            'image' => $this->faker->imageUrl(),
            // Other attributes as needed
        ];
    }
}
