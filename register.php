<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "user_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $conn->real_escape_string($data->name);
    $email = $conn->real_escape_string($data->email);
    $password = password_hash($data->password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "User registered successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }
}

$conn->close();
?>
