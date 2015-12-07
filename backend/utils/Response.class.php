<?php

class Response {
	public static function output($success, $data, $message = null) {
		header('Content-Type: application/json');
		header('Access-Control-Allow-Origin: *');

		echo json_encode(array(
			'data'    => $data,
			'success' => $success,
			'message' => $message
		));
		exit;
	}
}
