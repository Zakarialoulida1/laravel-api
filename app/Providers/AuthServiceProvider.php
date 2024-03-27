<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Itinerary;
use App\Policies\ItineraryPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */


    /**
     * Register any authentication / authorization services.
     */
 

    protected $policies = [
        Itinerary::class => ItineraryPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();
    }
}
