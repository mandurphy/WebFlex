<?php

namespace Link\Api;

use Link\Rpc\RpcClient;
use Link\Ctx\System;
use Exception;

class Disk extends Verify
{
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

    public function getMountDiskConf(): string
    {
        try {
            $this->link_verify();
            $output = shell_exec("ls /dev/sd*");
            $arys = explode("\n",$output);

            $hardware = $this->load_conf("/link/config/hardware.json");
            $chip = $hardware["chip"];
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

            $diskConf = $this->load_conf("/link/config/misc/disk.json");
            $diskConf["local"]["devList"] = $retList;

            return $this->handleRet($diskConf,'success','获取成功','Get local devices successfully');
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    public function mountDisk($param): string
    {
        try {
            $this->link_verify();
            $param = json_decode($param,true);
            $this->check_args($param);
            $diskConf = $this->load_conf("/link/config/misc/disk.json");
            foreach ($param as $key => $value)
            {
                if(isset($diskConf[$key]))
                    $diskConf[$key] = $value;
            }
            exec("cp /link/config/misc/disk.json /link/config/misc/disk_last.json");
            file_put_contents("/link/config/misc/disk.json",json_encode($diskConf,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
            if($param["enable"])
            {
                exec("/link/shell/mount.sh",$output);
                if($output[0] == "0")
                {
                    exec("cp /link/config/misc/disk_last.json /link/config/misc/disk.json");
                    return $this->handleRet("",'error','外部存储设备挂载失败','The external storage device failed to be mounted');
                }
                return $this->handleRet("",'success','挂载成功','Mount successfully');
            } else {
                $client = new RpcClient();
                $state = $client->isRecordState();
                if(!$state)
                {
                    exec("/link/shell/mount.sh");
                    return $this->handleRet("",'success','卸载成功','Unmount successfully');
                }
                exec("cp /link/config/misc/disk_last.json /link/config/misc/disk.json");
                return $this->handleRet("",'error','卸载失败，正在录制中','Unmount failed, recording in progress');
            }
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    public function getDiskSpace(): string
    {
        try {
            $this->link_verify();
            $system = new System();
            $ret = $system->getMountDiskSpace();
            $ret = json_decode($ret);
            return $this->handleRet($ret->data, "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }
}