<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Blog.class.php';

class BlogController extends Controller {
    protected static function get($request, $params) {
        try {
            $blog = Blog::find(array('id' => $params));
            static::response($blog, 200);
        }
        catch (Exception $e) {
            static::response(array(), 400, $e->getMessage());
        }
    }

    protected static function put($request, $params) {
        static::authorize($request);

        try {
            $blog = Blog::find(array('id' => $params));

            if ($blog->userID === $request->user->id) {
                $blog->set('name', $request->get('blogname'));

                static::response($blog->save(), 200, '');
            }
            else {
                static::response(array(), 403, 'No Permission');
            }
        }
        catch (Exception $e) {
            static::response(array(), 400, $e->getMessage());
        }
    }
}
