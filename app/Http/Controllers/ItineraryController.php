<?php

   /**
 * @OA\Info(
 *      version="1.0.0",
 *      title="Your API Title",
 *      description="Your API Description",
 *      @OA\Contact(
 *           email="zakarialoulida92@gmail.com",
 *          name="Zakaria loulida"
 *      )
 *  
 * )
 */
// app/Http/Controllers/ItineraryController.php

namespace App\Http\Controllers;

use App\Http\Requests\ItineraryRequest;
use App\Models\Destination;
use Illuminate\Http\Request;
use App\Models\Itinerary;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Support\Str;

class ItineraryController extends Controller
{
/**
 * @OA\Get(
 *     path="/api/itineraries/all",
 *     summary="Retrieve a list of itineraries",
 *     security={{"bearerAuth": {}}},
 *     @OA\Response(
 *         response=200,
 *         description="List of itineraries retrieved successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="itineraries", type="array", @OA\Items(type="object"))
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Unauthenticated",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Unauthorized")
 *         )
 *     )
 * )
 */


    public function index (){
        

        // if (!auth()->check()) {
        //     return response()->json(['message' => 'Unauthorized'], 401);
        // }
        return Itinerary::all();
    }

/**
 * @OA\Post(
 *     path="/api/itineraries",
 *     operationId="storeItinerary",
 *     tags={"Itineraries"},
 *     summary="Create a new itinerary",
 *     description="Create a new itinerary with destinations",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"title", "category_id", "duration", "image", "destinations"},
 *             @OA\Property(property="title", type="string"),
 *             @OA\Property(property="category_id", type="integer"),
 *             @OA\Property(property="duration", type="integer"),
 *             @OA\Property(property="image", type="string"),
 *             @OA\Property(
 *                 property="destinations",
 *                 type="array",
 *                 @OA\Items(
 *                     @OA\Property(property="name", type="string"),
 *                     @OA\Property(property="accommodation", type="string"),
 *                     @OA\Property(property="places_to_visit", type="string"),
 *                     @OA\Property(
 *                         property="activities",
 *                         type="array",
 *                         @OA\Items(type="string")
 *                     )
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Itinerary created successfully"
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Validation error"
 *     ),
 *     security={{"bearerAuth": {}}}
 * )
 */


 public function store(Request $request)
 {

    
         $request->validate([
         'title' => 'required|string',
         'category_id' => 'required|integer',
         'duration' => 'required|integer',
         'image' => 'required|mimes:jpeg,png,jpg,gif', // Ensure the image is a valid file type
         'destinations' => 'required|array|min:2',
         'destinations.*.name' => 'required|string',
         'destinations.*.accommodation' => 'required|string',
         'destinations.*.places_to_visit' => 'required|string',
         'destinations.*.activities' => 'required|array',
     ]);

   
     try {
         // Handle file upload
        //  $imagePath = $request->file('image')->store('images');
         $imagePath = Str::random(32).".".$request->image->getClientOriginalExtension();
        
 
         // Create the itinerary
         $itinerary = Itinerary::create([
             'user_id' => Auth::id(), // Assuming user is authenticated
             'title' => $request->title,
             'category_id' => $request->category_id,
             'duration' => $request->duration,
             'image' => $imagePath, // Store the image path
         ]);
         Storage::disk('public')->put($imagePath,file_get_contents($request->image));
  
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
    














    public function update(ItineraryRequest $request, Itinerary $itinerary)
    {
     
      
            
    if (Gate::denies('update', $itinerary)) {
            return response()->json(['message' => 'You are not authorized to update this itinerary'], 403);
        }
        
        try {

            $itinerary->title = $request->title;
            $itinerary->duration = $request->duration;
            $itinerary->category_id = $request->category_id;
      
       
            if($request->image) {
 
                // Public storage
                $storage = Storage::disk('public');
      
                // Old iamge delete
                if($storage->exists($itinerary->image))
                    $storage->delete($itinerary->image);
      
                
                $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
                $itinerary->image = $imageName;
               
                // Image save in public folder
                $storage->put($imageName, file_get_contents($request->image));
            }
          
            // Update Product
            $itinerary->save();
      
            // Return Json Response
          
        
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
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

    public function destroy(Itinerary $itinerary)
{
    if (Gate::denies('delete', $itinerary)) {
        return response()->json(['message' => 'You are not authorized to delete this itinerary'], 403);
    }

    // Delete the itinerary
    $itinerary->delete();

    return response()->json(['message' => 'Itinerary deleted successfully'], 200);
}

}
