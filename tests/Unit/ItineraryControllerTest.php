<?php

namespace Tests\Unit\Controllers;

use App\Models\Category;
use Tests\TestCase;
use App\Models\Itinerary;
use App\Models\User;
 use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Gate;

class ItineraryControllerTest extends TestCase
{
    use RefreshDatabase;

  /**
 * Test the index method.
 *
 * @return void
 */
public function test_index()
{
    // Create test itineraries using the ItineraryFactory
    $itinerary1 = Itinerary::factory()->create();
    $itinerary2 = Itinerary::factory()->create();

    // Authenticate as the user
    $user = User::factory()->create();
    $this->actingAs($user);

    // Call the index method
    $response = $this->get('/api/itineraries');

    // Get the JSON data from the response
    $responseData = $response->json();

    // Extract the IDs of the itineraries from the response
    $itineraryIds = collect($responseData)->pluck('id')->toArray();

    // Assert that the response contains the test itineraries
    $response->assertStatus(200);

    // Assert that the response only contains the expected itineraries
    $this->assertContains($itinerary1->id, $itineraryIds);
    $this->assertContains($itinerary2->id, $itineraryIds);
}


    /**
     * Test the store method.
     *
     * @return void
     */
    public function test_store()
    {

          // Manually create test categories
    $category1 = Category::factory()->create();
    $category2 = Category::factory()->create();

        $user = User::factory()->create();

        $itineraryData = [
            'title' => 'Test Itinerary',
            'category_id' => $category2->id,
            'duration' => 5,
            'image' => 'test-image.jpg',
            'destinations' => [
                [
                    'name' => 'Destination 1',
                    'accommodation' => 'Accommodation 1',
                    'places_to_visit' => 'Places to visit 1',
                    'activities' => ['Activity 1', 'Activity 2'],
                ],
                [
                    'name' => 'Destination 2',
                    'accommodation' => 'Accommodation 2',
                    'places_to_visit' => 'Places to visit 2',
                    'activities' => ['Activity 3', 'Activity 4'],
                ],
            ],
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/itineraries', $itineraryData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('itineraries', ['title' => 'Test Itinerary']);
    }

    /**
     * Test the edit method.
     *
     * @return void
     */
    // public function test_edit()
    // {
    //     $user = User::factory()->create();
    //     $itinerary = Itinerary::factory()->create();

    //     $response = $this->actingAs($user)
    //         ->getJson("/api/itineraries/{$itinerary->id}/edit");

    //     $response->assertStatus(200)
    //         ->assertJson($itinerary->toArray());
    // }
    
public function test_edit()
{
    // Create a user
    $user = User::factory()->create();

    // Create a category
    $category = Category::factory()->create();

    // Create an itinerary with the category
    $itinerary = Itinerary::factory()->create(['category_id' => $category->id]);
dd($itinerary);
    // Mock the Gate facade to allow authorization for this test
    Gate::shouldReceive('allows')->once()->andReturn(true);

    // Call the edit method of the controller
    $response = $this->actingAs($user)
                     ->getJson("/api/itineraries/{$itinerary->id}/edit");

    // Assert that the response has the correct status code
    // and contains the itinerary data
    $response->assertStatus(200)
             ->assertJson(['itinerary' => $itinerary->toArray()]);
}

    // Write similar tests for update, addToItinerariesToVisit, and search methods
}
