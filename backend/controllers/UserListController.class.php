<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/User.class.php';

class UserListController extends Controller {
    protected static function get($request, $params) {
        $users = User::findAll();

        static::response($users, 200);
    }
}
