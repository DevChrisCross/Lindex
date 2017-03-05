<?php
class Category
{
    const TABLE = " category ";

    public static function create($conn, $name, $professor_id)
    {
        $query =
            "INSERT INTO" . Category::TABLE .
            "SET name=:name, professor_id=:professor_id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":professor_id", $professor_id);
        return $stmt->execute();
    }

    public static function read($conn, $professor_id)
    {
        $query =
            "SELECT id, name FROM" . Category::TABLE .
            "WHERE professor_id=:professor_id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":professor_id", $professor_id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public static function update($conn, $id, $name)
    {
        $query =
            "UPDATE" . Category::TABLE .
            "SET name=:name " .
            "WHERE id=:id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }

    public static function delete($conn, $id)
    {
        $query =
            "DELETE FROM" . Category::TABLE .
            "WHERE id=:id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }

    public static function readAll($conn)
    {
        $query = "SELECT * FROM" . Category::TABLE;
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}