<?php

namespace Link\Mgr;

use Link\Basic;
class Root extends Basic
{
    public function delResFile($param)
    {
        exec( 'rm /link/res/' . $param );
        return $this->handleRet('','success','删除','delete file successful');
    }
}
