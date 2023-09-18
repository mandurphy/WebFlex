<?php

$type = $argv[1];
if(empty($type))
    exit();

if($type == "start")
    $url = "http://127.0.0.1/link/push/start_push";
else
    $url = "http://127.0.0.1/link/push/stop_push";

$opts = [
    'http'=>[
        'method'=>"POST"
    ]
];
$context = stream_context_create($opts);
$json = file_get_contents($url, false, $context);

