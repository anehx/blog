<?php

require_once __DIR__ . '/Model.class.php';

class Blog extends Model {
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
        'name'         => array(
            'type'     => 'string',
            'required' => true,
            'related'  => null
        )
    );
}
