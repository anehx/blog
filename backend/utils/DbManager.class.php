<?php

class DbManager {

	private static $_db;

	public static function getInstance() {
		if (!isset(self::$_db)) {
			$filename  = dirname(__FILE__).'/db.sqlite';
			self::$_db = new PDO('sqlite:'.$filename);
			self::$_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}

		return self::$_db;
	}

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
