<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactUsMail;
use App\Models\ContactMessage; // Ensure the model is imported

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        // Store the contact message in the database
        // Ensure `ContactMessage` model exists and is properly configured
        $contactMessage = ContactMessage::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'message' => $validated['message'],
        ]);

        // Send an email with the contact details
        Mail::to('austinchrisiwu@gmail.com')->send(new ContactUsMail($validated));

        // Return a successful response
        return response()->json([
            'status' => 200,
            'message' => 'Thank you for contacting us!',
            'data' => $contactMessage,
        ], 200); // Use 200 for created resources
    }
}
