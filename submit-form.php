<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);
error_log("Form submission started");

// Database configuration
$db_host = 'localhost';
$db_name = 'u157553919_70Kdg';
$db_user = 'u157553919_THWRx'; 
$db_pass = 'f~OaGZrc:AO4'; 

// Email configuration
$admin_email = 'info@trilogytradingllc.com'; 

try {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    error_log("Received data: " . print_r($data, true));
    
    // Validate required fields
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        throw new Exception('Missing required fields');
    }
    
    // Connect to database
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    error_log("Database connected successfully");
    
    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO contact_submissions (name, email, phone, company, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
    
    // Execute statement
    $stmt->execute([
        $data['name'],
        $data['email'],
        $data['phone'] ?? null,
        $data['company'] ?? null,
        $data['message']
    ]);
    
    // Send email notification
    $email_subject = "New Contact Form Submission - Trilogy Trading LLC";
    $email_body = "
        New contact form submission received:\n\n
        Name: {$data['name']}\n
        Email: {$data['email']}\n
        Phone: {$data['phone']}\n
        Company: {$data['company']}\n
        Message: {$data['message']}\n
    ";
    
    $headers = "From: {$data['email']}\r\n";
    $headers .= "Reply-To: {$data['email']}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    mail($admin_email, $email_subject, $email_body, $headers);
    
    error_log("Email sent successfully");
    
    // Send success response
    echo json_encode(['success' => true, 'message' => 'Form submitted successfully']);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>