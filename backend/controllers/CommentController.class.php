<?php

require_once __DIR__ . '/Controller.class.php';
require_once __DIR__ . '/../models/Comment.class.php';

/**
 * The comment controller /api/v1/comments/<params>
 *
 * @author Jonas Metzener
 * @license MIT
 * @copyright Copyright (c) 2015, Jonas Metzener
 */
class CommentController extends Controller {

    /**
     * Delete a comment
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function delete($request, $params) {
        static::authorize($request);

        try {
            $comment = Comment::find(array('id' => $params));
            $post    = Post::find(array('id' => $comment->postID), 'blog');

            if (
                $comment->userID    === $request->user->id ||
                $post->blog->userID === $request->user->id
            ) {
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
