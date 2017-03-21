<?php


class Section
{
    const TABLE = " professor_class ";

    public static function read($conn, $data){
        $query =
            "SELECT
                professor_class.id,
                professor_class.block_code AS block,
                professor_class.subject_id,
                subject.code,
                subject.name,
                subject.units
            FROM"
                . Section::TABLE .
            "LEFT OUTER JOIN subject
                ON subject.id = professor_class.subject_id
            WHERE
                professor_class.professor_id = :professor_id AND
                professor_class.semester = '2nd Semester' AND
                professor_class.academic_year = '2016-2017'";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":professor_id", $data->user);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}