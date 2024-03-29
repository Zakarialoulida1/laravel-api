<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Itinerary;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function addDestinations(Request $request, Itinerary $itinerary)
    {



        // Validate request data
        $request->validate([
            'destinations' => 'required|array',
            'destinations.*.name' => 'required|string',
            'destinations.*.accommodation' => 'required|string',
            'destinations.*.places_to_visit' => 'required|string',
            'destinations.*.activities' => 'required|array',
        ]);

        // Create destinations and associate them with the itinerary
        foreach ($request->destinations as $destinationData) {
            $destination = new Destination([
                'name' => $destinationData['name'],
                'accommodation' => $destinationData['accommodation'],
                'places_to_visit' => $destinationData['places_to_visit'],
                'activities' => implode(', ', $destinationData['activities']),
            ]);

            $itinerary->destinations()->save($destination);
        }

        // Return a response
        return response()->json(['message' => 'Destinations added to itinerary successfully'], 201);
    }
}
