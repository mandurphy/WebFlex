<?php

namespace Link\Ctx;

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

    function scanUsbDir($dir)
    {
        $result = array();
        $cdir = array_reverse(scandir($dir));
        foreach ($cdir as $key => $value)
        {
            if (!in_array($value,array(".","..","lost+found")))
            {
                if($dir . DIRECTORY_SEPARATOR == "/root/usb/")
                {
                    if(!is_dir($dir . DIRECTORY_SEPARATOR . $value) || !preg_match("/\d{4}-\d{2}-\d{2}_\d{6}/",$value))
                        continue;
                    $result[$value] = $this->scanUsbDir($dir . DIRECTORY_SEPARATOR . $value);
                }
                else
                {
                    if(is_dir($dir . DIRECTORY_SEPARATOR . $value))
                        $result[$value] = $this->scanUsbDir($dir . DIRECTORY_SEPARATOR . $value);
                    else
                        $result[] = $value;
                }
            }
        }
        return $result;
    }

    function getRecordFiles() {
        $result = $this->scanUsbDir("/root/usb");
        return $this->handleRet($result,'success','获取成功','Get files successfully');
    }

    public function scanFacDir()
    {
        $folders = scandir("/link/fac/");
        $facConf = array_filter($folders, function ($item) {
                return is_dir('/link/fac/' . $item) && !in_array($item, ['.', '..']);
            });
        return $this->handleRet(array_values($facConf), 'success', '保存成功', 'save successfully');
    }

    function changeFacType($param) {
        exec( 'echo '.$param.' > /link/config/fac' );
        exec( 'cp /link/fac/'.$param.'/* /link/ -rd' );
        exec( 'chmod 777 /link -R' );
        exec('rm -f /link/config/record.json');
        exec('rm -rf /link/config/auto/*');
        exec( 'pkill Encoder' );
        return $this->handleRet($param, 'success', '保存成功', 'save successfully');
    }

    function getColorMode() {
        $data = file_get_contents('/link/config/edid/colorMode');
        return $this->handleRet($data, 'success', '获取成功', 'get lph config successfully');
    }

    function setColorMode($param) {
        exec( 'echo '.$param.' > /link/config/edid/colorMode' );
        return $this->handleRet($param, 'success', '保存成功', 'save successfully');
    }

    function getEdidConf() {
        $edidMd5 = md5_file("/link/config/edid/edid.bin");
        $folders = scandir("/link/config/edid/");
        $curEdidFile = "";
        foreach ($folders as $file)
        {
            if (!in_array($file,array(".","..")))
            {
                if(md5_file("/link/config/edid/".$file) == $edidMd5)
                {
                    $curEdidFile = $file;
                    break;
                }
            }
        }
        return $this->handleRet($curEdidFile, 'success', '获取成功', 'get lph config successfully');
    }

    function setEdidConf($param) {
        exec( 'cp /link/config/edid/'.$param.'.bin /link/config/edid/edid.bin' );
        exec( 'echo '.$_POST[ 'edid' ].' > /link/config/curEDID' );
        return $this->handleRet($param, 'success', '保存成功', 'save successfully');
    }

    function getLphAuth() {
        $data = file_get_contents('/link/web/.htaccess');
        $ctx1 = 'location /link {rewrite ^(.*)/link/([a-zA-Z0-9\_]+)/([a-zA-Z0-9\_]+)$ $1/link/monitor.php?class=$2&func=$3&verify=true&login=true last;}';
        $ctx2 = 'location /link {rewrite ^(.*)/link/([a-zA-Z0-9\_]+)/([a-zA-Z0-9\_]+)$ $1/link/monitor.php?class=$2&func=$3&verify=true&login=false last;}';
        $ctx3 = 'location /link {rewrite ^(.*)/link/([a-zA-Z0-9\_]+)/([a-zA-Z0-9\_]+)$ $1/link/monitor.php?class=$2&func=$3&verify=false&login=true last;}';
        $ctx4 = 'location /link {rewrite ^(.*)/link/([a-zA-Z0-9\_]+)/([a-zA-Z0-9\_]+)$ $1/link/monitor.php?class=$2&func=$3&verify=false&login=false last;}';
        $ret = "-1";
        if($data == $ctx1)
            $ret = "0";
        if($data == $ctx2)
            $ret = "1";
        if($data == $ctx3)
            $ret = "2";
        if($data == $ctx4)
            $ret = "3";
        return $this->handleRet($ret, 'success', '获取成功', 'get lph config successfully');
    }

    function setLphAuth($param) {
        $ctx = '';
        if($param == '0')
            $ctx = 'location /link {rewrite ^(.*)/link/([a-zA-Z0-9\_]+)/([a-zA-Z0-9\_]+)$ $1/link/monitor.php?class=$2&func=$3&verify=true&login=true last;}';
        if($param == '1')
            $ctx = 'location /link {rewrite ^(.*)/link/([a-zA-Z0-9\_]+)/([a-zA-Z0-9\_]+)$ $1/link/monitor.php?class=$2&func=$3&verify=true&login=false last;}';
        if($param == '2')
            $ctx = 'location /link {rewrite ^(.*)/link/([a-zA-Z0-9\_]+)/([a-zA-Z0-9\_]+)$ $1/link/monitor.php?class=$2&func=$3&verify=false&login=true last;}';
        if($param == '3')
            $ctx = 'location /link {rewrite ^(.*)/link/([a-zA-Z0-9\_]+)/([a-zA-Z0-9\_]+)$ $1/link/monitor.php?class=$2&func=$3&verify=false&login=false last;}';
        file_put_contents('/link/web/.htaccess',$ctx);
        exec('/usr/nginx/sbin/nginx -p /usr/nginx -s reload');
        return $this->handleRet($param, 'success', '保存成功', 'save successfully');
    }
}
