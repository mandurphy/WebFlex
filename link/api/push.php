<?php

namespace Link\Api;

use Link\Rpc\RpcClient;

class Push extends Verify
{
    public function start_push(): string
    {
        $client = new RpcClient();
        $client->start_push();
        return $this->handleRet('','success','推流开启成功','start push successful');
    }


    public function stop_push(): string
    {
        $client = new RpcClient();
        $client->stop_push();
        return $this->handleRet('','success','推流停止成功','stop push successful');
    }
}