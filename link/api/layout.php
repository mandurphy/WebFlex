<?php

namespace Link\Api;

use Link\Rpc\RpcClient;
use Exception;
class Layout extends Verify
{
    function get_deflay_confs(): string
    {
        try {
            $this->link_verify();
            $deflays = $this->load_conf('/link/config/defLays.json');
            $lang = $this->load_conf('/link/config/lang.json');

            $result = [];
            foreach ($deflays as $lay)
            {
                $obj = array(
                    'id' => $lay['layId'],
                    'name' => $lay['layName'],
                );
                if($lang['lang'] == 'en')
                    $obj['name'] = $lay['layNameEn'];
                array_push($result, $obj);
            }
            return $this->handleRet($result, "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    function get_layout_confs(): string
    {
        try {
            $this->link_verify();
            $defLays = $this->load_conf('/link/config/defLays.json');
            $conf = $this->load_conf('/link/config/config.json');
            $lang = $this->load_conf('/link/config/lang.json');
            $result = array();
            foreach ($conf as $item)
            {
                if($item['type'] != 'mix')
                    continue;
                $result['srcV'] = $item['srcV'];
                $result['srcA'] = $item['srcA'];
                foreach ($defLays as $defLay)
                {
                    $layList = [];$layList1=[];
                    $layouts = $defLay['layouts'];
                    foreach ($layouts as $layout)
                    {
                        $pos = $layout['pos'];
                        //按顺序生成新对象，方便后面对比
                        $lay = array(
                            'a' => $pos['a'],
                            'x' => $pos['x'],
                            'y' => $pos ['y'],
                            'w' => $pos['w'],
                            'h' => $pos['h'],
                            'index' => $pos['index']
                        );
                        array_push($layList,$lay);

                        $lay1 = array(
                            'a' => $pos['a'],
                            'h' => $pos['h'],
                            'index' => $pos['index'],
                            'w' => $pos['w'],
                            'x' => $pos['x'],
                            'y' => $pos ['y']
                        );
                        array_push($layList1,$lay1);
                    }
                    if(json_encode($item['layout']) == json_encode($layList) || json_encode($item['layout']) == json_encode($layList1))
                    {
                        $result['curLayId'] = $defLay['layId'];
                        $result['curLayName'] = $defLay['layName'];
                        if($lang['lang'] == 'en')
                            $result['curLayName'] = $defLay['layNameEn'];
                    }

                }
            }
            return $this->handleRet($result, "success", "执行完成", "execution is completed");
        } catch (Exception $ex) {
            return $this->handleRet('', 'error', $ex->getMessage(), $ex->getMessage());
        }
    }

    function set_layout_confs($params): string
    {
        try {
            $this->link_verify();
            $params = json_decode($params,true);
            $this->check_args($params);

            $conf = $this->load_conf('/link/config/config.json');

            $chn=null;$index=-1;
            for($i=0;$i<count($conf);$i++)
            {
                $item = $conf[$i];
                if($item['type'] != 'mix')
                    continue;

                foreach ($params as $key => $value)
                {
                    if($key == 'layId')
                    {
                        $defLays = $this->load_conf('/link/config/defLays.json');
                        foreach ($defLays as $defLay)
                        {
                            if($value != $defLay['layId'])
                                continue;

                            $layList = [];
                            $layouts = $defLay['layouts'];
                            $srcV = [];
                            $srcA = [];
                            foreach ($layouts as $layout)
                            {
                                $chnId = $layout['id'];
                                $pos = $layout['pos'];
                                array_push($layList,$pos);
                                if($chnId > -1)
                                    array_push($srcV,$chnId.'');
                                if(isset($layout['ado']))
                                {
                                    if($layout['ado'])
                                        array_push($srcA,$chnId.'');
                                }
                            }
                            $item['layout'] = $layList;
                            if(count($srcV) > 0)
                                $item['srcV'] = $srcV;
                            if(count($srcA) > 0)
                                $item['srcA'] = $srcA;
                        }
                    }
                    if($key == 'srcV' || $key == 'srcA')
                    {
                        if(is_array($value))
                            $item[$key] = $value;
                    }
                }
                $chn = $item;
                $index = $i;
            }
            if($index > -1)
                $conf[$index] = $chn;

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