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

    protected static function put($request, $params) {
        static::authorize($request);

        try {
            $post = Post::find(array('id' => $params[0]), 'blog');

            if ($post->blog->userID === $request->user->id) {
                $post->set('categoryID', $request->get('categoryID'));
                $post->set('title', $request->get('title'));
                $post->set('content', $request->get('content'));
                unset($post->blog);

                static::response($post->save(), 200, '');
            }
            else {
                static::response(array(), 403, 'No Permission');
            }
        }
        catch (Exception $e) {
            static::response(array(), 400, $e->getMessage());
        }
    }

    protected static function delete($request, $params) {
        static::authorize($request);

        try {
            $post = Post::find(array('id' => $params[0]), 'blog');

            if ($post->blog->userID === $request->user->id) {
                $post->delete();

                static::response(array(), 200, '');
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
