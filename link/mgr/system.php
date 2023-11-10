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
        $output = shell_exec('df -h ' . $mountDir);
        if(strpos($output, $mountDir) != false) {
            $lines = explode("\n", trim($output));
            $dataLine = $lines[count($lines) - 1];
            $totalSpace = preg_split('/\s+/', $dataLine)[1];
            $usedSpace = preg_split('/\s+/', $dataLine)[2];
            $result = array(
                'total'=> $totalSpace,
                'used' => $usedSpace
            );
            return $this->handleRet($result,'success','获取成功','get disk space successfully');
        }
        return $this->handleRet('','error','磁盘未挂载','disk is not mounted');
    }

    function umountDisk() {
        exec("umount -l /root/usb");
        exec("sync");
        exec("df -h | grep /root/usb | wc -l",$output);
        if($output[0] == "0")
            return $this->handleRet("",'success','卸载成功','Uninstall successfully');
        else
            return $this->handleRet("",'error','卸载失败,请检测磁盘是否被占用','Uninstallation failed, please check if the disk is occupied');
    }

    function formatReady($param) {
        $psd = $param["psd"];
        $json_string = file_get_contents( '/link/config/passwd.json' );
        $data = json_decode( $json_string, true );
        if($data[0]["passwd"] == md5($psd))
            return $this->handleRet("",'success','正在格式化，请勿关闭此页面','Do not close this page while formatting');
        else
            return $this->handleRet("",'error','格式化失败，密码错误','Formatting failed because the password is incorrect');
    }

    function formatDisk($param) {
        exec("/link/shell/fusb.sh ".$param["format"]);
        return $this->handleRet("",'success','格式化完成','Formatting completed');
    }

    function mountDisk() {
        exec("/link/shell/mount.sh",$output);
        if($output[0] == "0")
            return $this->handleRet("",'error','外部存储设备挂载失败','The external storage device failed to be mounted');
        return $this->handleRet("",'success','挂载成功','Mount successfully');
    }

    function getLocalDisk() {
        $output = shell_exec("ls /dev/sd*");
        $arys = explode("\n",$output);

        $hardware = json_decode(file_get_contents("/link/config/hardware.json"));
        $chip = $hardware->chip;
        if($chip == "SS524V100" || $chip == "SS528V100")
            $arys[] = "/dev/mmcblk0p6";

        $retList = array();
        for($i=0;$i<count($arys);$i++) {
            $item = $arys[$i];
            if(empty($item) || substr_count($output, $item) > 1)
                continue;
            $size = shell_exec("blockdev --getsize64 ".$item);
            $diskInfo = array(
                "name" => $item,
                "size" => $this->formatBytes($size)
            );
            $retList[] = $diskInfo;
        }
        return $this->handleRet($retList,'success','获取成功','Get local devices successfully');
    }
}
