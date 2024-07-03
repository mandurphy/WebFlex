<?php

namespace Link\Rpc;

use Link\Rpc\Http\Client;
class RpcClient
{
    const enc_url = 'http://127.0.0.1/RPC';
    public function update_enc($param)
    {
        $client = new Client(self::enc_url);
        $client->query('enc.update',[json_encode($param,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT)]);
        $client->send();
    }

    public function get_sys_state()
    {
        $client = new Client(self::enc_url);
        $client->query('enc.getSysState',[],$result);
        $client->send();
        return $result;
    }

    public function get_net_state()
    {
        $client = new Client(self::enc_url);
        $client->query('enc.getNetState',[],$result);
        $client->send();
        return $result;
    }

    public function get_vi_state()
    {
        $client = new Client(self::enc_url);
        $client->query('enc.getInputState',[],$result);
        $client->send();
        return $result;
    }

    public function update_record($param)
    {
        $client = new Client(self::enc_url);
        $client->query('rec.update',[json_encode($param,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT)]);
        $client->send();
    }

    public function start_record()
    {
        $client = new Client(self::enc_url);
        $client->query('rec.start',[],$ret);
        $client->send();
        return $ret;
    }

    public function stop_record()
    {
        $client = new Client(self::enc_url);
        $client->query('rec.stop',[]);
        $client->send();
    }

    public function update_push($param)
    {
        $client = new Client(self::enc_url);
        $client->query('push.update',[json_encode($param,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT)]);
        $client->send();
    }

    public function start_push()
    {
        $client = new Client(self::enc_url);
        $client->query('push.start',[]);
        $client->send();
    }

    public function stop_push()
    {
        $client = new Client(self::enc_url);
        $client->query('push.stop',[]);
        $client->send();
    }

    public function get_push_state()
    {
        $client = new Client(self::enc_url);
        $client->query('push.getState',[],$ret);
        $client->send();
        return $ret;
    }

    public function update_overlay($param)
    {
        $client = new Client(self::enc_url);
        $client->query('enc.updateOverlay',[json_encode($param,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT)]);
        $client->send();
    }

    public function isRecordState()
    {
        $client = new Client(self::enc_url);
        $client->query('rec.isRecordState',[],$ret);
        $client->send();
        return $ret;
    }

    public function getNDIList()
    {
        $client = new Client(self::enc_url);
        $client->query('enc.getNDIList',[],$ret);
        $client->send();
        return $ret;
    }

    public function get_disk_space()
    {
        $client = new Client(self::enc_url);
        $client->query('rec.getState',[],$ret);
        $client->send();
        return $ret;
    }
}