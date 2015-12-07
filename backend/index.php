<?php

require_once __DIR__ . '/utils/Router.class.php';
require_once __DIR__ . '/controllers/UserController.class.php';

$router = new Router('/api/v1');

$router->route('/users', 'UserController::handle');

$router->execute($_SERVER['REQUEST_URI']);
