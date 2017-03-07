<?php
    include_once '../config/Database.php';
    include_once '../objects/Subcategory.php';

    $database = new Database();
    $db = $database->getConnection();
    $data = json_decode(file_get_contents("php://input"));

    $result = Subcategory::create($db, $data);
    echo json_encode($result);
?>