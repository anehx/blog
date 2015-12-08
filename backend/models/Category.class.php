<?php

require_once __DIR__ . '/Model.class.php';

class Category extends Model {
    protected static $fields = array(
        'name'         => array(
            'type'     => 'string',
            'required' => true,
            'related'  => null
        )
    );
}
