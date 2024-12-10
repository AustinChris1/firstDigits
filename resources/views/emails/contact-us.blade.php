<!DOCTYPE html>
<html>
<head>
    <title>New Contact Message</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .email-container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #06467647;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            padding: 20px;
        }
        .content p {
            margin: 10px 0;
        }
        .footer {
            background-color: #f1f1f1;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .footer a {
            color: #0078d4;
            text-decoration: none;
        }
        .highlight {
            color: #0078d4;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            New Contact Message
        </div>
        <div class="content">
            <p><strong>Name:</strong> <span class="highlight">{{ $details['name'] }}</span></p>
            <p><strong>Email:</strong> <span class="highlight">{{ $details['email'] }}</span></p>
            <p><strong>Message:</strong></p>
            <p>{{ $details['message'] }}</p>
        </div>
        <div class="footer">
            <p>This email was generated automatically. If you believe this message was sent in error, please <a href="mailto:support@firstdigit.com.ng">contact us</a>.</p>
        </div>
    </div>
</body>
</html>
