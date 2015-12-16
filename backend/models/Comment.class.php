<?php

require_once __DIR__ . '/Model.class.php';

/**
 * The comment model
 *
 * @author Jonas Metzener
 * @license MIT
 * @copyright Copyright (c) 2015, Jonas Metzener
 */
class Comment extends Model {

    /**
     * Fields of the model
     *
     * @var array $fields
     */
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
        ),
        'created'      => array(
            'type'     => 'int',
            'required' => true,
            'related'  => null
        )
    );

    /**
     * Default ordering key
     *
     * @var string $ordering
     */
    protected static $ordering = 'created DESC';
}
