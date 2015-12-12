<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Comment.class.php';

class CommentController extends Controller {
    protected static function delete($request, $params) {
        static::authorize($request);

        try {
            $comment = Comment::find(array('id' => $params));

            if ($comment->userID === $request->user->id) {
                $comment->delete();

                static::response(array(), 200, '');
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
