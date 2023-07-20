<?php

namespace Link\Mgr;

use Link\Basic;
class Conf extends Basic
{
    public function updateLangConf($param)
    {
        $lang = array("lang"=> $param);
        file_put_contents( "/link/config/lang.json", json_encode($lang,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }
}
