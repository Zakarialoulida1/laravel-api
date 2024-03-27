<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;



class CreateDestinationsTable extends Migration
{
    public function up()
    {
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();

         $table->string('name');
            $table->string('accommodation');
            $table->text('activities'); // To store activities/places to visit
            $table->text('places_to_visit'); // To store places to visit/activities/places to try
            $table->foreignId('itinerary_id')->constrained()->onDelete('cascade');
        
            $table->timestamps();

      });
    }

    public function down()
    {
        Schema::dropIfExists('destinations');
    }
}