<?php

require_once __DIR__ . '/utils/Router.class.php';

require_once __DIR__ . '/controllers/UserListController.class.php';

require_once __DIR__ . '/controllers/BlogListController.class.php';

require_once __DIR__ . '/controllers/PostListController.class.php';
require_once __DIR__ . '/controllers/PostController.class.php';

require_once __DIR__ . '/controllers/CategoryController.class.php';
require_once __DIR__ . '/controllers/CategoryListController.class.php';

require_once __DIR__ . '/controllers/RegisterController.class.php';
require_once __DIR__ . '/controllers/LoginController.class.php';

$router = new Router('\/api\/v1');

$router->route('\/users', 'UserListController::handle');

$router->route('\/blogs', 'BlogListController::handle');

$router->route('\/posts',        'PostListController::handle');
$router->route('\/posts\/(\d+)', 'PostController::handle');

$router->route('\/categories',        'CategoryListController::handle');
$router->route('\/categories\/(\d+)', 'CategoryController::handle');

$router->route('\/register', 'RegisterController::handle');
$router->route('\/login',    'LoginController::handle');

$router->execute($_SERVER['REDIRECT_URL']);
