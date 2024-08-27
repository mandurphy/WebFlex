<?php

namespace Link\Ctx;

use Link\Basic;
class Conf extends Basic
{
    public function updateLangConf($param)
    {
        $lang = array("lang"=> $param);
        file_put_contents( "/link/config/lang.json", json_encode($lang,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateNetConf($param)
    {
        file_put_contents( '/link/config/net.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT) );
        exec( '/link/shell/setNetwork.sh' );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateNet2Conf($param)
    {
        file_put_contents( '/link/config/net2.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT) );
        exec( '/link/shell/setNetwork.sh eth1' );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updatePasswdConf($param)
    {
        $oldpwd = $param['oldpwd'];
        $newpwd = $param['newpwd'];
        $confirm = $param['confirm'];
        $data = json_decode( file_get_contents( '/link/config/passwd.json' ), true );
        if ($data[0]["passwd"] != md5($oldpwd))
            return $this->handleRet("",'error','原密码错误','Original password wrong');

        if ($newpwd != $confirm)
            return $this->handleRet("",'error','密码不一致','Password inconformity');

        $data[0][ "passwd" ] = md5($newpwd);
        file_put_contents( '/link/config/passwd.json', json_encode($data,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','修改成功','save successfully');
    }

    public function updateVideoBufferConf($param)
    {
        file_put_contents( '/link/config/videoBuffer.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        exec( 'pkill Encoder' );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateNtpConf($param)
    {
        file_put_contents( '/link/config/ntp.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateTimezoneConf($param)
    {
        $area = $param["timeArea"];
        $city = $param["timeCity"];
        exec("cp /link/config/misc/timezone/zoneinfo/".$area."/".$city." /etc/localtime");
        file_put_contents( "/link/config/misc/timezone/tzselect.json",json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updatePtzConf($param)
    {
        file_put_contents( '/link/config/auto/ptz.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT) );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateThemeConf($param)
    {
        file_put_contents( '/link/config/theme_standard.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT) );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateDiskConf($param)
    {
        file_put_contents( '/link/config/misc/disk.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT) );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateRtmpConf($param)
    {
        file_put_contents( '/link/config/rtmp.conf', $param);
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateNdiConf($param)
    {
        if(is_null(json_decode($param)))
            return $this->handleRet("",'error','保存失败,格式错误','Failed to save, format error');
        file_put_contents( '/link/config/ndi.json', $param);
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateServiceConf($param)
    {
        file_put_contents( '/link/config/service.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateSlsConf($param)
    {
        file_put_contents( '/link/config/sls.conf', $param);
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateFrpEnableConf($param)
    {
        file_put_contents( '/link/config/rproxy/frp_enable', $param);
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateFrpcConf($param)
    {
        file_put_contents( '/link/config/rproxy/frpc.ini', $param);
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateRttyConf($param)
    {
        file_put_contents( '/link/config/rtty.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateMacConf($param)
    {
        $param = strtolower(str_replace(':', '', $param));
        file_put_contents( '/link/config/mac', $param);
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateMac2Conf($param)
    {
        $param = strtolower(str_replace(':', '', $param));
        file_put_contents( '/link/config/mac2', $param);
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    function updateHardwareConf($param)
    {
        $hardwardConf = file_get_contents('/link/config/hardware.json');
        $hardwardConf = json_decode($hardwardConf, true);
        foreach($hardwardConf["function"] as $key => $val)
        {
            if(isset($param["function"][$key]))
            {
                $hardwardConf["function"][$key]= $param["function"][$key];
            }

        }
        file_put_contents ( '/link/config/hardware.json' ,  json_encode($hardwardConf,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    function handleMcuConf($param)
    {
        $files = array('/tmp/mcuVersion', '/tmp/fpgaVersion');
        $ctx = array();
        foreach ($files as $file) {
            if (file_exists($file)) {
                $ctx[basename($file)] = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            }
        }
        return $this->handleRet($ctx,'success','获取成功','get config successfully');
    }

    function updateRemoteConf($param)
    {
        file_put_contents( '/link/config/misc/remote_std/remote.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    function updateRXPushConf($param)
    {
        file_put_contents( '/link/config/misc/rxPush.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    function updateSrtPushConf($param)
    {
        file_put_contents( '/link/config/misc/srtPush.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    function updateLedConf($param)
    {
        if($param["enable"])
            exec("fw_setenv led_enable 'y'");
        else
            exec("fw_setenv led_enable 'n'");
        file_put_contents( '/link/config/led/config.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet('','success','保存成功','save successfully');
    }

    function updateWebRTCConf($param)
    {
        if(is_null(json_decode($param)))
            return $this->handleRet("",'error','保存失败,格式错误','Failed to save, format error');
        file_put_contents( '/link/config/rproxy/webrtc.json', $param);
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    function saveConfigFile($param) {
        file_put_contents( "/link/".$param["path"], $param['data'] );
        return json_encode(array("result" => "OK"),JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    }

    function updateNdiReciveConf($param)
    {
        file_put_contents( '/link/config/misc/ndiRecive.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }
}
