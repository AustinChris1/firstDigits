<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [  // Use $request->all()
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',  // Add password confirmation
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 422);  // Use 422 for validation errors
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken($user->email.'token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'username' => $user->name,
                'email' => $user->email,
                'access_token' => $token,
                'message' => 'User registered successfully',
            ]);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [  // Use $request->all()
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 422);  // Use 422 for validation errors
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid credentials',
                    
                ]);
            } else {
                if($user->role_as==1){ //1 == admin
                    $role = 'admin';
                    $message = 'Admin logged in successfully';
                    $token = $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;

                }else{
                    $role = 'user';
                    $message = 'User logged in successfully';
                $token = $user->createToken($user->email.'_Token', [''])->plainTextToken;

                }

                return response()->json([
                    'status' => 200,
                    'username' => $user->name,
                    'email' => $user->email,
                    'token' => $token,
                    'message' => $message,
                    'role' => $role,
                ]);
            }
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'User logged out successfully',
        ]);
    }
}
