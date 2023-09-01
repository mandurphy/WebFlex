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

    public function setSystemTime($param)
    {
        exec( "/link/bin/rtc -s time " . $param[ 'time1' ]. " '".$param[ 'time2' ]."'" );
        exec( "/link/bin/rtc -g time" );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function getSystemCrontab()
    {
        exec( 'crontab -u root -l | grep /link/shell/reboot.sh',$output);
        return $this->handleRet($output[0],'success','获取成功','get successfully');
    }

    public function setSystemCrontab($param)
    {
        if ( $param[ 'day' ] == "x" )
        {
            exec("sed -i '1s/.*/ /' /var/spool/cron/crontabs/root");
            exec("cp -a /var/spool/cron/crontabs/root /link/config/auto/root.cron");
        }
        else {
            $cron = '0 ' . $param[ 'time' ] . ' * * ' . $param[ 'day' ];
            exec("sed -i '1s/.*/".$cron." \/link\/shell\/reboot.sh/' /var/spool/cron/crontabs/root");
            exec("cp -a /var/spool/cron/crontabs/root /link/config/auto/root.cron");
        }
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function systemReboot()
    {
        exec( '/link/shell/reboot.sh' );
    }

    public function systemReset()
    {
        exec( '/link/shell/reset.sh' );
    }

    public function startHelp($param)
    {
        $hardware = json_decode(file_get_contents("/link/config/hardware.json"),true);
        $helpCode=$param['helpCode'];
        $sshPort=2000+intval($helpCode);
        $rtspPort=5000+intval($helpCode);
        exec("pkill ngrokc" );
        exec("/usr/bin/ngrokc -SER[Shost:".$hardware["other"]["help"].",Sport:4443] -AddTun[Type:http,Lhost:127.0.0.1,Lport:80,Sdname:".$authCode."] -AddTun[Type:tcp,Lhost:127.0.0.1,Lport:22,Rport:".$sshPort."] -AddTun[Type:tcp,Lhost:127.0.0.1,Lport:554,Rport:".$rtspPort."] > /tmp/ngrok &" );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function stopHelp()
    {
        exec("pkill ngrokc" );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function systemNetTest()
    {
        exec('ping www.baidu.com -c1',$output);
        return $this->handleRet($output,'success','执行成功','exec successfully');
    }


    public function getPushCrontab()
    {
        exec( "crontab -u root -l | grep '/link/web/link/timer/autoPush.php start'",$output1);
        exec( "crontab -u root -l | grep '/link/web/link/timer/autoPush.php stop'",$output2);
        return $this->handleRet(['start'=>$output1[0],'stop'=>$output2[0]],'success','执行成功','exec successfully');
    }

    public function setPushCrontab($param)
    {
        $start = $param['start'];
        if ( isset( $start[ 'day' ] ) && isset( $start[ 'time' ] ) ) {
            if ( $start[ 'day' ] == "x" )
            {
                exec("sed -i '2s/.*/ /' /var/spool/cron/crontabs/root");
                exec("cp -a /var/spool/cron/crontabs/root /link/config/auto/root.cron");
            }
            else {
                $tm = explode(":", $start[ 'time' ]);
                $cron = intval($tm[1]).' ' . intval($tm[0]) . ' * * ' . $start[ 'day' ];
                exec("sed -i '2s/.*/".$cron." \/usr\/php\/bin\/php \/link\/web\/link\/timer\/autoPush.php start/' /var/spool/cron/crontabs/root");
                exec("cp -a /var/spool/cron/crontabs/root /link/config/auto/root.cron");
            }
        }

        $stop = $param['stop'];
        if ( isset( $stop[ 'day' ] ) && isset( $stop[ 'time' ] ) ) {
            if ( $stop[ 'day' ] == "x" )
            {
                exec("sed -i '3s/.*/ /' /var/spool/cron/crontabs/root");
                exec("cp -a /var/spool/cron/crontabs/root /link/config/auto/root.cron");
            }
            else {
                $tm = explode(":", $stop[ 'time' ]);
                $cron = intval($tm[1]).' ' . intval($tm[0]) . ' * * ' . $stop[ 'day' ];
                exec("sed -i '3s/.*/".$cron." \/usr\/php\/bin\/php \/link\/web\/link\/timer\/autoPush.php stop/' /var/spool/cron/crontabs/root");
                exec("cp -a /var/spool/cron/crontabs/root /link/config/auto/root.cron");
            }
        }
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function formatBytes($param)
    {
        $config = [
            '4' => 'TB',
            '3' => 'GB',
            '2' => 'MB',
            '1' => 'KB'
        ];
        foreach ($config as $key => $value) {
            if ($param >= pow(1024, $key)) {
                return number_format($param / pow(1024, $key), 2) . $value;
            }
        }
        return '0KB';
    }

    public function getMountDiskSpace()
    {
        $mountDir = '/root/usb';
        $output = shell_exec('df ' . $mountDir);
        if(strpos($output, $mountDir) != false) {
            $totalSpace = disk_total_space($mountDir);
            $freeSpace = disk_free_space($mountDir);
            $usedSpace = $totalSpace - $freeSpace;
            $result = array(
                'total'=> $this->formatBytes($totalSpace),
                'free' => $this->formatBytes($freeSpace),
                'used' => $this->formatBytes($usedSpace)
            );
            return $this->handleRet($result,'success','获取成功','get disk space successfully');
        }
        return $this->handleRet('','error','磁盘未挂载','disk is not mounted');
    }
}
