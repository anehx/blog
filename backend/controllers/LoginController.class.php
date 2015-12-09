<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/User.class.php';

class LoginController extends Controller {
    protected static function post($request, $params) {
        try {
            $user = User::find(array('username' => $request['body']['username']));

            if (!$user) {
                static::response(array(), 400, 'No user found');
            }
            elseif (password_verify($request['body']['password'], $user->get('password'))) {
                static::response($user, 200);
            }
            else {
                static::response(array(), 400, 'Wrong password');
            }
        }
        catch (Exception $e) {
            static::response(array(), 500, $e->getMessage());
        }
    }
}
