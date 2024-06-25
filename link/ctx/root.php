<?php

namespace Link\Ctx;

use DOMDocument;
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
        $folders = scandir("/link/config/edid/");
        $inputEdidMd5 = md5_file("/link/config/edid/edid.bin");
        $outputEdidMd5 = "-1";
        if(file_exists("/link/config/edid/it6630.bin"))
            $outputEdidMd5 = md5_file("/link/config/edid/it6630.bin");
        $inputEdidFile = "";
        $outputEdidFile = "";
        $edidFiles = [];
        foreach ($folders as $file)
        {
            if (!in_array($file,array(".","..")))
            {
                if($file != "edid.bin" && $file != "it6630.bin" && $file != "@it6630.bin")
                {
                    array_push($edidFiles,$file);
                    if(md5_file("/link/config/edid/".$file) == $inputEdidMd5)
                        $inputEdidFile = $file;
                    if(md5_file("/link/config/edid/".$file) == $outputEdidMd5)
                        $outputEdidFile = $file;
                }
            }
        }
        $result = array(
            "inputEdidFile" => $inputEdidFile,
            "outputEdidFile" => $outputEdidFile,
            "edidFiles" => $edidFiles
        );
        return $this->handleRet($result, 'success', '获取成功', 'get lph config successfully');
    }

    function setInputEdidConf($param) {
        exec( 'cp /link/config/edid/'.$param.'.bin /link/config/edid/edid.bin' );
        exec( 'echo '.$_POST[ 'edid' ].' > /link/config/curEDID' );
        return $this->handleRet($param, 'success', '保存成功', 'save successfully');
    }

    function setOutputEdidConf($param) {
        exec( 'cp /link/config/edid/'.$param.'.bin /link/config/edid/it6630.bin' );
        return $this->handleRet($param, 'success', '保存成功', 'save successfully');
    }

    function delCustomEdid($param) {
        exec("rm -f /link/config/edid/".$param["edid"]);
    }

    function addCustomEdid($param) {
        $filename = $param["edid"];
        exec("mv /link/config/edid/@it6630.bin /link/config/edid/".$filename.".bin");
    }

    function getLphAuth() {
        $data = file_get_contents('/link/webflex/.htaccess');
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
        file_put_contents('/link/webflex/.htaccess',$ctx);
        exec('/usr/nginx/sbin/nginx -p /usr/nginx -s reload');
        return $this->handleRet($param, 'success', '保存成功', 'save successfully');
    }

    function filterKeywords($param) {
        $filter = $param["filter"];
        $lang = $param["lang"];
        $result = array();

        $content = file_get_contents("/link/webflex/public/menu.inc");
        $dom = new DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML(mb_convert_encoding($content,"HTML-ENTITIES","UTF-8"));
        libxml_clear_errors();
        $aTags = $dom->getElementsByTagName('a');
        $menus = array();
        foreach ($aTags as $aTag) {
            $href = $aTag->getAttribute('href');
            if (!empty($href) && $href != "javascript:;") {
                $iTag = $aTag->getElementsByTagName("i");
                $iClass = $iTag[0]->getAttribute("class");
                $cnTag = $aTag->getElementsByTagName($lang);
                $menus[$href] = array(
                    "icon" => $iClass,
                    "name" => $cnTag[0]->nodeValue
                );
            }
        }

        $phpFiles = glob('/link/webflex' . '/*.php');
        $ignoreFiles = ["fac.php","ndireg.php"];
        foreach ($phpFiles as $phpFile) {
            if (in_array(basename($phpFile), $ignoreFiles))
                continue;
            $content = file_get_contents($phpFile);
            preg_match('/<main\b[^>]*>(.*?)<\/main>/s', $content, $matches);
            if (isset($matches[1])) {
                $main = $matches[1];
                preg_match_all('/<'.$lang.'>(.*?)<\/'.$lang.'>/s', $main, $matches);
                $lst = array();
                foreach ($matches[1] as $ctx) {
                    if(stripos($ctx,$filter) !== false)
                        array_push($lst,strip_tags($ctx));
                }
                if(!empty($lst)) {
                    $name = $menus[basename($phpFile)]["name"];
                    $icon = $menus[basename($phpFile)]["icon"];
                    $ary = array(
                        "url" => basename($phpFile),
                        "name" => $name,
                        "icon" => $icon,
                        "filter" => array_unique($lst)
                    );
                    array_push($result,$ary);
                }
            }
        }
        return $this->handleRet($result, 'success', '保存成功', 'save successfully');
    }

    function getFilterKeywords($param) {
        $lang = self::load_conf("/link/config/lang.json");
        $url = basename($param["url"]);
        $filter = $param["filter"];
        $content = file_get_contents("/link/webflex/".$url);
        preg_match('/<main\b[^>]*>(.*?)<\/main>/s', $content, $matches);
        $result = "";
        if (isset($matches[1])) {
            $main = $matches[1];
            preg_match_all('/<'.$lang["lang"].'>(.*?)<\/'.$lang["lang"].'>/s', $main, $matches);
            foreach ($matches[1] as $ctx) {
                if(md5(strip_tags($ctx)) == $filter)
                    $result = strip_tags($ctx);
            }
        }
        return $this->handleRet($result, 'success', '保存成功', 'save successfully');
    }
}
