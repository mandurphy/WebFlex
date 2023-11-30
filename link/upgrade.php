<?php
set_time_limit (600);

$param = file_get_contents("php://input");
if(is_null(json_decode($param)))
    $param = json_encode($_POST);
$param = json_decode(urldecode($param),true);

$dpath = '/link/update/update.tar';
$name = $param["name"];
$chip = $param["chip"];
$type = $param["type"];
$remote= sprintf("http://help.linkpi.cn:5735/upgrade/%s/%s/%s", $chip, $type, $name);
$action = $param["action"];
if($action == "update")
{
    $header_array = get_headers($remote, true);
    $file_size = $header_array['Content-Length'];
    echo json_encode(["size"=>$file_size]);
    fastcgi_finish_request();
    copy($remote, $dpath);
}

if($action == "download")
{
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $name . '"');
    $bufferSize = 8192; // 每次读取的字节数
    $handle = fopen($remote, 'rb');
    $handle = fopen($remote, 'rb');
    if ($handle) {
        while (!feof($handle)) {
            echo fread($handle, $bufferSize);
            ob_flush();
            flush();
        }
        fclose($handle);
    } else {
        header("HTTP/1.0 404 Not Found");
        echo "File not found.";
    }
}

if($action == "get_file_size")
{
    if(file_exists($dpath))
        echo json_encode(["size"=>filesize($dpath)]);
    else
        echo json_encode(["size"=>0]);
}