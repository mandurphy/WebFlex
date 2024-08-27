<?php

namespace Link\Api;

use Link\Rpc\RpcClient;
use Exception;

class Ndi extends Verify
{
    public function updateNdiConf($param): string
    {
        try {
            $this->link_verify();
            $param = json_decode($param,true);
            $this->check_args($param);
            $conf = $this->load_conf('/link/config/config.json');
            for($i=0;$i<count($conf);$i++)
            {
                $item = $conf[$i];
                if($item["type"] == "ndi")
                {
                    if(isset($param["enable"]))
                        $item["enable"] = $param["enable"];
                    if(isset($param["source"]))
                        $item["ndirecv"]["name"] = $param["source"];
                    $conf[$i] = $item;
                    break;
                }
            }
            $client = new RpcClient();
            $client->update_enc($conf);
            return $this->handleRet("", "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    public function getNdiList(): string
    {
        try {
            $this->link_verify();
            $client = new RpcClient();
            $result = $client->getNDIList();
            return $this->handleRet($result, "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    public function displayNdi(): string
    {
        try {
            $this->link_verify();
            $conf = $this->load_conf('/link/config/config.json');
            $ndiChnId = -1;
            for($i=0;$i<count($conf);$i++)
            {
                $item = $conf[$i];
                if($item["type"] == "ndi")
                {
                    $ndiChnId = $item["id"];
                    break;
                }
            }

            for($i=0;$i<count($conf);$i++)
            {
                $item = $conf[$i];
                if($item["type"] == "mix")
                {
                    $item["output"]["enable"] = true;
                    $item["output"]["src"] = $ndiChnId;
                    $conf[$i] = $item;
                    break;
                }
            }
            $client = new RpcClient();
            $client->update_enc($conf);
            return $this->handleRet("", "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }
}