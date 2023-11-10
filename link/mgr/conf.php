<?php

namespace Link\Mgr;

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
        file_put_contents( '/link/config/theme.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT) );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateDiskConf($param)
    {
        file_put_contents( '/link/config/misc/disk.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT) );
        return $this->handleRet("",'success','保存成功','save successfully');
    }
}
