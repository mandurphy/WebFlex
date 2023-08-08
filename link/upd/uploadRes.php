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
                $name = $Filedata["name"];
                $tmp_name = $Filedata["tmp_name"];
                move_uploaded_file($tmp_name, "/link/res/".$name);
                echo "{}";
            }
        }
    }
    catch (Exception $e)
    {
        echo "{error:'上传失败," . $e->getMessage() . "'}";
    }
}
