<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */
    'paths' => ['user','api/*', 'sanctum/csrf-cookie'],   //we specefied our endpoints that we have 

    'allowed_methods' => ['*'],        // which type of requests are allowed ( get post are allways allowed) if i {add [put ,patch] the delete will gonna be denied  }put ,patch,delete ...

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => ['*'],

    'allowed_headers' => ['*'],  //if i put [] that mean any headers request will be accepted  i can specify which headers => [x-xsrf-token,content-type]

    'exposed_headers' => [], //which response  headers can be access by javascript in browser

    'max_age' => 0,

    'supports_credentials' => true,  //alows credentials cross origin request to come with credentials like coockies 

];
