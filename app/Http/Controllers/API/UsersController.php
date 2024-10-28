<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    /**
     * Display a listing of all users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function allUsers(): JsonResponse
    {
        try {
            $users = User::all();
            return response()->json([
                'status' => 200,
                'users' => $users,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to fetch users',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function makeAdmin(int $id): JsonResponse
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'status' => 404,
                    'message' => 'User not found',
                ], 404);
            }

            // Toggle user role
            if ($user->role_as === 1) {
                $user->role_as = 0; // Set user role back to standard user
                $message = 'User is now a standard user';
            } else {
                $user->role_as = 1; // Set user role to admin
                $message = 'User is now an admin';
            }

            $user->save();

            return response()->json([
                'status' => 200,
                'message' => $message,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to update user role',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function editUser($id): JsonResponse{
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found',
            ], 404);
        } else {
            return response()->json([
                'status' => 200,
                'user' => $user,
            ], 200);
        }
    }

    public function updateUser(Request $request, $id): JsonResponse{
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        }
        
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found',
            ], 404);
        } else {
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->role_as = $request->input('role_as');
            $user->save();
            return response()->json([
                'status' => 200,
                'message' => 'User updated successfully',
            ], 200);
        }

    }

        // Delete
        public function deleteUser($id)
        {
            $User = User::find($id);
            if ($User) {
                $User->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'User deleted successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'User not found',
                ], 404);
            }
        }
    
}
