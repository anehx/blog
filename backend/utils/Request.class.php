<?php

class Request {
    public $method;
    private $body;
    private $headers;
    public $user;
    public $include;

    public function __construct() {
        $this->method  = $_SERVER['REQUEST_METHOD'];
        $this->headers = getallheaders();

        switch ($this->method) {
            case 'POST':
            case 'PUT':
                if (!empty($_POST)) {
                    $this->body = $_POST;
                }
                else {
                    parse_str(file_get_contents('php://input'), $post);
                    $this->body = $post;
                }
                break;
            case 'GET':
                $this->body = $_GET;
                break;
            default:
                $this->body = array();
        }

        try {
            $this->include = $this->get('include');
        }
        catch (OutOfBoundsException $e) {
            $this->include = null;
        }
    }

    public function get($key) {
        if (!isset($this->body[$key])) {
            throw new OutOfBoundsException(sprintf('Key %s is not a valid key', $key));
        }

        return $this->body[$key];
    }

    public function getHeader($key) {
        if (!isset($this->headers[$key])) {
            throw new OutOfBoundsException(sprintf('Header %s is not given', $key));
        }

        return $this->headers[$key];
    }
}
