<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/x-www-form-urlencoded; charset=UTF-8");

include_once '../config/Database.php';
include_once '../objects/Question.php';
 
$database = new Database();
$db = $database->getConnection();

$question = new Question($db);
$stmt = $question->read();

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>