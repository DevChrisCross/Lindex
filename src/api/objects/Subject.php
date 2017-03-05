<?php
class Subject
{
    const TABLE = " subject ";

    public static function read($conn, $professor_id)
    {
        $query =
            "SELECT id, code, name FROM" . Subject::TABLE;
        //."WHERE professor_id=:professor_id";
        $stmt = $conn->prepare($query);
        //$stmt->bindParam(":professor_id", $professor_id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}