<?php

namespace Link\Api;

use Link\Rpc\RpcClient;
use Exception;
class System extends Verify
{
    function get_sys_state(): string
    {
        try {
            $this->link_verify();
            $client = new RpcClient();
            $result = $client->get_sys_state();
            return $this->handleRet($result,"success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function get_net_state(): string
    {
        try {
            $this->link_verify();
            $client = new RpcClient();
            $result = $client->get_net_state();
            return $this->handleRet($result,"success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function get_vi_state(): string
    {
        try {
            $this->link_verify();
            $client = new RpcClient();
            $result = $client->get_vi_state();
            return $this->handleRet($result,"success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function get_network(): string
    {
        try {
            $this->link_verify();
            $net = $this->load_conf('/link/config/net.json');
            $mac = file_get_contents('/link/config/mac');
            $net['mac'] = str_replace("\n","",$mac);
            return $this->handleRet($net,"success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function set_network($params): string
    {
        try {
            $this->link_verify();
            $params = json_decode($params,true);
            $this->check_args($params);

            $net = $this->load_conf('/link/config/net.json');
            foreach ($params as $key => $value)
            {
                if(isset($net[$key]))
                    $net[$key] = $params[$key];
            }

            file_put_contents("/link/config/net.json",json_encode($net));
            exec("/link/shell/setNetwork.sh");
            if($net["dhcp"])
                exec("/link/shell/dhcp.sh");
            return $this->handleRet("","success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function set_sys_date($params): string
    {
        try {
            $this->link_verify();
            $params = json_decode($params,true);
            $this->check_args($params);
            
            $time1 = $params["sysDate"];
            $parts = explode("/", $time1);
            $time2 = $parts[0] . "-" . $parts[1] . "-" . $parts[2] . " " . $parts[3] . ":" . $parts[4] . ":" . $parts[5];

            exec( "/link/bin/rtc -s time " . $time1. " '".$time2."'" );
            exec( "/link/bin/rtc -g time" );

            return $this->handleRet("","success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function get_sys_date(): string
    {
        try {
            $this->link_verify();
            //$result = date( "Y-m-d H:i:s", intval( time() ) );
            exec('date +"%Y-%m-%d %H:%M:%S"',$result);
            return $this->handleRet($result[0],"success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function set_ntpd($params): string
    {
        try {
            $this->link_verify();
            $params = json_decode($params,true);
            $this->check_args($params);

            $ntp = $this->load_conf('/link/config/ntp.json');
            foreach ($params as $key => $value)
            {
                if(isset($ntp[$key]))
                    $ntp[$key] = $params[$key];
            }
            file_put_contents('/link/config/ntp.json',json_encode($ntp));

            if(isset($params['sync']) && $params['sync'])
                exec('/usr/sbin/ntpd -p '.$ntp['server']);

            return $this->handleRet("","success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function get_ntpd(): string
    {
        try {
            $this->link_verify();

            $ntp = $this->load_conf('/link/config/ntp.json');
            return $this->handleRet($ntp,"success","执行完成","execution is completed");
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function reboot()
    {
        try {
            $this->link_verify();
            exec( '/link/shell/reboot.sh' );
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }

    function reset()
    {
        try {
            $this->link_verify();
            exec( '/link/shell/reset.sh' );
        }
        catch (Exception $ex)
        {
            return $this->handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }
}