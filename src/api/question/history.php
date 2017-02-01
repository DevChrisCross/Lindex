<?php

//Class Name Conflict

/*

 class Database{
	function recordActivity($details){ 
		include "config.php";
		$conn = mysqli_connect($host, $user, $passw, $db);

		if( mysqli_connect_errno($conn) ){
			die("Database connection failed!".mysqli_connect_error());
		}

		date_default_timezone_set('Asia/Manila');
		$thatDate = date("Y-m-d");
		$thatTime = date("h:i:sa");
		// print_r($_SESSION);
		//$id = $_SESSION['username'];
		$id = "Please change this in history.php";
		$sql = "INSERT INTO `history_activity`(`prof_id`, `his_date`, `his_time`, `his_details`) 
		VALUES ('$id','$thatDate','$thatTime','$details')";
		$result = mysqli_query($conn,$sql);

		return $result;
	}
}
*/

	
?>