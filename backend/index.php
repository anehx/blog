<?php

require_once __DIR__ . '/utils/Router.class.php';

require_once __DIR__ . '/controllers/Controller.class.php';

require_once __DIR__ . '/controllers/UserController.class.php';

require_once __DIR__ . '/controllers/BlogListController.class.php';
require_once __DIR__ . '/controllers/BlogController.class.php';

require_once __DIR__ . '/controllers/PostListController.class.php';
require_once __DIR__ . '/controllers/PostController.class.php';

require_once __DIR__ . '/controllers/CommentListController.class.php';
require_once __DIR__ . '/controllers/CommentController.class.php';

require_once __DIR__ . '/controllers/CategoryListController.class.php';
require_once __DIR__ . '/controllers/CategoryController.class.php';

require_once __DIR__ . '/controllers/RegisterController.class.php';
require_once __DIR__ . '/controllers/LoginController.class.php';

$router = new Router('\/api\/v1');

$router->route('\/users\/(\d+)', 'UserController::handle');

$router->route('\/blogs',        'BlogListController::handle');
$router->route('\/blogs\/(\d+)', 'BlogController::handle');

$router->route('\/posts',        'PostListController::handle');
$router->route('\/posts\/(\d+)', 'PostController::handle');

$router->route('\/comments',        'CommentListController::handle');
$router->route('\/comments\/(\d+)', 'CommentController::handle');

$router->route('\/categories',        'CategoryListController::handle');
$router->route('\/categories\/(\d+)', 'CategoryController::handle');

$router->route('\/register', 'RegisterController::handle');
$router->route('\/login',    'LoginController::handle');

if (isset($_SERVER['REDIRECT_URL'])) {
    $router->execute(explode('?', $_SERVER['REDIRECT_URL'])[0]);
}

Controller::response(array(), 404, 'Route not found');
