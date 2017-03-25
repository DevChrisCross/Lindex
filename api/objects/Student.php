<?php

class Student
{
    const TABLE = " student_account ";
    const SCLASS = " student_class ";
    const SCHED = " quiz_schedule ";
    const TEST = " test ";
    const QUESTION = " question ";
    const GRADE = " student_grades ";

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

    public static function readSchedule($conn, $data){
        $query =
            "SELECT 
                student_class.class_id,
                professor_class.block_code AS blockCode,
                professor_class.subject_id,
                subject.code,
                subject.name
            FROM"
                . Student::SCLASS .
            "LEFT OUTER JOIN professor_class 
                ON professor_class.id = student_class.class_id 
            LEFT OUTER JOIN subject
                ON subject.id =  professor_class.subject_id 
            WHERE
                student_class.student_id = :student_id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":student_id", $data->studentID);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        for ($i = 0; $i < count($result); $i++){
            $query2 =
                "SELECT 
                    quiz_schedule.id AS schedID,
                    quiz_schedule.schedule,
                    quiz_schedule.quiz_id,
                    quiz.name,
                    quiz.duration,
                    quiz.passingPercent,
                    student_grades.score
                 FROM"
                    . Student::SCHED .
                "LEFT OUTER JOIN quiz
                    ON quiz_schedule.quiz_id = quiz.id
                LEFT OUTER JOIN student_grades
                    ON student_grades.quiz_id = quiz_schedule.quiz_id AND student_grades.student_id = :studentID
                WHERE
                    quiz_schedule.class_id = :class_id";

            $stmt2 = $conn->prepare($query2);
            $stmt2->bindParam(":class_id", $result[$i]["class_id"]);
            $stmt2->bindParam(":studentID", $data->studentID);
            $stmt2->execute();
            $result[$i]["quizzes"] = $stmt2->fetchAll(PDO::FETCH_ASSOC);

            for($j = 0; $j < count($result[$i]["quizzes"]); $j++) {
                $query3 =
                    "SELECT 
                        test.order_no AS orderNo,
                        test.question_id,
                        question.detail,
                        question.option1,
                        question.option2,
                        question.option3,
                        question.option4,
                        question.answer
                    FROM"
                        . Student::TEST .
                    "LEFT OUTER JOIN question
                        ON question.id = test.question_id";

                $stmt3 = $conn->prepare($query3);
                $stmt3->execute();
                $result[$i]["quizzes"][$j]["questions"] = $stmt3->fetchAll(PDO::FETCH_ASSOC);
            }
        }


        return $result;

    }
}