<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/User.class.php';

/**
 * The user controller /api/v1/users/<params>
 *
 */
class UserController extends Controller {

    /**
     * Delete a user
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function delete($request, $params) {
        static::authorize($request);

        if (!$request->user->isAdmin) {
            static::response(array(), 403, 'No permission');
        }

        try {
            $user = User::find(array('id' => $params));
            $user->delete();

            static::response(array(), 200, '');
        }
        catch (Exception $e) {
            static::response(array(), 400, $e->getMessage());
        }
    }
}
