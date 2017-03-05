<?php

class Professor
{
    const TABLE = " professor_account ";

    public static function login($conn, $data) {
        $query =
            "SELECT 
                professor_account.id, 
                professor_account.email,
                professor_detail.last_name AS lastName,
                professor_detail.first_name AS firstName
            FROM"
                . Professor::TABLE .
            "LEFT OUTER JOIN professor_detail
                ON professor_account.id = professor_detail.id
            WHERE 
                professor_account.id = :id AND professor_account.password = :password";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":id", $data->username);
        $stmt->bindParam(":password", $data->password);

        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public static function updateLog($conn, $date, $id){
        $query =
            "UPDATE"
                . Professor::TABLE .
            "SET
                last_log = :last_log
            WHERE
                id = :professor_id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":last_log", $date);
        $stmt->bindParam(":professor_id", $id);
        return $stmt->execute();
    }

    public static function updateInfo($conn, $data){

    }
}

?>