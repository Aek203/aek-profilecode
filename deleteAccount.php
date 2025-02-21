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

if (!isset($data->email)) {
    echo json_encode(["error" => "Missing email"]);
    exit;
}

$email = $conn->real_escape_string($data->email);

$sql = "DELETE FROM users WHERE email='$email'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Account deleted successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $conn->error]);
}

$conn->close();
?>
