<?php
class Question
{
    private $conn;
    private $table_name = "q_bank";
    private $prof_id = "00-0000";

    public $q_id;
    public $categ;
    public $sub_code;
    public $subj;
    public $q_det;
    public $q_points;
    public $a_id;
    //public $prof_id;

    public function __construct($db)
    {
        $this->conn = $db;
    }


    public function create($a_id)
    {
        $status = "1";
        // query to insert record
        $query =
            "INSERT INTO"
                . $this->table_name .
            "SET 
                categ=:categ, 
                sub_code=:sub_code, 
                subj=:subj, 
                q_det=:q_det, 
                q_points=:q_points, 
                prof_id=:prof_id,
                a_id=:a_id, 
                status=:status";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // posted values
        $this->categ = htmlspecialchars(strip_tags($this->categ));
        $this->sub_code = htmlspecialchars(strip_tags($this->sub_code));
        $this->subj = htmlspecialchars(strip_tags($this->subj));
        $this->q_det = htmlspecialchars(strip_tags($this->q_det));
        $this->q_points = htmlspecialchars(strip_tags($this->q_points));
        $this->prof_id = htmlspecialchars(strip_tags($this->prof_id));

        // bind values
        $stmt->bindParam(":categ", $this->categ);
        $stmt->bindParam(":sub_code", $this->sub_code);
        $stmt->bindParam(":subj", $this->subj);
        $stmt->bindParam(":q_det", $this->q_det);
        $stmt->bindParam(":q_points", $this->q_points);
        $stmt->bindParam(":prof_id", $this->prof_id);
        $stmt->bindParam(":a_id", $a_id);
        $stmt->bindParam(":status", $status);

        // execute query
        if ($stmt->execute()) {
            return true;
        } else {
            echo "<pre>";
            print_r($stmt->errorInfo());
            echo "</pre>";

            return false;
        }
    }

    public function readAll()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function retrieveProfQuestion()
    {
        $query = "SELECT q_id, categ, sub_code, subj, q_det, q_points, a_id FROM "
                . $this->table_name .
                " WHERE prof_id=:prof_id AND status='1'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":prof_id", $this->prof_id);
        $stmt->execute();
        return $stmt;
    }

    public function updateQuestion()
    {
        // update query
        $query = "UPDATE
                " . $this->table_name . "
            SET
                categ = :categ,
                sub_code = :sub_code,
                subj = :subj,
                q_det = :q_det,
                q_points = :q_points
            WHERE
                q_id = :q_id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->categ = htmlspecialchars(strip_tags($this->categ));
        $this->sub_code = htmlspecialchars(strip_tags($this->sub_code));
        $this->subj = htmlspecialchars(strip_tags($this->subj));
        $this->q_det = htmlspecialchars(strip_tags($this->q_det));
        $this->q_points = htmlspecialchars(strip_tags($this->q_points));
        $this->q_id = htmlspecialchars(strip_tags($this->q_id));

        // bind new values
        $stmt->bindParam(':categ', $this->categ);
        $stmt->bindParam(':sub_code', $this->sub_code);
        $stmt->bindParam(':subj', $this->subj);
        $stmt->bindParam(':q_det', $this->q_det);
        $stmt->bindParam(':q_points', $this->q_points);
        $stmt->bindParam(':q_id', $this->q_id);

        // execute the query
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function delQuestion()
    {
        // delete query
        $query = "UPDATE " . $this->table_name . " SET status='0' WHERE q_id = :q_id";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->q_id = htmlspecialchars(strip_tags($this->q_id));

        // bind id of record to delete
        $stmt->bindParam(':q_id', $this->q_id);

        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}

?>