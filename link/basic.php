<?php
namespace Link;

use Exception;
class Basic
{
    protected static function load_conf($path,$type = true): array
    {
        $json_str = file_get_contents($path);
        if(is_null($json_str) || $json_str == '')
            return array();
        $json = json_decode($json_str,$type);
        if(is_null($json))
            return array();
        return $json;
    }

    protected static function check_args($params)
    {
        if(is_null($params))
            throw new Exception("参数格式错误&&param format error");
    }

    protected static function handleRet($data,$status,$msg_cn,$msg_en): string
    {
        $lang = Basic::load_conf('/link/config/lang.json');

        if(strpos($msg_cn,'&&'))
        {
            $msg_array = explode("&&", $msg_cn);
            if($lang['lang'] == 'cn')
                $msg = $msg_array[0];
            else
                $msg = $msg_array[1];
        }
        else
        {
            if($lang['lang'] == 'en')
                $msg = $msg_en;
            else
                $msg = $msg_cn;
        }

        $retVal = array(
            'data' => $data,
            'status' => $status,
            'msg' => $msg
        );
        return json_encode($retVal,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    }
}