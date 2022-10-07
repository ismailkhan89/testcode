<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{
  /**
   * User login
   *
   * @param Illuminate\Http\Request $request
   * @return Illuminate\Http\Response
   */
  public function login(Request $request)
  {
    // Validate data
    $validator = Validator::make($request->all(), [
      'email'        => 'required',
      'password'     => 'required',
      'device_name'  => 'required',
    ]);

    if ($validator->fails()) {
      return $this->sendError($validator->errors());
    }

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
      return response()->json([
        'message' => "Incorrect login details",
        'status'  => 0
      ], 422);
    }

    if ($user->status == 1) {
      // Create Token
      $token = $user->createToken($request->device_name)->plainTextToken;

      return response()->json([
        'result'  => $user,
        'token'   => $token,
        'message' => "Login Successfully",
        'status'  => 1
      ], 200);
    } else {
      return response()->json([
        'message' => "Your account has been blocked",
        'status'  => 0
      ], 422);
    }
  }

  /**
   * User Logout
   *
   * @return Illuminate\Http\Response
   */
  public function logout()
  {
    auth()->user()->tokens()->delete();

    return response()->json([
      'message' => "Logout successfully",
      'status'  => 1
    ], 200);
  }

  /**
   * Combine errors with messages
   *
   * @param object $message
   */
  public function sendError($message)
  {
    $message = $message->all();
    $response['error'] = "validation_error";
    $response['message'] = implode('', $message);
    $response['status'] = 0;
    return response()->json($response, 422);
  }
}
