<?php
    include_once '../config/Database.php';
    include_once '../objects/Professor.php';
    include_once '../objects/Student.php';

    $database = new Database();
    $db = $database->getConnection();
    $data = json_decode(file_get_contents("php://input"));

    $result = array();
    if($data->signInAs == 'Professor') {
        $result = Professor::login($db, $data);
//        if(!empty($result)){
//            date_default_timezone_set('Asia/Manila');
//            Professor::updateLog($db, date('Y-m-d'), $data->username);
//        }
    }
    if($data->signInAs == 'Student'){
        $result = Student::login($db, $data);
    }

    echo json_encode($result);
?>