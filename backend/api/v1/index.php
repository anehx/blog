<?php

include_once '../../utils/Response.class.php';

$url  = $_SERVER['PATH_INFO'];

$success = true;
$data    = array();
$msg     = '';

switch ($url) {
	case '/posts':
		$data[] = array(
			'title'   => 'test',
			'content' => 'hi there folks'
		);
		break;
	default:
		$success = false;
		$msg     = 'Route not found.';
		break;
}

$res = new Response($success, $data, $msg);
$res->returnResponse();
