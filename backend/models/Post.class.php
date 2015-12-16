<?php

require_once __DIR__ . '/Model.class.php';

/**
 * The post model
 *
 * @author Jonas Metzener
 * @license MIT
 * @copyright Copyright (c) 2015, Jonas Metzener
 */
class Post extends Model {

    /**
     * Fields of the model
     *
     * @var array $fields
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
     * Default ordering key
     *
     * @property string $ordering
     */
    protected static $ordering = 'created DESC';
}
