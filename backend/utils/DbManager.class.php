<?php

class DbManager {

    /**
     *
     * PDO instance with given configuration
     *
     * @property PDO $_db
     * @static
     */
    private static $_db;

    /**
     *
     * Returns a PDO instance
     *
     * @static
     * @return PDO
     */
    public static function getInstance() {
        if (!isset(self::$_db)) {
            $filename  = dirname(__FILE__).'/../db/db.sqlite';
            self::$_db = new PDO('sqlite:'.$filename);
            self::$_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			self::$_db->exec('PRAGMA foreign_keys = ON;');
        }

        return self::$_db;
    }

    /**
     *
     * Redirect all static calls to PDO instance
     *
     * @static
     * @return mixed
     */
    public static function __callStatic($name, $arguments) {
        $inst = self::getInstance();

        return call_user_func_array(
            array(
                $inst,
                $name
            ),
            $arguments
        );
    }
}
