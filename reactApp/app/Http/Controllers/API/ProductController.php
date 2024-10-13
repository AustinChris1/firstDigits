<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|integer',
            'meta_title' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'link' => 'required|string|max:255',
            'selling_price' => 'required|string',
            'original_price' => 'required|string',
            'qty' => 'required|string',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',   // Validate image as a file
            'brand' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        } else {
            $product = new Product();
            $product->category_id = $request->input('category_id');
            $product->meta_title = $request->input('meta_title');
            $product->name = $request->input('name');
            $product->link = $request->input('link');
            $product->description = $request->input('description');
            $product->meta_description = $request->input('meta_description');
            $product->meta_keywords = $request->input('meta_keywords');
            $product->selling_price = $request->input('selling_price');
            $product->original_price = $request->input('original_price');
            $product->qty = $request->input('qty');
            $product->status = $request->input('status') == true ? 1 : 0;
            $product->featured = $request->input('featured') == true ? 1 : 0;
            $product->popular = $request->input('popular') == true ? 1 : 0;
            $product->brand = $request->input('brand');

            // Handle first image upload
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $name = time().'.'.$image->getClientOriginalExtension();   // Fixed extension concatenation
                $destinationPath = 'uploads/products1';
                $image->move($destinationPath, $name);
                $newName1 = $destinationPath."/".$name;
                $product->image = $newName1;
            }

            // Handle second image upload
            if ($request->hasFile('image2')) {
                $image2 = $request->file('image2');
                $name2 = time().'.'.$image2->getClientOriginalExtension(); // Fixed extension concatenation
                $destinationPath2 = 'uploads/products2';
                $newName2 = $destinationPath."/".$name2;
                $image2->move($destinationPath2, $name2);
                $product->image2 = $newName2;
            }

            $product->save();

            return response()->json([
                'status' => 200,
                'message' => 'Product stored successfully',
            ], 200); 
        }
    }

    public function index(){
    
        $products = Product::all();
        return response()->json([
            'status' => 200,
            'products' => $products
        ]);
    }

//Fetch for edit
public function edit($id)
{
    $Product = Product::find($id);
    if (!$Product) {
        return response()->json([
            'status' => 404,
            'message' => 'Product not found',
        ], 404);
    }else{
    return response()->json([
        'status' => 200,
        'Product' => $Product,
    ], 200);
}
}
//Edit
public function update(Request $request, $id)
{

    // Validate the incoming request
    $validator = Validator::make($request->all(), [
        'category_id' => 'required|integer',
        'meta_title' => 'required|string|max:255',
        'name' => 'required|string|max:255',
        'link' => 'required|string|max:255',
        'selling_price' => 'required|integer', // Should be integer, not string
        'original_price' => 'required|integer', // Should be numeric, not string
        'qty' => 'required|integer', // Should be an integer, not string
        'brand' => 'required|string',
    ]);
    
    // Return validation errors
    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'errors' => $validator->messages(),
        ], 422);
    }

    // Find the Product by ID
    $product = Product::find($id);

    if ($product) {
        // Update Product fields
        $product->category_id = $request->input('category_id');
        $product->meta_title = $request->input('meta_title');
        $product->name = $request->input('name');
        $product->link = $request->input('link');
        $product->description = $request->input('description');
        $product->meta_description = $request->input('meta_description');
        $product->meta_keywords = $request->input('meta_keywords');
        $product->selling_price = $request->input('selling_price');
        $product->original_price = $request->input('original_price');
        $product->qty = $request->input('qty');
        $product->status = $request->input('status') == true ? 1 : 0;
        $product->featured = $request->input('featured') == true ? 1 : 0;
        $product->popular = $request->input('popular') == true ? 1 : 0;
        $product->brand = $request->input('brand');

            // Handle first image upload
            if ($request->hasFile('image')) {
                $path = $product->image;
                if(File::exists($path)){
                    File::delete($path);
                }
                $image = $request->file('image');
                $name = time().'.'.$image->getClientOriginalExtension();   // Fixed extension concatenation
                $destinationPath = 'uploads/products1';
                $image->move($destinationPath, $name);
                $newName1 = $destinationPath."/".$name;
                $product->image = $newName1;
            }

            // Handle second image upload
            if ($request->hasFile('image2')) {
                $path = $product->image2;
                if(File::exists($path)){
                    File::delete($path);
                }
                $image2 = $request->file('image2');
                $name2 = time().'.'.$image2->getClientOriginalExtension(); 
                $destinationPath2 = 'uploads/products2';   // Correct destination path here
                $image2->move($destinationPath2, $name2);
                $newName2 = $destinationPath2."/".$name2;  // Correct path reference here
                $product->image2 = $newName2;
            }
            

        // Save the updated Product
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product updated successfully',
        ]);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'Product not found',
        ], 404);
    }
}
//Delete
public function destroy($id)
{
    $Product = Product::find($id);
    if ($Product) {
        $Product->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Product deleted successfully',
        ]);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'Product not found',
        ], 404);
    }
}





}
