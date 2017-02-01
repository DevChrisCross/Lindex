<?php
//make status 0; deletion of api in db is not allowed :)

// include database and object file 
include_once '../config/Database.php'; 
include_once '../objects/Question.php';

// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare question object
$quest = new Question($db);

// get q_id
$data = json_decode(file_get_contents("php://input"));

$quest->q_id = $data->id;

// delete the question
if($quest->delete()){
    echo "Product was deleted.";
}
 
// if unable to delete the question
else{
    echo "Unable to delete object.";
}
?>