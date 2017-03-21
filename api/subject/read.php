<?php
    include_once '../config/Database.php';
    include_once '../objects/Subject.php';

    $database = new Database();
    $db = $database->getConnection();
    $data = json_decode(file_get_contents("php://input"));

    $result = Subject::read($db);
    echo json_encode($result);
?>