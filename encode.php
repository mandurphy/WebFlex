<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
<div data-simplebar>
    <main class="page-content encoder" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-12 mx-auto">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>全局配置</cn>
                            <en>Overall config</en>
                        </div>
                    </div>
                    <div class="card-body overflow-auto" >
                        <div class="row">
                            <div class="col-lg-12" v-if="Object.keys(globalData).length !== 0">
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
                                            <div class="col-2 text-center">
                                                <cn>码率控制</cn>
                                                <en>rate control</en>
                                            </div>
                                            <div class="col-2 text-center">
                                                <cn>码率(kb/s)</cn>
                                                <en>bitrate(kb/s)</en>
                                            </div>
                                            <div class="col-2 text-center">
                                                <cn>帧率</cn>
                                                <en>framerate</en>
                                            </div>
                                            <div class="col-2 text-center">
                                                <cn>GOP(秒)</cn>
                                                <en>GOP(sec)</en>
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
                                                <multiple-select v-model:value1="globalData.encv.width" v-model:value2="globalData.encv.height" split="x">
                                                    <option value="-1x-1">auto</option>
                                                    <option value="3840x2160">4K</option>
                                                    <option value="1920x1080">1080p</option>
                                                    <option value="1280x720">720p</option>
                                                    <option value="640x360">360p</option>
                                                    <option value="1080x1920">1080x1920</option>
                                                    <option value="720x1280">720x1280</option>
                                                    <option value="360x640">360x640</option>
                                                </multiple-select>
                                            </div>
                                            <div class="col-2">
                                                <multiple-select v-model:value1="globalData.encv.codec" v-model:value2="globalData.encv.profile" split=",">
                                                    <option value="h264,base">H.264 Base</option>
                                                    <option value="h264,main">H.264 Main</option>
                                                    <option value="h264,high">H.264 High</option>
                                                    <option value="h265,main">H.265 Main</option>
                                                    <option value="close,base">Close</option>
                                                </multiple-select>
                                            </div>
                                            <div class="col">
                                                <select class="form-select" v-model="globalData.encv.rcmode">
                                                    <option value="cbr">CBR</option>
                                                    <option value="vbr">VBR</option>
                                                    <option value="avbr">AVBR</option>
                                                    <option value="fixqp">FIXQP</option>
                                                </select>
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" v-model.trim.lazy="globalData.encv.bitrate">
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" v-model.trim.lazy="globalData.encv.framerate">
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" v-model.trim.lazy="globalData.encv.gop">
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
                                                <multiple-select v-model:value1="globalData.encv2.width" v-model:value2="globalData.encv2.height" split="x">
                                                    <option value="-1x-1">auto</option>
                                                    <option value="3840x2160">4K</option>
                                                    <option value="1920x1080">1080p</option>
                                                    <option value="1280x720">720p</option>
                                                    <option value="640x360">360p</option>
                                                    <option value="1080x1920">1080x1920</option>
                                                    <option value="720x1280">720x1280</option>
                                                    <option value="360x640">360x640</option>
                                                </multiple-select>
                                            </div>
                                            <div class="col-2">
                                                <multiple-select v-model:value1="globalData.encv2.codec" v-model:value2="globalData.encv2.profile" split=",">
                                                    <option value="h264,base">H.264 Base</option>
                                                    <option value="h264,main">H.264 Main</option>
                                                    <option value="h264,high">H.264 High</option>
                                                    <option value="h265,main">H.265 Main</option>
                                                    <option value="close,base">Close</option>
                                                </multiple-select>
                                            </div>
                                            <div class="col">
                                                <select class="form-select" v-model="globalData.encv2.rcmode">
                                                    <option value="cbr">CBR</option>
                                                    <option value="vbr">VBR</option>
                                                    <option value="avbr">AVBR</option>
                                                    <option value="fixqp">FIXQP</option>
                                                </select>
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" v-model.trim.lazy="globalData.encv2.bitrate">
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" v-model.trim.lazy="globalData.encv2.framerate">
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" v-model.trim.lazy="globalData.encv2.gop">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <hr >
                                </div>
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
                                                <select class="form-select" v-model="globalData.enca.codec">
                                                    <option value="aac">AAC</option>
                                                    <option value="pcma">PCMA</option>
                                                    <option value="mp2">MPEG2</option>
                                                    <option value="mp3">MP3</option>
                                                    <option value="close" cn="关闭" en="close" v-language-option></option>
                                                </select>
                                            </div>
                                            <div class="col">
                                                <select class="form-select audioSrc" v-model="globalData.enca.audioSrc"></select>
                                            </div>
                                            <div class="col">
                                                <select class="form-select" v-model="globalData.enca.gain">
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
                                                <select class="form-select" v-model="globalData.enca.samplerate">
                                                    <option value="-1">auto</option>
                                                    <option value="16000">16K</option>
                                                    <option value="32000">32K</option>
                                                    <option value="44100">44.1K</option>
                                                    <option value="48000">48K</option>
                                                </select>
                                            </div>
                                            <div class="col">
                                                <select class="form-select" v-model="globalData.enca.channels">
                                                    <option cn="单声道" en="mono" value="1" v-language-option></option>
                                                    <option cn="立体声" en="stereo" value="2" v-language-option></option>
                                                </select>
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" v-model.trim.lazy="globalData.enca.bitrate">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <hr >
                                </div>
                                <div class="row text-center">
                                    <div class="col-lg-12">
                                        <button type="button" class="btn  border-3 btn-primary me-2"><cn>应用到本地</cn><en>Save to local</en></button>
                                        <button type="button" class="btn  border-3 btn-primary"><cn>应用到群组</cn><en>Save to group</en></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-lg-12 mx-auto">
                <ul class="nav nav-tabs nav-primary" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" data-bs-toggle="tab" href="#tab1" role="tab" aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa fa-sign-in me-1"></i></div>
                                <div class="tab-title"><cn>编码参数</cn><en>Encode config</en></div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-bs-toggle="tab" href="#tab2" role="tab" aria-selected="false">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-regular fa-file-video me-1"></i></div>
                                <div class="tab-title"><cn>高级编码参数</cn><en>Advanced Encode config</en></div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-bs-toggle="tab" href="#tab3" role="tab" aria-selected="false">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-regular fa-image me-1"></i></div>
                                <div class="tab-title"><cn>视频参数</cn><en>Video config</en></div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-bs-toggle="tab" href="#tab4" role="tab" aria-selected="false">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-regular fa-file-audio me-1"></i></div>
                                <div class="tab-title"><cn>音频参数</cn><en>Audio config</en></div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-bs-toggle="tab" href="#tab5" role="tab" aria-selected="false">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-brands fa-internet-explorer me-1"></i></div>
                                <div class="tab-title"><cn>网络输入</cn><en>Network stream</en></div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="tab-content py-3 pe-2 ps-2">
                    <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                        <div class="row">
                            <div class="col-2 text-center">
                                <cn>频道名称</cn>
                                <en>channel name</en>
                            </div>
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
                                <cn>开关</cn>
                                <en>enable</en>
                            </div>
                        </div>
                        <hr >
                        <div class="row mt-1" v-for="(item,index) in handleEncConf" :key="item.id">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-2 text-center">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                    </div>
                                    <div class="col-2">
                                        <multiple-select v-model:value1="item.encv.width" v-model:value2="item.encv.height" split="x">
                                            <option value="-1x-1">auto</option>
                                            <option value="3840x2160">4K</option>
                                            <option value="1920x1080">1080p</option>
                                            <option value="1280x720">720p</option>
                                            <option value="640x360">360p</option>
                                            <option value="1080x1920">1080x1920</option>
                                            <option value="720x1280">720x1280</option>
                                            <option value="360x640">360x640</option>
                                        </multiple-select>
                                    </div>
                                    <div class="col-2">
                                        <multiple-select v-model:value1="item.encv.codec" v-model:value2="item.encv.profile" split=",">
                                            <option value="h264,base">H.264 Base</option>
                                            <option value="h264,main">H.264 Main</option>
                                            <option value="h264,high">H.264 High</option>
                                            <option value="h265,main">H.265 Main</option>
                                            <option value="close,base">Close</option>
                                        </multiple-select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="item.encv.rcmode">
                                            <option value="cbr">CBR</option>
                                            <option value="vbr">VBR</option>
                                            <option value="avbr">AVBR</option>
                                            <option value="fixqp">FIXQP</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv.bitrate">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv.framerate">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv.gop">
                                    </div>
                                    <div class="col force-align-center">
                                        <bootstrap-switch v-model="item.enable" ></bootstrap-switch>
                                    </div>
                                </div>
                                <div class="row mt-1">
                                    <div class="col-2 text-center"></div>
                                    <div class="col-2">
                                        <multiple-select v-model:value1="item.encv2.width" v-model:value2="item.encv2.height" split="x">
                                            <option value="-1x-1">auto</option>
                                            <option value="3840x2160">4K</option>
                                            <option value="1920x1080">1080p</option>
                                            <option value="1280x720">720p</option>
                                            <option value="640x360">360p</option>
                                            <option value="1080x1920">1080x1920</option>
                                            <option value="720x1280">720x1280</option>
                                            <option value="360x640">360x640</option>
                                        </multiple-select>
                                    </div>
                                    <div class="col-2">
                                        <multiple-select v-model:value1="item.encv2.codec" v-model:value2="item.encv2.profile" split=",">
                                            <option value="h264,base">H.264 Base</option>
                                            <option value="h264,main">H.264 Main</option>
                                            <option value="h264,high">H.264 High</option>
                                            <option value="h265,main">H.265 Main</option>
                                            <option value="close,base">Close</option>
                                        </multiple-select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="item.encv2.rcmode">
                                            <option value="cbr">CBR</option>
                                            <option value="vbr">VBR</option>
                                            <option value="avbr">AVBR</option>
                                            <option value="fixqp">FIXQP</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv2.bitrate">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv2.framerate">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv2.gop">
                                    </div>
                                    <div class="col force-align-center">
                                        <bootstrap-switch v-model="item.enable2" ></bootstrap-switch>
                                    </div>
                                </div>
                                <hr >
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-pane fade" id="tab2" role="tabpanel">
                        <div class="row">
                            <div class="col-2 text-center">
                                <cn>频道名称</cn>
                                <en>channel name</en>
                            </div>
                            <div class="col text-center">
                                <cn>宽</cn>
                                <en>width</en>
                            </div>
                            <div class="col text-center">
                                <cn>高</cn>
                                <en>height</en>
                            </div>
                            <div class="col-2 text-center">
                                <cn>智能编码模式</cn>
                                <en>smart encode</en>
                            </div>
                            <div class="col text-center">
                                minQP
                            </div>
                            <div class="col text-center">
                                maxQP
                            </div>
                            <div class="col text-center">
                                fixIQP
                            </div>
                            <div class="col text-center">
                                fixPQP
                            </div>
                            <div class="col text-center">
                                <cn>低延时编码</cn>
                                <en>low latency</en>
                            </div>
                        </div>
                        <hr >
                        <div class="row mt-1" v-for="(item,index) in handleAdvConf">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-2 text-center">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv.width">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv.height">
                                    </div>
                                    <div class="col-2">
                                        <select class="form-control" v-model="item.encv.gopmode">
                                            <option value="0">Normal</option>
                                            <option value="1">SmartP</option>
                                            <option value="2">DualP</option>
                                            <option value="3">BiPredB</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv.minqp">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv.maxqp">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv.Iqp">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv.Pqp">
                                    </div>
                                    <div class="col force-align-center">
                                        <bootstrap-switch v-model="item.encv.lowLatency" ></bootstrap-switch>
                                    </div>
                                </div>
                                <div class="row mt-1">
                                    <div class="col-2 text-center"></div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv2.width">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv2.height">
                                    </div>
                                    <div class="col-2">
                                        <select class="form-control" v-model="item.encv2.gopmode">
                                            <option value="0">Normal</option>
                                            <option value="1">SmartP</option>
                                            <option value="2">DualP</option>
                                            <option value="3">BiPredB</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv2.minqp">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv2.maxqp">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv2.Iqp">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.encv2.Pqp">
                                    </div>
                                    <div class="col force-align-center">
                                        <bootstrap-switch v-model="item.encv2.lowLatency" ></bootstrap-switch>
                                    </div>
                                </div>
                                <hr >
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab3" role="tabpanel">
                        <div class="row">
                            <div class="col-2 text-center">
                                <cn>频道名称</cn>
                                <en>channel name</en>
                            </div>
                            <div class="col-2 text-center">
                                <cn>旋转</cn>
                                <en>rotate</en>
                            </div>
                            <div class="col-2 text-center">
                                <cn>左裁剪</cn>
                                <en>left crop</en>
                            </div>
                            <div class="col text-center">
                                <cn>右裁剪</cn>
                                <en>right crop</en>
                            </div>
                            <div class="col text-center">
                                <cn>上裁剪</cn>
                                <en>top crop</en>
                            </div>
                            <div class="col text-center">
                                <cn>下裁剪</cn>
                                <en>bottom crop</en>
                            </div>
                            <div class="col text-center">
                                <cn>全帧率去隔行</cn>
                                <en>full framerate deinterlace</en>
                            </div>
                            <div class="col text-center">
                                <cn>NTSC兼容</cn>
                                <en>NTSC Compatible</en>
                            </div>
                        </div>
                        <hr >
                        <div class="row mt-1" v-for="(item,index) in handleVdoConf">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-2 text-center">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                    </div>
                                    <div class="col-2">
                                        <select class="form-select" v-model="item.cap.rotate">
                                            <option value="0">0</option>
                                            <option value="90">90</option>
                                            <option value="180">180</option>
                                            <option value="270">270</option>
                                        </select>
                                    </div>
                                    <div class="col-2">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.cap.crop.L">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.cap.crop.R">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.cap.crop.T">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.cap.crop.B">
                                    </div>
                                    <div class="col force-align-center">
                                        <bootstrap-switch v-model="item.cap.deinterlace" v-if="item.type==='vi'"></bootstrap-switch>
                                    </div>
                                    <div class="col force-align-center">
                                        <bootstrap-switch v-model="item.cap.ntsc" v-if="item.type==='vi'"></bootstrap-switch>
                                    </div>
                                </div>
                                <hr >
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab4" role="tabpanel">
                        <div class="row">
                            <div class="col-2 text-center">
                                <cn>频道名称</cn>
                                <en>channel name</en>
                            </div>
                            <div class="col text-center">
                                <cn>编码格式</cn>
                                <en>codec</en>
                            </div>
                            <div class="col text-center">
                                <cn>音源</cn>
                                <en>source</en>
                            </div>
                            <div class="col text-center">
                                <cn>增益</cn>
                                <en>gain</en>
                            </div>
                            <div class="col text-center">
                                <cn>采样率</cn>
                                <en>samplerate</en>
                            </div>
                            <div class="col text-center">
                                <cn>声道</cn>
                                <en>channels</en>
                            </div>
                            <div class="col text-center">
                                <cn>码率(kb/s)</cn>
                                <en>bitrate(kb/s)</en>
                            </div>
                        </div>
                        <hr >
                        <div class="row mt-1" v-for="(item,index) in handleAdoConf">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-2 text-center">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="item.enca.codec">
                                            <option value="aac">AAC</option>
                                            <option value="pcma">PCMA</option>
                                            <option value="mp2">MPEG2</option>
                                            <option value="mp3">MP3</option>
                                            <option value="close" cn="关闭" en="close" v-language-option></option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select audioSrc" v-model="item.enca.audioSrc"></select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="item.enca.gain">
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
                                        <select class="form-select" v-model="item.enca.samplerate">
                                            <option value="-1">auto</option>
                                            <option value="16000">16K</option>
                                            <option value="32000">32K</option>
                                            <option value="44100">44.1K</option>
                                            <option value="48000">48K</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="item.enca.channels">
                                            <option cn="单声道" en="mono" value="1" v-language-option></option>
                                            <option cn="立体声" en="stereo" value="2" v-language-option></option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.enca.bitrate">
                                    </div>
                                </div>
                                <hr >
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab5" role="tabpanel">
                        <div class="row">
                            <div class="col-2 text-center">
                                <cn>频道名称</cn>
                                <en>channel name</en>
                            </div>
                            <div class="col-3 text-center">
                                <cn>流地址</cn>
                                <en>stream url</en>
                            </div>
                            <div class="col text-center">
                                <cn>帧率</cn>
                                <en>framerate</en>
                            </div>
                            <div class="col text-center">
                                <cn>缓冲模式</cn>
                                <en>buffer mode</en>
                            </div>
                            <div class="col text-center">
                                <cn>缓冲时间</cn>
                                <en>buffer time</en>
                            </div>
                            <div class="col text-center">
                                <cn>协议</cn>
                                <en>protocol</en>
                            </div>
                            <div class="col text-center">
                                <cn>视频解码</cn>
                                <en>video decode</en>
                            </div>
                            <div class="col text-center">
                                <cn>音频解码</cn>
                                <en>audio decode</en>
                            </div>
                            <div class="col text-center">
                                <cn>开关</cn>
                                <en>enable</en>
                            </div>
                        </div>
                        <hr >
                        <div class="row mt-1" v-for="(item,index) in handleNetConf">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-2 text-center">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                    </div>
                                    <div class="col-4">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.net.path">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.net.framerate">
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="item.net.bufferMode">
                                            <option value="0" cn="一般" en="Normal" v-language-option></option>
                                            <option value="1" cn="实时" en="NoBuffer" v-language-option></option>
                                            <option value="2" cn="同步" en="Sync" v-language-option></option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.net.minDelay">
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="item.net.protocol">
                                            <option value="udp">UDP</option>
                                            <option value="tcp">TCP</option>
                                        </select>
                                    </div>
                                    <div class="col force-align-center">
                                        <bootstrap-switch v-model="item.net.decodeV"></bootstrap-switch>
                                    </div>
                                    <div class="col force-align-center">
                                        <bootstrap-switch v-model="item.net.decodeA"></bootstrap-switch>
                                    </div>
                                    <div class="col force-align-center">
                                        <bootstrap-switch v-model="item.net.enable"></bootstrap-switch>
                                    </div>
                                </div>
                                <hr >
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <button type="button" @click="saveConf" class="col-2 offset-5 btn border-3 btn-primary text-center"><cn>保存</cn><en>Save</en></button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
<?php include ("./public/foot.inc") ?>

<script type="module">
    
    import { rpc,alertMsg } from "./assets/js/helper.js";
    import { useDefaultConf } from "./assets/js/confHooks.js";
    import { bootstrapSwitchComponent,multipleSelectComponent,languageOptionDirective } from "./assets/js/vueHelper.js"
    
    const {createApp,reactive,watch,computed,onMounted} = Vue;
    const app = createApp({
        directives:{
            "language-option": languageOptionDirective
        },
        components:{
            "bootstrap-switch" : bootstrapSwitchComponent,
            "multiple-select": multipleSelectComponent
        },
        setup(props,context) {
            
            const { defaultConf } = useDefaultConf();

            const state = {
                globalData : reactive({})
            }
            
            const unwatch = watch(defaultConf, (value) => {
                for (let i = 0; i < defaultConf.length; i++) {
                    if (defaultConf[i].type === "net" ) {
                        if(!defaultConf[i].hasOwnProperty("cap")) {
                            defaultConf[i].cap = {
                                rotate: 0,
                                crop: {
                                    B: 0,
                                    L: 0,
                                    R: 0,
                                    T: 0
                                }
                            }
                        }
                    }
                }
                
                Object.assign(state.globalData, defaultConf[0]);
                unwatch();
            });
            
            const handleEncConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return !!((item.type === 'net' && item.net.decodeV) || (item.type !== 'net' && item.encv !== undefined));
                })
            })
            
            const handleAdvConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return item.enable;
                })
            })
            
            const handleVdoConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return item.type === 'net' || item.type === 'vi';
                })
            })
            
            const handleAdoConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return !!((item.type === 'net' && item.net.decodeA) || (item.type !== 'net' && item.enca !== undefined));
                })
            })

            const handleNetConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return item.type === 'net';
                })
            })
            
            const saveConf = () => {
                rpc( "enc.update", [ JSON.stringify( defaultConf, null, 2 ) ]).then(data => {
                    if ( typeof ( data.error ) != "undefined" )
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                    else
                        alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                });
            }
            
            return {...state,defaultConf,handleEncConf,handleAdvConf,handleVdoConf,handleAdoConf,handleNetConf,saveConf}
        }
    });
    app.mount('#app');
</script>
</body>
</html>