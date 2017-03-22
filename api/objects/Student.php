<?php

class Student
{
    const TABLE = " student_account ";

    public static function login($conn, $data){
        $query =
            "SELECT 
                id, 
                email,
                last_name AS lastName,
                first_name AS firstName
            FROM"
                . Student::TABLE .
            "WHERE 
                (id = :id OR email = :id) AND
                password = :password";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":id", $data->username);
        $stmt->bindParam(":password", $data->password);

        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}