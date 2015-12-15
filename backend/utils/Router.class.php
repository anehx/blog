<?php

/**
 * The URL router
 *
 */
class Router {

    /**
     * The routes of this router
     *
     * @var array $routes
     */
    private $routes = array();

    /**
     * The constructor of the router
     *
     * @param string $base
     * @return void
     */
    public function __construct($base) {
        $this->base = $base;
    }

    /**
     * Add a new route
     *
     * @param string $pattern
     * @param string $callback
     * @return void
     */
    public function route($pattern, $callback) {
        $p = $this->base . $pattern;

        $this->routes['/' . $p . '\/?$/'] = $callback;
    }

    /**
     * Check the current URL for matches in routed
     *
     * @param string $uri
     * @return mixed
     */
    public function execute($uri) {
        foreach ($this->routes as $pattern => $callback) {
            if (preg_match($pattern, $uri, $params) === 1) {
                array_shift($params);
                return call_user_func_array($callback, array_values($params));
            }
        }
    }

}
