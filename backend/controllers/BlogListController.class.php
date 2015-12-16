<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Blog.class.php';

/**
 * The blog list controller /api/v1/blogs
 *
 * @author Jonas Metzener
 * @license MIT
 * @copyright Copyright (c) 2015, Jonas Metzener
 */
class BlogListController extends Controller {

    /**
     * Get a list of blogs
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function get($request, $params) {
        $blogs = Blog::findAll($request->include);

        static::response($blogs, 200);
    }
}
