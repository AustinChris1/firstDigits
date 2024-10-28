<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    // Fetch active categories
    public function category()
    {
        $categories = Category::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $categories
        ]);
    }
    public function allProducts()
    {
        $products = Product::where('status', '0')->orderBy('created_at', 'desc')->get();

        $categories = Category::all();

        return response()->json([
            'status' => 200,
            'products' => $products,
            'categories' => $categories, // Optional, if you want to send categories too
        ]);
    }

    public function fetchProducts($category_link, $product_link)
    {
        $category = Category::where('link', $category_link)->where('status', '0')->first();
        if ($category) {
            $product = Product::where('category_id', $category->id)->where('link', $product_link)->first();
            if ($product) {
                return response()->json([
                    'status' => 200,
                    'product' => $product,
                    'category' => $category,
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product not found',
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found',
            ]);
        }
    }

    // Fetch products based on filters
    public function products(Request $request)
    {
        // Start with a query to get only active products
        $query = Product::where('status', '0');
        $categories = Category::all();

        // Filter by category if provided
        if ($request->has('category') && $request->input('category') !== 'All') {
            $category = $request->input('category');
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('name', $category);
            });
        }

        // Filter by brand if provided
        if ($request->has('brand')) {
            $brand = $request->input('brand');
            $query->where('brand', $brand);
        }

        // Sorting products
        $sortOption = $request->input('sort', 'featured'); // Default to 'featured'
        switch ($sortOption) {
            case 'alphaAsc':
                $query->orderBy('name', 'asc');
                break;
            case 'alphaDesc':
                $query->orderBy('name', 'desc');
                break;
            case 'dateAsc':
                $query->orderBy('created_at', 'asc');
                break;
            case 'dateDesc':
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy('featured', 'desc'); // Show featured products first
                break;
        }

        // Paginate the results
        $perPage = $request->input('itemsPerPage', 4);
        $products = $query->paginate($perPage);

        return response()->json([
            'status' => 200,
            'products' => $products,
            'category' => $categories
        ]);
    }
}
