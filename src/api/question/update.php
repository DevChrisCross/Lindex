<?php 
// include database and object files 
include_once '../config/Database.php'; 
include_once '../objects/Question.php';
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare question object
$quest = new Question($db);
 
// get id of question to be edited
$data = json_decode(file_get_contents("php://input"));     
 
// set ID property of question to be edited
$quest->question_id = $data->id;
 
// set question property values
$product->categ = $data->categ;
$product->sub_code = $data->sub_code;
$product->subj = $data->subj;
$product->q_det = $data->q_det;
$product->q_points = $data->q_points;
 
// update the question
if($product->update()){
    echo "Product was updated.";
}
 
// if unable to update the question, tell the user
else{
    echo "Unable to update question.";
}
?>