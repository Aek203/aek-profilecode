<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$database = "user_db"; // เปลี่ยนเป็นชื่อฐานข้อมูลของคุณ

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "เชื่อมต่อฐานข้อมูลไม่ได้"]));
}

// รับข้อมูลจาก React
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email)) {
    echo json_encode(["success" => false, "error" => "ไม่มีอีเมลที่ส่งมา"]);
    exit();
}

$email = $conn->real_escape_string($data->email);

// ลบบัญชีจากฐานข้อมูล
$sql = "DELETE FROM users WHERE email = '$email'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "บัญชีถูกลบแล้ว"]);
} else {
    echo json_encode(["success" => false, "error" => "ลบบัญชีไม่สำเร็จ"]);
}

$conn->close();
?>
