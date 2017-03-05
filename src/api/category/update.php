<?php
include_once '../config/Database.php';
include_once '../objects/Category.php';

$database = new Database();
$db = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

if(Category::update($db, $data->categoryID, $data->categoryName)){
    echo "Category added";
}else{
    echo "An error occurred";
}
?>