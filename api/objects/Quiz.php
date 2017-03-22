<?php

class Quiz
{
    const TABLE = " quiz ";
    const ASSOC = " test ";
    const SCHED = " quiz_schedule ";

    public static function create($conn, $data){
        $query =
            "INSERT INTO"
                . Quiz::TABLE .
            "SET
                name = :name,
                professor_id = :professor_id,
                category_id = :category_id,
                subcategory_id = :subcategory_id,
                subject_id = :subject_id,
                duration = :duration,
                passingPercent = :percent";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":name", $data->title);
        $stmt->bindParam(":professor_id", $data->user);
        $stmt->bindParam(":category_id", $data->selectedCategory->id);
        $stmt->bindParam(":subcategory_id", $data->selectedSubCategory->id);
        $stmt->bindParam(":subject_id", $data->selectedSubject->id);
        $stmt->bindParam(":duration", $data->duration);
        $stmt->bindParam(":percent", $data->passingPercent);
        $stmt->execute();
        $quiz_id = $conn->lastInsertId();

        for ($i = 0; $i < count($data->questions); $i++) {
            $query2 =
                "INSERT INTO"
                    . Quiz::ASSOC .
                "SET
                    quiz_id = :quiz_id,
                    question_id = :question_id,
                    order_no = :order_no";

            $stmt2 = $conn->prepare($query2);
            $stmt2->bindParam(":quiz_id", $quiz_id);
            $stmt2->bindParam(":question_id", $data->questions[$i]->id);
            $stmt2->bindParam(":order_no", $data->questions[$i]->orderNo);
            $stmt2->execute();
        }

        return true;
    }


    public static function read($conn, $data){
        $query =
            "SELECT 
                quiz.id,
                quiz.name AS title,
                quiz.duration,
                quiz.passingPercent,
                category.name AS category,
                subcategory.name AS subcategory,
                subject.name AS subject
            FROM"
                . Quiz::TABLE .
            "LEFT OUTER JOIN category 
                ON category.id = quiz.category_id 
            LEFT OUTER JOIN subcategory 
                ON subcategory.id = quiz.subcategory_id 
            LEFT OUTER JOIN subject 
                ON subject.id = quiz.subject_id 
            WHERE 
                quiz.professor_id = :professor_id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":professor_id", $data->user);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        for ($i = 0; $i < count($result); $i++) {
            $query2 =
                "SELECT COUNT(*) FROM"
                    . Quiz::SCHED .
                "WHERE
                    quiz_id = :quiz_id";

            $stmt2 = $conn->prepare($query2);
            $stmt2->bindParam(":quiz_id", $result[$i]['id']);
            $stmt2->execute();
            $status = $stmt2->fetchColumn();
            $result[$i]['status'] = $status==0 ? 0 : 1;
        }
        return $result;
    }

    public static function view($conn, $data){
        $query =
            "SELECT
                test.question_id AS id,
                test.order_no AS orderNo,
                question.detail AS question,
                question.option1,
                question.option2,
                question.option3,
                question.option4,
                question.answer
            FROM"
                . Quiz::ASSOC .
            "LEFT OUTER JOIN question
                ON question.id = test.question_id
            WHERE
                test.quiz_id = :quiz_id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":quiz_id", $data->id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public static function update($conn, $data){
        $query =
            "UPDATE"
                . Quiz::TABLE .
            "SET
                name = :name,
                duration = :duration,
                passingPercent = :percent,
            WHERE
                id = :id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":name", $data->title);
        $stmt->bindParam(":duration", $data->duration);
        $stmt->bindParam(":percent", $data->passingPercent);
        $stmt->bindParam(":id", $data->id);
        $stmt->execute();

        $query2 =
            "DELETE FROM"
                . Quiz::ASSOC .
            "WHERE 
                quiz_id = :quiz_id";

        $stmt2 = $conn->prepare($query2);
        $stmt2->bindParam(":quiz_id", $data->id);
        $stmt2->execute();

        for ($i = 0; $i < count($data->questions); $i++) {
            $query3 =
                "INSERT INTO"
                    . Quiz::ASSOC .
                "SET
                    quiz_id = :quiz_id,
                    question_id = :question_id,
                    order_no = :order_no";

            $stmt3 = $conn->prepare($query3);
            $stmt3->bindParam(":quiz_id", $data->id);
            $stmt3->bindParam(":question_id", $data->questions[$i]->id);
            $stmt3->bindParam(":order_no", $data->questions[$i]->orderNo);
            //$stmt3->bindParam(":id", $data->questions[$i]->id);
            $stmt3->execute();
        }
        return true;
    }

    public static function delete($conn, $id){
        $query =
            "DELETE FROM"
                . Quiz::ASSOC .
            "WHERE 
                quiz_id = :quiz_id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":quiz_id", $id);
        $stmt->execute();

        $query2 =
            "DELETE FROM"
                . Quiz::TABLE .
            "WHERE
                id = :id";

        $stmt2 = $conn->prepare($query2);
        $stmt2->bindParam(":id", $id);
        $stmt2->execute();
        return true;
    }

    public static function assign($conn, $data){
        $query =
            "INSERT INTO"
                . Quiz::SCHED .
            "SET
                quiz_id = :quiz_id,
                class_id = :class_id,
                schedule = :schedule";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":quiz_id", $data->selectedQuiz->id);
        $stmt->bindParam(":class_id", $data->classInfo->id);
        $data->dateString = date("Y-m-d H:i:s", strtotime($data->dateString));
        $stmt->bindParam(":schedule", $data->dateString);
        $stmt->execute();
        return true;
    }

    public static function postpone($conn, $data){
        $query =
            "DELETE FROM"
                . Quiz::SCHED .
            "WHERE
                quiz_id = :quiz_id AND
                class_id = :class_id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":quiz_id", $data->selectedQuiz->id);
        $stmt->bindParam(":class_id", $data->classInfo->id);
        $stmt->execute();
        return true;

    }
}