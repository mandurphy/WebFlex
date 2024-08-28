<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
    <link href="assets/plugins/timepicker/css/bootstrap-timepicker.min.css" rel="stylesheet">
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content push" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-6 lp-equal-height-container">
                    <div class="card lp-equal-height-item mb-0">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>视频预览</cn>
                                <en>Preview</en>
                                <small>
                                    <cn>推流后可见</cn>
                                    <en>visible when pushing</en>
                                </small>
                            </div>
                        </div>
                        <div class="card-body d-flex">
                            <div class="row flex-grow-1 lp-align-center">
                                <div class="col-lg-12">
                                    <h5-player v-show="hadPlayed" :url="playUrl" :codec="playerCodec" :audio="true" :canplay="hadPlayed"></h5-player>
                                    <div v-show="!hadPlayed" class="lp-aspect-ratio">
                                        <div class="aspect-ratio-content lp-align-center" style="background: #555">
                                            <label class="text-white" style="font-size: 3.5rem">
                                                <cn style="letter-spacing: 10px">停止推流</cn>
                                                <en>STOP PUSH</en>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 lp-equal-height-container">
                    <div class="lp-equal-height-item d-flex flex-column">
                        <div class="row flex-grow-1">
                            <div class="col-lg-12">
                                <div class="card h-100 d-flex flex-column mb-0">
                                    <div class="card-header bg-transparent">
                                        <div class="p-2 mb-0 d-flex align-items-end">
                                            <cn>基本设置</cn>
                                            <en>Basic config</en>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="d-flex flex-column justify-content-between h-100" v-if="Object.keys(pushConf).length > 0">
                                            <div class="row"></div>
                                            <div class="row">
                                                <div class="col-lg-4 lp-align-right pe-4">
                                                    <label>
                                                        <cn>视频源</cn>
                                                        <en>Video source</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-6">
                                                    <select class="form-select" v-model="pushConf.srcV" @change="onChangeSrcV">
                                                        <option v-for="(item,index) in handleEnableConf" :value="item.id">{{item.name}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-4 lp-align-right pe-4">
                                                    <label>
                                                        <cn>音频源</cn>
                                                        <en>Audio source</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-6">
                                                    <select class="form-select" v-model="pushConf.srcA">
                                                        <option value="-1" cn="无" en="None" v-language-option></option>
                                                        <option v-for="(item,index) in handleEnableConf" :value="item.id">{{item.name}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-4 lp-align-right pe-4">
                                                    <label>
                                                        <cn>码流</cn>
                                                        <en>Stream</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-6">
                                                    <select class="form-select" v-model="pushConf.srcV_chn">
                                                        <option value="main" cn="主码流" en="Main Stream" v-language-option></option>
                                                        <option v-if="defaultSubEnable" value="sub" cn="辅码流" en="Sub Stream" v-language-option></option>
                                                        <option v-else value="sub" cn="辅码流(未启用)" en="Sub Stream(not enable)" v-language-option></option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-4 lp-align-right pe-4">
                                                    <label>
                                                        <cn>定时开启</cn>
                                                        <en>start time</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-3">
                                                    <select class="form-select" v-model="pushCron.start.day">
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
                                                    <time-picker v-model="pushCron.start.time"></time-picker>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-4 lp-align-right pe-4">
                                                    <label>
                                                        <cn>定时结束</cn>
                                                        <en>stop time</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-3">
                                                    <select class="form-select" v-model="pushCron.stop.day">
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
                                                    <time-picker v-model="pushCron.stop.time"></time-picker>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-4 lp-align-right pe-4">
                                                    <label>
                                                        <cn>开机推流</cn>
                                                        <en>auto push</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-6">
                                                    <select class="form-select" v-model="pushConf.autorun">
                                                        <option cn="关闭" en="OFF" value="false" v-language-option></option>
                                                        <option cn="开启" en="ON" value="true" v-language-option></option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-12 text-center">
                                                    <button type="button" class="btn border-3 btn-primary px-4" @click="savePushConf">
                                                        <cn>保存</cn>
                                                        <en>Save</en>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-10 offset-lg-1 lp-align-center">
                                                    <div class="push-bar w-100">
                                                        <button type="button" :class="['btn border-3 px-4',{'btn-primary':!pushState.pushing},{'btn-default disabled':pushState.pushing}]" @click="onPushStart">
                                                            <i class="fa-solid fa-video me-1"></i>
                                                            <cn>推流</cn>
                                                            <en>Push</en>
                                                        </button>
                                                        <button type="button" :class="['btn border-3 ms-2 px-4',{'btn-primary':pushState.pushing},{'btn-default disabled':!pushState.pushing}]" @click="onPushStop">
                                                            <i class="fa-solid fa-stop me-1"></i>
                                                            <cn>停止</cn>
                                                            <en>Stop</en>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-lg-12 mx-auto">
                    <ul class="nav nav-tabs nav-primary" role="tablist">
                        <li class="nav-item" role="presentation" @click="tabType = 'rtmp'">
                            <a class="nav-link active" data-bs-toggle="tab" href="#tab1" role="tab" aria-selected="false">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon">
                                        <i v-if="handleEnableRtmp" class="fa-solid fa-circle-dot fa-sm mx-1 push-dot"></i>
                                        <i v-else class="fa-solid fa-angles-up mx-1"></i>
                                    </div>
                                    <div class="tab-title">
                                        <cn>推rtmp流</cn>
                                        <en>RTMP</en>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation" @click="tabType = 'srt'">
                            <a class="nav-link" data-bs-toggle="tab" href="#tab2" role="tab" aria-selected="false">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon">
                                        <i v-if="handleEnableSrt" class="fa-solid fa-circle-dot fa-sm me-1 push-dot"></i>
                                        <i v-else class="fa-solid fa-arrow-up-long mx-1"></i>
                                    </div>
                                    <div class="tab-title">
                                        <cn>推srt流</cn>
                                        <en>SRT</en>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation" @click="tabType = 'webrtc'">
                            <a class="nav-link" data-bs-toggle="tab" href="#tab3" role="tab" aria-selected="false">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon">
                                        <i v-if="handleEnableWebRtc" class="fa-solid fa-circle-dot fa-sm me-1 push-dot"></i>
                                        <i v-else class="fa-solid fa-arrow-turn-up me-1"></i>
                                    </div>
                                    <div class="tab-title">
                                        <cn>推webrtc流</cn>
                                        <en>WebRTC</en>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation" @click="tabType = 'custom'">
                            <a class="nav-link" data-bs-toggle="tab" href="#tab4" role="tab" aria-selected="false">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon">
                                        <i v-if="handleEnableCustom" class="fa-solid fa-circle-dot fa-sm me-1 push-dot"></i>
                                        <i v-else class="fa-solid fa-arrows-split-up-and-left me-1"></i>
                                    </div>
                                    <div class="tab-title">
                                        <cn>自定义推流</cn>
                                        <en>Custom</en>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content py-3 pe-2 ps-2">
                        <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-2 text-center">
                                    <cn>描述</cn>
                                    <en>Description</en>
                                </div>
                                <div class="col-lg-2 text-center">
                                    <cn>服务器</cn>
                                    <en>Push Url</en>
                                </div>
                                <div class="col-lg-3 text-center">
                                    <cn>推流码</cn>
                                    <en>Push Url</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>兼容性</cn>
                                    <en>Compatible</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>速度</cn>
                                    <en>Speed</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>时长</cn>
                                    <en>Duration</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>启用</cn>
                                    <en>Enable</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>操作</cn>
                                    <en>Option</en>
                                </div>
                            </div>
                            <hr class="my-3">
                            <div class="row" v-if="Object.keys(pushConf).length > 0" v-for="(item,index) in handleRtmpConf">
                                <div class="co-lg-12">
                                    <div class="row">
                                        <div class="col-lg-2">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.des">
                                        </div>
                                        <div class="col-lg-2">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.server">
                                        </div>
                                        <div class="col-lg-3">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.key">
                                        </div>
                                        <div class="col-lg-1">
                                            <select class="form-select" v-model="item.flvflags">
                                                <option cn="标准" en="normal" value="" v-language-option></option>
                                                <option value="ext_header">enhanced-rtmp</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            {{item.speed}} kb/s
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            {{formatPushTimeCount(item.duration)}}
                                        </div>
                                        <div class="col-lg-1 lp-align-center">
                                            <bs-switch v-model="item.enable"></bs-switch>
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            <button type="button" class="btn border-3 btn-primary" @click="delPushUrl(index)">
                                                <cn>删除</cn>
                                                <en>delete</en>
                                            </button>
                                        </div>
                                    </div>
                                    <hr class="my-3">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 tips">
                                    <cn>1、基本设置模块里选择推流使用的音频源和视频源，如果需要使用Line-In的音频，音频源请选择Mix通道。</cn>
                                    <en>1. In basic settings, choose the audio and video sources. For Line-In audio, select the Mix channel.</en>
                                </div>
                                <div class="col-lg-12 tips">
                                    <cn>2、点击推流按钮，可以向全部已启用的通道推流，推流速度大于0表示推流成功。</cn>
                                    <en>2. Click the push button to stream to all enabled channels. A speed greater than 0 indicates a successful stream.</en>
                                </div>
                                <div class="col-lg-12 tips">
                                    <cn>3、当有推流地址启用时，会在对应标签页前显示[ <i class="fa-solid fa-circle-dot fa-sm push-dot"></i> ]图标提示。</cn>
                                    <en>3. When a streaming URL is enable, the icon [ <i class='fa-solid fa-circle-dot fa-sm push-dot'></i> ] appears before the corresponding tab.</en>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tab2" role="tabpanel">
                            <div class="row">
                                <div class="col-2 text-center">
                                    <cn>描述</cn>
                                    <en>Description</en>
                                </div>
                                <div class="col text-center">
                                    <cn>模式</cn>
                                    <en>Mode</en>
                                </div>
                                <div class="col text-center">
                                    IP
                                </div>
                                <div class="col text-center">
                                    <cn>端口</cn>
                                    <en>Port</en>
                                </div>
                                <div class="col text-center">
                                    <cn>密码</cn>
                                    <en>Password</en>
                                </div>
                                <div class="col text-center">
                                    <cn>延时</cn>
                                    <en>Latency</en>
                                </div>
                                <div class="col text-center">
                                    Stream ID
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>速度</cn>
                                    <en>Speed</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>时长</cn>
                                    <en>Duration</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>启用</cn>
                                    <en>Enable</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>操作</cn>
                                    <en>Option</en>
                                </div>
                            </div>
                            <hr >
                            <div class="row mt-1" v-for="(item,index) in handleSrtConf" :key="item.id">
                                <div class="col-lg-12">
                                    <div class="row">
                                        <div class="col-2 text-center">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.des">
                                        </div>
                                        <div class="col">
                                            <select class="form-select" v-model="item.mode">
                                                <option value="caller">caller</option>
                                                <option value="listener">listener</option>
                                                <option value="rendezvous">rendezvous</option>
                                            </select>
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.ip">
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.port">
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.passphrase">
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.latency">
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.streamid">
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            {{item.speed}} kb/s
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            {{formatPushTimeCount(item.duration)}}
                                        </div>
                                        <div class="col-lg-1 lp-align-center">
                                            <bs-switch v-model="item.enable"></bs-switch>
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            <button type="button" class="btn border-3 btn-primary" @click="delPushUrl(index)">
                                                <cn>删除</cn>
                                                <en>delete</en>
                                            </button>
                                        </div>
                                    </div>
                                    <hr class="my-3">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 tips">
                                    <cn>1、在基本设置里选择使用的音频源和视频源，如果需要使用Line-In的音频，音频源请选择Mix通道。</cn>
                                    <en>1. In basic settings, choose the audio and video sources. For Line-In audio, select the Mix channel.</en>
                                </div>
                                <div class="col-lg-12 tips">
                                    <cn>2、点击推流按钮，可以向全部已启用的通道推流，推流速度大于0表示推流成功。</cn>
                                    <en>2. Click the push button to stream to all enabled channels. A speed greater than 0 indicates a successful stream.</en>
                                </div>
                                <div class="col-lg-12 tips">
                                    <cn>3、当有通道推流时，会在对应标签页前显示[ <i class="fa-solid fa-circle-dot fa-sm push-dot"></i> ]图标提示。</cn>
                                    <en>3. When a channel is streaming, a [ <i class="fa-solid fa-circle-dot fa-sm push-dot"></i> ] icon will appear in front of the corresponding tab as a notification.</en>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tab3" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-2 text-center">
                                    <cn>描述</cn>
                                    <en>Description</en>
                                </div>
                                <div class="col-lg-5 text-center">
                                    <cn>推流地址</cn>
                                    <en>Push Url</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>速度</cn>
                                    <en>Speed</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>时长</cn>
                                    <en>Duration</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>启用</cn>
                                    <en>Enable</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>操作</cn>
                                    <en>Option</en>
                                </div>
                            </div>
                            <hr class="my-3">
                            <div class="row" v-if="Object.keys(pushConf).length > 0" v-for="(item,index) in handleWebRtcConf">
                                <div class="co-lg-12">
                                    <div class="row">
                                        <div class="col-lg-2">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.des">
                                        </div>
                                        <div class="col-lg-5">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.path">
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            {{item.speed}} kb/s
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            {{formatPushTimeCount(item.duration)}}
                                        </div>
                                        <div class="col-lg-1 lp-align-center">
                                            <bs-switch v-model="item.enable"></bs-switch>
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            <button type="button" class="btn border-3 btn-primary" @click="delPushUrl(index)">
                                                <cn>删除</cn>
                                                <en>delete</en>
                                            </button>
                                        </div>
                                    </div>
                                    <hr class="my-3">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 tips">
                                    <cn>1、在基本设置里选择使用的音频源和视频源，如果需要使用Line-In的音频，音频源请选择Mix通道。</cn>
                                    <en>1. In basic settings, choose the audio and video sources. For Line-In audio, select the Mix channel.</en>
                                </div>
                                <div class="col-lg-12 tips">
                                    <cn>2、点击推流按钮，可以向全部已启用的通道推流，推流速度大于0表示推流成功。</cn>
                                    <en>2. Click the push button to stream to all enabled channels. A speed greater than 0 indicates a successful stream.</en>
                                </div>
                                <div class="col-lg-12 tips">
                                    <cn>3、当有通道推流时，会在对应标签页前显示[ <i class="fa-solid fa-circle-dot fa-sm push-dot"></i> ]图标提示。</cn>
                                    <en>3. When a channel is streaming, a [ <i class="fa-solid fa-circle-dot fa-sm push-dot"></i> ] icon will appear in front of the corresponding tab as a notification.</en>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="tab4" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-2 text-center">
                                    <cn>描述</cn>
                                    <en>Description</en>
                                </div>
                                <div class="col-lg-5 text-center">
                                    <cn>推流地址</cn>
                                    <en>Push Url</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>速度</cn>
                                    <en>Speed</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>时长</cn>
                                    <en>Duration</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>启用</cn>
                                    <en>Enable</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>操作</cn>
                                    <en>Option</en>
                                </div>
                            </div>
                            <hr class="my-3">
                            <div class="row" v-if="Object.keys(pushConf).length > 0" v-for="(item,index) in handleCustomConf">
                                <div class="co-lg-12">
                                    <div class="row">
                                        <div class="col-lg-2">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.des">
                                        </div>
                                        <div class="col-lg-5">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.path">
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            {{item.speed}} kb/s
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            {{formatPushTimeCount(item.duration)}}
                                        </div>
                                        <div class="col-lg-1 lp-align-center">
                                            <bs-switch v-model="item.enable"></bs-switch>
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            <button type="button" class="btn border-3 btn-primary" @click="delPushUrl(index)">
                                                <cn>删除</cn>
                                                <en>delete</en>
                                            </button>
                                        </div>
                                    </div>
                                    <hr class="my-3">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 tips">
                                    <cn>1、在基本设置里选择使用的音频源和视频源，如果需要使用Line-In的音频，音频源请选择Mix通道。</cn>
                                    <en>1. In basic settings, choose the audio and video sources. For Line-In audio, select the Mix channel.</en>
                                </div>
                                <div class="col-lg-12 tips">
                                    <cn>2、点击推流按钮，可以向全部已启用的通道推流，推流速度大于0表示推流成功。</cn>
                                    <en>2. Click the push button to stream to all enabled channels. A speed greater than 0 indicates a successful stream.</en>
                                </div>
                                <div class="col-lg-12 tips">
                                    <cn>3、当有通道推流时，会在对应标签页前显示[ <i class="fa-solid fa-circle-dot fa-sm push-dot"></i> ]图标提示。</cn>
                                    <en>3. When a channel is streaming, a [ <i class="fa-solid fa-circle-dot fa-sm push-dot"></i> ] icon will appear in front of the corresponding tab as a notification.</en>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-5" @click="addPushUrl">
                                    <cn>添加</cn>
                                    <en>Add</en>
                                </button>
                                <button type="button" class="btn border-3 btn-primary px-5 ms-2" @click="savePushConf">
                                    <cn>保存</cn>
                                    <en>Save</en>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
<?php include ("./public/foot.inc") ?>
<script type="module">
    import {rpc, func, alertMsg, isEmpty, extend} from "./assets/js/lp.utils.js";
    import { useDefaultConf,usePushConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,bootstrapSwitchComponent,h5PlayerComponent,timepickerComponent,languageOptionDirective } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        directives: {
          "language-option": languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "h5-player": h5PlayerComponent,
            "time-picker": timepickerComponent
        },
        setup(props,context) {

            const { defaultConf } = useDefaultConf();
            const { pushConf,updatePushConf } = usePushConf();

            const state = {
                playerCodec:ref("h264"),
                defaultSubEnable:ref(null),
                hadPlayed:ref(false),
                playUrl:ref('http://'+window.location.host+'/flv?app=live&stream=preview'),
                updateTime:0,
                tabType:ref('rtmp'),
                pushState:reactive({}),
                pushCron: reactive({
                    start:{
                        day:"x",
                        time:"00:00"
                    },
                    stop: {
                        day:"x",
                        time:"00:00"
                    }
                })
            }

            const unwatch = watchEffect(()=>{
                if(Object.keys(pushConf).length > 0) {
                    defaultConf.forEach(item => {
                        if(item.id === pushConf.srcV) {
                            if(pushConf.srcV_chn === "sub" && item.enable2)
                                state.playerCodec.value = item.encv2.codec;
                            else
                                state.playerCodec.value = item.encv.codec;
                        }
                    });
                    unwatch();
                }
            })

            const handleEnableConf = computed(()=>{
               return defaultConf.filter((item,index) => {
                   if(item.enable && state.defaultSubEnable.value === null)
                       state.defaultSubEnable.value = item.enable2;
                   return !!item.enable;
               })
            });

            const handleRtmpConf = computed(()=>{
                if(!isEmpty(pushConf)) {
                    let { url } = pushConf;
                    url = url.filter(item => item.type === 'rtmp');
                    url.forEach(item => {
                        item.duration = 0;
                        item.speed = 0;
                        if(!isEmpty(state.pushState)) {
                            const { status } = state.pushState;
                            status.forEach(st => {
                                if(item.type === st.type && item.path === st.path)
                                    extend(item,st);
                            })
                        }
                    })
                    return url;
                }
                return [];
            })

            const handleEnableRtmp = computed(()=>{
                if(!isEmpty(pushConf)) {
                    let { url } = pushConf;
                    url = url.filter(item => item.type === 'rtmp' && item.enable);
                    return url.length > 0;
                }
                return false;
            })

            const handleSrtConf = computed(()=>{
                if(!isEmpty(pushConf)) {
                    let { url } = pushConf;
                    url = url.filter(item => item.type === 'srt');
                    url.forEach(item => {
                        item.duration = 0;
                        item.speed = 0;
                        if(!isEmpty(state.pushState)) {
                            const { status } = state.pushState;
                            status.forEach(st => {
                                if(item.type === st.type && item.path === st.path)
                                    extend(item,st);
                            })
                        }
                    })
                    return url;
                }
                return [];
            })

            const handleEnableSrt = computed(()=>{
                if(!isEmpty(pushConf)) {
                    let { url } = pushConf;
                    url = url.filter(item => item.type === 'srt' && item.enable);
                    return url.length > 0;
                }
                return false;
            })

            const handleWebRtcConf = computed(()=>{
                if(!isEmpty(pushConf)) {
                    let { url } = pushConf;
                    url = url.filter(item => item.type === 'webrtc');
                    url.forEach(item => {
                        item.duration = 0;
                        item.speed = 0;
                        if(!isEmpty(state.pushState)) {
                            const { status } = state.pushState;
                            status.forEach(st => {
                                if(item.type === st.type && item.path === st.path)
                                    extend(item,st);
                            })
                        }
                    })
                    return url;
                }
                return [];
            })

            const handleEnableWebRtc = computed(()=>{
                if(!isEmpty(pushConf)) {
                    let { url } = pushConf;
                    url = url.filter(item => item.type === 'webrtc' && item.enable);
                    return url.length > 0;
                }
                return false;
            })

            const handleCustomConf = computed(()=>{
                if(!isEmpty(pushConf)) {
                    let { url } = pushConf;
                    url = url.filter(item => item.type === 'custom');
                    url.forEach(item => {
                        item.duration = 0;
                        item.speed = 0;
                        if(!isEmpty(state.pushState)) {
                            const { status } = state.pushState;
                            status.forEach(st => {
                                if(item.type === st.type && item.path === st.path)
                                    extend(item,st);
                            })
                        }
                    })
                    return url;
                }
                return [];
            })

            const handleEnableCustom = computed(()=>{
                if(!isEmpty(pushConf)) {
                    let { url } = pushConf;
                    url = url.filter(item => item.type === 'custom' && item.enable);
                    return url.length > 0;
                }
                return false;
            })
            const handlePushCrontab = () => {
                func("/system/getPushCrontab").then(result => {
                    const keys = Object.keys(result.data);
                    keys.forEach(key => {
                        const value = result.data[key];
                        if(value === null)
                            return;
                        let list = value.split(" ");
                        if(list.length === 8) {
                            state.pushCron[key].day = list[4];
                            state.pushCron[key].time = list[1]+":"+list[0];
                        }
                    });
                })
            }

            const onChangeSrcV = () => {
                defaultConf.forEach(item => {
                    if(item.id === pushConf.srcV)
                        state.defaultSubEnable.value = item.enable2;
                    return true;
                })
            }

            const handlePushState = () => {
                rpc("push.getState").then(data => {
                    Object.assign(state.pushState, data);
                    state.updateTime = new Date().getTime() / 1000;
                    state.hadPlayed.value = state.pushState.pushing;
                });
                setTimeout(handlePushState,1000);
            }

            const formatPushTimeCount = count => {
                if (state.pushState.pushing && count > 0) {
                    const fix = num => {
                        if ( num < 10 )
                            return '0' + num;
                        else
                            return num;
                    }
                    let now = new Date();
                    let diff = now.getTime() / 1000 - state.updateTime + count/1000;
                    let h = Math.floor(diff / 3600);
                    let m = Math.floor( diff % 3600 / 60 );
                    let s = Math.floor( diff % 60 );
                    return fix(h) + ":" + fix( m ) + ":" + fix( s );
                }
                return "--:--:--";
            }
            
            const onPushStart = () => {
                rpc("push.start").then(()=>{
                    handlePushState();
                });
            }
            
            const onPushStop = () => {
                rpc("push.stop").then(()=>{
                    handlePushState();
                });
            }
            
            const addPushUrl = () => {
                if(state.tabType.value === 'rtmp') {
                    pushConf.url.push({
                        "des": "new platform",
                        "enable": false,
                        "type":"rtmp",
                        "server": "",
                        "key":"",
                        "path":"",
                        "flvflags":""
                    })
                }
                if(state.tabType.value === 'srt') {
                    pushConf.url.push({
                        "des": "new platform",
                        "enable": false,
                        "type":"srt",
                        "mode": "caller",
                        "ip": "127.0.0.1",
                        "port": 7001,
                        "latency": 50,
                        "passwd": "",
                        "path": ""
                    })
                }
                if(state.tabType.value === 'webrtc' || state.tabType.value === 'custom') {
                    pushConf.url.push({
                        "des": "new platform",
                        "enable": false,
                        "type":`${state.tabType.value}`,
                        "path":"",
                    })
                }
            }
            
            const delPushUrl = (index) => {
                let count = 0;
                pushConf.url.forEach((item,idx) => {
                    if (item.type === state.tabType.value) {
                        if (count === index)
                            pushConf.url.splice(idx, 1);
                        count++;
                    }
                })
            }

            const savePushConf = () => {
                defaultConf.forEach(item => {
                    if(item.id === pushConf.srcV) {
                        if(pushConf.srcV_chn === "sub" && item.enable2)
                            state.playerCodec.value = item.encv2.codec;
                        else
                            state.playerCodec.value = item.encv.codec;
                    }
                });

                updatePushConf().then(()=>{
                    func("/system/setPushCrontab",state.pushCron).then(data => {
                        if(data.status === "success")
                            alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                    });
                })
            }

            onMounted(() => {
                handlePushCrontab();
                handlePushState();
            })
            
            return {...state,pushConf,handleRtmpConf,handleEnableRtmp,handleSrtConf,handleEnableSrt,handleWebRtcConf,handleEnableWebRtc,
                handleCustomConf,handleEnableCustom,formatPushTimeCount,onChangeSrcV,onPushStart,onPushStop,addPushUrl,delPushUrl,handleEnableConf,savePushConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>