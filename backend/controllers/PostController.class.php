<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Post.class.php';

class PostController extends Controller {
    protected static function get($request, $params) {
        try {
            $post = Post::find(array('id' => $params[0]), $request->include);
            static::response($post, 200);
        }
        catch (Exception $e) {
            static::response(array(), 400, $e->getMessage());
        }
    }
}
