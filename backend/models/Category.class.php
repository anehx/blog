<?php

require_once __DIR__ . '/Model.class.php';

/**
 * The category model
 *
 * @author Jonas Metzener
 * @license MIT
 * @copyright Copyright (c) 2015, Jonas Metzener
 */
class Category extends Model {

    /**
     * Fields of the model
     *
     * @var array $fields
     */
    protected static $fields = array(
        'name'         => array(
            'type'     => 'string',
            'required' => true,
            'related'  => null
        )
    );
}
