<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$conn = new mysqli("localhost", "root", "", "user_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(["error" => "Missing email or password"]);
    exit;
}

$email = $conn->real_escape_string($data->email);
$password = $conn->real_escape_string($data->password);

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    if (password_verify($password, $user['password'])) {
        echo json_encode(["success" => true, "user" => $user]);
    } else {
        echo json_encode(["error" => "Invalid password"]);
    }
} else {
    echo json_encode(["error" => "No user data found"]);
}

$conn->close();
?>
