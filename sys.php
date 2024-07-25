<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
    <link href="assets/plugins/fileinput/css/fileinput.min.css" rel="stylesheet" >
</head>
<body>
<?php include ("./public/menu.inc") ?>
<div data-simplebar class="mb-4">
    <main class="page-content sys" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-6">
                <ul class="nav nav-tabs nav-primary" role="tablist">
                    <li class="nav-item" role="presentation" v-if="Object.keys(netAdapter).length > 0 && Object.keys(netManagerConf).length > 0" v-for="(item,index) in Object.values(netAdapter)" :key="index">
                        <a v-if="netManagerConf.interface.hasOwnProperty(item.dev)" :class="['nav-link',{'active':index===0}]" data-bs-toggle="tab" :href="'#tab'+(index+1)" role="tab" aria-selected="true">
                            <div v-if="item.type === 'lan' || item.type === 'other'" class="d-flex align-items-center">
                                <div class="tab-icon"><i :class="['fa-solid me-1',{'fa-code-merge':index%2===1},{'fa-code-fork':index%2===0}]"></i></i></div>
                                <div class="tab-title">
                                    <cn>网口</cn>
                                    <en>LAN</en>
                                    <span v-if="index > 0">{{index+1}}</span>
                                </div>
                            </div>
                            <div v-if="item.type === 'wifi'" class="d-flex align-items-center">
                                <wifi-flag :icon="'wifi-'+(item.rssi > 3 ? 4 : (item.rssi < 3 ? (item.rssi === 0 ? 1 : 2) : 3))" :width="20" :height="20" :stroke="flagStroke" :color="flagColor" :stroke-width="2.3"></wifi-flag>
                                <div class="tab-title">
                                    <cn>无线网</cn>
                                    <en>WIFI</en>
                                </div>
                            </div>
                            <div v-if="item.type === 'dongle'" class="d-flex align-items-center">
                                <antenan-flag :icon="'antenan-'+(item.rssi > 3 ? 4 : (item.rssi < 3 ? (item.rssi === 0 ? 0 : 2) : 3))" :width="20" :height="20" :stroke="flagStroke" :color="flagColor" :stroke-width="2.3"></antenan-flag>
                                <div class="tab-title">
                                    <cn>移动网络</cn>
                                    <en>Cellular network</en>
                                </div>
                            </div>
                        </a>
                    </li>

                    <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.wifi && !Object.values(netAdapter).some(item => item.type === 'wifi')" class="nav-item lp-cursor-pointer" ref="wifiHandler">
                        <a class="nav-link">
                            <div class="d-flex align-items-center">
                                <wifi-flag icon="wifi-off" :width="20" :height="20" :stroke="'#999999'" :stroke-width="2.3"></wifi-flag>
                                <div class="tab-title">
                                    <cn>无线网</cn>
                                    <en>WIFI</en>
                                </div>
                            </div>
                        </a>
                    </li>

                    <li v-if="!Object.values(netAdapter).some(item => item.type === 'dongle')" class="nav-item lp-cursor-pointer" ref="antenanHandler">
                        <a class="nav-link">
                            <div class="d-flex align-items-center">
                                <antenan-flag icon="antenan-off" :width="20" :height="20" :stroke="'#999999'" :stroke-width="2.3"></antenan-flag>
                                <div class="tab-title">
                                    <cn>移动网络</cn>
                                    <en>Cellular network</en>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>

                <div class="tab-content py-3 pe-2 ps-2">
                    <div v-if="Object.keys(netAdapter).length > 0 && Object.keys(netManagerConf).length > 0" v-for="(item,index) in Object.values(netAdapter)" :class="['tab-pane fade',{'show active':index===0}]" :key="index" :id="'tab'+(index+1)" role="tabpanel">
                        <div v-if="netManagerConf.interface.hasOwnProperty(item.dev) && (item.type === 'lan' || item.type === 'other')">
                            <div v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.dhcp" class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>DHCP</cn>
                                        <en>DHCP</en>
                                    </label>
                                </div>
                                <div class="col-lg-5">
                                    <bs-switch v-model="netManagerConf.interface[item.dev].dhcp" :size="'normal'"></bs-switch>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>IP</cn>
                                        <en>IP</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].ip">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>掩码</cn>
                                        <en>Mask</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].mask">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>网关</cn>
                                        <en>Gateway</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].gw">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>DNS</cn>
                                        <en>DNS</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].dns">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>MAC</cn>
                                        <en>MAC</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <div class="input-group">
                                        <input class="form-control" type="text" :disabled="macLock" v-model.trim.lazy="netManagerConf.interface[item.dev].mac">
                                        <span class="input-group-text input-group-addon lp-cursor-pointer" @click="macLock=!macLock"><i :class="['fa-solid',{'fa-lock':macLock},{'fa-unlock':!macLock}]"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn border-3 btn-primary px-4" @click="updateDefNetwork(item.dev)"><cn>保存</cn><en>Save</en></button>
                                </div>
                            </div>
                        </div>
                        <div v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.wifi && netManagerConf.interface.hasOwnProperty(item.dev) && item.type === 'wifi'">
                            <div class="row mt-4">
                                <div class="col-lg-6 border-right">
                                    <div class="row mt-4">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>启用</cn>
                                                <en>Enable</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <bs-switch v-model="netManagerConf.interface[item.dev].enable" :size="'normal'" @switch-change="enableWifi"></bs-switch>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                WIFI
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="input-group">
                                                <select class="form-select" v-model="wifiConnectId">
                                                    <option v-for="(it,idx) in wifiList" :key="idx+10" :value="it.ssid">{{it.ssid}}</option>
                                                </select>
                                                <span class="input-group-text input-group-addon lp-cursor-pointer" @click="refreshWifi"><i :class="['fa-solid fa-arrows-rotate',{'spin':wifiRefresh}]"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>密码</cn>
                                                <en>Password</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="input-group">
                                                <input class="form-control" :type="!showPasswd.wifipwd ? 'password' : 'text'" v-model.trim.lazy="wifiPassword">
                                                <span class="input-group-text input-group-addon lp-cursor-pointer" @click="showPasswd.wifipwd = !showPasswd.wifipwd"><i :class="['fa-regular',{'fa-eye-slash':!showPasswd.wifipwd},{'fa-eye':showPasswd.wifipwd}]"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>状态</cn>
                                                <en>Status</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <label v-if="!netManagerConf.interface[item.dev].enable">
                                                <cn>未启用</cn><en>Disabled</en>
                                            </label>
                                            <label v-else-if="(!item.ssid && wifiPassword) || (!item.linkup && item.ssid)">
                                                <cn class="pointLoading">连接中</cn><en class="pointLoading">connecting</en>
                                            </label>
                                            <label v-else-if="item.linkup && item.ssid">
                                                <cn>已连接</cn><en>connected </en>
                                                {{item.ssid}}
                                            </label>
                                            <label v-else>
                                                <cn>未连接</cn><en>not connected</en>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-lg-12 text-center">
                                            <button type="button" class="btn border-3 btn-primary px-4 me-2" @click="connectWifi"><cn>连接</cn><en>Connect</en></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="row mt-4">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>DHCP</cn>
                                                <en>DHCP</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <bs-switch v-model="netManagerConf.interface[item.dev].dhcp" :size="'normal'"></bs-switch>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>IP</cn>
                                                <en>IP</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].ip">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>掩码</cn>
                                                <en>Mask</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].mask">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>网关</cn>
                                                <en>Gateway</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].gw">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>DNS</cn>
                                                <en>DNS</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].dns">
                                        </div>
                                    </div>
                                    <div class="row mt-4 mb-4">
                                        <div class="col-lg-12 text-center">
                                            <button type="button" class="btn border-3 btn-primary px-4" @click="updateNetManagerConf"><cn>保存</cn><en>Save</en></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="item.type === 'dongle'">
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>运营商</cn>
                                        <en>Operator</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <div v-if="!netAdapter[item.dev].oper" v-html="`<cn class='pointLoading'>检测中</cn><en class='pointLoading'>Detecting...</en>`"></div>
                                    <input v-else class="form-control" v-model.trim.lazy="netAdapter[item.dev].oper" readonly>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>服务</cn>
                                        <en>Service</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model.trim.lazy="netAdapter[item.dev].service" readonly>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>上行</cn>
                                        <en>Service</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" :value="formatNetSpeed(netAdapter[item.dev].tx)" readonly>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>下行</cn>
                                        <en>Service</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" :value="formatNetSpeed(netAdapter[item.dev].rx)" readonly>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>IP</cn>
                                        <en>IP</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model.trim.lazy="netAdapter[item.dev].ip" readonly>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>掩码</cn>
                                        <en>Mask</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model.trim.lazy="netAdapter[item.dev].mask" readonly>
                                </div>
                            </div>
                            <div class="row mt-3 mb-2">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>网关</cn>
                                        <en>Gateway</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model.trim.lazy="netAdapter[item.dev].gw" readonly>
                                </div>
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
                                    <div class="col-lg-2 offset-lg-1 lp-align-center">
                                        <label>
                                            <cn>旧密码</cn>
                                            <en>Current</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                            <input class="form-control" :type="!showPasswd.oldpwd ? 'password' : 'text'" v-model.trim.lazy="userPasswd.oldpwd" autocomplete="off">
                                            <span class="input-group-text input-group-addon lp-cursor-pointer" @click="showPasswd.oldpwd = !showPasswd.oldpwd"><i :class="['fa-regular',{'fa-eye-slash':showPasswd.oldpwd},{'fa-eye':!showPasswd.oldpwd}]"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-2 offset-lg-1 lp-align-center">
                                        <label>
                                            <label>
                                                <cn>新密码</cn>
                                                <en>New</en>
                                            </label>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                            <input class="form-control" :type="!showPasswd.newpwd ? 'password' : 'text'" v-model.trim.lazy="userPasswd.newpwd" autocomplete="off">
                                            <span class="input-group-text input-group-addon lp-cursor-pointer" @click="showPasswd.newpwd = !showPasswd.newpwd"><i :class="['fa-regular',{'fa-eye-slash':showPasswd.newpwd},{'fa-eye':!showPasswd.newpwd}]"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-2 offset-lg-1 lp-align-center">
                                        <label>
                                            <cn>确认密码</cn>
                                            <en>Confirm</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                            <input class="form-control" :type="!showPasswd.confirm ? 'password' : 'text'" v-model.trim.lazy="userPasswd.confirm" autocomplete="off">
                                            <span class="input-group-text input-group-addon lp-cursor-pointer" @click="showPasswd.confirm = !showPasswd.confirm"><i :class="['fa-regular',{'fa-eye-slash':showPasswd.confirm},{'fa-eye':!showPasswd.confirm}]"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-12 text-center">
                                        <button type="button" class="btn border-3 btn-primary px-4" @click="updateUserPasswd(userPasswd)"><cn>保存</cn><en>Save</en></button>
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
                                    <div class="col-lg-2 offset-lg-1 lp-align-center">
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
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>系统时间</cn>
                                    <en>system time</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model.trim.lazy="sysTime">
                            </div>
                            <div class="col-lg-2">
                                <button type="button" class="btn border-3 btn-primary px-2" @click="syncTimeFromPc"><cn>本地同步</cn><en>Sync from PC</en></button>
                            </div>
                        </div>
                        <div class="row mt-3" v-if="Object.keys(ntpConf).length > 0">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>NTP同步</cn>
                                    <en>NTP sync</en>
                                </label>
                            </div>
                            <div class="col-lg-3">
                                <input class="form-control" v-model.trim.lazy="ntpConf.server">
                            </div>
                            <div class="col-lg-3">
                                <div class="input-group">
                                    <span class="input-group-text input-group-addon">
                                        <cn>间隔</cn>
                                        <en>inr</en>
                                    </span>
                                    <input class="form-control" v-model.trim.lazy="ntpConf.interval">
                                    <span class="input-group-text input-group-addon">
                                        <cn>分钟</cn>
                                        <en>min</en>
                                    </span>
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <bs-switch v-model="ntpConf.enable"></bs-switch>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
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
                                    <option v-for="item in timezoneCitys" :value="item.name">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>维护时间</cn>
                                    <en>reboot time</en>
                                </label>
                            </div>
                            <div class="col-lg-3">
                                <select class="form-select" v-model="cronDay">
                                    <option cn="从不" en="never" value="x" v-language-option></option>
                                    <option cn="每天" en="everyday" value="*" v-language-option></option>
                                    <option cn="每周一" en="monday" value="1" v-language-option></option>
                                    <option cn="每周二" en="tuesday" value="2" v-language-option></option>
                                    <option cn="每周三" en="wednesday" value="3" v-language-option></option>
                                    <option cn="每周四" en="thursday" value="4" v-language-option></option>
                                    <option cn="每周五" en="friday" value="5" v-language-option></option>
                                    <option cn="每周六" en="saturday" value="6" v-language-option></option>
                                    <option cn="每周日" en="sunday" value="0" v-language-option></option>
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
                                <button type="button" class="btn border-3 btn-primary px-4 me-4" @click="rebootConfirm('是否立即重启系统')"><cn>立即重启</cn><en>Reboot</en></button>
                                <button type="button" class="btn border-3 btn-primary px-4" @click="resetConfirm"><cn>恢复出厂设置</cn><en>Reset default</en></button>
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
                                <div class="lp-align-center">
                                    <bs-switch v-model="exportConfigs.config"></bs-switch>
                                </div>
                                <div class="lp-align-center">
                                    <bs-switch v-model="exportConfigs.defLays"></bs-switch>
                                </div>
                                <div class="lp-align-center">
                                    <bs-switch v-model="exportConfigs.push"></bs-switch>
                                </div>
                                <div class="lp-align-center">
                                    <bs-switch v-model="exportConfigs.passwd"></bs-switch>
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
                                <div class="lp-align-center">
                                    <bs-switch v-model="exportConfigs.record"></bs-switch>
                                </div>
                                <div class="lp-align-center">
                                    <bs-switch v-model="exportConfigs.port"></bs-switch>
                                </div>
                                <div class="lp-align-center">
                                    <bs-switch v-model="exportConfigs.cron"></bs-switch>
                                </div>
                                <div class="lp-align-center">
                                    <bs-switch v-model="exportConfigs.videoBuffer"></bs-switch>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-12 text-center mt-3">
                                <button type="button" class="btn border-3 btn-primary px-4 me-3" @click="exportConf"><cn>导出</cn><en>Export</en></button>
                                <button type="button" class="btn border-3 btn-primary px-4 " @click="importConf"><cn>导入</cn><en>Import</en></button>
                                <input type="file" accept=".zip" style="display:none;" ref="importHandle" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.portCtrl">
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
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.http[0]" readonly disabled>
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.rtsp[0]" readonly disabled>
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.rtmp[0]" readonly disabled>
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.httpts[0]" readonly disabled>
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.telnet[0]" readonly disabled>
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.ssh[0]" readonly disabled>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-3 d-flex align-items-center justify-content-end">
                                        <cn>备用端口</cn>
                                        <en>Reserve port</en>
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.http[1]">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.rtsp[1]">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.rtmp[1]">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy.number="portConf.httpts[1]">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.telnet[1]">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.ssh[1]">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-3 d-flex align-items-center justify-content-end">
                                        <cn>映射(外网)端口</cn>
                                        <en>NAT port</en>
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.http[2]">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.rtsp[2]">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.rtmp[2]">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.httpts[2]">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.telnet[2]">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control text-center" v-model.trim.lazy="portConf.ssh[2]">
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
                                <div class="row my-3">
                                    <div class="col-lg-3 d-flex align-items-center justify-content-end">
                                        <cn>授权码</cn>
                                        <en>Auth code</en>
                                    </div>
                                    <div class="col-lg-3 lp-align-center">
                                        <input type="text" class="form-control" v-model.trim.lazy="helpCode" readonly disabled>
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
                                <div class="row my-3">
                                    <div class="col-lg-3 d-flex align-items-center justify-content-end">
                                        <cn>服务地址</cn>
                                        <en>Server</en>
                                    </div>
                                    <div class="col-lg-5 lp-align-center" v-if="Object.keys(netManagerConf).length > 0">
                                        <input type="text" class="form-control" v-model.trim.lazy="netManagerConf.onlineServer">
                                    </div>
                                    <div class="col-lg-4">
                                        <button type="button" class="btn border-3 btn-primary px-3 me-2" @click="updateNetManagerConf"><cn>保存</cn><en>Save</en></button>
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
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
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
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
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
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
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
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>上传升级</cn>
                                    <en>upload packet</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <button type="button" class="btn border-3 btn-primary px-3 me-2" @click="showBootstrapModal('upload')"><cn>选择文件</cn><en>File</en></button>
                                <button type="button" class="btn border-3 btn-primary px-3" @click="showBootstrapModal('log')"><cn>版本日志</cn><en>Logs</en></button>
                            </div>
                        </div>
                        <div class="row mt-1 mb-4">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>在线升级</cn>
                                    <en>online update</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <loading-button custom-class="btn border-3 btn-primary px-3 me-2 checkUpdate" @button-click="checkUpdatePatch" :had-loading="checkLoading">
                                    <cn>检测更新</cn>
                                    <en>Search</en>
                                </loading-button>
                                <button type="button" class="btn border-3 btn-primary px-3 search-packet checkUpdate" @click="searchUpdatePatch"><i class="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <upload-modal :modal-title="'上传升级包&Upload'" :modal-show="showUploadModal" :modal-fade="true"
                      :upload-allow="['bin']" :upload-action="'/link/upd/uploadPatch.php'" :upload-count="1"
                      :upload-tip="'请把升级包拖动到此处...&Please drag the upgrade package here...'"
                      @upload-success="uploadSuccess" @upload-error="uploadError">
        </upload-modal>

        <logger-modal :modal-size="'modal-lg'" :had-header="false" :had-footer="false" :modal-show="showVerLogModal" :modal-fade="true" :content-class="'logCtx'" :body-class="'logBody'"  >
            <div data-simplebar class="mt-2">
                <div v-for="(item,index) in verLogsConf" :key="index" class="mt-3">
                    <button v-if="index===0" type="button" class="btn-clear close" @click="showBootstrapModal('log')"><i class="fa-solid fa-x"></i></button>
                    <div class="row">
                        <div class="col-lg-10 offset-lg-1">
                            <h3>{{item.version}}</h3>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-lg-10 offset-lg-1">
                            <ul>
                                <li v-for="(it,idx) in item.logs" :key="idx" style="font-size: 14px;white-space:pre-wrap;">{{it}}</li>
                            </ul>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
        </logger-modal>

        <search-modal :modal-title="'固件搜索&Search'" :modal-show="showSearchModal"
                      :confirm-btn-name="'搜索&Search'" :cancel-btn-name="'取消&Cancel'"
                      @confirm-btn-click="searchPatchBySn">
            <div class="row my-3">
                <div class="col-lg-3 offset-lg-1">
                    <div class="snTitle">
                        <cn>固件编号:</cn>
                        <en>Patch Serial:</en>
                    </div>
                </div>
                <div class="col-lg-6">
                    <input class="snInput" v-model.trim.lazy="patchSN" autocomplete="off"/>
                </div>
            </div>
        </search-modal>

        <upgrade-modal v-model:check-upgrade="checkUpgrade" :patch-sn="patchSN" :modal-fade="true"></upgrade-modal>
    </main>
</div>
<?php include ("./public/foot.inc") ?>
<script src="assets/plugins/fileinput/js/fileinput.min.js" type="module"></script>
<script src="assets/plugins/fileinput/js/locales/zh.js" type="module"></script>
<script src="assets/plugins/fileinput/themes/fa6/theme.min.js" type="module"></script>
<script type="module">

    import vue from "./assets/js/vue.build.js";
    import { rpc2,alertMsg,func,queryData,popover,formatDate,rebootConfirm,resetConfirm,clearReactiveObject } from "./assets/js/lp.utils.js";
    import { useHardwareConf,useNetManagerConf,usePasswordConf,useVideoBufferConf,useNtpConf,useTimezoneConf,usePortConf,useVersionConf,useVerLogsConf,useWpaConf,useHelpCodeConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,bootstrapSwitchComponent,languageOptionDirective,uploadModalComponent,upgradeModalComponent,customModalComponent,loadingButtonComponent } from "./assets/js/vue.helper.js"
    import { wifiFlagComponent,antenanFlagComponent } from "./assets/js/vue.flags.js";
    import axios from './assets/plugins/axios/axios.esm.js';
    import JsZip from "./assets/plugins/jszip/jszip.esm.js"
    import * as fileSave from "./assets/plugins/jszip/filesaver.esm.js";
    import mutationObserver from './assets/plugins/polyfill/mutationobserver.esm.js';

    const { createApp,ref,reactive,watch,watchEffect,computed,onMounted } = vue;
    const app = createApp({
        directives:{
            "language-option": languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "wifi-flag": wifiFlagComponent,
            "antenan-flag": antenanFlagComponent,
            "upload-modal": uploadModalComponent,
            "logger-modal": customModalComponent,
            "upgrade-modal": upgradeModalComponent,
            "search-modal": customModalComponent,
            "loading-button": loadingButtonComponent
        },
        setup(props,context) {

            const { hardwareConf } = useHardwareConf();
            const { netManagerConf,updateNetManagerConf } = useNetManagerConf();
            const { wpaConf } = useWpaConf();
            const { updateUserPasswd } = usePasswordConf();
            const { videoBufferConf,updateVideoBufferConf } = useVideoBufferConf();
            const { ntpConf } = useNtpConf();
            const { timezoneConf } = useTimezoneConf();
            const { portConf,updatePortConf } = usePortConf();
            const { helpCode } = useHelpCodeConf();
            const { versionConf } = useVersionConf();
            const { verLogsConf } = useVerLogsConf();
            const { saveAs } = fileSave;

            const state = {
                netAdapter: reactive({}),
                wifiHandler: ref(null),
                wifiPopover: {},
                antenanHandler:ref(null),
                antenanPopover: {},
                flagStroke:ref("#cccccc"),
                flagColor:ref("#777777"),
                wifiRefresh: ref(false),
                wifiList:reactive([]),
                wifiPassword:ref(""),
                wifiConnectId:ref(""),
                sysTime: ref("1970-01-01 08:00:00"),
                timezoneCitys: reactive([]),
                cronDay: ref("never"),
                cronTime: ref("0"),
                importHandle:ref(null),
                userPasswd:reactive({}),
                showPasswd:reactive({}),
                exportConfigs:reactive({}),
                showUploadModal:ref(false),
                showVerLogModal:ref(false),
                showSearchModal:ref(false),
                checkLoading:ref(false),
                checkUpgrade:ref(false),
                patchSN:ref(""),
                macLock:ref(true)
            }

            watch(state.wifiHandler,() => {
                if(state.wifiHandler.value) {
                    if(Object.keys(state.wifiPopover).length > 0) {
                        state.wifiPopover.dispose();
                        state.wifiPopover = {};
                    }
                    state.wifiPopover = popover(state.wifiHandler.value, {
                        placement:"bottom",
                        trigger:"hover",
                        content:`<cn>请先插入USB WIFI网卡</cn><en>Please insert the USB WIFI network card first</en>`,
                    });
                    if(document.querySelector('a[href="#tab1"]'))
                        document.querySelector('a[href="#tab1"]').click();
                } else {
                    if(!state.wifiHandler.value && Object.keys(state.wifiPopover).length !== 0) {
                        state.wifiPopover.dispose();
                        state.wifiPopover = {};
                    }
                }
            })

            watch(state.antenanHandler, () => {
                if(state.antenanHandler.value) {
                    if(Object.keys(state.antenanPopover).length > 0) {
                        state.antenanPopover.dispose();
                        state.antenanPopover = {};
                    }
                    state.antenanPopover = popover(state.antenanHandler.value, {
                        placement:"bottom",
                        trigger:"hover",
                        content:`<cn>请先插入移动网卡</cn><en>Please insert the Cellular network card first</en>`,
                    })
                    if(document.querySelector('a[href="#tab1"]'))
                        document.querySelector('a[href="#tab1"]').click();
                } else {
                    if(!state.antenanHandler.value && Object.keys(state.antenanPopover).length !== 0) {
                        state.antenanPopover.dispose();
                        state.antenanPopover = {};
                    }
                }
            })
            
            watchEffect(()=>{
                if(!state.checkUpgrade.value)
                    state.checkLoading.value = false;

                if(wpaConf.length > 0 && state.wifiConnectId.value === "") {
                    state.wifiConnectId.value = wpaConf[0].ssid
                    state.wifiPassword.value = wpaConf[0].psk;
                }

                if(Object.keys(timezoneConf).length > 0 && state.timezoneCitys.length === 0)
                    onTimeAreaChange();
            })

            const getAdapterNetState = () => {
                rpc2("net.getState").then(data => {
                    clearReactiveObject(state.netAdapter);
                    Object.assign(state.netAdapter,data.interface);
                });
                setTimeout(getAdapterNetState,2000);
            }

            const handleSysScene = computed(()=>{
                return Object.keys(videoBufferConf).filter((item,index)=>{
                    return item !== "used";
                })
            });

            const updateDefNetwork = (dev) => {
                updateNetManagerConf().then(()=>{
                    if(dev === netManagerConf["gw"])
                        setTimeout(() => window.location.href="http://"+netManagerConf["interface"][dev]["ip"]+"/sys.php",1000)
                })
            }

            const enableWifi = state => {
                updateNetManagerConf("noTip").then(()=>{
                    if(state)
                        alertMsg('<cn>WIFI已启用</cn><en>WIFI enable successfully!</en>', 'success');
                    else
                        alertMsg('<cn>WIFI已关闭</cn><en>WIFI disable successfully!</en>', 'success');
                })
            }

            const refreshWifi = (tip = 'loading',refresh = true) => {
                const scanwifi = type => {
                    rpc2("net.scanWifi",[refresh]).then(data => {
                        if(data.length === 0)
                            data.push({ssid:state.wifiConnectId});
                        state.wifiList.splice(0, state.wifiList.length, ...data);
                        state.wifiRefresh.value = false;
                    })
                }
                if(tip === "noLoading") {
                    scanwifi(refresh);
                    return;
                }
                state.wifiRefresh.value = true;
                setTimeout(scanwifi,2000);
            }

            const connectWifi = () => {
                state.wifiPassword.value = state.wifiPassword.value.replace(/\s/g, '');
                if(state.wifiPassword.value.length < 8) {
                    alertMsg('<cn>WIFI密码格式错误，密码长度不能少于8位</cn><en>The wifi password format is wrong. The password length cannot be less than 8 characters!</en>', 'error');
                    return;
                }
                rpc2("net.setSimpleWifi", [state.wifiConnectId.value,state.wifiPassword.value]).then(data => {
                    if(data)
                        alertMsg('<cn>设置成功，如果长时间处于连接状态，请检查wifi密码是否正确</cn><en>The setting is successful. If you are connected for a long time, please check whether the wifi password is correct</en>', 'success');
                    else
                        alertMsg('<cn>设置失败</cn><en>Save failed!</en>', 'error');
                });
            }

            const formatNetSpeed = speed => {
                if (speed < 1024) {
                    return speed + " kb/s";
                } else {
                    const formattedSpeed = parseFloat(speed / 1024).toFixed(1);
                    return formattedSpeed.replace(/\.0$/, '') + " mb/s";
                }
            }

            const syncTimeFromPc = () => {
                let time1 = formatDate("yyyy/MM/dd/hh/mm/ss");
                let time2 = formatDate("yyyy-MM-dd hh:mm:ss");
                func("/system/setSystemTime",{time1:time1,time2:time2}).then((data)=>{
                    if(data.status === "success") {
                        alertMsg('<cn>时间同步成功</cn><en>system time synchronization successful!</en>', 'success');
                        state.sysTime.value = time2;
                    }
                })
            }

            const onTimeAreaChange = (evt) => {
                queryData("/timezone/zoneinfo/"+timezoneConf.timeArea+"/").then(data=>{
                    state.timezoneCitys.splice(0, state.timezoneCitys.length, ...data);
                    if(evt !== undefined)
                        timezoneConf.timeCity = state.timezoneCitys[0].name;
                })
            }

            const saveSysConf = () => {
                Promise.all([
                    func("/conf/updateNtpConf", ntpConf),
                    func("/conf/updateTimezoneConf", timezoneConf),
                    func("/system/setSystemCrontab", { day: state.cronDay.value, time: state.cronTime.value }),
                ]).then((results) => {
                    if(results.every(ret => typeof ret === "boolean" ? ret : (ret?.status === "success")))
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                    else
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                })
            }

            const exportConf = () => {
                let confs = ["lang.json"];
                for(let i=0;i<Object.keys(state.exportConfigs).length;i++) {
                    let path = Object.keys(state.exportConfigs)[i];
                    if(state.exportConfigs[path]) {
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

                const promiseArray = confs.map((conf) => {
                    return queryData("config/" + conf, { responseType: 'blob' }).then(data => ({ name: conf, data })).catch(error => "");
                });

                Promise.all(promiseArray)
                    .then((results) => {
                        const zip = new JsZip();
                        results.forEach(({ name, data }) => {
                            zip.file(name, data, { binary: true });
                        });

                        if (Object.keys(zip.files).length > 0) {
                            return zip.generateAsync({ type: 'blob' });
                        } else {
                            throw new Error('下载全部失败');
                        }
                    })
                    .then(blob => {
                        saveAs(blob, 'configs.zip');
                    })
                    .catch(error => {
                        console.error("下载全部失败");
                    });
            }

            const importConf = () =>{
                state.importHandle.value.click();
                state.importHandle.value.addEventListener('change', event => {
                    let data = new FormData();
                    let file=event.target.files[0];
                    let name=file.name;
                    data.append("file",file);
                    data.append("name",name);
                    axios({
                        url: '/link/upd/uploadConf.php',
                        method: 'post',
                        data: data,
                        responseType: 'json',
                        headers: {'Content-Type': 'multipart/form-data'}
                    }).then(response => {
                        if (response.data.isSuccess) {
                            alertMsg('<cn>导入成功</cn><en>Import success</en>！','success');
                        } else {
                            alertMsg('<cn>导入失败</cn><en>Import faild</en>！','error');
                        }
                    })
                    .catch(error => {
                        console.error('请求发生错误:', error);
                    });
                });
            }

            const startHelp = () => {
                helpCode.value = Math.floor(Math.random()*1000);
                func("/system/startHelp",{helpCode: helpCode.value}).then((data)=>{
                    if(data.status === "success")
                        alertMsg('<cn>连接成功，请向客服提供授权码以便控制您的编码器。</cn><en>Connect success, please provide auth code to customer service to control your encoder!</en>', 'success');
                })
            }

            const stopHelp = () => {
                func("/system/stopHelp").then((data)=>{
                    if(data.status === "success") {
                        helpCode.value = "";
                        alertMsg('<cn>已断开连接</cn><en>Disconnect success</en>', 'success');
                    }
                })
            }

            const systemNetTest = () => {
                func("/system/systemNetTest",netManagerConf.onlineServer).then(data => {
                    const str = data.data.join();
                    if(str === "")
                        alertMsg('<cn>域名解析超时</cn><en>DNS timeout</en>!', 'error');
                    else if(str.indexOf(" 0%")>0)
                        alertMsg('<cn>网络可用</cn><en>Network available</en>！', 'success');
                    else
                        alertMsg('<cn>网络不可用</cn><en>Network Unavailable</en>！', 'error');
                })
            }

            const showBootstrapModal = type => {
                if(type === "upload")
                    state.showUploadModal.value = !state.showUploadModal.value;
                if(type === "log")
                    state.showVerLogModal.value = !state.showVerLogModal.value;
            }

            const uploadSuccess = data => {
                const response = data.response;
                if(response.upload === "0")
                    rebootConfirm("上传成功，是否立即重启系统完成更新?");
                if(response.upload === "-1")
                    alertMsg("<cn>上传失败,升级包机型不匹配！</cn><en>Upload failed, upgrade package model does not match!</en>","error");
                if(response.upload === "-2")
                    alertMsg("<cn>上传失败,升级包与系统版本不匹配！</cn><en>Upload failed, the upgrade package does not match the system versio!</en>","error");
            }

            const uploadError = errMsg => {
                alertMsg(errMsg, 'error');
            }

            const checkUpdatePatch = () => {
                state.patchSN.value = "";
                state.checkLoading.value = true;
                setTimeout(()=>{
                    state.checkUpgrade.value = true;
                },1000)
            }

            const searchUpdatePatch = () => {
                state.showSearchModal.value = !state.showSearchModal.value;
            }

            const searchPatchBySn = () => {
                if(state.patchSN.value === "") {
                    alertMsg("<cn>请输入固件编号</cn><en>Please enter the patch sn.</en>", "error");
                    return;
                }
                state.checkUpgrade.value = true;
                state.showSearchModal.value = false;
            }

            const updateRenderData = () => {
                Object.assign(state.userPasswd,{oldpwd: '',newpwd: '',confirm: ''});
                Object.assign(state.showPasswd,{wifipwd: false,oldpwd: false,newpwd: false,confirm: false});
                Object.assign(state.exportConfigs,{config: true,defLays: false,push: false,
                    record: false,port: false,passwd: false,videoBuffer: true,cron: true
                });
            }

            const getSysAbortTime = () => {
                func("/system/getSystemTime").then(result => {
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

                func("/system/getSystemCrontab").then(result => {
                    if ( result.data === null || result.data.split( " " ).length !== 6 ) {
                        state.cronDay.value = "x";
                        state.cronTime.value = "0";
                    } else {
                        state.cronTime.value = result.data.split( " " )[ 1 ];
                        state.cronDay.value = result.data.split( " " )[ 4 ];
                    }
                });
            }

            const onListenThemeChange = () => {
                const html = document.querySelector('html');
                const updateFlagColor = () => {
                    const theme = html.getAttribute("data-bs-theme");
                    if(theme === 'default') {
                        state.flagStroke.value = "#cccccc";
                        state.flagColor.value = "#777777";
                    } else {
                        state.flagStroke.value = "#777777";
                        state.flagColor.value = "#cccccc";
                    }
                }
                updateFlagColor();
                const observer = new mutationObserver(mutations => {
                    mutations.forEach(mutation => {
                        if (mutation.type === 'attributes' && mutation.attributeName === "data-bs-theme") {
                            updateFlagColor();
                        }
                    });
                });
                const config = {
                    attributes: true,
                    attributeFilter: ["data-bs-theme"],
                    subtree: false
                };
                observer.observe(html, config);
            }

            onMounted(()=>{
                updateRenderData();
                getSysAbortTime();
                getAdapterNetState();
                refreshWifi("noLoading",false);
                onListenThemeChange();
            })

            return {...state,hardwareConf,netManagerConf,videoBufferConf,ntpConf,timezoneConf,portConf,helpCode,versionConf,verLogsConf,
                enableWifi,refreshWifi,connectWifi,updateNetManagerConf,handleSysScene, updateUserPasswd,updateVideoBufferConf,updateDefNetwork,
                updatePortConf,showBootstrapModal,formatNetSpeed, uploadSuccess,uploadError,rebootConfirm,resetConfirm, onTimeAreaChange,
                syncTimeFromPc,saveSysConf,exportConf,importConf,startHelp,stopHelp, systemNetTest,checkUpdatePatch,searchUpdatePatch,searchPatchBySn}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>