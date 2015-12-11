<?php

include_once __DIR__ . '/../models/User.class.php';
include_once __DIR__ . '/../utils/Request.class.php';

class Controller {
    protected static function response($data, $status, $detail = null) {
        header('Content-Type: application/json; charset=utf-8');
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
            $token = str_replace('Basic ', '', $request->getHeader('Authorization'));

            $decrypted = base64_decode($token);

            list($username, $password) = explode(':', $decrypted);

            $user = User::find(array('username' => $username));

            if (!$user) {
                throw new Exception();
            }
            elseif (password_verify($password, $user->get('password'))) {
                $request->user = $user;
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
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, User-Agent');

        $request = new Request();

        switch ($request->method) {
            case 'GET':
                static::get($request, $params);
                break;
            case 'POST':
                static::post($request, $params);
                break;
            case 'DELETE':
                static::delete($request, $params);
                break;
            case 'PUT':
                static::put($request, $params);
                break;
            case 'OPTIONS':
                static::response(array(), 203);
                break;
            default:
                static::response(array(), 404);
                break;
        }
    }

    protected static function get($request, $params) {
        static::response(array(), 404, 'No GET handler defined for this route.');
    }

    protected static function post($request, $params) {
        static::response(array(), 404, 'No POST handler defined for this route.');
    }

    protected static function put($request, $params) {
        static::response(array(), 404, 'No PUT handler defined for this route.');
    }

    protected static function delete($request, $params) {
        static::response(array(), 404, 'No DELETE handler defined for this route.');
    }
}
