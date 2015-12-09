<?php

require_once __DIR__ . '/Model.class.php';

class Comment extends Model {
    protected static $fields = array(
        'userID'       => array(
            'type'     => 'int',
            'required' => true,
            'related'  => 'User'
        ),
        'postID'       => array(
            'type'     => 'int',
            'required' => true,
            'related'  => 'Post'
        ),
        'text'         => array(
            'type'     => 'string',
            'required' => true,
            'related'  => null
        )
    );
}
