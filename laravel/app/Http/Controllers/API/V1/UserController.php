<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\UserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function show()
    {
        return new UserResource(Auth::user());
    }

    public function update(UserRequest $request)
    {
        $user = Auth::user();

        $user->update($request->only('name', 'email', 'password'));

        return new UserResource($user);
    }

    public function destroy()
    {
        Auth::user()->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
