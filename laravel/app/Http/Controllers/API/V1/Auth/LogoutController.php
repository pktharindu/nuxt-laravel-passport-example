<?php

namespace App\Http\Controllers\API\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function logout()
    {
        Auth::user()->token()->revoke();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
