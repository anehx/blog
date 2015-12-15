<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Blog.class.php';

/**
 * The login controller /api/v1/login
 *
 */
class LoginController extends Controller {

    /**
     * Get the current authorize status
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function get($request, $params) {
        static::authorize($request);

        $user = $request->user;

        if ($user) {
            $user->blog = Blog::find(array('userID' => $user->id));
        }

        static::response($user, 200);
    }

    /**
     * Log a user in
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function post($request, $params) {
        try {
            $user = User::find(array('username' => $request->get('username')));

            if (!is_a($user, 'User')) {
                static::response(array(), 400, 'No user found');
            }
            elseif (password_verify($request->get('password'), $user->get('password'))) {
                $user->blog = Blog::find(array('userID' => $user->id));
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
