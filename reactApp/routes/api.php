<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\FrontendController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::get('allProducts', [FrontendController::class, 'allProducts']);

Route::get('getCategory', [FrontendController::class, 'category']);
Route::get('getProducts', [FrontendController::class, 'products']);
Route::get('fetchProducts/{categoryLink}/{productLink}', [FrontendController::class, 'fetchProducts']);


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
    Route::put('category/update/{id}', [CategoryController::class, 'update']); // New update route
    Route::delete('category/delete/{id}', [CategoryController::class, 'destroy']); // New delete route
    Route::get('allCategory', [CategoryController::class, 'allCategory']);

    //Product
    Route::post('/products/store', [ProductController::class, 'store']);
    Route::get('/products/view', [ProductController::class, 'index']);
    Route::get('products/edit/{id}', [ProductController::class, 'edit']);
    Route::post('products/update/{id}', [ProductController::class, 'update']); // New update route
    Route::delete('products/delete/{id}', [ProductController::class, 'destroy']); // New delete route


});
