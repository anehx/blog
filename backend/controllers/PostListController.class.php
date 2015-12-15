<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Post.class.php';

/**
 * The post list controller /api/v1/posts
 *
 */
class PostListController extends Controller {

    /**
     * Gets a list of posts
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function get($request, $params) {
        try {
            $posts = Post::query($request->get('queryParams'), $request->include);
        }
        catch (OutOfBoundsException $e) {
            $posts = Post::findAll($request->include);
        }

        static::response($posts, 200);
    }

    /**
     * Add a new post
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function post($request, $params) {
        static::authorize($request);

        try {
            $data = array(
                'categoryID' => $request->get('categoryID'),
                'blogID'     => Blog::find(array('id' => $request->user->id))->get('id'),
                'title'      => $request->get('title'),
                'content'    => $request->get('content'),
                'created'    => time()
            );

            $post = new Post($data);

            static::response($post->save(), 201, '');
        }
        catch (Exception $e) {
            static::response(array(), 400, $e->getMessage());
        }
    }
}
