<?php

use App\Http\Controllers\DestinationController;
use App\Http\Controllers\ItineraryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserAuthController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
 
Route::get('/categories', [CategoryController::class, 'index']);
 Route::get('/itineraries',[ItineraryController::class, 'index']);


Route::post('register',[UserAuthController::class,'register']);
Route::post('login',[UserAuthController::class,'login']);
Route::get('/itineraries/search', [ItineraryController::class, 'search']);

Route::group(['middleware'=> ['auth:sanctum']],function(){ 
  Route::post('/itineraries/{itinerary}/destinations', [DestinationController::class, 'addDestinations']);
  Route::get('/users/me/itineraries/{itinerary}', [ItineraryController::class, 'addToItinerariesToVisit']);
  Route::post('/itineraries', [ItineraryController::class, 'store']);
  Route::get('/itineraries/{itinerary}/edit', [ItineraryController::class, 'edit']);
  Route::put('/itineraries/{itinerary}', [ItineraryController::class, 'update']);
  Route::post('logout',[UserAuthController::class,'logout']);
});

// routes/api.php





  
 


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
