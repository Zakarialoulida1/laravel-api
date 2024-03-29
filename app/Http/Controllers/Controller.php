<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

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
class Controller extends BaseController
{





    use AuthorizesRequests, ValidatesRequests;



}
