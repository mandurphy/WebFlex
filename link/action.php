<?php

session_start();

$uname = $_POST["username"];
$passwd = $_POST["password"];

$data = json_decode(file_get_contents('/link/config/passwd.json'), true);
$_SESSION[ 'login' ] = "";
for($i=0;$i<count($data);$i++)
{
    if($data[$i]["name"]==$uname && $data[$i]["passwd"]==md5($passwd))
        $_SESSION[ 'login' ] = $uname;
}

if ( $_SESSION[ 'login' ] == "admin" || $_SESSION[ 'login' ] == "superadmin" )
    header( "Location:/dashboard.php" );
else
    header( "Location:/login.php?u=e" );

exit();

