<?php

class Database{
	private $host="localhost";
	private $username="root";
	private $password="";
	private $db_name="lindex";
	public $conn;
	
	public function getConnection(){
		$this->conn = null;
		try{
			$this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
		}catch(PDOException $ex){
			echo "Connection error: ".$ex->getMessage();
		}

		return $this->conn;
	}
}
?>