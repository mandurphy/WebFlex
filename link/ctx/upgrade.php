<?php

namespace Link\Ctx;

use Link\Basic;
class Upgrade extends Basic
{
    private $helpServer = "www.help.linkpi.cn:5735";
    public function checkHelpNet()
    {
        exec('ping '.$this->helpServer.' -c1',$exec_out);
        $out = join(" ",$exec_out);
        if($out == "" || !strstr($out," 0%"))
            return $this->handleRet("",'error','网络异常，请检测网络','he network is abnormal, Check the network');
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function getSystemFac()
    {
        $hardware = json_decode(file_get_contents('/link/config/hardware.json'), true);
        $fac = $hardware["fac"];
        $fac = str_replace("\n","",$fac);
        return $fac;
    }

    public function getSystemAliase($param)
    {
        $fac = $this->getSystemFac();
        if(is_null($fac) || $fac == "")
            return $this->handleRet("",'error','获取机型错误','Error getting model');
        $args = array("fac"=>$fac);
        return $this->send_post("http://".$this->helpServer."/api/aliase/query_aliase",json_encode($args));
    }

    public function getAllSystemPatch($param)
    {
        $fac = $this->getSystemFac();
        if(is_null($fac) || $fac == "")
            return $this->handleRet("",'error','获取机型错误','Error getting model');
        $version = json_decode(file_get_contents("/link/config/version.json"),true);
        $sys_ary = explode(" ",$version["sys"]);
        $args = array("type"=>$fac,"build"=>$sys_ary[0],"sys_ver"=>$sys_ary[2]);
        return $this->send_post("http://".$this->helpServer."/api/patch/query_patch",json_encode($args));
    }

    public function checkVersionMaster() {
        $fac = $this->getSystemFac();
        if(is_null($fac) || $fac == "")
            return $this->handleRet("",'error','获取机型错误','Error getting model');
        $version = json_decode(file_get_contents("/link/config/version.json"),true);
        $sys_ary = explode(" ",$version["sys"]);
        $args = array("type"=>$fac,"build"=>$sys_ary[0],"sys_ver"=>$sys_ary[2]);
        return $this->send_post("http://".$this->helpServer."/api/patch/query_master",json_encode($args));
    }

    public function getSystemPatchBySn($param) {
        $fac = $this->getSystemFac();
        if(is_null($fac) || $fac == "")
            return $this->handleRet("",'error','获取机型错误','Error getting model');
        $args = array("type"=>$fac,"sn"=>$param["sn"]);
        return $this->send_post("http://".$this->helpServer."/api/patch/query_sn_patch",json_encode($args));
    }

    public function send_post($url, $data = null)
    {
        $context = null;
        if(!is_null($data))
        {
            $opts = ['http'=>[
                    'method'=>'POST',
                    'header' => 'Content-type:application/x-www-form-urlencoded',
                    'content'=> $data
                ]];
            $context = stream_context_create($opts);
        }
        $json = file_get_contents($url, false, $context);
        if(strpos($http_response_header[0], "200") == false)
        {
            if(strpos($http_response_header[0], "404") != false)
                return $this->handleRet("404",'error','函数未找到','function not found');
            if(strpos($http_response_header[0], "405") != false)
                return $this->handleRet("405",'error','函数参数不匹配','function argument mismatch');
            return $this->handleRet($http_response_header[0],'error','请求异常','request exception');
        }
        if(is_null($json))
            return $this->handleRet("-1",'error','返回值为空','return value is empty');
        $retVal = json_decode($json,JSON_UNESCAPED_UNICODE);
        if(is_null($retVal))
            return $this->handleRet("500",'error','返回格式异常','return format exception');
        return $this->handleRet($retVal["data"],'success','执行成功','execution succeed');
    }
}
