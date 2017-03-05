<?php
class Subcategory
{
    const TABLE = " subcategory ";

    public static function read($conn, $professor_id)
    {
        $query =
            "SELECT id, name FROM" . Subcategory::TABLE .
            "WHERE professor_id=:professor_id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":professor_id", $professor_id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}