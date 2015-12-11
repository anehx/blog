<?php

require_once __DIR__ . '/Model.class.php';

class Post extends Model {
    /**
     *
     * Fields of the model
     *
     * @static
     * @property array $fields
     */
    protected static $fields = array(
        'categoryID'   => array(
            'type'     => 'int',
            'required' => true,
            'related'  => 'Category'
        ),
        'blogID'       => array(
            'type'     => 'int',
            'required' => true,
            'related'  => 'Blog'
        ),
        'title'        => array(
            'type'     => 'string',
            'required' => true,
            'related'  => null
        ),
        'content'      => array(
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
