<?php


namespace Link\Api;

use Link\Rpc\RpcClient;
use Exception;

class Overlay extends Verify
{
    function get_overlay_confs(): string
    {
        try {
            $this->link_verify();
            $conf = $this->load_conf('/link/config/config.json');
            $result = [];

            $overlayConf = [];
            if(file_exists("/link/config/auto/overlay.json"))
                $overlayConf = $this->load_conf('/link/config/auto/overlay.json');

            for($i=0;$i<count($conf);$i++) {
                $item = $conf[$i];
                $obj = array(
                    'id' => $item['id'],
                    'name' => $item['name'],
                    'type' => $item['type'],
                    'enable'=> $item['enable'],
                    'enable2'=> $item['enable2'],
                );
                if(count($overlayConf) > 0)
                    $obj['overlay'] = $overlayConf[$i];
                else
                    $obj['overlay'] = $item['overlay'];
                array_push($result, $obj);
            }

            return $this->handleRet($result, "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    function set_overlay_confs($params): string
    {
        try {
            $this->link_verify();
            $params = json_decode($params,true);
            $this->check_args($params);

            $conf = $this->load_conf('/link/config/config.json');
            $mark = file_exists("/link/config/auto/overlay.json");

            if($mark)
            {
                $overlayConf = $this->load_conf('/link/config/auto/overlay.json');
                for($i=0;$i<count($params);$i++)
                {
                    $param = $params[$i];
                    $idx = $param['id'];
                    $overlayConf[$idx] = $param['overlay'];
                }
                $client = new RpcClient();
                $client->update_overlay($overlayConf);
            }
            else
            {
                for($i=0;$i<count($params);$i++)
                {
                    $param = $params[$i];

                    $id = $param['id'];

                    $chn=null;$index=-1;
                    for($j=0;$j<count($conf);$j++)
                    {
                        $item = $conf[$j];
                        if($id != $item['id'])
                            continue;

                        if(!isset($param['overlay']))
                            continue;

                        $item['overlay'] = $param['overlay'];
                        $chn = $item;
                        $index = $j;
                    }
                    if($index > -1)
                        $conf[$index] = $chn;
                }
                $client = new RpcClient();
                $client->update_enc($conf);
            }

            return $this->handleRet("","success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }
}