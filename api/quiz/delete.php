<?php
    include_once '../config/Database.php';
    include_once '../objects/Quiz.php';

    $database = new Database();
    $db = $database->getConnection();
    $data = json_decode(file_get_contents("php://input"));

    $result = Quiz::delete($db, $data->id);
    echo json_encode($result);
?>