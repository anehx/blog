<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Blog.class.php';

class BlogListController extends Controller {
    protected static function get($request, $params) {
        $blogs = Blog::findAll();

        static::response($blogs, 200);
    }
}
