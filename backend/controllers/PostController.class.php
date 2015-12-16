<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Post.class.php';

/**
 * The post controller /api/v1/posts/<params>
 *
 * @author Jonas Metzener
 * @license MIT
 * @copyright Copyright (c) 2015, Jonas Metzener
 */
class PostController extends Controller {

    /**
     * Gets a post
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function get($request, $params) {
        try {
            $post = Post::find(array('id' => $params), $request->include);
            static::response($post, 200);
        }
        catch (Exception $e) {
            static::response(array(), 400, $e->getMessage());
        }
    }

    /**
     * Update a post
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function put($request, $params) {
        static::authorize($request);

        try {
            $post = Post::find(array('id' => $params), 'blog');

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

    /**
     * Delete a post
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function delete($request, $params) {
        static::authorize($request);

        try {
            $post = Post::find(array('id' => $params), 'blog');

            if (
                $post->blog->userID === $request->user->id ||
                $request->user->isAdmin
            ) {
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
