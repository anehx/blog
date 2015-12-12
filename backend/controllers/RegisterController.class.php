<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/User.class.php';

class RegisterController extends Controller {
    protected static function post($request, $params) {
        try {
            try {
                User::find(array('username' => $request->get('username')));
                static::response(array(), 409, 'User with this username already exists');
            }
            catch (Exception $e) {
                $user = new User(array(
                    'username' => $request->get('username'),
                    'password' => password_hash($request->get('password'), PASSWORD_BCRYPT),
                    'isAdmin'  => false
                ));
                $user->save();

                $blog = new Blog(array(
                    'userID' => $user->id,
                    'name'   => $request->get('blogname')
                ));
                $blog->save();

                $user->blog = $blog;

                static::response($user, 201);
            }
        }
        catch (Exception $e) {
            static::response(array(), 500, $e->getMessage());
        }
    }
}
