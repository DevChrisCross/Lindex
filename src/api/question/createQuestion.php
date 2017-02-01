<?php
	include_once '../config/Database.php';
	include_once '../objects/Question.php';
	
	//get database connection_aborted
	$database = new Database();
	$db = $database->getConnection();
	
	//instance of question
	$quest = new Question($db);
	
	//get posted api
	$data = json_decode(file_get_contents("php://input"));
	
	//get answer_id or a_id
	//since included yung database.php, PWede i-access yung nasa ilalim
	//$host="localhost";$username="root";$password="";$db_name,="lindex";
	//$tempaid=0;
	$tempconn = $database->getConnection();
	$stmt = "SELECT COUNT(*) FROM answer";
	/*$tempconn->prepare($stmt);
	if($result = mysqli_query($tempconn, $sql))
		$tempaid = mysqli_num_rows($result);*/

	//$tempaid = $tempaid + 1;

    $res = $tempconn->prepare($stmt);
    $tempaid = intval($res->fetchColumn()) + 1;


	//get question property values
	//$q_id*, $categ, $sub_code, $subj, $q_det, $q_points, $a_id*, $prof_id
	//palitan nalang depende dun sa name or id nung mga fields sa form XD
	$quest->categ = $data->selectedCategory;
	$quest->sub_code = $data->selectedSubCategory;
	$quest->subj = $data->selectedSubject;
	$quest->q_det = $data->question;
	//$quest->q_points = $api->q_points;
	//$quest->prof_id = $api->prof_id;
	//auto increment yung q_id then may a_id na kinuha yung count
	
	//testing purposes
	if($quest->create($tempaid)){
		echo "Question added";
		//Mag add sa history table
		//include_once 'history.php';
	}else{
		echo "Unable to add question";
	}
?>