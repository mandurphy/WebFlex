<?php
function getConfFiles($dir) {
    $files = array();
    $handle = opendir($dir);

    while (($file = readdir($handle)) !== false) {
        if ($file !== '.' && $file !== '..') {
            $filePath = $dir . '/' . $file;

            if (is_dir($filePath)) {
                $files = array_merge($files, getConfFiles($filePath));
            } else {
                $files[] = $filePath;
            }
        }
    }

    closedir($handle);
    return $files;
}

function copyUserSettings(&$historyConfig, &$currentConfig,&$level=0) {
    if (is_array($historyConfig) && is_array($currentConfig)) {

        if($level == 0 && (count($historyConfig) != count($currentConfig)))
            return;

        foreach ($historyConfig as $key => $value) {
            if (is_array($value) && is_array($currentConfig[$key]) ||
                is_object($value) && is_object($currentConfig[$key])
            ) {
                $level++;
                copyUserSettings($value, $currentConfig[$key],$level);
            } else {
                $currentConfig[$key] = $value;
            }
        }
    } elseif (is_object($historyConfig) && is_object($currentConfig)) {

        foreach ($historyConfig as $key => $value) {
            if (isset($currentConfig->$key)) {
                if (is_array($value) && is_array($currentConfig->$key) ||
                    is_object($value) && is_object($currentConfig->$key)
                ) {
                    $level++;
                    copyUserSettings($value, $currentConfig->$key,$level);
                } else {
                    $currentConfig->$key = $value;
                }
            }
        }
    }
}

$configFiles = getConfFiles('/tmp/history_config');
foreach ($configFiles as $historyFile) {
    $currentFile = str_replace("/tmp/history_config/","/link/config/",$historyFile);
    if(!strpos($currentFile, ".json") || md5_file($historyFile) == md5_file($currentFile))
        continue;

    $ignoreFiles = ['version.json', 'net.json', 'net2.json', 'netEx.json', 'netManager.json', 'verLogs.json', 'theme_standard.json'];
    if (in_array(basename($currentFile), $ignoreFiles))
        continue;


    $historyCtx = json_decode(file_get_contents($historyFile));
    $currentCtx = json_decode(file_get_contents($currentFile));

    copyUserSettings($historyCtx,$currentCtx);

    if(empty($currentCtx))
        continue;

    file_put_contents($currentFile, json_encode($currentCtx, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    exec("sync");
}