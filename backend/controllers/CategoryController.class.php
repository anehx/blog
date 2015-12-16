<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Category.class.php';

/**
 * The category controller /api/v1/categories/<params>
 *
 * @author Jonas Metzener
 * @license MIT
 * @copyright Copyright (c) 2015, Jonas Metzener
 */
class CategoryController extends Controller {

    /**
     * Gets a category
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
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
