<?php

require_once __DIR__ . '/../utils/DbManager.class.php';

class Model {
    protected static $tableName = null;

    protected static $ordering = 'id';

    private static function __getTableName() {
        return static::$tableName ? static::$tableName : strtolower(get_called_class());
    }

    private static function __cast($type, $variable) {
        switch ($type) {
            case 'int':
                $variable = (int)$variable;
                break;
            case 'string':
                $variable = (string)$variable;
                break;
            case 'bool':
                $variable = (bool)$variable;
                break;
            default:
                break;
        }
        return $variable;
    }

    public function __construct($data) {
        $this->id = (int)$data['id'];

        foreach (static::$fields as $field => $type) {
            $this->$field = static::__cast($type, $data[$field]);
        }
    }

    public function set($field, $value) {
        $this->${field} = $value;
    }

    public function get($field) {
        return $this->${field};
    }

    public static function findAll() {
        $query = sprintf(
            'SELECT * FROM %s ORDER BY %s',
            self::__getTableName(),
            self::$ordering
        );

        $records = DbManager::query($query)->fetchAll();

        return array_map(function($row) { return new static($row); }, $records);
    }

    public static function find($criteria = array()) {
        $query = sprintf(
            'SELECT * FROM %s WHERE %s LIMIT 1',
            self::__getTableName(),
            join(' AND ', array_map(function($k) { return sprintf('%s = :%s', $k, $k); }, array_keys($criteria)))
        );

        $stmt = DbManager::prepare($query);
        $stmt->execute($criteria);

        return new static($stmt->fetch());
    }
}
