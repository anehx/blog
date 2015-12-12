<?php

require_once __DIR__ . '/../utils/DbManager.class.php';

require_once __DIR__ . '/Blog.class.php';
require_once __DIR__ . '/Category.class.php';
require_once __DIR__ . '/Comment.class.php';
require_once __DIR__ . '/Post.class.php';
require_once __DIR__ . '/User.class.php';

class Model {
    /**
     *
     * Fields of the model (needs to be defined in child class)
     *
     * @static
     * @property array $fields
     */
    protected static $fields = array();

    /**
     *
     * Table name of the model
     *
     * @static
     * @property string $tableName
     */
    protected static $tableName = null;

    /**
     *
     * Default ordering key
     *
     * @static
     * @property string $ordering
     */
    protected static $ordering = 'id';

    /**
     *
     * Returns the table name of the model
     *
     * @static
     * @return string
     */
    private static function __getTableName() {
        return static::$tableName ? static::$tableName : strtolower(get_called_class());
    }

    /**
     *
     * Casts a variable to a given type
     *
     * @static
     * @param  string $type
     * @param  string $variable
     * @return mixed
     */
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

    /**
     *
     * Checks if a field is a property of the model
     *
     * @static
     * @param  string $field
     * @return void
     */
    protected static function __checkField($field) {
        if (!isset(static::$fields[$field]) && $field !== 'id') {
            throw new Exception(sprintf('Field %s does not exist.', $field));
        }
    }

    /**
     *
     * Validates a field of a model
     *
     * @static
     * @param  string $field
     * @param  mixed  $value
     * @return void
     */
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

    /**
     *
     * Constructor of the model
     *
     * @param  array  $data
     * @param  string $include
     * @return static
     */
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

    /**
     *
     * Sets a property
     *
     * @param  string $field
     * @param  mixed  $value
     * @return void
     */
    public function set($field, $value) {
        static::__validate($field, $value);

        $this->$field = $value;
    }

    /**
     *
     * Gets a property
     *
     * @param  string $field
     * @return mixed
     */
    public function get($field) {
        static::__checkField($field);

        return $this->$field;
    }

    /**
     *
     * Creates or updates a model
     *
     * @return static
     */
    public function save() {
        if (is_null($this->id)) {
            return $this->create();
        }
        else {
            return $this->update();
        }
    }

    /**
     *
     * Updates a model in the db
     *
     * @return static
     */
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

    /**
     *
     * Deletes a model in the db
     *
     * @return bool
     */
    public function delete() {
        $query = sprintf(
            'DELETE FROM %s WHERE id = :id',
            static::__getTableName()
        );

        $stmt= DbManager::prepare($query);
        $stmt->execute(array('id' => $this->id));

        return $stmt;
    }

    /**
     *
     * Creates a model in the db
     *
     * @return static
     */
    public function create() {
        $fieldNames = array_keys(static::$fields);

        $query = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            static::__getTableName(),
            join(',', $fieldNames),
            join(',', array_map(function($k) { return ':'.$k; }, $fieldNames))
        );

        $stmt   = DbManager::prepare($query);
        $values = array();

        foreach (static::$fields as $k => $v) {
            $values[$k] = $this->get($k);
        }

        $stmt->execute($values);
        $this->id = DbManager::lastInsertId();

        return $this;
    }

    /**
     *
     * Finds all models in the db
     * Wrapper for query
     *
     * @param  string $include
     * @return array
     */
    public static function findAll($include = null) {
        return static::query(array(), $include, null);
    }

    /**
     *
     * Queries db for models by given criteria
     *
     * @param  array  $criteria
     * @param  string $include
     * @param  int    $limit
     * @return array
     */
    public static function query($criteria, $include = null, $limit = null) {
        $query = sprintf(
            'SELECT * FROM %s %s %s ORDER BY %s %s',
            self::__getTableName(),
            !empty($criteria) ? 'WHERE' : '',
            join(' AND ', array_map(function($k) {
                return sprintf('%s = :%s', $k, $k);
            }, array_keys($criteria))),
            static::$ordering,
            $limit ? 'LIMIT ' . $limit : ''
        );

        $stmt = DbManager::prepare($query);
        $stmt->execute($criteria);

        return array_map(function($row) use ($include) { return new static($row, $include); }, $stmt->fetchAll());
    }

    /**
     *
     * Finds a single model in the db by given criteria
     *
     * @param  array  $criteria
     * @param  string $include
     * @return static
     */
    public static function find($criteria, $include = null) {
        $query = static::query($criteria, $include, 1);

        if (empty($query)) {
            throw new Exception(sprintf('No %s with this criteria found.', strtolower(get_called_class())));
        }
        elseif (count($query) > 1) {
            throw new Exception(sprintf('Mulitple objecs of %s with this criteria found.', strtolower(get_called_class())));
        }

        return $query[0];
    }
}
