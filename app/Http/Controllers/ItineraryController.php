<?php


// app/Http/Controllers/ItineraryController.php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;
use App\Models\Itinerary;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rules\Exists;

class ItineraryController extends Controller
{


  

    public function index (){
        
        return Itinerary::all();
    }


    public function store(Request $request)
    {
      $request->validate([
            'title' => 'required|string',
            'category_id' => 'required|integer',
            'duration' => 'required|integer',
            'image' => 'required|string',
            'destinations' => 'required|array|min:2',
            'destinations.*.name' => 'required|string',
            'destinations.*.accommodation' => 'required|string',
            'destinations.*.places_to_visit' => 'required|string',
            'destinations.*.activities' => 'required|array',
        ]);
    
        try {
            // Create the itinerary
            $itinerary = Itinerary::create([
                'user_id' => Auth::id(), // Assuming user is authenticated
                'title' => $request->title,
                'category_id' => $request->category_id,
                'duration' => $request->duration,
                'image' => $request->image,
            ]);
    
            // Iterate through each destination
            foreach ($request->destinations as $destinationData) {
                // Join activities array with comma separator
                $activities = implode(', ', $destinationData['activities']);
    
                // Create destination with activities as comma-separated string
                $destination = $itinerary->destinations()->create([
                    'name' => $destinationData['name'],
                    'accommodation' => $destinationData['accommodation'],
                    'places_to_visit' => $destinationData['places_to_visit'],
                    'activities' => $activities,
                ]);
            }
    
            return response()->json(['message' => 'Itinerary created successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create itinerary'], 500);
        }
    }

    public function edit(Itinerary $itinerary)
    {
        if (Gate::denies('update', $itinerary)) {
            return response()->json(['message' => 'You are not authorized to update this itinerary'], 403);
        }

        return response()->json(['itinerary' => $itinerary], 200);
    }
    
    public function update(Request $request, Itinerary $itinerary)
    {
        if (Gate::denies('update', $itinerary)) {
            return response()->json(['message' => 'You are not authorized to update this itinerary'], 403);
        }

        // Validate request data
        $request->validate([
            'title' => 'required|string',
            'category_id' => 'required|integer',
            'duration' => 'required|integer',
            'image' => 'required|string',
            // Add validation rules for other fields as needed
        ]);

        // Update the itinerary
        $itinerary->update([
            'title' => $request->title,
            'category_id' => $request->category_id,
            'duration' => $request->duration,
            'image' => $request->image,
            // Add other fields here
        ]);

        // Return a response
        return response()->json(['message' => 'Itinerary updated successfully'], 200);
    }
    public function addToItinerariesToVisit( Itinerary $itinerary)
    {
       
        $user = auth()->user();

        if (!$user->itinerariesToVisit()->where('itinerary_id', $itinerary->id)->exists()) {
            $user->itinerariesToVisit()->attach($itinerary);
            return response()->json(['message' => 'Itinerary added to itineraries to visit successfully'], 200);
        }

        return response()->json(['message' => 'Itinerary is already in itineraries to visit'], 422);
    }

    public function search(Request $request)
    {
        $query = Itinerary::query();

        // Filter by category
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by duration
        if ($request->has('duration')) {
            $query->where('duration', $request->duration);
        }

        // Filter by name
        if ($request->has('name')) {
            $query->where('title', 'like', '%' . $request->name . '%');
        }

        // Execute the query
        $itineraries = $query->get();

        return response()->json(['itineraries' => $itineraries], 200);
    }
}
