<?php

namespace Link\Api;

use Link\Rpc\RpcClient;
use Exception;
class Output extends Verify
{
    function get_output_confs(): string
    {
        try {
            $this->link_verify();
            $conf = $this->load_conf('/link/config/config.json');
            $result = [];
            foreach ($conf as $item)
            {
                if($item['type'] != 'mix')
                    continue;

                $result = array(
                    'output' => $item['output'],
                    'output2' => $item['output2']
                );
            }
            return $this->handleRet($result, "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    function set_output_confs($params): string
    {
        try {
            $this->link_verify();
            $params = json_decode($params,true);
            $this->check_args($params);

            $conf = $this->load_conf('/link/config/config.json');
            $chn=null;$index=-1;
            for ($i=0;$i<count($conf);$i++)
            {
                $item = $conf[$i];
                if($item['type'] != 'mix')
                    continue;

                foreach ($params as $key => $value)
                {
                    if($key == 'output' || $key == 'output2')
                    {
                        $out = $item[$key];
                        foreach ($value as $kk => $vv)
                        {
                            if($kk == 'type' || !isset($out[$kk]))
                                continue;
                            $out[$kk] = $vv;
                        }
                        $item[$key] = $out;
                    }
                }
                $chn = $item;
                $index = $i;
            }
            if($index > -1)
                $conf[$index] = $chn;

            $client = new RpcClient();
            $client->update_enc($conf);
            return $this->handleRet('', "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }
}