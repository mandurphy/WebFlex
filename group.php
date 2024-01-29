<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content group" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>群组列表</cn>
                                <en>Group list</en>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="row">
                                        <div class="col-lg-2 lp-align-center">
                                            <strong>
                                                <cn>本机分组ID</cn>
                                                <en>Group ID</en>
                                            </strong>
                                        </div>
                                        <div class="col-lg-3">
                                            <select v-if="Object.keys(groupConf).length > 0" class="form-select" v-model.number="groupConf.groupId">
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-7 p-0">
                                            <button type="button" class="btn btn-primary border-3 me-2" @click="saveGroupConf">
                                                <cn>保存</cn>
                                                <en>Save</en>
                                            </button>
                                            <button type="button" class="btn btn-primary border-3 me-2" @click="refreshGroupList">
                                                <cn>同分组搜索</cn>
                                                <en>Search again</en>
                                            </button>
                                            <button type="button" class="btn btn-primary border-3" @click="showConfModal=!showConfModal">
                                                <cn>同步配置</cn>
                                                <en>Sync config</en>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="mt-3">
                            <table class="table table-striped mt-2">
                                <thead>
                                    <tr>
                                        <th class="text-center">
                                            <cn>序号</cn>
                                            <en>Num</en>
                                        </th>
                                        <th class="text-center"> IP </th>
                                        <th class="text-center"> Mac </th>
                                        <th class="text-center">
                                            <cn>设备型号</cn>
                                            <en>Device</en>
                                        </th>
                                        <th class="text-center">
                                            <cn>软件版本</cn>
                                            <en>Version</en>
                                        </th>
                                        <th class="text-center">
                                            <cn>频道</cn>
                                            <en>Channels</en>
                                        </th>
                                        <th class="text-center">
                                            <cn>操作</cn>
                                            <en>Operation</en>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in groupList" :key="index">
                                        <td class="text-center">{{index+1}}</td>
                                        <td class="text-center">{{item.ip}}</td>
                                        <td class="text-center">{{item.mac}}</td>
                                        <td>{{item.type}}</td>
                                        <td>
                                            <div class="row" v-for="(it,idx) in Object.keys(item.version)" :key="idx">
                                                <div class="col-lg-10 p-0">
<!--                                                    <label class="text-truncate lp-align-right monospace">-->
<!--                                                        {{it+'_'+item.version[it].split('_')[0]}}-->
<!--                                                    </label>-->
                                                    <label class="text-truncate lp-align-right">
                                                        <span v-if="it==='app'">{{it}}</span>
                                                        <span v-if="it==='sdk'" style="letter-spacing: 0.05rem">{{it}}</span>
                                                        <span v-if="it==='sys'" style="letter-spacing: 0.1rem">{{it}}</span>
                                                        <span>{{'_'+item.version[it].split('_')[0]}}</span>
                                                    </label>

                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row" v-for="(it,idx) in splitArray(item.info,4)" :key="idx">
                                                <div class="col-lg-12">
                                                    <label class="text-truncate">
                                                        {{it.join(' ,')}}
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col-lg-12 text-center">
                                                    <button class="btn btn-primary border-2 me-2" @click="changeDevNetwork(item.mac)">
                                                        <i class="fa-solid fa-network-wired"></i>
                                                    </button>
                                                    <button class="btn btn-primary border-2 me-2" @click="openDevUrl(item.ip)">
                                                        <i class="fa-brands fa-internet-explorer"></i>
                                                    </button>
                                                    <button class="btn btn-primary border-2" @click="rebootDev(item.mac)">
                                                        <i class="fa-solid fa-power-off"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>频道表汇总</cn>
                                <en>Channel collect</en>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="row">
                                        <div class="col-lg-11 offset-lg-1 p-0">
                                            <button type="button" class="btn btn-primary border-3 mx-2" @click="getEPG">
                                                <cn>汇总</cn>
                                                <en>Collect</en>
                                            </button>
                                            <button type="button" class="btn btn-primary border-3 me-2" @click="createEPG">
                                                <cn>生成节目单</cn>
                                                <en>Create EPG</en>
                                            </button>
                                            <button type="button" class="btn btn-primary border-3 me-2" @click="showSyncModal('epg')">
                                                <cn>同步节目单</cn>
                                                <en>Sync EPG</en>
                                            </button>
                                            <button type="button" class="btn btn-primary border-3" @click="showEPG">
                                                <cn>查看节目单</cn>
                                                <en>Show EPG</en>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="mt-3">
                            <table class="table table-striped mt-2">
                                <thead>
                                <tr>
                                    <th class="text-center">
                                        <cn>序号</cn>
                                        <en>Num</en>
                                    </th>
                                    <th class="text-center">
                                        <cn>频道名称</cn>
                                        <en>Channel name</en>
                                    </th>
                                    <th class="text-center">
                                        <cn>URL</cn>
                                        <en>URL</en>
                                    </th>
                                    <th class="text-center">
                                        <cn>排序</cn>
                                        <en>Sequence</en>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="epgList.length > 0" v-for="(item,index) in epgList" :key="index">
                                        <td class="text-center">{{index+1}}</td>
                                        <td class="text-center">{{item.name}}</td>
                                        <td class="text-center">{{item.url}}</td>
                                        <td>
                                            <div class="row">
                                                <div class="col-lg-12 text-center">
                                                    <button type="button" class="btn btn-primary border-3 me-2" @click="epgSwap(index,'top')">
                                                        <cn>置顶</cn>
                                                        <en>Top</en>
                                                    </button>
                                                    <button type="button" class="btn btn-primary border-3 px-3 me-2" @click="epgSwap(index,'up')">
                                                        <i class="fa-solid fa-arrow-up"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-primary border-3 px-3 me-2" @click="epgSwap(index,'down')">
                                                        <i class="fa-solid fa-arrow-down"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-primary border-3" @click="epgSwap(index,'buttom')">
                                                        <cn>置底</cn>
                                                        <en>Button</en>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <group-modal :modal-title="'群组设置同步&Group config sync'" :modal-show="showGroupModal"
                         :confirm-btn-name="'同步&Sync'" :modal-size="'modal-lg'" @confirm-btn-click="syncGroupEPG" @modal-visible="groupModalVisible">
                <table class="table table-striped mt-2">
                    <thead>
                    <tr>
                        <th class="text-center">
                            <cn>IP</cn>
                            <en>IP</en>
                        </th>
                        <th class="text-center">
                            <cn>设备型号</cn>
                            <en>Device</en>
                        </th>
                        <th class="text-center">
                            <cn>Mac</cn>
                            <en>Mac</en>
                        </th>
                        <th class="text-center">
                            <cn>Status</cn>
                            <en>Status</en>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-if="groupList.length > 0" v-for="(item,index) in groupList" :key="index">
                            <td class="text-center">{{item.ip}}</td>
                            <td class="text-center">{{item.type}}</td>
                            <td class="text-center">{{item.mac}}</td>
                            <td class="text-center">
                                <i v-if="!item.status || item.status === 0" class="fa-solid fa-ellipsis"></i>
                                <i v-if="item.status === 1" class="fa-solid text-success fa-check"></i>
                                <i v-if="item.status === 2" class="fa-solid text-danger fa-xmark"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </group-modal>
            <conf-modal :modal-title="'参数设置&Config'" :modal-show="showConfModal" :had-footer="false"
                         :confirm-btn-name="'同步配置&Sync config'" :modal-size="'modal-xl'" @confirm-btn-click="showGroupModal =! showGroupModal">
                <div class="row">
                    <div class="col-lg-12" v-if="Object.keys(globalConf).length !== 0">
                        <div class="row">
                            <div class="col-1"></div>
                            <div class="col-11">
                                <div class="row">
                                    <div class="col-2 text-center">
                                        <cn>分辨率</cn>
                                        <en>video size</en>
                                    </div>
                                    <div class="col-2 text-center">
                                        <cn>编码方式</cn>
                                        <en>codec</en>
                                    </div>
                                    <div class="col text-center">
                                        <cn>码率控制</cn>
                                        <en>rate control</en>
                                    </div>
                                    <div class="col text-center">
                                        <cn>码率(kb/s)</cn>
                                        <en>bitrate(kb/s)</en>
                                    </div>
                                    <div class="col text-center">
                                        <cn>帧率</cn>
                                        <en>framerate</en>
                                    </div>
                                    <div class="col text-center">
                                        <cn>GOP(秒)</cn>
                                        <en>GOP(sec)</en>
                                    </div>
                                    <div class="col text-center">
                                        <cn>帧同步</cn>
                                        <en>Sync</en>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-1 text-center p-0 pt-2">
                                <cn>主流参数</cn>
                                <en>Main stream</en>
                            </div>
                            <div class="col-11">
                                <div class="row">
                                    <div class="col-2">
                                        <multiple-select v-model:value1="globalConf.encv.width" v-model:value2="globalConf.encv.height" split="x">
                                            <option value="-1x-1">auto</option>
                                            <option v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.capability.encode.maxSize === '4k'" value="3840x2160">4K</option>
                                            <option value="1920x1080">1080p</option>
                                            <option value="1280x720">720p</option>
                                            <option value="640x360">360p</option>
                                            <option value="1080x1920">1080x1920</option>
                                            <option value="720x1280">720x1280</option>
                                            <option value="360x640">360x640</option>
                                        </multiple-select>
                                    </div>
                                    <div class="col-2">
                                        <multiple-select v-model:value1="globalConf.encv.codec" v-model:value2="globalConf.encv.profile" split=",">
                                            <option value="h264,base">H.264 Base</option>
                                            <option value="h264,main">H.264 Main</option>
                                            <option value="h264,high">H.264 High</option>
                                            <option value="h265,main">H.265 Main</option>
                                            <option value="close,base">Close</option>
                                        </multiple-select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="globalConf.encv.rcmode">
                                            <option value="cbr">CBR</option>
                                            <option value="vbr">VBR</option>
                                            <option value="avbr">AVBR</option>
                                            <option value="fixqp">FIXQP</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="globalConf.encv.bitrate">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="globalConf.encv.framerate">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="globalConf.encv.gop">
                                    </div>
                                    <div class="col">
                                        <multiple-select v-model:value1="globalConf.encv.syncTS" v-model:value2="globalConf.encv.syncTSMode" split=",">
                                            <option cn="芯象" en="Sinsam" value="true,sinsam" v-language-option></option>
                                            <option cn="简易" en="Normal" value="true,linkpi" v-language-option></option>
                                            <option cn="关闭" en="Close" value="false,linkpi" v-language-option></option>
                                        </multiple-select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-1 text-center p-0 pt-2">
                                <cn>辅流参数</cn>
                                <en>Sub stream</en>
                            </div>
                            <div class="col-11">
                                <div class="row">
                                    <div class="col-2">
                                        <multiple-select v-model:value1="globalConf.encv2.width" v-model:value2="globalConf.encv2.height" split="x">
                                            <option value="-1x-1">auto</option>
                                            <option v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.capability.encode.maxSize === '4k'" value="3840x2160">4K</option>
                                            <option value="1920x1080">1080p</option>
                                            <option value="1280x720">720p</option>
                                            <option value="640x360">360p</option>
                                            <option value="1080x1920">1080x1920</option>
                                            <option value="720x1280">720x1280</option>
                                            <option value="360x640">360x640</option>
                                        </multiple-select>
                                    </div>
                                    <div class="col-2">
                                        <multiple-select v-model:value1="globalConf.encv2.codec" v-model:value2="globalConf.encv2.profile" split=",">
                                            <option value="h264,base">H.264 Base</option>
                                            <option value="h264,main">H.264 Main</option>
                                            <option value="h264,high">H.264 High</option>
                                            <option value="h265,main">H.265 Main</option>
                                            <option value="close,base">Close</option>
                                        </multiple-select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="globalConf.encv2.rcmode">
                                            <option value="cbr">CBR</option>
                                            <option value="vbr">VBR</option>
                                            <option value="avbr">AVBR</option>
                                            <option value="fixqp">FIXQP</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="globalConf.encv2.bitrate">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="globalConf.encv2.framerate">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="globalConf.encv2.gop">
                                    </div>
                                    <div class="col">
                                        <multiple-select v-model:value1="globalConf.encv2.syncTS" v-model:value2="globalConf.encv2.syncTSMode" split=",">
                                            <option cn="芯象" en="Sinsam" value="true,sinsam" v-language-option></option>
                                            <option cn="简易" en="Normal" value="true,linkpi" v-language-option></option>
                                            <option cn="关闭" en="Close" value="false,linkpi" v-language-option></option>
                                        </multiple-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr >
                        <div class="row">
                            <div class="col-1"></div>
                            <div class="col-11">
                                <div class="row">
                                    <div class="col-2 text-center">
                                        <cn>编码格式</cn>
                                        <en>codec</en>
                                    </div>
                                    <div class="col-2 text-center">
                                        <cn>音源</cn>
                                        <en>source</en>
                                    </div>
                                    <div class="col-2 text-center">
                                        <cn>增益</cn>
                                        <en>gain</en>
                                    </div>
                                    <div class="col-2 text-center">
                                        <cn>采样率</cn>
                                        <en>samplerate</en>
                                    </div>
                                    <div class="col-2 text-center">
                                        <cn>声道</cn>
                                        <en>channels</en>
                                    </div>
                                    <div class="col-2 text-center">
                                        <cn>码率(kb/s)</cn>
                                        <en>bitrate(kb/s)</en>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-1 text-center p-0 pt-2">
                                <cn>音频参数</cn>
                                <en>Audio config</en>
                            </div>
                            <div class="col-11">
                                <div class="row">
                                    <div class="col">
                                        <select class="form-select" v-model="globalConf.enca.codec">
                                            <option value="aac">AAC</option>
                                            <option value="pcma">PCMA</option>
                                            <option value="mp2">MPEG2</option>
                                            <option value="mp3">MP3</option>
                                            <option value="close" cn="关闭" en="close" v-language-option></option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="globalConf.enca.audioSrc">
                                            <option value="source">Default</option>
                                            <option v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.line" value="line">Line</option>
                                            <option v-for="(item,index) in defaultConf" :key="index" :value="item.id">{{item.name}}</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="globalConf.enca.gain">
                                            <option value="24">+24dB</option>
                                            <option value="18">+18dB</option>
                                            <option value="12">+12dB</option>
                                            <option value="6">+6dB</option>
                                            <option value="0">+0dB</option>
                                            <option value="-6">-6dB</option>
                                            <option value="-12">-12dB</option>
                                            <option value="-18">-18dB</option>
                                            <option value="-24">-24dB</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="globalConf.enca.samplerate">
                                            <option value="-1">auto</option>
                                            <option value="16000">16K</option>
                                            <option value="32000">32K</option>
                                            <option value="44100">44.1K</option>
                                            <option value="48000">48K</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="globalConf.enca.channels">
                                            <option cn="单声道" en="mono" value="1" v-language-option></option>
                                            <option cn="立体声" en="stereo" value="2" v-language-option></option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="globalConf.enca.bitrate">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr >
                        <div class="row text-center mt-3">
                            <div class="col-lg-12">
                                <button type="button" class="btn  border-3 btn-primary me-2" @click="showSyncModal('enc')">
                                    <cn>应用到群组</cn>
                                    <en>Apply to all</en>
                                </button>
                            </div>
                        </div>
                        <hr class="my-4">
                        <div class="row">
                            <div class="col-lg-12" v-if="Object.keys(globalConf).length !== 0">
                                <div class="row">
                                    <div class="col"></div>
                                    <div class="col text-center">
                                        HTTP
                                    </div>
                                    <div v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.hls" class="col text-center">
                                        HLS
                                    </div>
                                    <div class="col text-center">
                                        RTMP
                                    </div>
                                    <div class="col text-center">
                                        RTSP
                                    </div>
                                    <div class="col text-center">
                                        <cn>组播</cn>
                                        <en>multicast</en>
                                    </div>
                                    <div class="col-2 text-center">
                                        <cn>组播地址</cn>
                                        <en>multicast addr</en>
                                    </div>
                                    <div class="col text-center">
                                        <cn>推流</cn>
                                        <en>push</en>
                                    </div>
                                    <div class="col"></div>
                                </div>
                                <div class="row mt-1">
                                    <div class="col text-center p-0 pt-2">
                                        <cn>主流协议</cn>
                                        <en>Main protocol</en>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="globalConf.stream.http" ></bs-switch>
                                    </div>
                                    <div v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.hls" class="col lp-align-center">
                                        <bs-switch v-model="globalConf.stream.hls" ></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="globalConf.stream.rtmp" ></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="globalConf.stream.rtsp.enable" ></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="globalConf.stream.udp.enable" ></bs-switch>
                                    </div>
                                    <div class="col-2">
                                        <multiple-input type="text" class="form-control" v-model:value1="globalConf.stream.udp.ip" v-model:value2="globalConf.stream.udp.port" split=":"></multiple-input>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="globalConf.stream.push.enable" ></bs-switch>
                                    </div>
                                    <div class="col"></div>
                                </div>

                                <div class="row mt-2">
                                    <div class="col text-center p-0 pt-2">
                                        <cn>辅流协议</cn>
                                        <en>Sub protocol</en>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="globalConf.stream2.http" ></bs-switch>
                                    </div>
                                    <div v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.hls" class="col lp-align-center">
                                        <bs-switch v-model="globalConf.stream2.hls" ></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="globalConf.stream2.rtmp" ></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="globalConf.stream2.rtsp.enable" ></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="globalConf.stream2.udp.enable" ></bs-switch>
                                    </div>
                                    <div class="col-2">
                                        <multiple-input type="text" class="form-control" v-model:value1="globalConf.stream2.udp.ip" v-model:value2="globalConf.stream2.udp.port" split=":"></multiple-input>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="globalConf.stream2.push.enable" ></bs-switch>
                                    </div>
                                    <div class="col"></div>
                                </div>
                                <hr class="mt-3 mb-5">
                                <div class="row text-center">
                                    <div class="col-lg-12">
                                        <button type="button" class="btn  border-3 btn-primary me-2" @click="showSyncModal('stream')">
                                            <cn>应用到群组</cn>
                                            <en>Apply to all</en>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </conf-modal>
        </main>
    </div>
<?php include ("./public/foot.inc") ?>

<script type="module">
    import {rpc, alertMsg, splitArray, confirm, clearReactiveArray, isEmpty, deepCopy} from "./assets/js/lp.utils.js";
    import { useDefaultConf,useGroupConf,useHardwareConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,multipleSelectComponent,multipleInputComponent,
        languageOptionDirective,bootstrapSwitchComponent,customModalComponent } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watch,onMounted,nextTick} = vue;
    const app = createApp({
        directives:{
            "language-option": languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "multiple-select": multipleSelectComponent,
            "multiple-input": multipleInputComponent,
            "group-modal":customModalComponent,
            "conf-modal":customModalComponent
        },
        setup(props,context) {

            const { defaultConf } = useDefaultConf();
            const { groupConf,updateGroupConf } = useGroupConf();
            const { hardwareConf } = useHardwareConf();

            const state = {
                groupList: reactive([]),
                intervalId: ref(-1),
                epgList: reactive([]),
                showGroupModal: ref(false),
                showConfModal: ref(false),
                syncType:ref(""),
                globalConf: reactive({})
            }

            const unwatch = watch(defaultConf, (value) => {
                Object.assign(state.globalConf, defaultConf[0]);
                state.globalConf.stream.udp.port += "+";
                state.globalConf.stream2.udp.port += "+";
                unwatch();
            });

            const getGroupList = () => {
                rpc("group.getList").then( data => {
                    state.groupList.splice(0);
                    state.groupList.push(...data);
                } );
                setTimeout(getGroupList,3000);
            }

            const refreshGroupList = () => {
                rpc("group.clearMember")
                        .then(result => {
                            return new Promise((resolve,reject) => {
                                if(result)
                                    resolve();
                                else
                                    reject();
                            });
                        })
                        .then(()=>{
                            clearInterval(state.intervalId.value);
                            let count = 0;
                            state.intervalId.value = setInterval(()=>{
                                rpc("group.getList").then( data => {
                                    count++;
                                    clearReactiveArray(state.groupList);
                                    state.groupList.push(...data);
                                    if(count === 10)
                                        clearInterval(state.intervalId.value);
                                } );
                            },1000);
                        });
            }

            const saveGroupConf = () => {
                updateGroupConf().then(()=>{
                    clearInterval(state.intervalId.value);
                })
            }

            const changeDevNetwork = async mac => {
                const network = await rpc("group.callGetNetwork",[mac]);
                const jc = confirm({
                    title: '<cn>网络设置</cn><en>Layout</en>',
                    content: `<div class="row mt-3">
                                  <div class="col-lg-4 text-center">
                                      <cn>IP</cn>
                                      <en>IP</en>
                                  </div>
                                  <div class="col-lg-7">
                                      <input type="text" class="form-control" id="net_ipaddr">
                                  </div>
                              </div>
                              <div class="row mt-3">
                                  <div class="col-lg-4 text-center">
                                      <cn>掩码</cn>
                                      <en>Mask</en>
                                  </div>
                                  <div class="col-lg-7">
                                      <input type="text" class="form-control" id="net_mask">
                                  </div>
                              </div>
                              <div class="row mt-3">
                                  <div class="col-lg-4 text-center">
                                      <cn>网关</cn>
                                      <en>Gateway</en>
                                  </div>
                                  <div class="col-lg-7">
                                      <input type="text" class="form-control" id="net_gateway">
                                  </div>
                              </div>`,
                    buttons: {
                        ok: {
                            text: "<cn>保存</cn><en>Confirm</en>",
                            btnClass: 'btn-primary',
                            keys: ['enter'],
                            action: () => {
                                network.ip = document.querySelector('#net_ipaddr').value;
                                network.mask = document.querySelector('#net_mask').value;
                                network.gateway = document.querySelector('#net_gateway').value;
                                rpc( "group.callSetNetwork", [mac, network]).then(ret => {
                                    if(ret) {
                                        jc.close();
                                        alertMsg("<cn>设置成功</cn><en>Setting successfully</en>","success");
                                        return;
                                    }
                                    alertMsg("<cn>设置失败</cn><en>Setting failed</en>","success");
                                });
                                return false;
                            }
                        },
                        cancel: {
                            text: "<cn>取消</cn><en>Cancel</en>",
                            action: () => {}
                        }
                    },
                    onOpenBefore:()=>{
                        document.querySelector('#net_ipaddr').value = network.ip;
                        document.querySelector('#net_mask').value = network.mask;
                        document.querySelector('#net_gateway').value = network.gateway;
                    }
                });
            }

            const openDevUrl = ipAddr => {
               window.open("http://"+ipAddr+"/");
            }

            const rebootDev = mac => {
                confirm( {
                    title: '<cn>重启</cn><en>Reboot</en>',
                    content: '<cn>是否立即重启系统？</cn><en>Reboot immediately?</en>',
                    buttons: {
                        ok: {
                            text: "<cn>确认重启</cn><en>Confirm</en>",
                            btnClass: 'btn-primary',
                            keys: [ 'enter' ],
                            action: () => rpc( "group.callReboot", [mac])
                        },
                        cancel: {
                            text: "<cn>取消</cn><en>Cancel</en>",
                            action: () => { }
                        }
                    }
                } );
            }

            const getEPG = () => {
                rpc("group.callGetEPG").then(data => {
                    clearReactiveArray(state.epgList);
                    state.epgList.push(...data);
                });
            }

            const epgSwap = (index,type) => {
                if(type === "top") {
                    const item = state.epgList.splice(index, 1)[0];
                    state.epgList.unshift(item);
                }

                if(type === "up") {
                    if(index > 0) {
                        const item = state.epgList.splice(index, 1)[0];
                        state.epgList.splice(index - 1, 0, item);
                    }
                }

                if(type === "down") {
                    if (index < state.epgList.length - 1) {
                        const item = state.epgList.splice(index, 1)[0];
                        state.epgList.splice(index + 1, 0, item);
                    }
                }

                if(type === "buttom") {
                    const item = state.epgList.splice(index, 1)[0];
                    state.epgList.push(item);
                }

                rpc("group.orderEPG", [state.epgList]).then( data => {
                    console.log(data,"#######");
                    // clearReactiveArray(state.epgList);
                    // state.epgList.push(...data);
                } );
            }

            const createEPG = () => {
                rpc("group.createEPG").then( data => {
                    if(data)
                        alertMsg("<cn>生成节目单成功</cn><en>Create EPG success</en>","success");
                } );
            }

            const showEPG = () => window.open("config/epg.json")

            const showSyncModal = type =>{
                state.syncType.value = type;
                state.groupList.forEach(item => item.status = 0);
                state.showGroupModal.value = !state.showGroupModal.value;
            }

            const updateMulticastAddress = (address, increment) => {
                let parts = address.split(".");
                for (let i = parts.length - 1; i >= 0; i--) {
                    let num = parseInt(parts[i]);
                    num += increment;
                    if (num > 255) {
                        parts[i] = num % 256;
                        increment = Math.floor(num / 256);
                    } else {
                        parts[i] = num;
                        break;
                    }
                }
                return parts.join(".");
            }

            const syncGroupEPG = () => {
                state.groupList.forEach(item => item.status = 0);
                state.groupList.forEach((item,index) => {
                    setTimeout(()=> {
                        if(state.syncType.value === 'epg') {
                            rpc("group.callSyncEPG", [item.mac]).then(ret => {
                                //item.status = ret ? 1 : 2;
                                item.status = 1;
                            });
                        }

                        if(state.syncType.value === 'enc') {
                            rpc("group.callSetEncode", [item.mac, state.globalConf]).then( ret => {
                                //item.status = ret ? 1 : 2;
                                item.status = 1;
                            });
                        }

                        if(state.syncType.value === 'stream') {
                            const conf = deepCopy(state.globalConf);
                            const streams = ['stream', 'stream2'];
                            streams.forEach((stream) => {
                                delete conf[stream].suffix;
                                if (conf[stream].udp.ip.includes("+")) {
                                    let ip = conf[stream].udp.ip.replace(/[+\s]/g, '');
                                    ip = updateMulticastAddress(ip, index * 20);
                                    conf[stream].udp.ip = ip;
                                }
                                if (conf[stream].udp.port.includes("+")) {
                                    let port = Number(conf[stream].udp.port.replace(/[+\s]/g, ''));
                                    conf[stream].udp.port = isNaN(port) ? (3000 + index * 20) : (port + index * 20);
                                    conf[stream].udp.port += "+";
                                }
                            });
                            rpc("group.callSetStream", [item.mac, {"cfg": conf.stream, "cfg2": conf.stream2}]).then(ret => {
                                //item.status = ret ? 1 : 2;
                                item.status = 1;
                            });
                        }

                    },index*300)
                });
            }

            const groupModalVisible = visible => {
                if(isEmpty(state.syncType.value) || state.syncType.value === "epg")
                    return;
                state.showConfModal.value = !visible;
            }

            onMounted(refreshGroupList);
            
            return {...state,defaultConf,hardwareConf,splitArray,groupConf,saveGroupConf,refreshGroupList,changeDevNetwork,openDevUrl,
                rebootDev,getEPG,epgSwap,createEPG,showEPG,syncGroupEPG,showSyncModal,groupModalVisible}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>