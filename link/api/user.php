<?php

namespace Link\Api;

use Exception;
class User extends Verify
{
    private function get_hash(): string
    {
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()+-';
        $random = $chars[mt_rand(0,strlen($chars)-1)].$chars[mt_rand(0,strlen($chars)-1)].$chars[mt_rand(0,strlen($chars)-1)];
        $ctx = uniqid().$random;
        return sha1($ctx);
    }

    public function lph_login($user): string
    {
        try {
            $this->link_verify(false);
            $user = json_decode($user,true);
            $this->check_args($user);

            $username = $user["username"];
            $passwd = $user["passwd"];
            $passes = $this->load_conf('/link/config/passwd.json');
            $index = -1;
            for($i=0;$i<count($passes);$i++)
            {
                $pass = $passes[$i];
                foreach ($pass as $key => $value)
                {
                    if($key == 'name' && $username == $value)
                        $index = $i;
                }
            }

            if($index == -1 || $passwd != $passes[$index]['passwd'])
                return $this->handleRet('','error','用户名密码错误','the user name or password is incorrect');

            $data = array(
                'L-HASH' => $this->get_hash(),
                'P-HASH' => $this->get_hash(),
                'H-HASH' => $this->get_hash()
            );
            session_start();
            foreach ($data as $key => $value)
                $_SESSION[$key] = $value;

            return $this->handleRet($data,'success','登录成功','login successful');
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    public function lph_logout(): string
    {
        $this->link_verify();
        session_start();
        unset($_SESSION['L-HASH']);
        unset($_SESSION['P-HASH']);
        unset($_SESSION['H-HASH']);
        return $this->handleRet('','success','登出成功','logout successful');
    }
}