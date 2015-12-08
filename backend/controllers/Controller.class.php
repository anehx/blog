<?php

class Controller {
    public static function response($data, $status, $detail = null) {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');

        echo json_encode(array(
            'data'   => $data,
            'status' => $status,
            'detail' => $detail
        ));
        exit;
    }

    public static function handle($params = array()) {
        $request = array(
            'method'  => $_SERVER['REQUEST_METHOD'],
            'body'    => $_REQUEST,
            'headers' => getallheaders()
        );

        switch ($request['method']) {
            case 'GET':
                static::get($request, $params);
                break;
            case 'POST':
                static::post($request, $params);
                break;
            case 'DELETE':
                static::delete($request, $params);
                break;
            default:
                throw new Exception('No route defined for this method.');
        }
    }

    protected static function get($request, $params) {
        throw new Exception('No get handler defined for this route.');
    }

    protected static function post($request, $params) {
        throw new Exception('No post handler defined for this route.');
    }

    protected static function delete($request, $params) {
        throw new Exception('No delete handler defined for this route.');
    }
}
