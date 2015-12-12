<?php

require_once __DIR__ . '/Model.class.php';

class Comment extends Model {
    /**
     *
     * Fields of the model
     *
     * @static
     * @property array $fields
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
     *
     * Default ordering key
     *
     * @static
     * @property string $ordering
     */
    protected static $ordering = 'created DESC';
}
