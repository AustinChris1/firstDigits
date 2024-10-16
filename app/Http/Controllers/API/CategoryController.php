<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;



class CategoryController extends Controller
{
    //Add
    public function store(Request $request)
    {  
        $validator = Validator::make($request->all(), [
            'meta_title' => 'required|string|max:255',
            'link' => 'required|string|max:255',
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ], 400);
        }else{

        $category = new Category();
        $category->meta_title = $request->input('meta_title');
        $category->link = $request->input('link');
        $category->description = $request->input('description');
        $category->meta_description = $request->input('meta_description');
        $category->meta_keywords = $request->input('meta_keywords');
        $category->name = $request->input('name');
        $category->status = $request->input('status') == true ? 1 : 0;
        $category->save();


        return response()->json([
            'status' => 200,
            'message' => 'Category stored successfully',
        ], 200);
    }
    }
    //View
    public function index()
    {
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ], 200);
    }
//Fetch for edit
    public function edit($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found',
            ], 404);
        }else{
        return response()->json([
            'status' => 200,
            'category' => $category,
        ], 200);
    }
    }
//Edit
    public function update(Request $request, $id)
    {
    
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'meta_title' => 'required|string|max:255',
            'link' => 'required|string|max:255',
            'name' => 'required|string|max:255',
        ]);
    
        // Return validation errors
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        }
    
        // Find the category by ID
        $category = Category::find($id);
    
        if ($category) {
            // Update category fields
            $category->meta_title = $request->input('meta_title');
            $category->link = $request->input('link');
            $category->description = $request->input('description');
            $category->meta_description = $request->input('meta_description');
            $category->meta_keywords = $request->input('meta_keywords');
            $category->name = $request->input('name');
            $category->status = $request->input('status') == true ? 1 : 0;
    
            // Save the updated category
            $category->save();
    
            return response()->json([
                'status' => 200,
                'message' => 'Category updated successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found',
            ], 404);
        }
    }
//Delete
    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category) {
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Category deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found',
            ], 404);
        }
    }

    public function allCategory()
    {
        $category = Category::where('status', 0)->get();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ], 200);
    }
    
}
