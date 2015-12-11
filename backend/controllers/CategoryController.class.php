<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Category.class.php';

class CategoryController extends Controller {
    protected static function get($request, $params) {
        try {
            $category = Category::find(array('id' => $params));
            static::response($category, 200);
        }
        catch (Exception $e) {
            static::response(array(), 400, $e->getMessage());
        }
    }
}
