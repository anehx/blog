<?php

include_once "../../utils/DbManager.class.php";

session_start();

header("Content-Type: application/json");

if ($_POST) {
	if (isset($_POST['username']) && isset($_POST['password'])) {
		$stmt = DbManager::prepare("SELECT * FROM User WHERE password = ? AND username = ?");
		$stmt->execute(array($_POST['password'], $_POST['username']));
		$result = $stmt->fetch();

		if ($result) {
			echo json_encode(array("success" => true, "data" => $result));
		}
		else {
			echo json_encode(array("success" => false, "data" => 'Wrong credentials'));
		}
	}
}
