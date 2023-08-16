<?php

$response = array();
if(move_uploaded_file($_FILES['file']['tmp_name'], "/link/update/configs.zip")) {
    $response['isSuccess'] = true;
    exec("unzip -o /link/update/configs.zip -d /link/config/");
    exec("rm -f /link/update/configs.zip");
    exec("/link/shell/tzone.sh");
    if(file_exists("/link/config/auto/root.cron"))
        exec("cp -a /link/config/auto/root.cron /var/spool/cron/crontabs/root");
}else{
    $response['isSuccess'] = false;
}
echo json_encode($response);
?>