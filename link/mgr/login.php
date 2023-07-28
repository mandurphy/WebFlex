<?php

namespace Link\Mgr;

use Link\Basic;
class Login extends Basic
{
    public function hadLogin()
    {
        session_start();
        $hadLogin = false;
        if ( isset( $_SESSION[ 'login' ] ) && ( $_SESSION[ 'login' ] == "admin" || $_SESSION[ 'login' ] == "superadmin" ) )
            $hadLogin = true;
        return $this->handleRet($hadLogin,'success','获取登录状态成功','get login status successfully');
    }

    public function onLogout()
    {
        session_start();
        $_SESSION[ 'login' ] = "";
        return $this->handleRet('','success','登出成功','logout successful');
    }
}
