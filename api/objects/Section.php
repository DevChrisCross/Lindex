<?php


class Section
{
    const TABLE = " professor_class ";
    const SCHED = " quiz_schedule ";

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

        for ($i = 0; $i < count($result); $i++){
            $query2 =
                "SELECT 
                    quiz_schedule.schedule,
                    quiz.id,
                    quiz.name AS title,
                    quiz.duration,
                    quiz.passingPercent
                FROM"
                    . Section::SCHED .
                "LEFT OUTER JOIN quiz
                    ON quiz_schedule.quiz_id = quiz.id
                WHERE
                    class_id = :class_id";

            $stmt2 = $conn->prepare($query2);
            $stmt2->bindParam(":class_id", $result[$i]['id']);
            $stmt2->execute();
            $result[$i]['quiz'] = $stmt2->fetchAll(PDO::FETCH_ASSOC);
            $result[$i]['status'] = count($result[$i]['quiz'])==0 ? 0 : 1;
        }
        return $result;
    }
}