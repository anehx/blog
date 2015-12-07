<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/User.class.php';

class UserController extends Controller {
    protected static function get($request, $params) {
        $users = User::findAll();

        return $users;
    }

    protected static function post($request, $params) {
        echo 'post user';

        return null;
    }
}
