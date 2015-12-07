<?php

abstract class Controller {
    public static function reponse($data, $status, $detail = null) {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');

        echo json_encode(array(
            'data'   => $data,
            'status' => $status,
            'detail' => $detail
        ));
        exit;
    }

    public static function handle($request, $params) {
        switch ($request['method']) {
            case 'GET':
                static::get($request, $params);
                break;
            case 'POST':
                static::post($request, $params);
                break;
            default:
                static::get($request, $params);
                break;
        }
    }

    protected static abstract function get($request, $params);
    protected static abstract function post($request, $params);
}
