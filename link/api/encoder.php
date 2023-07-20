<?php

namespace Link\Api;

use Link\Rpc\RpcClient;
use Exception;
class Encoder extends Verify
{
    function get_enc_confs(): string
    {
        try {
            $this->link_verify();
            $conf = $this->load_conf('/link/config/config.json');
            $result = [];
            foreach ($conf as $item)
            {
                if($item['type'] == 'ndi' || $item['type'] == 'file')
                    continue;

                $encv = $item['encv'];
                unset($encv['roi']);
                $obj = array(
                    'id' => $item['id'],
                    'name' => $item['name'],
                    'type' => $item['type'],
                    'enable' => $item['enable'],
                    'enable2' => $item['enable2'],
                    'encv' => $encv,
                    'encv2' => $item['encv2'],
                    'enca' => $item['enca']
                );
                if($item['type'] == 'net')
                    $obj['net'] = $item['net'];
                if($item['type'] == 'vi')
                    $obj['cap'] = $item['cap'];
                array_push($result,$obj);
            }
            return $this->handleRet($result,"success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function set_net_chns($params): string
    {
        try {
            $this->link_verify();
            $params = json_decode($params,true);
            $this->check_args($params);

            $conf = $this->load_conf('/link/config/config.json');
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
                    if($item['type'] != 'net')
                        throw new Exception("通道 ".$id." 不是网络流&&channel ".$id." not a net channel");

                    if(isset($param['enable']))
                        $item['enable'] = $param['enable'];

                    if(isset($param['enable2']))
                        $item['enable2'] = $param['enable2'];

                    if(isset($param['name']))
                        $item['name'] = $param['name'];

                    $net = $item['net'];
                    foreach ($param as $key => $value)
                    {
                        if(isset($net[$key]))
                            $net[$key] = $param[$key];
                    }
                    $item['net'] = $net;
                    $chn = $item;
                    $index = $j;
                }
                if($index > -1)
                    $conf[$index] = $chn;
            }

            $client = new RpcClient();
            $client->update_enc($conf);

            return $this->handleRet("","success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function set_enc_chns($params): string
    {
        try {
            $this->link_verify();
            $params = json_decode($params,true);
            $this->check_args($params);

            $conf = $this->load_conf('/link/config/config.json');
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
                    if($item['type'] == 'ndi' || $item['type'] == 'file')
                        throw new Exception("通道 ".$id." 不能被设置&&channel ".$id." can not be set");

                    foreach ($param as $key => $value)
                    {
                        if($key == "encv" || $key == "encv2")
                        {
                            $pp = $param[$key];
                            $enc = $item[$key];
                            foreach ($pp as $kk => $vv)
                            {
                                if(isset($enc[$kk]))
                                    $enc[$kk] = $pp[$kk];
                            }
                            $item[$key] = $enc;
                            continue;
                        }
                        if(isset($item[$key]))
                            $item[$key] = $param[$key];
                    }

                    $chn = $item;
                    $index = $j;
                }
                if($index > -1)
                    $conf[$index] = $chn;
            }

            $client = new RpcClient();
            $client->update_enc($conf);

            return $this->handleRet("","success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function set_cap_chns($params): string
    {
        try {
            $this->link_verify();
            $params = json_decode($params,true);
            $this->check_args($params);

            $conf = $this->load_conf('/link/config/config.json');
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
                    if($item['type'] != 'vi')
                        throw new Exception("通道 ".$id." 不能被设置&&channel ".$id." can not be set");

                    $cap = $item['cap'];
                    foreach ($param as $key => $value)
                    {
                        if($key == "L" || $key == "R" || $key == "T" || $key == "B")
                        {
                            $crop = $cap['crop'];
                            if(isset($crop[$key]))
                                $crop[$key] = $value;
                            $cap['crop'] = $crop;
                            continue;
                        }
                        if(isset($cap[$key]))
                            $cap[$key] = $value;
                    }
                    $item['cap'] = $cap;

                    $chn = $item;
                    $index = $j;
                }
                if($index > -1)
                    $conf[$index] = $chn;
            }

            $client = new RpcClient();
            $client->update_enc($conf);

            return $this->handleRet("","success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function set_audio_chns($params): string
    {
        try {
            $this->link_verify();
            $params = json_decode($params,true);
            $this->check_args($params);

            $conf = $this->load_conf('/link/config/config.json');
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
                    if($item['type'] == 'ndi' || $item['type'] == 'file')
                        throw new Exception("通道 ".$id." 不能被设置&&channel ".$id." can not be set");

                    $enc = $item['enca'];
                    foreach ($param as $key => $value)
                    {
                        if(isset($enc[$key]))
                            $enc[$key] = $value;
                    }
                    $item['enca'] = $enc;

                    $chn = $item;
                    $index = $j;
                }
                if($index > -1)
                    $conf[$index] = $chn;
            }

            $client = new RpcClient();
            $client->update_enc($conf);

            return $this->handleRet("","success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

}