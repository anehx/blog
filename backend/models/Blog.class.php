<?php

require_once __DIR__ . '/Model.class.php';

/**
 * The blog model
 *
 * @author Jonas Metzener
 * @license MIT
 * @copyright Copyright (c) 2015, Jonas Metzener
 */
class Blog extends Model {

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
        'name'         => array(
            'type'     => 'string',
            'required' => true,
            'related'  => null
        )
    );
}
