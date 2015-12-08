<?php

class Router {
    private $routes = array();

    public function __construct($base) {
        $this->base = $base;
    }

    public function route($pattern, $callback) {
        $p = $this->base . $pattern;

        $this->routes['/' . preg_quote($p, '/') . '\/?$/'] = $callback;
    }

    public function execute($uri) {
        foreach ($this->routes as $pattern => $callback) {
            if (preg_match($pattern, $uri, $params) === 1) {
                array_shift($params);
                return call_user_func_array($callback, array_values($params));
            }
        }
    }
}
