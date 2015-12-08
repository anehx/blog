<?php

require_once __DIR__ . '/Model.class.php';

class Blog extends Model {
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
