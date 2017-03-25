<?php


class Section
{
    const TABLE = " professor_class ";
    const SCHED = " quiz_schedule ";
    const SCLASS = " student_class ";
    const GRADES = " student_grades ";

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
                    quiz_schedule.class_id = :class_id";

            $stmt2 = $conn->prepare($query2);
            $stmt2->bindParam(":class_id", $result[$i]['id']);
            $stmt2->execute();
            $result[$i]['quizzes'] = $stmt2->fetchAll(PDO::FETCH_ASSOC);
            $result[$i]["status"] = 0;

            for($j = 0; $j < count($result[$i]["quizzes"]); $j++){
                $result[$i]['status'] = is_null($result[$i]["quizzes"][$j]["schedule"]) ? 0 : 1;
                if($result[$i]['status'] == 1){
                    $result[$i]["scheduleIndex"] = $j;
                    $result[$i]["status"] = 1;
                    break;
                }
            }

            $query3 =
                "SELECT
                    student_class.student_id,
                    student_account.first_name,
                    student_account.last_name
                FROM"
                    . Section::SCLASS .
                "LEFT OUTER JOIN student_account
                    ON student_account.id = student_class.student_id
                WHERE
                    student_class.class_id = :class_id";

            $stmt3 = $conn->prepare($query3);
            $stmt3->bindParam(":class_id", $result[$i]['id']);
            $stmt3->execute();
            $result[$i]["students"] = $stmt3->fetchAll(PDO::FETCH_ASSOC);


            for($j = 0; $j < count($result[$i]["students"]); $j++){
                $result[$i]["students"][$j]["grades"] = array();
            }

            for($j = 0; $j < count($result[$i]["quizzes"]); $j++){
                for($k = 0; $k < count($result[$i]["students"]); $k++){
                    $query4 =
                        "SELECT
                            score
                        FROM"
                            . Section::GRADES .
                        "WHERE 
                            student_id = :student_id AND
                            quiz_id = :quiz_id AND
                            class_id = :class_id";

                    $stmt4 = $conn->prepare($query4);
                    $stmt4->bindParam(":student_id",  $result[$i]["students"][$k]["student_id"]);
                    $stmt4->bindParam(":quiz_id", $result[$i]["quizzes"][$j]["id"]);
                    $stmt4->bindParam(":class_id", $result[$i]['id']);
                    $stmt4->execute();
                    array_push($result[$i]["students"][$k]["grades"], $stmt4->fetchAll(PDO::FETCH_ASSOC));
                }
            }
        }
        return $result;
    }

    public static function readGrade($conn, $data){
        for($i = 0; $i < count($data->quizzes); $i++){
            for($j = 0; $j < count($data->students); $j++){
            }
        }
    }
}