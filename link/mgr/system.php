<?php

namespace Link\Mgr;

use Link\Basic;
class System extends Basic
{
    public function getSystemTime()
    {
        exec('date +"%Y-%m-%d %H:%M:%S"',$output);
        return $this->handleRet($output[0],'success','保存成功','save successfully');
    }

    public function getAutoRebootDate()
    {
        exec( 'crontab -u root -l | grep /link/shell/reboot.sh',$output);
        return $this->handleRet($output[0],'success','获取成功','get successfully');
    }
}
