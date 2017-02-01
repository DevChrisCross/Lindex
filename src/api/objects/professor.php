<?php

/**
 * Created by PhpStorm.
 * User: Chris
 * Date: 01/02/2017
 * Time: 1:08 PM
 */
class professor
{
    private $conn;
    private $table_name="prof_login";

    public $prof_id;
    public $password;
    public $last_log;
    public $email;

    public $last_name;
    public $first_name;

    public function __construct($db){
        $this->conn = $db;
    }
}

?>