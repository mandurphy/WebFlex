<?php

namespace Link;

use ReflectionClass;
use Exception;
use ReflectionException;
class App extends Basic
{
    public static function run()
    {
        try
        {
            $class_name = $_REQUEST['class'];
            $func_name = $_REQUEST['func'];
            if(is_null($class_name) || is_null($func_name))
                throw new Exception("无效的请求地址&&invalid request address");

            $query = explode("&", $_SERVER['QUERY_STRING']);
            if(count($query) > 4)
            {
                unset($query[0],$query[1],$query[2],$query[3]);
                $query = array_values($query);

                $param = array();
                foreach ($query as $qy)
                {
                    $qy = explode("=", $qy);
                    $qy[1] = str_replace('%22','"',$qy[1]);
                    $obj = json_decode($qy[1]);
                    if(!is_null($obj))
                        $param[$qy[0]] = $obj;
                    else
                        $param[$qy[0]] = $qy[1];
                }
                $param = urldecode(json_encode($param));
            }
            else
            {
                $param = file_get_contents("php://input");
                if(is_null(json_decode($param)))
                    $param = json_encode($_POST);
                $param = urldecode($param);
            }

            $args = [];
            if(!is_null($param) && $param != "")
                $args = [$param];

            $class_name = ucfirst($class_name);
            $class_name = 'Link\Api\\'.$class_name;
            $class = new ReflectionClass($class_name);
            $func = $class->getMethod($func_name);
            $result = $func->invokeArgs($class->newInstance(), $args);
            echo $result;
        }
        catch(ReflectionException $rex)
        {
            echo App::handleRet('','error','没有找到对应接口','no corresponding interface was found');
        }
        catch (Exception $ex)
        {
            echo App::handleRet('','error',$ex->getMessage(),$ex->getMessage());
        }
    }
}