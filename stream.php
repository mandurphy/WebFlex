<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
<div data-simplebar>
    <main class="page-content stream" id="app" v-cloak>
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
                         <div class="col-lg-12" v-if="Object.keys(globalConf).length !== 0">
                             <div class="row">
                                 <div class="col-2"></div>
                                 <div class="col text-center">
                                     <cn>HTTP</cn>
                                     <en>HTTP</en>
                                 </div>
                                 <div v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.hls" class="col text-center">
                                     <cn>HLS</cn>
                                     <en>HLS</en>
                                 </div>
                                 <div class="col text-center">
                                     <cn>RTMP</cn>
                                     <en>RTMP</en>
                                 </div>
                                 <div class="col text-center">
                                     <cn>RTSP</cn>
                                     <en>RTSP</en>
                                 </div>
                                 <div class="col text-center" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3520DV400' && hardwareConf.chip !== 'HI3521DV100' && hardwareConf.chip !== 'HI3531DV100'">
                                     <cn>WebRTC</cn>
                                     <en>WebRTC</en>
                                 </div>
                                 <div class="col text-center">
                                     <cn>SRT</cn>
                                     <en>SRT</en>
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
                                 <div class="col-2 text-center p-0 pt-2">
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
                                 <div class="col lp-align-center" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3520DV400' && hardwareConf.chip !== 'HI3521DV100' && hardwareConf.chip !== 'HI3531DV100'">
                                     <bs-switch v-model="globalConf.stream.webrtc" ></bs-switch>
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="globalConf.stream.srt.enable" ></bs-switch>
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
                                 <div class="col-2 text-center p-0 pt-2">
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
                                 <div class="col lp-align-center" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3520DV400' && hardwareConf.chip !== 'HI3521DV100' && hardwareConf.chip !== 'HI3531DV100'">
                                     <bs-switch v-model="globalConf.stream2.webrtc" ></bs-switch>
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="globalConf.stream2.srt.enable" ></bs-switch>
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
                             <hr class="my-4">
                             <div class="row text-center">
                                 <div class="col-lg-12">
                                     <button type="button" class="btn  border-3 btn-primary me-2" @click="saveGlobalConfByLocal">
                                         <cn>应用到全部</cn>
                                         <en>Apply to all</en>
                                     </button>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
    
     <div class="row mt-3">
         <div class="col-lg-12 mx-auto">
             <ul class="nav nav-tabs nav-primary" role="tablist">
                 <li class="nav-item" role="presentation">
                     <a class="nav-link active" data-bs-toggle="tab" href="#tab1" role="tab" aria-selected="true">
                         <div class="d-flex align-items-center">
                             <div class="tab-icon"><i class="fa-solid fa-upload me-1"></i></div>
                             <div class="tab-title"><cn>码流配置</cn><en>Stream config</en></div>
                         </div>
                     </a>
                 </li>
                 <li class="nav-item" role="presentation">
                     <a class="nav-link" data-bs-toggle="tab" href="#tab2" role="tab" aria-selected="false">
                         <div class="d-flex align-items-center">
                             <div class="tab-icon"><i class="fa-solid fa-gear me-1"></i></div>
                             <div class="tab-title"><cn>TS设置</cn><en>TS config</en></div>
                         </div>
                     </a>
                 </li>
                 <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.hls" class="nav-item" role="presentation">
                     <a class="nav-link" data-bs-toggle="tab" href="#tab3" role="tab" aria-selected="false">
                         <div class="d-flex align-items-center">
                             <div class="tab-icon"><i class="fa-solid fa-gear me-1"></i></div>
                             <div class="tab-title"><cn>HLS设置</cn><en>HLS config</en></div>
                         </div>
                     </a>
                 </li>
                 <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.rtspAuth" class="nav-item" role="presentation">
                     <a class="nav-link" data-bs-toggle="tab" href="#tab4" role="tab" aria-selected="false">
                         <div class="d-flex align-items-center">
                             <div class="tab-icon"><i class="fa-solid fa-gear me-1"></i></div>
                             <div class="tab-title"><cn>RTSP设置</cn><en>RTSP config</en></div>
                         </div>
                     </a>
                 </li>
    
                 <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.srt" class="nav-item" role="presentation">
                     <a class="nav-link" data-bs-toggle="tab" href="#tab5" role="tab" aria-selected="false">
                         <div class="d-flex align-items-center">
                             <div class="tab-icon"><i class="fa-solid fa-gear me-1"></i></div>
                             <div class="tab-title"><cn>SRT设置</cn><en>SRT config</en></div>
                         </div>
                     </a>
                 </li>
                 <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.ndi" class="nav-item" role="presentation">
                     <a class="nav-link" data-bs-toggle="tab" href="#tab6" role="tab" aria-selected="false">
                         <div class="d-flex align-items-center">
                             <div class="tab-icon"><i class="fa-solid fa-gear me-1"></i></div>
                             <div class="tab-title"><cn>NDI设置</cn><en>NDI config</en></div>
                         </div>
                     </a>
                 </li>
                 <li class="nav-item" role="presentation">
                     <a class="nav-link" data-bs-toggle="tab" href="#tab7" role="tab" aria-selected="false">
                         <div class="d-flex align-items-center">
                             <div class="tab-icon"><i class="fa-solid fa-podcast me-1"></i></div>
                             <div class="tab-title"><cn>推流设置</ cn><en>Push config</en></div>
                         </div>
                     </a>
                 </li>
                 <li class="nav-item" role="presentation">
                     <a class="nav-link" data-bs-toggle="tab" href="#tab8" role="tab" aria-selected="false">
                         <div class="d-flex align-items-center">
                             <div class="tab-icon"><i class="fa-regular fa-circle-play me-1"></i></div>
                             <div class="tab-title"><cn>播放地址</cn><en>Play URL</en></div>
                         </div>
                     </a>
                 </li>
             </ul>
             <div class="tab-content py-3 pe-2 ps-2">
                 <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                     <div class="row">
                         <div class="col-2 text-center">
                             <cn>频道名称</cn>
                             <en>Channel name</en>
                         </div>
                         <div class="col text-center">
                             <cn>HTTP</cn>
                             <en>HTTP</en>
                         </div>
                         <div v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.hls" class="col text-center">
                             <cn>HLS</cn>
                             <en>HLS</en>
                         </div>
                         <div class="col text-center">
                             <cn>RTMP</cn>
                             <en>RTMP</en>
                         </div>
                         <div class="col text-center">
                             <cn>RTSP</cn>
                             <en>RTSP</en>
                         </div>
                         <div class="col text-center" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3520DV400' && hardwareConf.chip !== 'HI3521DV100' && hardwareConf.chip !== 'HI3531DV100'">
                             <cn>WebRTC</cn>
                             <en>WebRTC</en>
                         </div>
                         <div class="col text-center">
                             <cn>SRT</cn>
                             <en>SRT</en>
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
                         <div class="col-2 text-center">
                             <cn>推流地址</cn>
                             <en>push url</en>
                         </div>
                     </div>
                     <hr >
                     <div class="row mt-1" v-for="(item,index) in handleEnableConf" :key="item.id">
                         <div class="col-lg-12">
                             <div class="row">
                                 <div class="col-2 text-center">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream.http" ></bs-switch>
                                 </div>
                                 <div v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.hls" class="col lp-align-center">
                                     <bs-switch v-model="item.stream.hls" ></bs-switch>
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream.rtmp" @switch-change="state => onProtocolSwitchChange(state,item.enca.codec,item.encv.codec,'rtmp')"></bs-switch>
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream.rtsp.enable" ></bs-switch>
                                 </div>
                                 <div class="col lp-align-center" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3520DV400' && hardwareConf.chip !== 'HI3521DV100' && hardwareConf.chip !== 'HI3531DV100'">
                                     <bs-switch v-model="item.stream.webrtc" @switch-change="state => onProtocolSwitchChange(state,item.enca.codec,item.encv.codec,'webrtc')"></bs-switch>
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream.srt.enable" ></bs-switch>
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream.udp.enable" ></bs-switch>
                                 </div>
                                 <div class="col-2">
                                     <multiple-input type="text" class="form-control" v-model:value1="item.stream.udp.ip" v-model:value2="item.stream.udp.port" split=":"></multiple-input>
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream.push.enable" ></bs-switch>
                                 </div>
                                 <div class="col-2">
                                     <input class="form-control" v-model.trim.lazy="item.stream.push.path">
                                 </div>
                             </div>
                             <div class="row mt-1">
                                 <div class="col-2 text-center"></div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream2.http" ></bs-switch>
                                 </div>
                                 <div v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.hls" class="col lp-align-center">
                                     <bs-switch v-model="item.stream2.hls" ></bs-switch>
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream2.rtmp" @switch-change="state => onProtocolSwitchChange(state,item.enca.codec,item.encv2.codec,'rtmp')"></bs-switch>
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream2.rtsp.enable" ></bs-switch>
                                 </div>
                                 <div class="col lp-align-center" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3520DV400' && hardwareConf.chip !== 'HI3521DV100' && hardwareConf.chip !== 'HI3531DV100'">
                                     <bs-switch v-model="item.stream2.webrtc" @switch-change="state => onProtocolSwitchChange(state,item.enca.codec,item.encv2.codec,'webrtc')"></bs-switch>
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream2.srt.enable" ></bs-switch>
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream2.udp.enable" ></bs-switch>
                                 </div>
                                 <div class="col-2">
                                     <multiple-input type="text" class="form-control" v-model:value1="item.stream2.udp.ip" v-model:value2="item.stream2.udp.port" split=":"></multiple-input>
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream2.push.enable" ></bs-switch>
                                 </div>
                                 <div class="col-2">
                                     <input class="form-control" v-model.trim.lazy="item.stream2.push.path">
                                 </div>
                             </div>
                             <hr >
                         </div>
                     </div>
                 </div>
            
                 <div class="tab-pane fade" id="tab2" role="tabpanel">
                     <div class="row">
                         <div class="col text-center">
                             <cn>频道名称</cn>
                             <en>Channel name</en>
                         </div>
                         <div class="col-10">
                             <div class="row">
                                 <div class="col text-center">
                                     TTL
                                 </div>
                                 <div class="col text-center">
                                     <cn>流控</cn>
                                     <en>Flow Control</en>
                                 </div>
                                 <div class="col text-center">
                                     <cn>带宽</cn>
                                     <en>Bandwidth</en>
                                 </div>
                                 <div class="col text-center">
                                     RTP Head
                                 </div>
                                 <div class="col text-center">
                                     PID
                                 </div>
                                 <div class="col text-center">
                                     PMT PID
                                 </div>
                                 <div class="col text-center">
                                     ServiceID
                                 </div>
                                 <div class="col text-center">
                                     StreamID
                                 </div>
                                 <div class="col text-center">
                                     NetworkID
                                 </div>
                                 <div class="col-2 text-center">
                                     PacketSize
                                 </div>
                             </div>
                         </div>
                     </div>
                     <hr >
                     <div class="row mt-1" v-for="(item,index) in handleEnableConf" :key="item.id">
                         <div class="col-lg-12">
                             <div class="row">
                                 <div class="col text-center">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                 </div>
                                 <div class="col-10">
                                     <div class="row">
                                         <div class="col">
                                             <input type="text" class="form-control" v-model.trim.lazy="item.stream.udp.ttl">
                                         </div>
                                         <div class="col lp-align-center">
                                             <bs-switch v-model="item.stream.udp.flowCtrl"></bs-switch>
                                         </div>
                                         <div class="col">
                                             <input type="text" class="form-control" v-model.trim.lazy="item.stream.udp.bandwidth">
                                         </div>
                                         <div class="col lp-align-center">
                                             <bs-switch v-model="item.stream.udp.rtp"></bs-switch>
                                         </div>
                                         <div class="col">
                                             <input type="text" class="form-control" v-model.trim.lazy="item.ts.mpegts_start_pid">
                                         </div>
                                         <div class="col">
                                             <input type="text" class="form-control" v-model.trim.lazy="item.ts.mpegts_pmt_start_pid">
                                         </div>
                                         <div class="col">
                                             <input type="text" class="form-control" v-model.trim.lazy="item.ts.mpegts_service_id">
                                         </div>
                                         <div class="col">
                                             <input type="text" class="form-control" v-model.trim.lazy="item.ts.mpegts_transport_stream_id">
                                         </div>
                                         <div class="col">
                                             <input type="text" class="form-control" v-model.trim.lazy="item.ts.mpegts_original_network_id">
                                         </div>
                                         <div class="col-2">
                                             <select class="form-select" v-model="item.ts.tsSize">
                                                 <option value="188">188</option>
                                                 <option value="376">376</option>
                                                 <option value="564">564</option>
                                                 <option value="752">752</option>
                                                 <option value="940">940</option>
                                                 <option value="1128">1128</option>
                                                 <option value="1316">1316</option>
                                                 <option value="1504">1504</option>
                                                 <option value="1692">1692</option>
                                                 <option value="1880">1880</option>
                                             </select>
                                         </div>
                                     </div>
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
                             <en>Channel name</en>
                         </div>
                         <div class="col-2 text-center">
                             <cn>分片长度(秒)</cn>
                             <en>Segment length(s)</en>
                         </div>
                         <div class="col-2 text-center">
                             <cn>列表长度</cn>
                             <en>List length</en>
                         </div>
                         <div class="col-2 text-center">
                             <cn>URL前缀</cn>
                             <en>Base url</en>
                         </div>
                         <div class="col-2 text-center">
                             <cn>文件名后缀</cn>
                             <en>Name format</en>
                         </div>
                     </div>
                     <hr >
                     <div class="row mt-1" v-for="(item,index) in handleEnableConf" :key="item.id">
                         <div class="col-lg-12">
                             <div class="row">
                                 <div class="col-2 text-center">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                 </div>
                                 <div class="col-2">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.hls.hls_time">
                                 </div>
                                 <div class="col-2">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.hls.hls_list_size">
                                 </div>
                                 <div class="col-2">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.hls.hls_base_url">
                                 </div>
                                 <div class="col-2">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.hls.hls_filename">
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
                             <en>Channel name</en>
                         </div>
                         <div class="col-2 text-center">
                             <cn>用户名</cn>
                             <en>username</en>
                         </div>
                         <div class="col-2 text-center">
                             <cn>密码</cn>
                             <en>password</en>
                         </div>
                         <div class="col-1 text-center">
                             <cn>启用认证</cn>
                             <en>auth</en>
                         </div>
                         <div class="col-1 text-center">
                             <cn>开关</cn>
                             <en>enable</en>
                         </div>
                     </div>
                     <hr >
                     <div class="row mt-1" v-for="(item,index) in handleEnableConf" :key="item.id">
                         <div class="col-lg-12">
                             <div class="row">
                                 <div class="col-2 text-center">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                 </div>
                                 <div class="col-2">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream.rtsp.name">
                                 </div>
                                 <div class="col-2">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream.rtsp.passwd">
                                 </div>
                                 <div class="col-1 lp-align-center">
                                     <bs-switch v-model="item.stream.rtsp.auth"></bs-switch>
                                 </div>
                                 <div class="col-1 lp-align-center">
                                     <bs-switch v-model="item.stream.rtsp.enable"></bs-switch>
                                 </div>
                             </div>
                             <div class="row mt-1">
                                 <div class="col-2 text-center"></div>
                                 <div class="col-2">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream2.rtsp.name">
                                 </div>
                                 <div class="col-2">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream2.rtsp.passwd">
                                 </div>
                                 <div class="col-1 lp-align-center">
                                     <bs-switch v-model="item.stream2.rtsp.auth"></bs-switch>
                                 </div>
                                 <div class="col-1 lp-align-center">
                                     <bs-switch v-model="item.stream2.rtsp.enable"></bs-switch>
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
                             <en>Channel name</en>
                         </div>
                         <div class="col text-center">
                             <cn>模式</cn>
                             <en>Mode</en>
                         </div>
                         <div class="col text-center">
                             IP
                         </div>
                         <div class="col text-center">
                             StreamID
                         </div>
                         <div class="col text-center">
                             <cn>端口</cn>
                             <en>Port</en>
                         </div>
                         <div class="col text-center">
                             <cn>延时</cn>
                             <en>Latency</en>
                         </div>
                         <div class="col text-center">
                             <cn>密码</cn>
                             <en>Password</en>
                         </div>
                         <div class="col text-center">
                             <cn>开关</cn>
                             <en>Enable</en>
                         </div>
                     </div>
                     <hr >
                     <div class="row mt-1" v-for="(item,index) in handleEnableConf" :key="item.id">
                         <div class="col-lg-12">
                             <div class="row">
                                 <div class="col-2 text-center">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                 </div>
                                 <div class="col">
                                     <select class="form-select" v-model="item.stream.srt.mode">
                                         <option value="caller">caller</option>
                                         <option value="listener">listener</option>
                                         <option value="rendezvous">rendezvous</option>
                                     </select>
                                 </div>
                                 <div class="col">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream.srt.ip">
                                 </div>
                                 <div class="col">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream.srt.streamid">
                                 </div>
                                 <div class="col">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream.srt.port">
                                 </div>
                                 <div class="col">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream.srt.latency">
                                 </div>
                                 <div class="col">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream.srt.passwd">
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream.srt.enable"></bs-switch>
                                 </div>
                             </div>
                             <div class="row mt-1">
                                 <div class="col-2 text-center"></div>
                                 <div class="col">
                                     <select class="form-select" v-model="item.stream2.srt.mode">
                                         <option value="caller">caller</option>
                                         <option value="listener">listener</option>
                                         <option value="rendezvous">rendezvous</option>
                                     </select>
                                 </div>
                                 <div class="col">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream2.srt.ip">
                                 </div>
                                 <div class="col">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream2.srt.streamid">
                                 </div>
                                 <div class="col">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream2.srt.port">
                                 </div>
                                 <div class="col">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream2.srt.latency">
                                 </div>
                                 <div class="col">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream2.srt.passwd">
                                 </div>
                                 <div class="col lp-align-center">
                                     <bs-switch v-model="item.stream2.srt.enable"></bs-switch>
                                 </div>
                             </div>
                             <hr >
                         </div>
                     </div>
                 </div>
                 <div class="tab-pane fade" id="tab6" role="tabpanel">
                     <div class="row">
                         <div class="col-2 text-center">
                             <cn>频道名称</cn>
                             <en>Channel name</en>
                         </div>
                         <div class="col-2 text-center">
                             <cn>NDI名称</cn>
                             <en>NDI name</en>
                         </div>
                         <div class="col-2 text-center">
                             <cn>NDI分组</cn>
                             <en>NDI group</en>
                         </div>
                         <div class="col-1 text-center">
                             <cn>开关</cn>
                             <en>Enable</en>
                         </div>
                     </div>
                     <hr >
                     <div class="row mt-1" v-for="(item,index) in handleEnableConf" :key="item.id">
                         <div class="col-lg-12">
                             <div class="row">
                                 <div class="col-2 text-center">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                 </div>
                                 <div class="col-2">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.ndi.name">
                                 </div>
                                 <div class="col-2">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.ndi.group">
                                 </div>
                                 <div class="col-1 lp-align-center">
                                     <bs-switch v-model="item.ndi.enable"></bs-switch>
                                 </div>
                             </div>
                             <hr >
                         </div>
                     </div>
                 </div>
                 <div class="tab-pane fade" id="tab7" role="tabpanel">
                     <div class="row">
                         <div class="col-2 text-center">
                             <cn>频道名称</cn>
                             <en>Channel name</en>
                         </div>
                         <div class="col-2 text-center">
                             HEVC ID
                         </div>
                         <div class="col-2 text-center">
                             Format
                         </div>
                         <div class="col-2 text-center">
                             <cn>兼容性</cn>
                             <en>Compatible</en>
                         </div>
                         <div class="col-1 text-center">
                             <cn>上传速度</cn>
                             <en>Push speed</en>
                         </div>
                     </div>
                     <hr >
                     <div class="row mt-1" v-for="(item,index) in handleEnableConf" :key="item.id">
                         <div class="col-lg-12">
                             <div class="row">
                                 <div class="col-2 text-center">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                 </div>
                                 <div class="col-2">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream.push.hevc_id">
                                 </div>
                                 <div class="col-2">
                                     <select class="form-select" v-model="item.stream.push.format">
                                         <option value="auto">auto</option>
                                         <option value="flv">flv</option>
                                         <option value="rtsp">rtsp</option>
                                         <option value="rtp">rtp</option>
                                         <option value="mpegts">mpegts</option>
                                         <option value="rtp_mpegts">rtp_mpegts</option>
                                     </select>
                                 </div>
                                 <div class="col-2">
                                     <select class="form-select" v-model="item.stream.push.flvflags">
                                         <option cn="标准" en="normal" value="" v-language-option></option>
                                         <option value="ext_header">enhanced-rtmp</option>
                                     </select>
                                 </div>
                                 <div class="col-1 text-center">
                                     <span>{{handlePushSpeed(index*2)}} kb/s</span>
                                 </div>
                             </div>
                             <div class="row mt-1">
                                 <div class="col-2 text-center"></div>
                                 <div class="col-2">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.stream2.push.hevc_id">
                                 </div>
                                 <div class="col-2">
                                     <select class="form-select" v-model="item.stream2.push.format">
                                         <option value="auto">auto</option>
                                         <option value="flv">flv</option>
                                         <option value="rtsp">rtsp</option>
                                         <option value="rtp">rtp</option>
                                         <option value="mpegts">mpegts</option>
                                         <option value="rtp_mpegts">rtp_mpegts</option>
                                     </select>
                                 </div>
                                 <div class="col-2">
                                     <select class="form-select" v-model="item.stream2.push.flvflags">
                                         <option cn="标准" en="normal" value="" v-language-option></option>
                                         <option value="ext_header">enhanced-rtmp</option>
                                     </select>
                                 </div>
                                 <div class="col-1 text-center">
                                     <span>{{handlePushSpeed(index*2+1)}} kb/s</span>
                                 </div>
                             </div>
                             <hr >
                         </div>
                     </div>
                 </div>
                 <div class="tab-pane fade" id="tab8" role="tabpanel">
                     <div class="row">
                         <div class="col-2 text-center">
                             <cn>频道名称</cn>
                             <en>Channel name</en>
                         </div>
                         <div class="col-5">
                             <div class="row">
                                 <div class="col-3 text-center">
                                     <cn>主码流标识</cn>
                                     <en>Main Suffix</en>
                                 </div>
                                 <div class="col text-center">
                                     <cn>主码流地址</cn>
                                     <en>Main URL</en>
                                 </div>
                             </div>
                         </div>
                         <div class="col-5">
                             <div class="row">
                                 <div class="col-3 text-center">
                                     <cn>辅码流标识</cn>
                                     <en>Sub Suffix</en>
                                 </div>
                                 <div class="col text-center">
                                     <cn>辅码流地址</cn>
                                     <en>Sub URL</en>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <hr >
                     <div class="row mt-1" v-for="(item,index) in handleEnableConf" :key="item.id">
                         <div class="col-lg-12">
                             <div class="row">
                                 <div class="col-2 text-center">
                                     <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                 </div>
                                 <div class="col-5">
                                     <div class="row">
                                         <div class="col-3">
                                             <input type="text" class="form-control" v-model.trim.lazy="item.stream.suffix">
                                         </div>
                                         <div class="col">
                                             <div class="play-url">
                                                 <div class="row">
                                                     <div class="col-lg-12 mt-1" v-for="(item,urlIdx) in handlePlayUrl(index,'main')">
                                                         <div class="input-group">
                                                             <input class="form-control" v-model.trim.lazy="item" disabled readonly>
                                                             <button class="btn btn-primary input-group-text input-group-addon lp-cursor-pointer"
                                                                     @click="onCopyPlayerUrl(index,urlIdx,'main')">
                                                                 <i class="fa-regular fa-copy"></i>
                                                             </button>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 <div class="col-5">
                                     <div class="row">
                                         <div class="col-3">
                                             <input type="text" class="form-control" v-model.trim.lazy="item.stream2.suffix">
                                         </div>
                                         <div class="col">
                                             <div class="play-url">
                                                 <div class="row">
                                                     <div class="col-lg-12 mt-1" v-for="(item,urlIdx) in handlePlayUrl(index,'sub')">
                                                         <div class="input-group">
                                                             <input class="form-control" v-model.trim.lazy="item" disabled readonly>
                                                             <button class="btn btn-primary input-group-text input-group-addon lp-cursor-pointer"
                                                                     @click="onCopyPlayerUrl(index,urlIdx,'sub')">
                                                                 <i class="fa-regular fa-copy"></i>
                                                             </button>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <hr >
                         </div>
                     </div>
                 </div>
                 <div class="row mt-3">
                     <div class="col-lg-12 text-center">
                         <button type="button" class="btn btn-primary border-3 px-5" @click="saveDefaultConf">
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

    import {alertMsg, rpc, extend, deepCopy, clearReactiveObject, isEmpty, clearReactiveArray,confirm} from "./assets/js/lp.utils.js";
    import { useDefaultConf,useHardwareConf,usePortConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,bootstrapSwitchComponent,multipleInputComponent,languageOptionDirective } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,toRefs,watch,watchEffect,computed} = vue;
    const app = createApp({
        directives:{
            "language-option": languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "multiple-input": multipleInputComponent
        },
        setup(props,context) {
        
            const { defaultConf,updateDefaultConf } = useDefaultConf();
            const { hardwareConf } = useHardwareConf();
            const { portConf } = usePortConf();

            const state = {
                globalConf : reactive({}),
                playUrls:reactive([]),
                pushSpeed: reactive([])
            }
            
            const getport = (type) => {
                const list =portConf[type];
                if(list[2] !== list[0])
                    return list[2];
                else if(list[1] !== list[0])
                    return list[1];
                else if((type === "http" && list[0] === 80) || (type === "rtsp" && list[0] === 554) ||
                        (type === "rtmp" && list[0] === 1935) || (type === "httpts" && list[0] === 8090))
                    return "";
                else
                    return list[0];
            }

            const transURL = stream => {
                const urls = [];
                if (stream.http) {
                    const port = getport("httpts");
                    const portPart = port ? `:${port}` : '';
                    urls.push(`http://${window.location.hostname}${portPart}/live/${stream.suffix}`);
                }
                if (stream.hls)
                    urls.push(`http://${window.location.host}/hls/${stream.suffix}.m3u8`);
                if (stream.rtmp) {
                    const port = getport("rtmp");
                    const portPart = port ? `:${port}` : '';
                    urls.push(`rtmp://${window.location.hostname}${portPart}/live/${stream.suffix}`);
                    let flvUrl = `http://${window.location.host}/flv?app=live&stream=${stream.suffix}`;
                    if(port)
                        flvUrl += `&port=${port}`;
                    urls.push(flvUrl);
                }
                if (stream.rtsp.enable) {
                    const port = getport("rtsp");
                    const portPart = port ? `:${port}` : '';
                    urls.push(`rtsp://${window.location.host}${portPart}/${stream.suffix}`);
                }

                if (stream.srt.enable) {
                    const mode = stream.srt.mode === "listener" ? "caller" : "listener";
                    const ip = stream.srt.ip === "127.0.0.1" ? window.location.hostname : stream.srt.ip;
                    let url = `srt://${ip}:${stream.srt.port}?mode=${mode}`
                    if(!isEmpty(stream.srt.latency))
                        url += `&latency=${stream.srt.latency}`;
                    if(!isEmpty(stream.srt.passwd))
                        url += `&passphrase=${stream.srt.passwd}`;
                    if(!isEmpty(stream.srt.streamid))
                        url += `&streamid=${stream.srt.streamid}`;
                    urls.push(url);
                }
                if (stream.webrtc)
                    urls.push(`http://${window.location.host}/webrtc?app=live&stream=${stream.suffix}`);
                return urls;
            };

            const updatePlayUrl = () => {
                clearReactiveArray(state.playUrls);
                defaultConf.forEach(item => {
                    if (!item.enable && !item.enable2) return;
                    state.playUrls.push({
                        main: transURL(item.stream),
                        sub: transURL(item.stream2)
                    });
                });
            }

            const onCopyPlayerUrl = (chnIndex,urlIndex,type) => {
                const chnUrl = state.playUrls[chnIndex];
                const urls = chnUrl[type];
                const url = urls[urlIndex];
                const textarea = document.createElement("textarea");
                textarea.value = url;
                document.body.appendChild(textarea);
                textarea.select();
                let success = document.execCommand("copy");
                document.body.removeChild(textarea);
                if (!success) {
                    alertMsg('<cn>复制失败，请手动复制</cn><en>Copy failed, please copy manually</en>', 'error');
                    return;
                }
                alertMsg('<cn>已复制</cn><en>Have copied</en>', 'success');
            }

            const getPushSpeed = () => {
                rpc("enc.getPushSpeed").then(data => {
                    state.pushSpeed.splice(0, state.pushSpeed.length, ...data);
                });
                setTimeout(getPushSpeed,2000);
            }

            const unwatch = watchEffect(()=>{
                if(defaultConf.length > 0 && Object.keys(portConf).length >0 && Object.keys(hardwareConf).length > 0) {
                    for (let i = 0; i < defaultConf.length; i++) {
                        if(defaultConf[i].hasOwnProperty("stream")) {
                            let rtsp = defaultConf[i].stream.rtsp;
                            if(!rtsp.hasOwnProperty("enable")) {
                                rtsp = {
                                    enable : rtsp,
                                    name: "admin",
                                    passwd: "admin",
                                    auth: false
                                }
                                defaultConf[i].stream.rtsp = rtsp;
                            }

                            if(!defaultConf[i].stream.hasOwnProperty("suffix"))
                                defaultConf[i].stream.suffix = "stream"+defaultConf[i].id;
                        }
                        if(defaultConf[i].hasOwnProperty("stream2")) {
                            let rtsp = defaultConf[i].stream2.rtsp;
                            if(!rtsp.hasOwnProperty("enable")) {
                                rtsp = {
                                    enable : rtsp,
                                    name: "admin",
                                    passwd: "admin",
                                    auth: false
                                }
                                defaultConf[i].stream2.rtsp = rtsp;
                            }
                            if(!defaultConf[i].stream2.hasOwnProperty("suffix"))
                                defaultConf[i].stream2.suffix = "sub"+defaultConf[i].id;
                        }
                    }

                    Object.assign(state.globalConf, deepCopy(defaultConf[0]))
                    if(hardwareConf.chip === 'SS626V100') {
                        clearReactiveObject(state.globalConf);
                        Object.assign(state.globalConf, deepCopy(defaultConf[defaultConf.length-1]));
                    }

                    state.globalConf.stream.udp.port += "+";
                    state.globalConf.stream2.udp.port += "+";
                    updatePlayUrl();
                    getPushSpeed();
                    unwatch();
                }
            })

            const handlePushSpeed = (index) => {
                return state.pushSpeed[index];
            }

            const handleEnableConf = computed(()=> {
                return defaultConf.filter(item => {
                    if(hardwareConf.chip === 'SS626V100')
                        return item.type !== 'net'
                    return !!(item.enable || item.enable2);
                })
            })

            const handlePlayUrl = (index,type)=>{
                if(state.playUrls.length > index)
                    return state.playUrls[index][type];
                return "";
            }

            const onProtocolSwitchChange = (state,codecA,codecV,type) => {
                if(state) {
                    if(type === "rtmp" && codecA === "opus") {
                        alertMsg("<cn>当前通道音频编码格式为OPUS,RTMP协议流不支持该格式,请调整音频编码参数后在重试</cn><en>OPUS audio is unsupported by RTMP, please change the audio codec settings and retry.</en>", "warning",8000);
                        setTimeout(()=>{
                            defaultConf.forEach(item => {
                                if(item.hasOwnProperty("enca")) {
                                    if(item.enca.codec === "opus") {
                                        item.stream.rtmp = false;
                                        item.stream2.rtmp = false;
                                    }
                                }
                            })
                        },800);
                    }

                    if(type === "webrtc") {
                        if(codecA !== "opus" && codecA !== "close")
                            alertMsg("<cn>WebRTC协议流仅支持OPUS音频编码格式,请调整音频编码参数后在重试</cn><en>WebRTC only supports OPUS audio, please change the audio codec settings and retry.</en>", "warning",8000);
                        if(codecV !== "h264")
                            alertMsg("<cn>WebRTC协议流仅支持H264视频编码格式,请调整视频编码参数后在重试</cn><en>WebRTC only supports H264 video, please change the video codec settings and retry.</en>", "warning",8000);
                        setTimeout(()=>{
                            defaultConf.forEach(item => {
                                if(item.hasOwnProperty("enca")) {
                                    if((item.enca.codec !== "opus" && item.enca.codec !== "close") || (item.encv.codec !== "h264" && item.encv.codec !== "close"))
                                        item.stream.webrtc = false;
                                    if((item.enca.codec !== "opus" && item.enca.codec !== "close") || (item.encv.codec !== "h264" && item.encv.codec !== "close"))
                                        item.stream2.webrtc = false;
                                }
                            })
                        },600);
                    }
                }
            }

            const saveGlobalConfByLocal = () => {
                for ( let i = 0; i < defaultConf.length; i++ ) {
                    if (defaultConf[i].stream === undefined )
                        continue;

                    let globalConf = deepCopy(state.globalConf);
                    for (let key of ['stream', 'stream2']) {
                        delete globalConf[key].suffix;
                        if(defaultConf[i].hasOwnProperty("enca")) {
                            let codecA = defaultConf[i].enca.codec;
                            if(codecA === "opus")
                                globalConf[key].rtmp = false;
                            else
                                globalConf[key].webrtc = false;
                        }
                        extend(defaultConf[i][key], globalConf[key]);
                        let port = defaultConf[i][key].udp.port;
                        if(typeof port === "string" && port.indexOf("+") > 0) {
                            port = port.replace(/[+\s]/g, '');
                            port = isNaN(Number(port)) ? (3000+i) : (Number(port)+i);
                            defaultConf[i][key].udp.port = port;
                        }
                    }
                }
                saveDefaultConf();
            }
        
            const saveDefaultConf = () => {
                updateDefaultConf().then(updatePlayUrl);
            }
        
            return {...state,defaultConf,hardwareConf,handleEnableConf,handlePlayUrl,handlePushSpeed,
                onProtocolSwitchChange,saveGlobalConfByLocal,saveDefaultConf,onCopyPlayerUrl}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>