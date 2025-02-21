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

if (!isset($data->email) || !isset($data->name)) {
    echo json_encode(["error" => "Missing email or name"]);
    exit;
}

$email = $conn->real_escape_string($data->email);
$name = $conn->real_escape_string($data->name);
$password = isset($data->password) ? password_hash($data->password, PASSWORD_DEFAULT) : null;

$sql = "UPDATE users SET name='$name'";
if ($password) {
    $sql .= ", password='$password'";
}
$sql .= " WHERE email='$email'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Profile updated successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $conn->error]);
}

$conn->close();
?>
