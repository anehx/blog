<?php

require_once __DIR__ . '/Model.class.php';

/**
 * The category model
 *
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
