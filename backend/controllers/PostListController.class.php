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
        static::authorize($request);

        try {
            $post = new Post(array(
                'userID'     => $request['user']->get('id'),
                'categoryID' => $request['body']['categoryID'],
                'title'      => $request['body']['title'],
                'content'    => $request['body']['content'],
                'created'    => time()
            ));

            static::response($post->save(), 201);
        }
        catch (Exception $e) {
            static::response(array(), 500, $e->getMessage());
        }
    }
}
