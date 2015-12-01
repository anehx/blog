<?php

class Response {
	private $_response;

	public function __construct($success, $data, $message = null) {
		$this->_response = array(
			'data'    => $data,
			'success' => $success,
			'message' => $message
		);
	}

	public function returnResponse() {
		header('Content-Type: application/json');
		header('Access-Control-Allow-Origin: *');
		echo json_encode($this->_response);
	}
}
