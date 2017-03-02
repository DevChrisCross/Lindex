<?php
    include_once '../config/Headers.php';
    include_once '../config/Database.php';
	include_once '../objects/Question.php';
	
	$database = new Database();
	$db = $database->getConnection();
	$data = json_decode(file_get_contents("php://input"));

	Question::create($db, $data);

?>