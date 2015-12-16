<?php

include_once __DIR__ . '/../models/User.class.php';
include_once __DIR__ . '/../utils/Request.class.php';

/**
 * The main controller class
 *
 * @author Jonas Metzener
 * @license MIT
 * @copyright Copyright (c) 2015, Jonas Metzener
 */
class Controller {

    /**
     * Encodes data for frontend usage
     *
     * @param mixed $data
     * @return mixed
     */
    protected static function encodeData($data) {
        if (is_array($data) || is_object($data)) {
            return array_map('static::encodeData', (array)$data);
        }
        elseif (is_string($data)) {
            return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
        }
        else {
            return $data;
        }
    }

    /**
     * Outputs JSON response
     *
     * @param mixed $data
     * @param int $status
     * @param string $detail
     */
    public static function response($data, $status, $detail = null) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($status);

        $json = json_encode(array(
            'data'   => array_map('static::encodeData', (array)$data),
            'detail' => $detail
        ));

        echo $json;
        exit;
    }

    /**
     * Authorizes a request
     *
     * @param Request $request
     * @return Request
     */
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

    /**
     * Main handle function
     *
     * @param string $params
     * @return void
     */
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

    /**
     * The get handler of this controller
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function get($request, $params) {
        static::response(array(), 404, 'No GET handler defined for this route.');
    }

    /**
     * The post handler of this controller
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function post($request, $params) {
        static::response(array(), 404, 'No POST handler defined for this route.');
    }

    /**
     * The put handler of this controller
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function put($request, $params) {
        static::response(array(), 404, 'No PUT handler defined for this route.');
    }

    /**
     * The delete handler of this controller
     *
     * @param Request $request
     * @param string $params
     * @return void
     */
    protected static function delete($request, $params) {
        static::response(array(), 404, 'No DELETE handler defined for this route.');
    }

}
