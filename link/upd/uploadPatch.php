<?php
upload();

function upload()
{
    try
    {
        if(is_uploaded_file($_FILES["uploadFile"]["tmp_name"]))
        {
            $Filedata = $_FILES["uploadFile"];
            if($Filedata["error"] == UPLOAD_ERR_OK)
            {
                $tmp_name = $Filedata["tmp_name"];
                move_uploaded_file($tmp_name, "/link/update/update.tar");
                exec("tar xvf /link/update/update.tar link/config/hardware.json tmp/allow.json -C /tmp/");

                $up = "0";
                if(file_exists("/tmp/link/config/hardware.json"))
                {
                    $hardware1 = json_decode(file_get_contents("/tmp/link/config/hardware.json"),true);
                    $fac1 = $hardware1["fac"];
                    $hardware2 = json_decode(file_get_contents("/link/config/hardware.json"),true);
                    $fac2 = $hardware2["fac"];
                    if($fac1 != $fac2)
                        $up = "-1"; // 升级包机型不匹配

                    if($up == "0")
                    {
                        if(file_exists("/tmp/tmp/allow.json"))
                        {
                            $allow = json_decode(file_get_contents("/tmp/tmp/allow.json"),true);
                            $allow_version = $allow["allow"];
                            $sys = json_decode(file_get_contents("/link/config/version.json"),true);
                            $sys_ary = explode(" ",$sys["sys"]);
                            $cur_version = $sys_ary[2];
                            if(intval($allow_version) >= intval($cur_version))
                                $up = "-2";  //升级包与系统版本不匹配
                        }
                    }
                }

                if($up != "0")
                    exec("rm /link/update/update.tar");
                echo '{"upload":"'.$up.'"}';
            }
        }
    }
    catch (Exception $e)
    {
        echo "{error:'上传失败," . $e->getMessage() . "'}";
    }
}
