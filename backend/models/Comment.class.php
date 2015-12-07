<?php

require_once __DIR__ . '/Model.class.php';

class Comment extends Model {
    protected static $fields = array(
        'userID' => 'int',
        'postID' => 'int',
        'text'   => 'string'
    );
}
