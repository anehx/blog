<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Category.class.php';

/**
 * The category list controller /api/v1/categories
 *
 */
class CategoryListController extends Controller {

    /**
     * Get a list of categories
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
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
