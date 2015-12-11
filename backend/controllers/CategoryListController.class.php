<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Category.class.php';

class CategoryListController extends Controller {
    protected static function get($request, $params) {
        try {
            $categories = Category::query($request->get('queryParams'), $request->include);
        }
        catch (OutOfBoundsException $e) {
            $categories = Category::findAll($request->include);
        }

        static::response($categories, 200);
    }
}
