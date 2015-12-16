<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Blog.class.php';

/**
 * The blog controller /api/v1/blogs/<params>
 *
 * @author Jonas Metzener
 * @license MIT
 * @copyright Copyright (c) 2015, Jonas Metzener
 */
class BlogController extends Controller {

    /**
     * Gets a blog
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function get($request, $params) {
        try {
            $blog = Blog::find(array('id' => $params));
            static::response($blog, 200);
        }
        catch (Exception $e) {
            static::response(array(), 400, $e->getMessage());
        }
    }

    /**
     * Update a blog
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
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
