<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/User.class.php';

class RegisterController extends Controller {
    protected static function post($request, $params) {
        try {
            $user = new User(array(
                'username' => $request['body']['username'],
                'password' => password_hash($request['body']['password'], PASSWORD_BCRYPT),
                'isAdmin'  => false
            ));

            static::response($user->save(), 201);
        }
        catch (Exception $e) {
            static::response(array(), 500, $e->getMessage());
        }
    }
}
