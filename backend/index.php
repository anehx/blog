<?php

require_once __DIR__ . '/utils/Router.class.php';
require_once __DIR__ . '/controllers/UserController.class.php';

$router = new Router('/api/v1');

$request = array(
    'method'  => $_SERVER['REQUEST_METHOD'],
    'body'    => $_REQUEST,
    'headers' => getallheaders()
);

$router->route('/users', UserController::handle($request));

$router->execute($_SERVER['REQUEST_URI']);
