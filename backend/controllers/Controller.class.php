<?php

include_once __DIR__ . '/../models/User.class.php';

class Controller {
    protected static function response($data, $status, $detail = null) {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, User-Agent');
        http_response_code($status);

        $json = json_encode(array(
            'data'   => $data,
            'detail' => $detail
        ));

        echo $json;
        exit;
    }

    protected static function authorize($request) {
        try {
            $token = str_replace('Basic ', '', $request['headers']['Authorization']);

            $decrypted = base64_decode($token);

            list($username, $password) = explode(':', $decrypted);

            $user = User::find(array('username' => $username));

            if (!$user) {
                throw new Exception();
            }
            elseif (password_verify($password, $user->get('password'))) {
                $request['user'] = $user;
            }
            else {
                throw new Exception();
            }
        }
        catch (Exception $e) {
            static::response(array(), 401, 'Not Authorized');
        }

        return $request;
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
            case 'OPTIONS':
                static::response(array(), 203);
            default:
                static::response(array(), 404);
                break;
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
