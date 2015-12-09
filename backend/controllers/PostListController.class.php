<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Post.class.php';

class PostListController extends Controller {
    protected static function get($request, $params) {
        try {
            $posts = Post::query($request->get('queryParams'), $request->include);
        }
        catch (OutOfBoundsException $e) {
            $posts = Post::findAll($request->include);
        }

        static::response($posts, 200);
    }

    protected static function post($request, $params) {
        static::authorize($request);

        try {
            $post = new Post(array(
                'blogID'     => Category::find(array('id' => $request->user->get('id'))),
                'categoryID' => $request->get('categoryID'),
                'title'      => $request->get('title'),
                'content'    => $request->get('content'),
                'created'    => time()
            ));

            static::response($post->save(), 201);
        }
        catch (Exception $e) {
            static::response(array(), 500, $e->getMessage());
        }
    }
}
