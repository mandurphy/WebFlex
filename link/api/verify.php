<?php

namespace Link\Api;

use Link\Basic;
use Exception;
class Verify extends Basic
{
    protected function link_verify($login = true)
    {
        if($_REQUEST['verify'] == 'true')
        {
            $user = ['admin'=>'admin'];
            $realm = 'lph_http';
            if(!isset($_SERVER['PHP_AUTH_DIGEST']))
                $this->send_verify($realm);

            $verify_result = $this->parse_verify($_SERVER['PHP_AUTH_DIGEST'], $realm, $user);
            if(!$verify_result)
                $this->send_verify($realm);

        }

        if($_REQUEST['login'] == 'true' && $login)
        {
            if(!$this->had_login())
                throw new Exception('请先登录&&please login first');
        }
    }

    protected function send_verify($realm) {
        http_response_code(401);
        $nonce = md5(uniqid());
        $opaque = md5($realm);
        header("Content-type: text/html; charset=utf-8");
        header('WWW-Authenticate:Digest realm="'.$realm.'", qop="auth", nonce="'.$nonce.'", opaque="'.$opaque.'"');
        throw new Exception('认证失败&&Authentication failed');
        exit;
    }

    protected function parse_verify($auth, $realm, $users): bool
    {
        $data = array();
        $list = array('username', 'uri', 'nonce', 'cnonce', 'response');
        foreach($list as $part) {
            if(!preg_match('/'.$part.'=([\'"]?)(.*?)\1/', $auth, $match))
                return false;
            $data[$part] = $match[2];
        }

        //验证pop格式
        if(preg_match('/qop=auth(,|$)/', $auth))
            $data['qop'] = 'auth';
         else
            return false;

        //验证nonce格式
        if(preg_match('/nc=([0-9a-f]{8})(,|$)/', $auth, $match))
            $data['nc'] = $match[1];
        else
            return false;

        $H1 = $data['username'].':'.$realm.':'.$users[$data['username']];
        $H2 = $_SERVER['REQUEST_METHOD'].':'.$data['uri'];
        $response = md5(implode(':', [
            md5($H1),
            $data['nonce'],
            $data['nc'],
            $data['cnonce'],
            $data['qop'],
            md5($H2)
        ]));

        if($response != $data['response'])
            return false;
        return true;
    }

    protected function had_login(): bool
    {
        if(!isset($_SERVER['HTTP_L_HASH']) || !isset($_SERVER['HTTP_P_HASH']) || !isset($_SERVER['HTTP_H_HASH']))
            return false;

        $l_hash = $_SERVER['HTTP_L_HASH'];
        $p_hash = $_SERVER['HTTP_P_HASH'];
        $h_hash = $_SERVER['HTTP_H_HASH'];

        session_start();
        if(!isset($_SESSION['L-HASH']) || !isset($_SESSION['P-HASH']) || !isset($_SESSION['H-HASH']))
            return false;

        if($l_hash == $_SESSION['L-HASH'] && $p_hash == $_SESSION['P-HASH'] && $h_hash == $_SESSION['H-HASH'])
            return true;
        return false;
    }
}