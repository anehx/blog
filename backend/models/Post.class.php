<?php

require_once __DIR__ . '/Model.class.php';

class Post extends Model {
    protected static $fields = array(
        'categoryID' => 'int',
        'userID'     => 'int',
        'title'      => 'string',
        'content'    => 'string'
    );
}
