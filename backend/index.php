<?php

require_once __DIR__ . '/utils/Router.class.php';

require_once __DIR__ . '/controllers/UserListController.class.php';
require_once __DIR__ . '/controllers/BlogListController.class.php';
require_once __DIR__ . '/controllers/PostListController.class.php';

$router = new Router('/api/v1');

$router->route('/users', 'UserListController::handle');
$router->route('/blogs', 'BlogListController::handle');
$router->route('/posts', 'PostListController::handle');

$router->execute($_SERVER['PATH_INFO']);
