<?php


namespace Link\Api;

use Link\Rpc\RpcClient;
use Exception;
class Stream extends Verify
{
    function get_stream_confs(): string
    {
        try {
            $this->link_verify();
            $conf = $this->load_conf('/link/config/config.json');
            $result = [];
            foreach ($conf as $item)
            {
                if(!$item['type'] == 'file')
                    continue;

                $obj = array(
                    'id' => $item['id'],
                    'name' => $item['name'],
                    'type' => $item['type'],
                    'enable'=> $item['enable'],
                    'enable2'=> $item['enable2'],
                    'stream'=> $item['stream'],
                    'stream2' => $item['stream2']
                );
                array_push($result,$obj);
            }
            return $this->handleRet($result,"success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function get_hls_ndi_ts(): string
    {
        try {
            $this->link_verify();
            $conf = $this->load_conf('/link/config/config.json');
            $result = [];
            foreach ($conf as $item)
            {
                if(!$item['type'] == 'file')
                    continue;

                $obj = array(
                    'id' => $item['id'],
                    'enable'=> $item['enable'],
                    'enable2'=> $item['enable2'],
                    'name' => $item['name'],
                    'type' => $item['type'],
                    'hls'=> $item['hls'],
                    'ndi' => $item['ndi'],
                    'ts' => $item['ts']
                );
                array_push($result,$obj);
            }
            return $this->handleRet($result,"success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function set_stream_confs($params): string
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

                    foreach ($param as $key => $value)
                    {
                        if(!isset($item[$key]))
                            continue;
                        $temp = $param[$key];
                        if(is_array($temp))
                        {
                            $st = $item[$key];
                            foreach ($temp as $kk => $vv)
                            {
                                if(!isset($st[$kk]))
                                    continue;
                                if(is_array($temp[$kk]))
                                {
                                    $tt = $st[$kk];
                                    foreach ($temp[$kk] as $k => $v)
                                    {
                                        if(!isset($tt[$k]))
                                            continue;
                                        $tt[$k] = $v;
                                    }
                                    $st[$kk] = $tt;
                                    continue;
                                }
                                $st[$kk] = $vv;
                            }
                            $item[$key] = $st;
                        }
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

    function set_hls_ndi_ts($params): string
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

                    foreach ($param as $key => $value)
                    {
                        if(!isset($item[$key]))
                            continue;
                        $temp = $param[$key];
                        if(is_array($temp))
                        {
                            $st = $item[$key];
                            foreach ($temp as $kk => $vv)
                            {
                                if(!isset($st[$kk]))
                                    continue;
                                $st[$kk] = $vv;
                            }
                            $item[$key] = $st;
                        }
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

    function get_platform_lives(): string
    {
        try {
            $this->link_verify();
            $conf = $this->load_conf('/link/config/push.json');
            return $this->handleRet($conf,"success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function set_platform_lives($params): string
    {
        try {
            $this->link_verify();
            $params = json_decode($params,true);
            $this->check_args($params);

            $push = $this->load_conf('/link/config/push.json');
            foreach ($params as $key => $value) {
                if(!isset($push[$key]))
                    continue;
                if($key == 'url')
                {
                    if(is_array($value) && count($value) < 6)
                        $push[$key] = $value;
                    continue;
                }
                $push[$key] = $value;
            }
            $client = new RpcClient();
            $client->update_push($push);

            return $this->handleRet('',"success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function start_platform_lives(): string
    {
        try {
            $this->link_verify();

            $client = new RpcClient();
            $client->start_push();
            return $this->handleRet('', "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    function stop_platform_lives(): string
    {
        try {
            $this->link_verify();

            $client = new RpcClient();
            $client->stop_push();

            return $this->handleRet('', "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    function get_platform_lives_state(): string
    {
        try {
            $this->link_verify();

            $client = new RpcClient();
            $result = $client->get_push_state();

            return $this->handleRet($result, "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }
}