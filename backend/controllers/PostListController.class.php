<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Post.class.php';

class PostListController extends Controller {
    protected static function get($request, $params) {
        if (isset($request['body']['queryParams'])) {
            $posts = Post::query($request['body']['queryParams']);
        }
        else {
            $posts = Post::findAll();
        }

        static::response($posts, 200);
    }

    protected static function post($request, $params) {
        $post = new Post($request['body']);

        static::response($post, 200);
    }
}
