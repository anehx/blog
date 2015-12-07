<?php

require_once __DIR__ . '/Model.class.php';

class User extends Model {
    protected static $fields = array(
        'username' => 'string',
        'password' => 'string',
        'isAdmin'  => 'bool'
    );
}
