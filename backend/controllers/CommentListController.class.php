<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Comment.class.php';

/**
 * The comment list controller /api/v1/comments
 *
 * @author Jonas Metzener
 * @license MIT
 * @copyright Copyright (c) 2015, Jonas Metzener
 */
class CommentListController extends Controller {

    /**
     * Get a list of comments
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function get($request, $params) {
        try {
            $comments = Comment::query($request->get('queryParams'), $request->include);
        }
        catch (OutOfBoundsException $e) {
            $comments = Comment::findAll($request->include);
        }

        static::response($comments, 200);
    }

    /**
     * Add a comment
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function post($request, $params) {
        static::authorize($request);

        try {
            $data = array(
                'postID'  => $request->get('postID'),
                'userID'  => $request->user->get('id'),
                'text'    => $request->get('text'),
                'created' => time()
            );

            $comment = new Comment($data);
            $comment->save();

            static::response(
                Comment::find(array('id' => $comment->id), $request->include),
                201,
                ''
            );
        }
        catch (Exception $e) {
            static::response(array(), 400, $e->getMessage());
        }
    }
}
