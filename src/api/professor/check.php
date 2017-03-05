<?php
    include_once '../config/Database.php';
    include_once '../objects/Professor.php';

    $database = new Database();
    $db = $database->getConnection();
    $data = json_decode(file_get_contents("php://input"));

    $result = array();
    if($data->signInAs == 'Professor') {
        $result = Professor::login($db, $data);
        if(!empty($result)){
            date_default_timezone_set('Asia/Manila');
            Professor::updateLog($db, date('Y-m-d'), $data->username);
        }
    }else{

    }

    echo json_encode($result);
?>