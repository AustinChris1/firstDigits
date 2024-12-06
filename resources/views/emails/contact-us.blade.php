<!DOCTYPE html>
<html>
<head>
    <title>New Contact Message</title>
</head>
<body>
    <h1>Contact Message from {{ $details['name'] }}</h1>
    <p><strong>Email:</strong> {{ $details['email'] }}</p>
    <p><strong>Message:</strong></p>
    <p>{{ $details['message'] }}</p>
</body>
</html>
