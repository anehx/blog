<?php

require_once __DIR__ . '/Model.class.php';

class Category extends Model {
    /**
     *
     * Fields of the model
     *
     * @static
     * @property array $fields
     */
    protected static $fields = array(
        'name'         => array(
            'type'     => 'string',
            'required' => true,
            'related'  => null
        )
    );
}
