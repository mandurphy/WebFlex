<?php

namespace Link\Api;

use Link\Rpc\RpcClient;
use Exception;
class Record extends Verify
{
    function get_record_confs(): string
    {
        try {
            $this->link_verify();
            $record = $this->load_conf('/link/config/record.json');
            $any = $record['any'];
            $result = array(
                'chns' => $any['chns'],
                'mp4' => $any['mp4'],
                'flv' => $any['flv'],
                'mkv' => $any['mkv'],
                'mov' => $any['mov'],
                'ts' => $any['ts']
            );
            return $this->handleRet($result, "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    function set_record_confs($params): string
    {
        try {
            $this->link_verify();
            $params = json_decode($params,true);
            $this->check_args($params);

            $record = $this->load_conf('/link/config/record.json');
            $any = $record['any'];
            foreach ($params as $key => $value)
            {
                if(!isset($any[$key]))
                    continue;
                $any[$key] = $value;
            }
            $record['any'] = $any;

            $client = new RpcClient();
            $client->update_record($record);

            return $this->handleRet('', "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    function start_rec(): string
    {
        try {
            $this->link_verify();

            $client = new RpcClient();
            $ret = $client->start_record();
            if(!$ret)
                return $this->handleRet('', "error", "没有找到外部存储设备", "no external storage device was found");
            return $this->handleRet('', "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    function stop_rec(): string
    {
        try {
            $this->link_verify();

            $client = new RpcClient();
            $client->stop_record();

            return $this->handleRet('', "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }
}