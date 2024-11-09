<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\UsersController;
use App\Http\Controllers\API\TeamController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::get('allProducts', [FrontendController::class, 'allProducts']);

Route::get('getCategory', [FrontendController::class, 'category']);
Route::get('getProducts', [FrontendController::class, 'products']);
Route::get('fetchProducts/{categoryLink}/{productLink}', [FrontendController::class, 'fetchProducts']);

Route::get('/team/view', [TeamController::class, 'index']);

//Admin routes
Route::middleware('auth:sanctum', 'isApiAdmin')->group(function () {
    Route::get('/check-auth', function (Request $request) {
        return response()->json([
            'status' => 200,
            'message' => 'Authenticated',
        ], 200);
    });

//Catgory
    Route::post('/category/store', [CategoryController::class, 'store']);
    Route::get('/viewCategory', [CategoryController::class, 'index']);
    Route::get('category/edit/{id}', [CategoryController::class, 'edit']);
    Route::post('category/update/{id}', [CategoryController::class, 'update']); // New update route
    Route::post('category/delete/{id}', [CategoryController::class, 'destroy']); // New delete route
    Route::get('allCategory', [CategoryController::class, 'allCategory']);

    //Product
    Route::post('/products/store', [ProductController::class, 'store']);
    Route::get('/products/view', [ProductController::class, 'index']);
    Route::get('products/edit/{id}', [ProductController::class, 'edit']);
    Route::post('products/update/{id}', [ProductController::class, 'update']); // New update route
    Route::post('products/delete/{id}', [ProductController::class, 'destroy']); // New delete route

    //Users
    Route::get('/users/view', [UsersController::class, 'allUsers']);
    Route::post('/users/make-admin/{id}', [UsersController::class, 'makeAdmin']);
    Route::post('/users/delete/{id}', [UsersController::class, 'deleteUser']);
    Route::get('/users/edit/{id}', [UsersController::class, 'editUser']);
    Route::post('/users/update/{id}', [UsersController::class, 'updateUser']);

    //Team
    Route::post('/team/store', [TeamController::class, 'store']);
    Route::get('team/edit/{id}', [TeamController::class, 'edit']);
    Route::post('team/update/{id}', [TeamController::class, 'update']); // New update route
    Route::post('team/delete/{id}', [TeamController::class, 'destroy']); // New delete route

});
