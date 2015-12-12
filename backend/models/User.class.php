<?php

require_once __DIR__ . '/Model.class.php';

class User extends Model {
    /**
     *
     * Fields of the model
     *
     * @static
     * @property array $fields
     */
    protected static $fields = array(
        'username'     => array(
            'type'     => 'string',
            'required' => true,
            'related'  => null
        ),
        'password'     => array(
            'type'     => 'string',
            'required' => true,
            'related'  => null
        ),
        'isAdmin'      => array(
            'type'     => 'bool',
            'required' => true,
            'related'  => null
        )
    );

    /**
     *
     * Set the password as protected prop
     *
     * @property string $password
     */
    protected $password;
}
