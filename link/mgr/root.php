<?php

namespace Link\Mgr;

use Link\Basic;
class Root extends Basic
{
    public function delResFile($param)
    {
        exec( 'rm /link/res/' . $param );
        return $this->handleRet('','success','删除成功','Delete file successful');
    }

    function delRecordFile($param) {
        exec( 'rm /root/usb/'. $param['name'].' -r');
        return $this->handleRet('','success','删除成功','Delete file successful');
    }

    function getRecordFiles() {
        $result = $this->scanTargerDir("/root/usb");
        return $this->handleRet($result,'success','获取成功','Get files successfully');
    }

    function scanTargerDir($dir)
    {
        $result = array();
        $cdir = array_reverse(scandir($dir));
        foreach ($cdir as $key => $value) {
            if (!in_array($value,array(".","..","lost+found")))
            {
                if($dir . DIRECTORY_SEPARATOR == "/root/usb/")
                {
                    if(!is_dir($dir . DIRECTORY_SEPARATOR . $value) || !preg_match("/\d{4}-\d{2}-\d{2}_\d{6}/",$value))
                        continue;
                    $result[$value] = $this->scanTargerDir($dir . DIRECTORY_SEPARATOR . $value);
                }
                else
                {
                    if(is_dir($dir . DIRECTORY_SEPARATOR . $value))
                        $result[$value] = $this->scanTargerDir($dir . DIRECTORY_SEPARATOR . $value);
                    else
                        $result[] = $value;
                }
            }
        }
        return $result;
    }
}
