<?php

function load_conf($path,$type = true): array
{
    $json_str = file_get_contents($path);
    if(is_null($json_str) || $json_str == '')
        return array();
    $json = json_decode($json_str,$type);
    if(is_null($json))
        return array();
    return $json;
}

$name = $_POST["name"];
$rxPushConf = load_conf("/link/config/misc/rxPush.json");
foreach ($rxPushConf as $item)
{
    $parsedUrl = parse_url($item['url']);
    $parts = explode('/', $parsedUrl['path']);
    $suffix = end($parts);
    if($name == $suffix)
    {
        if($item['auth'])
        {
            $hash = md5('uname='.$item['uname'].'&passwd='.$item['passwd']);
            $auth = substr($hash, 0, 16);
            $auth = strtoupper($auth);
            //file_put_contents('/link/log.txt', print_r($auth, true) . "\n", FILE_APPEND);
            if($_POST['Auth'] != $auth)
            {
                http_response_code(403);
                return;
            }
        }
    }
}

