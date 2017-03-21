<?php
class Subject
{
    const TABLE = " subject ";

    public static function read($conn)
    {
        $query =
            "SELECT 
                id, 
                code, 
                name 
            FROM"
                . Subject::TABLE;
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}