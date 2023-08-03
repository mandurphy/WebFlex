<?php
session_start();
if($_SESSION['login'] != "admin" && $_SESSION['login'] != "superadmin")
{
    $request = $_SERVER['REQUEST_URI'];
    if($request != "/login.php") {
        header("Location:/login.php");
        exit();
    }
}
?>
