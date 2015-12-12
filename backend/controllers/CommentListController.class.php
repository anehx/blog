<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Comment.class.php';

class CommentListController extends Controller {
    protected static function get($request, $params) {
        try {
            $comments = Comment::query($request->get('queryParams'), $request->include);
        }
        catch (OutOfBoundsException $e) {
            $comments = Comment::findAll($request->include);
        }

        static::response($comments, 200);
    }

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
