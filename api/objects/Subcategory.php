<?php
class Subcategory
{
    const TABLE = " subcategory ";

    public static function create($conn, $data)
    {
        $query =
            "INSERT INTO"
                . Subcategory::TABLE .
            "SET 
                name =          :name, 
                professor_id =  :professor_id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":professor_id", $data->user);
        return $stmt->execute();
    }

    public static function read($conn, $user)
    {
        $query =
            "SELECT 
                id, name 
            FROM"
                . Subcategory::TABLE .
            "WHERE 
                professor_id = :professor_id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":professor_id", $user);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public static function update($conn, $data)
    {
        $query =
            "UPDATE"
                . Subcategory::TABLE .
            "SET 
                name = :name " .
            "WHERE 
                id = :id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":id", $data->id);
        return $stmt->execute();
    }

    public static function delete($conn, $id)
    {
        $query =
            "DELETE FROM"
                . Subcategory::TABLE .
            "WHERE 
                id = :id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }
}