<?php
include_once 'Headers.php';
class Database{
	private $host       = "localhost";
	private $username   = "root";
	private $password   = "";
	private $db_name    = "lindex";
	public $conn;
	
	public function getConnection(){
		$this->conn = null;

		try
        {
			$this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
		}

		catch(PDOException $e)
        {
			echo "Connection error: ".$e->getMessage();
		}

		return $this->conn;
	}

	public static function updateHistory($conn, $id, $details){
	    $history = "history_activity";
        $query =
            "INSERT INTO"
                . " :table " .
            "SET
                professor_id = :professor_id,
                date = :date,
                time = :time,
                details = :details";

        date_default_timezone_set('Asia/Manila');
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":table", $history);
        $stmt->bindParam(":professor_id", $id);
        $stmt->bindParam(":date", date("Y-m-d"));
        $stmt->bindParam(":time", date("h:i:sa"));
        $stmt->bindParam(":details", $details);
        return $stmt->execute();
    }
}
?>