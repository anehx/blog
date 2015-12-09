<?php

require_once __DIR__ . '/../utils/DbManager.class.php';

require_once __DIR__ . '/Blog.class.php';
require_once __DIR__ . '/Category.class.php';
require_once __DIR__ . '/Comment.class.php';
require_once __DIR__ . '/Post.class.php';
require_once __DIR__ . '/User.class.php';

class Model {
    protected static $fields = array();

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

    protected static function __checkField($field) {
        if (!isset(static::$fields[$field])) {
            throw new Exception(sprintf('Field %s does not exist.', $field));
        }
    }

    protected static function __validate($field, $value) {
        static::__checkField($field);

        $attr = static::$fields[$field];

        if (is_null($value) && $attr['required']) {
            throw new Exception(sprintf('Field %s can not be null.', $field));
        }

        if ($attr['related']) {
            if (!call_user_func_array(array($attr['related'], 'find'), array(array('id' => $value)))) {
                throw new Exception(sprintf('Relation %s with id %d does not exist.', $field, $value));
            }
        }
    }

    public function __construct($data, $include = null) {
        $this->id = isset($data['id']) ? (int)$data['id'] : null;

        foreach (static::$fields as $field => $attr) {
            $value = isset($data[$field]) ? static::__cast($attr['type'], $data[$field]) : null;

            static::__validate($field, $value);

            $this->$field = $value;
        }

        if ($include) {
            foreach (explode(',', $include) as $inc) {
                foreach (static::$fields as $k => $v) {
                    if ($inc === strtolower($v['related'])) {
                        $this->$inc = call_user_func_array(
                            array($v['related'], 'find'),
                            array(array('id' => $this->$k))
                        );
                    }
                }
            }
        }
    }

    public function set($field, $value) {
        static::__validate($field, $value);

        $this->$field = $value;
    }

    public function get($field) {
        static::__checkField($field);

        return $this->$field;
    }

    public function save() {
        if (is_null($this->id)) {
            return $this->create();
        }
        else {
            return $this->update();
        }
    }

    public function update() {
        $fieldNames = array_keys(static::$fields);

        $query = sprintf(
            'UPDATE %s SET %s WHERE id = :id',
            static::__getTableName(),
            join(',', array_map(function($k) { return sprintf('%s = :%s', $k, $k); }, $fieldNames))
        );

        $stmt= DbManager::prepare($query);

        $stmt->execute((array)$this);

        return $this;
    }

    public function create() {
        $fieldNames = array_keys(static::$fields);

        $query = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            static::__getTableName(),
            join(',', $fieldNames),
            join(',', array_map(function($k) { return ':'.$k; }, $fieldNames))
        );

        $stmt   = DbManager::prepare($query);
        $values = (array)$this;

        unset($values['id']);

        $stmt->execute($values);
        $this->id = DbManager::lastInsertId();

        return $this;
    }

    public static function findAll($include = null) {
        $query = sprintf(
            'SELECT * FROM %s ORDER BY %s',
            self::__getTableName(),
            self::$ordering
        );

        $records = DbManager::query($query)->fetchAll();

        return array_map(function($row) use ($include) { return new static($row, $include); }, $records);
    }

    public static function query($criteria, $include = null, $limit = null) {
        $query = sprintf(
            'SELECT * FROM %s WHERE %s %s',
            self::__getTableName(),
            join(' AND ', array_map(function($k) {
                return sprintf('%s = :%s', $k, $k);
            }, array_keys($criteria))),
            $limit ? 'LIMIT ' . $limit : ''
        );

        $stmt = DbManager::prepare($query);
        $stmt->execute($criteria);

        return array_map(function($row) use ($include) {
            return new static($row, $include);
        }, $stmt->fetchAll());
    }

    public static function find($params, $include = null) {
        $query = static::query($params, $include, 1);

        if (empty($query)) {
            throw new Exception(sprintf('No %s with these parameters found.', strtolower(get_called_class())));
        }

        return $query[0];
    }
}
