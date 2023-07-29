<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
<div data-simplebar class="mb-4">
    <main class="page-content sys" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-6">
                <ul class="nav nav-tabs nav-primary" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" data-bs-toggle="tab" href="#tab1" role="tab" aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-solid fa-code-fork me-1"></i></i></div>
                                <div class="tab-title"><cn>网口1</cn><en>LAN1</en></div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.capability.eth1">
                        <a class="nav-link" data-bs-toggle="tab" href="#tab2" role="tab" aria-selected="false">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-solid fa-code-merge me-1"></i></i></div>
                                <div class="tab-title"><cn>网口2</cn><en>LAN2</en></div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.wifi">
                        <a class="nav-link" data-bs-toggle="tab" href="#tab3" role="tab" aria-selected="false">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-solid fa-wifi me-1"></i></i></div>
                                <div class="tab-title"><cn>无线网</cn><en>WIFI</en></div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="tab-content py-3 pe-2 ps-2">
                    <div class="tab-pane fade show active" id="tab1" role="tabpanel" v-if="Object.keys(netConf).length > 0">
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    DHCP
                                </label>
                            </div>
                            <div class="col-lg-5">
                                <bootstrap-switch v-model="netConf.dhcp" size="normal"></bootstrap-switch>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    IP
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model="netConf.ip">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>掩码</cn>
                                    <en>Mask</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model="netConf.mask">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>网关</cn>
                                    <en>Gateway</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model="netConf.gateway">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    DNS
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model="netConf.dns">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    MAC
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" disabled v-model="macConf">
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4" @click="saveNetConf"><cn>保存</cn><en>Save</en></button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab2" role="tabpanel" v-if="Object.keys(net2Conf).length > 0">
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    DHCP
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <bootstrap-switch v-model="net2Conf.dhcp" size="normal"></bootstrap-switch>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    IP
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model="net2Conf.ip">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>掩码</cn>
                                    <en>Mask</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model="net2Conf.mask">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>网关</cn>
                                    <en>Gateway</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model="net2Conf.gateway">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    DNS
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model="net2Conf.dns">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    MAC
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" disabled v-model="mac2Conf">
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4" @click="saveNet2Conf"><cn>保存</cn><en>Save</en></button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab3" role="tabpanel" v-if="Object.keys(wifiConf).length > 0">
                        <div class="row mt-4">
                            <div class="col-lg-6 border-right">
                                <div class="row mt-3">
                                    <div class="col-lg-3 force-align-center">
                                        <label>
                                            <cn>启用</cn>
                                            <en>Enable</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-8">
                                        <bootstrap-switch v-model="wifiConf.enable" size="normal"></bootstrap-switch>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-3 force-align-center">
                                        <label>
                                            WIFI
                                        </label>
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="input-group">
                                            <select class="form-select" v-model="ssidConf.ssid">
                                                <option v-for="(item,index) in wifiList" :key="index" :value="item.ssid">{{item.ssid}}</option>
                                            </select>
                                            <span class="input-group-text input-group-addon force-cursor-pointer" @click="refreshWifi"><i :class="['fa-solid fa-arrows-rotate',{'spin':refreshMark}]"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-3 force-align-center">
                                        <label>
                                            <cn>密码</cn>
                                            <en>Password</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="input-group">
                                            <input class="form-control" :type="!showPasswd.wifipwd ? 'password' : 'text'" v-model="wifiPasswd">
                                            <span class="input-group-text input-group-addon force-cursor-pointer" @click="showPasswd.wifipwd = !showPasswd.wifipwd"><i :class="['fa-regular',{'fa-eye-slash':!showPasswd.wifipwd},{'fa-eye':showPasswd.wifipwd}]"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 force-align-center">
                                        <label>
                                            <cn>状态</cn>
                                            <en>Status</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-8">
                                        <label v-html="wifiConnectStatus"></label>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-12 text-center">
                                        <button type="button" class="btn border-3 btn-primary px-4 me-2" @click="connectWifi"><cn>连接</cn><en>Connect</en></button>
                                        <button type="button" class="btn border-3 btn-primary px-4" @click="disConnectWifi"><cn>断开</cn><en>Connect</en></button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="row mt-3">
                                    <div class="col-lg-3 force-align-center">
                                        <label>
                                            DHCP
                                        </label>
                                    </div>
                                    <div class="col-lg-8">
                                        <bootstrap-switch v-model="wifiConf.dhcp" size="normal"></bootstrap-switch>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-3 force-align-center">
                                        <label>
                                            IP
                                        </label>
                                    </div>
                                    <div class="col-lg-8">
                                        <input class="form-control" v-model="wifiConf.ip">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-3 force-align-center">
                                        <label>
                                            <cn>掩码</cn>
                                            <en>Mask</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-8">
                                        <input class="form-control" v-model="wifiConf.mask">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-3 force-align-center">
                                        <label>
                                            <cn>网关</cn>
                                            <en>Gateway</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-8">
                                        <input class="form-control" v-model="wifiConf.gateway">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-3 force-align-center">
                                        <label>
                                            DNS
                                        </label>
                                    </div>
                                    <div class="col-lg-8">
                                        <input class="form-control" v-model="wifiConf.dns">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-5 mb-2">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4" @click="saveWifiConf"><cn>保存</cn><en>Save</en></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header bg-transparent">
                                <div class="p-2 mb-0 d-flex align-items-end">
                                    <cn>密码设置</cn>
                                    <en>Password</en>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="row">
                                        <div class="col-lg-2 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>旧密码</cn>
                                                <en>Current</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="input-group">
                                                <input class="form-control" :type="!showPasswd.oldpwd ? 'password' : 'text'" v-model="userPasswd.oldpwd">
                                                <span class="input-group-text input-group-addon force-cursor-pointer" @click="showPasswd.oldpwd = !showPasswd.oldpwd"><i :class="['fa-regular',{'fa-eye-slash':!showPasswd.oldpwd},{'fa-eye':showPasswd.oldpwd}]"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-lg-2 offset-lg-1 force-align-center">
                                            <label>
                                                <label>
                                                    <cn>新密码</cn>
                                                    <en>New</en>
                                                </label>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="input-group">
                                                <input class="form-control" :type="!showPasswd.newpwd ? 'password' : 'text'" v-model="userPasswd.newpwd">
                                                <span class="input-group-text input-group-addon force-cursor-pointer" @click="showPasswd.newpwd = !showPasswd.newpwd"><i :class="['fa-regular',{'fa-eye-slash':!showPasswd.newpwd},{'fa-eye':showPasswd.newpwd}]"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-lg-2 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>确认密码</cn>
                                                <en>Confirm</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="input-group">
                                                <input class="form-control" :type="!showPasswd.confirm ? 'password' : 'text'" v-model="userPasswd.confirm">
                                                <span class="input-group-text input-group-addon force-cursor-pointer" @click="showPasswd.confirm = !showPasswd.confirm"><i :class="['fa-regular',{'fa-eye-slash':!showPasswd.confirm},{'fa-eye':showPasswd.confirm}]"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-lg-12 text-center">
                                            <button type="button" class="btn border-3 btn-primary px-4" @click="updateUserPasswd"><cn>保存</cn><en>Save</en></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header bg-transparent">
                                <div class="p-2 mb-0 d-flex align-items-end">
                                    <cn>应用场景</cn>
                                    <en>Application scenario</en>
                                </div>
                            </div>
                            <div class="card-body py-4">
                                <div class="row py-2">
                                    <div class="col-lg-2 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>场景</cn>
                                            <en>Scene</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <select class="form-select" v-if="Object.keys(videoBufferConf).length > 0" v-model="videoBufferConf.used">
                                            <option v-for="item in handleSysScene" :value="item">{{item}}</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-2">
                                        <button type="button" class="btn border-3 btn-primary change" @click="updateVideoBufferConf"><cn>切换</cn><en>Change</en></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>定时维护</cn>
                            <en>Auto reboot</en>
                        </div>
                    </div>
                    <div class="card-body py-4">
                        <div class="row">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>系统时间</cn>
                                    <en>system time</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model="sysTime">
                            </div>
                            <div class="col-lg-2">
                                <button type="button" class="btn border-3 btn-primary changeBtn" @click="syncTimeFromPc"><cn>本地同步</cn><en>Sync from PC</en></button>
                            </div>
                        </div>
                        <div class="row mt-3" v-if="Object.keys(ntpConf).length > 0">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>NTP同步</cn>
                                    <en>NTP sync</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model="ntpConf.server">
                            </div>
                            <div class="col-lg-2">
                                <bootstrap-switch v-model="ntpConf.enable"></bootstrap-switch>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>时区设置</cn>
                                    <en>time zone</en>
                                </label>
                            </div>
                            <div class="col-lg-3">
                               <select class="form-select" v-model="timezoneConf.timeArea" @change="onTimeAreaChange">
                                   <option value="Africa">Africa</option>
                                   <option value="America">Americas</option>
                                   <option value="Antarctica">Antarctica</option>
                                   <option value="Asia">Asia</option>
                                   <option value="Atlantic">Atlantic Ocean</option>
                                   <option value="Australia">Australia</option>
                                   <option value="Europe">Europe</option>
                                   <option value="Indian">Indian Ocean</option>
                                   <option value="Pacific">Pacific Ocean</option>
                               </select>
                            </div>
                            <div class="col-lg-3">
                                <select class="form-select" v-model="timezoneConf.timeCity">
                                    <option v-for="item in timeCitys" :value="item.name">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>维护时间</cn>
                                    <en>reboot time</en>
                                </label>
                            </div>
                            <div class="col-lg-3" v-model="cronDay">
                                <select class="form-select">
                                    <option cn="从不" en="never" value="x" v-woption></option>
                                    <option cn="每天" en="everyday" value="*" v-woption></option>
                                    <option cn="每周一" en="monday" value="1" v-woption></option>
                                    <option cn="每周二" en="tuesday" value="2" v-woption></option>
                                    <option cn="每周三" en="wednesday" value="3" v-woption></option>
                                    <option cn="每周四" en="thursday" value="4" v-woption></option>
                                    <option cn="每周五" en="friday" value="5" v-woption></option>
                                    <option cn="每周六" en="saturday" value="6" v-woption></option>
                                    <option cn="每周日" en="sunday" value="0" v-woption></option>
                                </select>
                            </div>
                            <div class="col-lg-3">
                                <select class="form-select" v-model="cronTime">
                                    <option value="0">0:00</option>
                                    <option value="1">1:00</option>
                                    <option value="2">2:00</option>
                                    <option value="3">3:00</option>
                                    <option value="4">4:00</option>
                                    <option value="5">5:00</option>
                                    <option value="6">6:00</option>
                                    <option value="7">7:00</option>
                                    <option value="8">8:00</option>
                                    <option value="9">9:00</option>
                                    <option value="10">10:00</option>
                                    <option value="11">11:00</option>
                                    <option value="12">12:00</option>
                                    <option value="13">13:00</option>
                                    <option value="14">14:00</option>
                                    <option value="15">15:00</option>
                                    <option value="16">16:00</option>
                                    <option value="17">17:00</option>
                                    <option value="18">18:00</option>
                                    <option value="19">19:00</option>
                                    <option value="20">20:00</option>
                                    <option value="21">21:00</option>
                                    <option value="22">22:00</option>
                                    <option value="23">23:00</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4 me-4" @click="saveSysConf"><cn>保存</cn><en>Save</en></button>
                                <button type="button" class="btn border-3 btn-primary px-4 me-4" @click="reboot"><cn>立即重启</cn><en>Reboot</en></button>
                                <button type="button" class="btn border-3 btn-primary px-4" @click="resetConf"><cn>恢复出厂设置</cn><en>Reset default</en></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>配置文件</cn>
                            <en>Config file</en>
                            <small>
                                <cn>按需导出配置文件</cn>
                                <en>Export configuration files on demand</en>
                            </small>
                        </div>
                    </div>
                    <div class="card-body py-4">
                        <div class="row row-cols-4 row-cols-lg-4 px-5">
                            <div class="text-center">
                                <cn>编解码配置</cn>
                                <en>Default Config</en>
                            </div>
                            <div class="text-center">
                                <cn>布局配置</cn>
                                <en>Layout Config</en>
                            </div>
                            <div class="text-center">
                                <cn>推流配置</cn>
                                <en>Push Config</en>
                            </div>
                            <div class="text-center">
                                <cn>密码配置</cn>
                                <en>Password Config</en>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <div class="row row-cols-4 row-cols-lg-4 px-5">
                                <div class="force-align-center">
                                    <bootstrap-switch v-model="exconfs.config"></bootstrap-switch>
                                </div>
                                <div class="force-align-center">
                                    <bootstrap-switch v-model="exconfs.defLays"></bootstrap-switch>
                                </div>
                                <div class="force-align-center">
                                    <bootstrap-switch v-model="exconfs.push"></bootstrap-switch>
                                </div>
                                <div class="force-align-center">
                                    <bootstrap-switch v-model="exconfs.passwd"></bootstrap-switch>
                                </div>
                            </div>
                        </div>
                        <div class="row row-cols-4 row-cols-lg-4 mt-4 px-5">
                            <div class="text-center">
                                <cn>录制配置</cn>
                                <en>Record Config</en>
                            </div>
                            <div class="text-center">
                                <cn>端口配置</cn>
                                <en>Port Config</en>
                            </div>
                            <div class="text-center">
                                <cn>维护配置</cn>
                                <en>NTP Config</en>
                            </div>
                            <div class="text-center">
                                <cn>场景配置</cn>
                                <en>Scene Config</en>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <div class="row row-cols-4 row-cols-lg-4 px-5">
                                <div class="force-align-center">
                                    <bootstrap-switch v-model="exconfs.record"></bootstrap-switch>
                                </div>
                                <div class="force-align-center">
                                    <bootstrap-switch v-model="exconfs.port"></bootstrap-switch>
                                </div>
                                <div class="force-align-center">
                                    <bootstrap-switch v-model="exconfs.cron"></bootstrap-switch>
                                </div>
                                <div class="force-align-center">
                                    <bootstrap-switch v-model="exconfs.videoBuffer"></bootstrap-switch>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-12 text-center mt-3">
                                <button type="button" class="btn border-3 btn-primary px-4 me-3" @click="exportConf"><cn>导出</cn><en>Export</en></button>
                                <button type="button" class="btn border-3 btn-primary px-4 " @click="importConf"><cn>导入</cn><en>Import</en></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>端口配置</cn>
                            <en>Port config</en>
                        </div>
                    </div>
                    <div class="card-body" v-if="Object.keys(portConf).length > 0">
                        <div class="row mb-2">
                            <div class="col-10">
                                <div class="row">
                                    <div class="col-3"></div>
                                    <div class="col text-center">HTTP</div>
                                    <div class="col text-center">RTSP</div>
                                    <div class="col text-center">RTMP</div>
                                    <div class="col text-center">HTTPTS</div>
                                    <div class="col text-center">Telnet</div>
                                    <div class="col text-center">SSH</div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row mt-2">
                            <div class="col-10">
                                <div class="row">
                                    <div class="col-3 d-flex align-items-center justify-content-end">
                                        <cn>固定端口</cn>
                                        <en>Static port</en>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.http[0]" readonly disabled>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.rtsp[0]" readonly disabled>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.rtmp[0]" readonly disabled>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.httpts[0]" readonly disabled>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.telnet[0]" readonly disabled>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.ssh[0]" readonly disabled>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-3 d-flex align-items-center justify-content-end">
                                        <cn>备用端口</cn>
                                        <en>Reserve port</en>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.http[1]">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.rtsp[1]">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.rtmp[1]">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.httpts[1]">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.telnet[1]">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.ssh[1]">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-3 d-flex align-items-center justify-content-end">
                                        <cn>映射(外网)端口</cn>
                                        <en>NAT port</en>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.http[2]">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.rtsp[2]">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.rtmp[2]">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.httpts[2]">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.telnet[2]">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control text-center" v-model="portConf.ssh[2]">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row my-2">
                            <div class="col-lg-12 text-center mt-3">
                                <button type="button" class="btn border-3 btn-primary px-5" @click="updatePortConf"><cn>保存</cn><en>Save</en></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header bg-transparent">
                                <div class="p-2 mb-0 d-flex align-items-end">
                                    <cn>远程协助</cn>
                                    <en>Remote Assistance</en>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row my-4">
                                    <div class="col-lg-3 d-flex align-items-center justify-content-end">
                                        <cn>授权码</cn>
                                        <en>Auth code</en>
                                    </div>
                                    <div class="col-lg-3 force-align-center">
                                        <input type="text" class="form-control" v-model="helpCode" readonly disabled>
                                    </div>
                                    <div class="col-lg-6">
                                        <button type="button" class="btn border-3 btn-primary px-4 me-2" @click="startHelp"><cn>开始协助</cn><en>Start</en></button>
                                        <button type="button" class="btn border-3 btn-primary px-4" @click="stopHelp"><cn>停止协助</cn><en>Stop</en></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header bg-transparent">
                                <div class="p-2 mb-0 d-flex align-items-end">
                                    <cn>网络测试</cn>
                                    <en>Network Test</en>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row my-2">
                                    <div class="col-lg-12 text-center">
                                        <button type="button" class="btn border-3 btn-primary px-4 net-test" @click="systemNetTest"><cn>网络测试</cn><en>Start Test</en></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>系统升级</cn><en>Upgrade</en>
                        </div>
                    </div>
                    <div class="card-body" v-if="Object.keys(versionConf).length > 0">
                        <div class="row mt-1">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>应用版本</cn>
                                    <en>App version</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <label>{{versionConf.app}}</label>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>SDK版本</cn>
                                    <en>SDK version</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <label>{{versionConf.sdk}}</label>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>系统版本</cn>
                                    <en>Sys version</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <label>{{versionConf.sys}}</label>
                            </div>
                        </div>
                        <hr class="my-4">
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>上传升级</cn>
                                    <en>upload packet</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <button type="button" class="btn border-3 btn-primary px-3 me-2"><cn>选择文件</cn><en>File</en></button>
                                <button type="button" class="btn border-3 btn-primary px-3"><cn>版本日志</cn><en>Logs</en></button>
                            </div>
                        </div>
                        <div class="row mt-1 mb-4">
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>在线升级</cn>
                                    <en>online update</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <button type="button" class="btn border-3 btn-primary px-3 me-2"><cn>检测更新</cn><en>Search</en></button>
                                <button type="button" class="btn border-3 btn-primary px-3 search-packet"><i class="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
<?php include ("./public/foot.inc") ?>
<script src="assets/plugins/jszip/jszip.js"></script>
<script src="assets/plugins/jszip/filesaver.min.js"></script>
<script type="module">
    
    import { rpc2,rpc3,alertMsg,func,queryData,getConfigData } from "./assets/js/helper.js";
    import { useHardwareConf,useNetConf,useNet2Conf,useWifiConf,useMacConf,useMac2Conf,useVideoBufferConf,useNtpConf,useTimezoneConf,usePortConf,useVersionConf,useSsidConf,useWpaConf } from "./assets/js/confHooks.js";
    import { bootstrapSwitchComponent,wOptionDirective } from "./assets/js/vueHelper.js"
    
    const {createApp,ref,reactive,watch,watchEffect,computed,onMounted} = Vue;
    const app = createApp({
        directives:{
            "woption": wOptionDirective
        },
        components:{
            "bootstrap-switch" : bootstrapSwitchComponent,
        },
        setup(props,context) {
            
            const { hardwareConf } = useHardwareConf();
            const { netConf } = useNetConf();
            const { net2Conf } = useNet2Conf();
            const { wifiConf } = useWifiConf();
            const { macConf } = useMacConf();
            const { mac2Conf } = useMac2Conf();
            const { videoBufferConf } = useVideoBufferConf();
            const { ntpConf } = useNtpConf();
            const { timezoneConf } = useTimezoneConf();
            const { portConf } = usePortConf();
            const { versionConf } = useVersionConf();
            const { ssidConf } = useSsidConf();
            const { wpaConf } = useWpaConf();
            
            let state = {
                sysTime: ref("1970-01-01 08:00:00"),
                timeCitys: reactive([]),
                cronDay: ref("never"),
                cronTime: ref("0"),
                wifiList:reactive([]),
                refreshMark: ref(false),
                wifiPasswd:ref(""),
                helpCode:ref(""),
                wifiConnectId:ref(-1),
                wifiConnectStatus:ref("<cn>未连接</cn><en>not connected </en>"),
                userPasswd:reactive({"oldpwd":"","newpwd":"","confirm":""}),
                showPasswd:reactive({"wifipwd":false,"oldpwd":false,"newpwd":false,"confirm":false}),
                exconfs:reactive({"config": true, "defLays":false, "push": false, "record": false, "port": false, "passwd": false, "videoBuffer": true, "cron": true})
            }
            
            const onTimeAreaChange = (evt) => {
                queryData("/timezone/zoneinfo/"+timezoneConf.timeArea+"/").then(data=>{
                    state.timeCitys.splice(0, state.timeCitys.length, ...data);
                    if(evt !== undefined)
                        timezoneConf.timeCity = state.timeCitys[0].name;
                })
            }
            
            const unwatch = watch(timezoneConf,value=>{
                onTimeAreaChange();
                unwatch();
            })

            const handleWifiList = () => {
                rpc2( "wifi.wifiList", null).then(data => {
                    if ( typeof ( data.error ) != "undefined" ) {
                        alertMsg('<cn>通信错误</cn><en>Connect failed!</en>', 'error');
                        return;
                    }
                    for(let i=0;i<data.length;i++) {
                        let item = data[i];
                        if(item.flags === "[CURRENT]") {
                            state.wifiConnectStatus.value = "<cn>已连接</cn><en>connected</en> " + item.ssid;
                            state.wifiConnectId.value = item.id;
                            const regex = /network={([\s\S]*?)}/g;
                            let match;
                            while ((match = regex.exec(wpaConf.value)) !== null) {
                                const networkObjStr = match[1].trim();
                                const lines = networkObjStr.split("\n");
                                const networkObj = {};
                                for (const line of lines) {
                                    let [key, value] = line.split("=");
                                    value = value.trim();
                                    value = value.replace(/^"(.*)"$/, '$1');
                                    networkObj[key.trim()] = value;
                                }
                                if(networkObj["ssid"] === item.ssid) {
                                    if(networkObj.hasOwnProperty("psk")) {
                                        state.wifiPasswd.value = networkObj["psk"];
                                        break;
                                    }
                                }
                            }
                        }
                    }
                } );
            }
            
            const unwatch_wifi = watch(wifiConf,value=>{
                if(wifiConf.enable) {

                    rpc2( "wifi.scanWifi", null).then(data => {
                        if ( typeof ( data.error ) != "undefined" ) {
                            alertMsg('<cn>通信错误</cn><en>Connect failed!</en>', 'error');
                            return;
                        }
                        state.wifiList.splice(0, state.wifiList.length, ...data);
                    }).then(()=>{
                        handleWifiList();
                    });
                }
                unwatch_wifi();
            })
    
            const handleSysScene = computed(()=>{
                return Object.keys(videoBufferConf).filter((item,index)=>{
                    return item !== "used";
                })
            });
            
            const refreshWifi = () => {
                if(wifiConf.enable) {
                    state.refreshMark.value = true;
                    rpc2( "wifi.update", [ wifiConf ]).then(data => {
                        if ( typeof ( data.error ) !== "undefined" ) {
                            alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                            return;
                        }
                        let count = 0;
                        let loopTimer = setInterval(()=>{
                            rpc2( "wifi.scanWifi", null).then(data => {
                                if ( typeof ( data.error ) != "undefined" ) {
                                    alertMsg('<cn>通信错误</cn><en>Connect failed!</en>', 'error');
                                    return;
                                }
                                count++;
                                if(data.length > 0 || count > 15) {
                                    state.wifiList.splice(0, state.wifiList.length, ...data);
                                    if(state.wifiList.length >0)
                                        ssidConf.ssid = state.wifiList[0].ssid;
                                    clearInterval(loopTimer);
                                    setTimeout(()=>{
                                        state.refreshMark.value = false;
                                    },500);
                                }
                            });
                        },1000)
                    } );
                }
                else
                    alertMsg('<cn>请先启用Wifi</cn><en>Please enable wifi first</en>', 'error');
            }
    
            const connectWifi = () => {
                rpc2( "wifi.wifiList", null).then(data => {
                    if ( typeof ( data.error ) != "undefined" ) {
                        alertMsg('<cn>通信错误</cn><en>Connect failed!</en>', 'error');
                        return;
                    }
                    for(let i=0;i<data.length;i++) {
                        let item = data[i];
                        if(item.flags === "[CURRENT]") {
                            state.wifiConnectStatus.value = "<cn>已连接</cn><en>connected</en> " + item.ssid;
                            state.wifiConnectId.value = item.id;
                        }
                    }
                } );



                rpc2( "wifi.addWifi", [ssidConf.ssid,state.wifiPasswd.value]).then(data =>{
                    if ( typeof ( data.error ) != "undefined" ) {
                        alertMsg('<cn>通信错误</cn><en>Connect failed!</en>', 'error');
                        return;
                    }
                    alertMsg('<cn>连接成功</cn><en>Connect successfully!</en>', 'success');
                });
            }

            const disConnectWifi = () => {
                if(state.wifiConnectId.value === -1) {
                    alertMsg('<cn>没有找到已连接的Wifi</cn><en>No connected Wifi found</en>', 'warning');
                    return;
                }
                rpc2( "wifi.setWifi", ["disable_network", state.wifiConnectId+""]).then(data => {
                    if ( typeof ( data.error ) != "undefined" ) {
                        alertMsg('<cn>通信错误</cn><en>Connect failed!</en>', 'error');
                        return;
                    }
                    state.wifiConnectId.value = -1;
                    state.wifiConnectStatus.value = "<cn>未连接</cn><en>not connected </en>";
                    alertMsg('<cn>Wifi 已断开</cn><en>Wifi disconnect successfully!</en>', 'success');
                } );
            }
    
            const saveNetConf = () => {
                func("/link/mgr/conf/updateNetConf", netConf).then(data=>{
                    if(data.status === "success")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                });
            }
    
            const saveNet2Conf = () => {
                func("/link/mgr/conf/updateNet2Conf", net2Conf).then(data=>{
                    if(data.status === "success")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                });
            }
    
            const saveWifiConf = () => {
                rpc2( "wifi.update", [ wifiConf ]).then(data => {
                    if ( typeof ( data.error ) !== "undefined" ) {
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                    } else {
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                    }
                } );
            }
            
            const updateUserPasswd = () => {
                func("/link/mgr/conf/updatePasswdConf",state.userPasswd).then((data)=>{
                    if(data.status === "success")
                        alertMsg(data.msg, 'success');
                    else
                        alertMsg(data.msg, 'error');
                });
            }
            
            const updateVideoBufferConf = () => {
                func("/link/mgr/conf/updateVideoBufferConf",videoBufferConf).then((data)=>{
                    if(data.status === "success")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                    else
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                });
            }
            
            const syncTimeFromPc = () => {
                let now = new Date();
                let time1 = now.Format( "yyyy/MM/dd/hh/mm/ss" );
                let time2 = now.Format( "yyyy-MM-dd hh:mm:ss" );
                func("/link/mgr/system/setSystemTime",{time1:time1,time2:time2}).then((data)=>{
                    if(data.status === "success") {
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                        state.sysTime.value = time2;
                    }
                })
            }
            
            const saveSysConf = () => {
                Promise.all([
                    func("/link/mgr/conf/updateNtpConf", ntpConf),
                    func("/link/mgr/conf/updateTimezoneConf", timezoneConf),
                    func("/link/mgr/system/setSystemCrontab", { day: state.cronDay.value, time: state.cronTime.value }),
                ]).then((results) => {
                    const [data1, data2, data3] = results;
                    if(data1.status==="success" && data2.status==="success" && data3.status==="success")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                    else
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                })
            }
            
            const reboot = () => {
                func("/link/mgr/system/systemReboot");
            }
            
            const resetConf = () => {
                func("/link/mgr/system/systemReset");
            }
            
            const exportConf = () => {
                let confs = ["lang.json"];
                for(let i=0;i<Object.keys(state.exconfs).length;i++) {
                    let path = Object.keys(state.exconfs)[i];
                    if(state.exconfs[path]) {
                        if(path === "cron") {
                            confs.push("ntp.json");
                            confs.push("auto/root.cron");
                            confs.push("misc/timezone/tzselect.json");
                        } else if(path === "videoBuffer") {
                            confs.push("board.json");
                            confs.push("videoBuffer.json");
                        } else {
                            confs.push(path+".json");
                        }
                    }
                }
                let zip = new JSZip();
                for(let i=0;i<confs.length;i++){
                    getConfigData(confs[i],{responseType: 'blob'}).then((xhr)=>{
                        console.log(confs[i],xhr.response);
                        zip.file(confs[i],xhr.response,{binary:true});
                    })
                }
                setTimeout(() => {
                    if (Object.keys(zip.files).length > 0) {
                        zip.generateAsync({type: 'blob'}).then((blob) => {
                            saveAs(blob, 'configs.zip');
                        });
                    } else {
                        console.log('下载全部失败')
                    }
                },300);
            }
            
            const importConf = () =>{
            
            }
            
            const updatePortConf = () => {
                rpc3("update", [JSON.stringify( portConf, null, 2 )]).then(data => {
                    if ( typeof ( data.error ) !== "undefined" )
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                    else
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                });
            }
            
            const startHelp = () => {
                state.helpCode.value = Math.floor(Math.random()*1000);
                func("/link/mgr/system/startHelp",{helpCode: state.helpCode.value}).then((data)=>{
                    if(data.status === "success")
                        alertMsg('<cn>连接成功，请向客服提供授权码以便控制您的编码器。</cn><en>Connect success, please provide auth code to customer service to control your encoder!</en>', 'success');
                })
            }
            
            const stopHelp = () => {
                func("/link/mgr/system/stopHelp").then((data)=>{
                    if(data.status === "success") {
                        state.helpCode.value = "";
                        alertMsg('<cn>已断开连接</cn><en>Disconnect success</en>', 'success');
                    }
                })
            }
            
            const systemNetTest = () => {
                func("/link/mgr/system/systemNetTest").then(data => {
                    const str = data.data.join();
                    if(str === "")
                        alertMsg('<cn>域名解析超时</cn><en>DNS timeout</en>!', 'error');
                    else if(str.indexOf(" 0%")>0)
                        alertMsg('<cn>网络可用</cn><en>Network available</en>！', 'success');
                    else
                        alertMsg('<cn>网络不可用</cn><en>Network Unavailable</en>！', 'error');
                })
            }
            
            onMounted(()=>{
                func("/link/mgr/system/getSystemTime").then(result => {
                    state.sysTime.value = result.data;
                    setInterval(()=>{
                        let currentTime = new Date(state.sysTime.value);
                        currentTime.setSeconds(currentTime.getSeconds() + 1);
                        const year = currentTime.getFullYear();
                        const month = String(currentTime.getMonth() + 1).padStart(2, '0');
                        const day = String(currentTime.getDate()).padStart(2, '0');
                        const hours = String(currentTime.getHours()).padStart(2, '0');
                        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
                        const seconds = String(currentTime.getSeconds()).padStart(2, '0');
                        state.sysTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    },1000);
                });
    
                func("/link/mgr/system/getSystemCrontab").then(result => {
                    if ( result.data === "" || result.data.split( " " ).length !== 6 ) {
                        state.cronDay.value = "x";
                        state.cronTime.value = "0";
                    } else {
                        state.cronTime.value = result.data.split( " " )[ 1 ];
                        state.cronDay.value = result.data.split( " " )[ 4 ];
                    }
                });
    
                Date.prototype.Format = function ( fmt ) {
                    let o = {
                        "M+": this.getMonth() + 1, //月份
                        "d+": this.getDate(), //日
                        "h+": this.getHours(), //小时
                        "m+": this.getMinutes(), //分
                        "s+": this.getSeconds(), //秒
                        "q+": Math.floor( ( this.getMonth() + 3 ) / 3 ), //季度
                        "S": this.getMilliseconds() //毫秒
                    };
                    if ( /(y+)/.test( fmt ) ) fmt = fmt.replace( RegExp.$1, ( this.getFullYear() + "" ).substr( 4 - RegExp.$1.length ) );
                    for ( let k in o )
                        if ( new RegExp( "(" + k + ")" ).test( fmt ) ) fmt = fmt.replace( RegExp.$1, ( RegExp.$1.length == 1 ) ? ( o[ k ] ) : ( ( "00" + o[ k ] ).substr( ( "" + o[ k ] ).length ) ) );
                    return fmt;
                }
            })
            
            return {...state,hardwareConf,netConf,net2Conf,macConf,mac2Conf,wifiConf,
                videoBufferConf,ssidConf,ntpConf,timezoneConf,portConf,versionConf,handleSysScene,
                saveNetConf,saveNet2Conf,saveWifiConf,refreshWifi,connectWifi,disConnectWifi,updateUserPasswd,updateVideoBufferConf,
                onTimeAreaChange,syncTimeFromPc,saveSysConf,reboot,resetConf,exportConf,importConf,updatePortConf,startHelp,stopHelp,systemNetTest}
        }
    });
    app.mount('#app');
</script>
</body>
</html>