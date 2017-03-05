<?php

class Question
{
    const TABLE = " question ";

    public static function create($conn, $data)
    {
        $query =
            "INSERT INTO"
                . Question::TABLE .
            "SET 
                category_id     = :question_category, 
                subcategory_id  = :question_subcategory, 
                subject_id      = :question_subject, 
                professor_id    = :professor_id,
                detail          = :question_detail, 
                option1         = :q_option1,
                option2         = :q_option2,
                option3         = :q_option3,
                option4         = :q_option4,
                answer          = :question_answer, 
                status          = '1'";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":question_category",      $data->selectedCategory->id);
        $stmt->bindParam(":question_subcategory",   $data->selectedSubCategory->id);
        $stmt->bindParam(":question_subject",       $data->selectedSubject->id);
        $stmt->bindParam(":professor_id",           $data->user);
        $stmt->bindParam(":question_detail",        $data->question);
        $stmt->bindParam(":q_option1",              $data->options[0]);
        $stmt->bindParam(":q_option2",              $data->options[1]);
        $stmt->bindParam(":q_option3",              $data->options[2]);
        $stmt->bindParam(":q_option4",              $data->options[3]);
        $stmt->bindParam(":question_answer",        $data->answer);
        $stmt->execute();
        return $conn->lastInsertId();
    }

    public static function readAll($conn)
    {
        $query = "SELECT * FROM" . Question::TABLE;
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public static function read($conn, $professor_id)
    {
        $query =
            "SELECT 
                question.id, 
                question.detail AS question, 
                question.answer, 
                question.option1,
                question.option2,
                question.option3,
                question.option4,
                category.name AS category, 
                subcategory.name AS subcategory, 
                subject.name AS subject 
            FROM"
                . Question::TABLE .
            "LEFT OUTER JOIN category 
                ON category.id = question.category_id 
            LEFT OUTER JOIN subcategory 
                ON subcategory.id = question.subcategory_id 
            LEFT OUTER JOIN subject 
                ON subject.id = question.subject_id 
            WHERE 
                question.professor_id = :professor_id AND question.status = '1'";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(":professor_id", $professor_id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public static function readScope($conn, $professor_id){

    }

    public static function update($conn, $data)
    {
        $query =
            "UPDATE"
                . Question::TABLE .
            "SET
                detail  = :question_detail,
                option1 = :q_option1,
                option2 = :q_option2,
                option3 = :q_option3,
                option4 = :q_option4,
                answer  = :question_answer
                
            WHERE
                id = :question_id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(':question_detail',    $data->question);
        $stmt->bindParam(":q_option1",          $data->options[0]);
        $stmt->bindParam(":q_option2",          $data->options[1]);
        $stmt->bindParam(":q_option3",          $data->options[2]);
        $stmt->bindParam(":q_option4",          $data->options[3]);
        $stmt->bindParam(':question_answer',    $data->answer);
        $stmt->bindParam(':question_id',        $data->id);
        return $stmt->execute();
    }

    public static function delete($conn, $data)
    {
        $query =
            "UPDATE"
                . Question::TABLE .
            "SET 
                status='0' 
            WHERE 
                id = :question_id";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(':question_id', $data->id);
        return $stmt->execute();
    }
}

?>