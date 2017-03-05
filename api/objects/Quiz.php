<?php

class Quiz
{
    const TABLE = " quiz ";
    const ASSOC = " test ";

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
                passingPercent = :percent,
                status = '1'";

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
                    question_id = :question_id";
            $stmt2 = $conn->prepare($query2);
            $stmt2->bindParam(":quiz_id", $quiz_id);
            $stmt2->bindParam(":question_id", $data->questions[$i]->id);
            $stmt2->execute();
        }

        return true;
    }


    public static function read($conn, $data){
        $query =
            "SELECT 
                quiz.id,
                quiz.name AS title,
                quiz.date,
                quiz.status,
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
                quiz.professor_id = :professor_id AND quiz.status = '1'";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":professor_id", $data->user);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public static function view($conn, $data){
        $query =
            "SELECT 
                question.id,
                question.detail,
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

    public static function update(){

    }

    public static function delete(){

    }
}