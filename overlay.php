<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
    <link href="assets/plugins/nouislider/css/nouislider.min.css" rel="stylesheet">
    <link href="assets/plugins/fileinput/css/fileinput.min.css" rel="stylesheet" >
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content overlay" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body" >
                                    <div class="row">
                                        <div class="d-flex align-items-center gap-3 px-2 py-1">
                                            <div class="flex-grow-0">
                                                <label class="fw-bold">
                                                    <cn>频道</cn>
                                                    <en>Channel</en>:
                                                </label>
                                            </div>
                                            <div class="flex-grow-0">
                                                <select class="form-select" v-model="activeChnId" @change="onChangePlayerChn">
                                                    <option v-for="(item,index) in handleEnableConf" :value="item.id" :data-attr-codec="item.encv.codec" :data-attr-suffix="item.stream.suffix" :data-attr-audio="item.enca.codec !== 'close'" :data-attr-protocol="(item.stream.rtmp || item.stream.webrtc) ? (item.stream.rtmp ? 'rtmp' : 'webrtc') : ''">{{item.name}}</option>
                                                </select>
                                            </div>
                                            <div class="flex-grow-0" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3516CV610'">
                                                <label class="fw-bold">
                                                    <cn>预览</cn>
                                                    <en>Channel</en>:
                                                </label>
                                            </div>
                                            <div class="flex-grow-0" v-show="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3516CV610'">
                                                <select class="form-select" v-model="preType" ref="preTypeEle"></select>
                                            </div>
                                            <div class="flex-grow-0" v-if="playerCodec === 'h265'">
                                                <label class="fw-bold">
                                                    <cn>缓冲</cn>
                                                    <en>Buffer</en>:
                                                </label>
                                            </div>
                                            <div class="flex-grow-0" v-if="playerCodec === 'h265'">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" v-model="bufferTime" @change="onChangeBufferTime">
                                                    <span class="input-group-text">ms</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div v-show="preType === 'img'" class="col-lg-12 mt-2">
                                            <div class="card-img-content">
                                                <div class="card-img-background"></div>
                                                <img :src="chnImgUrl" class="card-img" :style="handleAutoStyle()">
                                                <img :src="chnImgUrl" class="card-img" style="visibility: hidden">
                                            </div>
                                        </div>
                                        <div v-show="preType === 'vdo'" class="col-lg-12 mt-2 mb-2">
                                            <h5-player :url="playerUrl" :codec="playerCodec" :audio="playerAudio" :protocol="playerProtocol" :buffer="bufferTime"></h5-player>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header bg-transparent">
                                    <div class="d-flex align-items-center">
                                        <div class="p-2">
                                            <label class="mb-0 d-flex align-items-end">
                                                <cn>特效列表</cn>
                                                <en>Effect list</en>
                                            </label>
                                        </div>
                                        <div class="dropdown ms-auto lp-cursor-pointer">
                                            <button type="button" class="btn border-3 btn-primary btn-sm dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
                                                <i class="fa-solid fa-plus me-1"></i>
                                                <label class="lp-cursor-pointer">
                                                    <cn>添加</cn>
                                                    <en>Add</en>
                                                </label>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a class="dropdown-item" @click="addOverlay('pic')">
                                                        <cn>水印</cn>
                                                        <en>Pic</en>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" @click="addOverlay('text')">
                                                        <cn>字幕</cn>
                                                        <en>Text</en>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" @click="addOverlay('mask')">
                                                        <cn>马赛克</cn>
                                                        <en>Mosaic</en>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" @click="addOverlay('time')">
                                                        <cn>时间</cn>
                                                        <en>Time</en>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" @click="addOverlay('rect')">
                                                        <cn>矩形</cn>
                                                        <en>Rect</en>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" @click="addOverlay('border')">
                                                        <cn>边框</cn>
                                                        <en>Border</en>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body" >
                                    <div class="row">
                                        <div class="team-list col-lg-12 ps-4">
                                            <div v-for="(item,index) in handleOverlayConf" :key="item.id">
                                                <div :class="['row align-items-center border-start border-4 px-2',layIndex !== index ? 'border-grey' : 'border-warning']">
                                                    <div class="col-1">
                                                        <div>#{{index+1}}</div>
                                                    </div>
                                                    <div class="col-2">
                                                        <h6 class="mb-1 fw-bold" v-if="item.type==='pic'">
                                                            <cn>水印</cn>
                                                            <en>Image</en>
                                                        </h6>
                                                        <h6 class="mb-1 fw-bold" v-else-if="item.type==='text'">
                                                            <cn>字幕</cn>
                                                            <en>Text</en>
                                                        </h6>
                                                        <h6 class="mb-1 fw-bold" v-else-if="item.type==='time'">
                                                            <cn>时间</cn>
                                                            <en>Time</en>
                                                        </h6>
                                                        <h6 class="mb-1 fw-bold" v-else-if="item.type==='mask'">
                                                            <cn>马赛克</cn>
                                                            <en>Mosaic</en>
                                                        </h6>
                                                        <h6 class="mb-1 fw-bold" v-else-if="item.type==='rect'">
                                                            <cn>矩形</cn>
                                                            <en>Rect</en>
                                                        </h6>
                                                        <h6 class="mb-1 fw-bold" v-else="item.type==='border'">
                                                            <cn>边框</cn>
                                                            <en>Border</en>
                                                        </h6>
                                                    </div>
                                                    <div class="col lp-text-overflow">
                                                        <span>{{item.content}}</span>
                                                    </div>
                                                    <div class="col text-center">
                                                        <div>x:{{item.x}},y:{{item.y}}</div>
                                                    </div>
                                                    <div class="col-3 lp-align-center">
                                                        <button type="button" class="btn border-3 btn-primary btn-sm" @click="editOverlay(index)"><i class="fa-solid fa-brush me-1"></i><cn>编辑</cn><en>Edit</en></button>
                                                        <button type="button" class="btn border-3 btn-primary btn-sm ms-2" @click="delOverlay(index)"><i class="fa-regular fa-trash-can me-1"></i><cn>删除</cn><en>Delete</en></button>
                                                    </div>
                                                </div>
                                                <hr>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-lg-12 tips">
                                            <cn>1、水印特效仅支持png格式的图片。</cn>
                                            <en>1. Image effect supports PNG images only.</en>
                                        </div>
                                        <div class="col-lg-12 tips">
                                            <cn>2、时间特效格式中yyyy代表年，MM代表月，dd代表日，hh代表时，mm代表分，ss代表秒。</cn>
                                            <en>2. In the time effect format, yyyy is year, MM is month, dd is day, hh is hour, mm is minute, and ss is second."</en>
                                        </div>
                                        <div v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3516CV610'" class="col-lg-12 tips">
                                            <cn>3、优先以视频流的方式预览，如果对应频道没有开启rtmp或webrtc协议流，则以图片的方式预览。</cn>
                                            <en>3. Prefer video stream preview; if rtmp or webrtc isn't enabled, use image preview.</en>
                                        </div>
                                        <div v-else class="col-lg-12 tips">
                                            <cn>3、预览效果，请先开启对应频道的rtmp或webrtc协议流。</cn>
                                            <en>3. To preview, please first enable the corresponding channel's rtmp or webrtc stream.</en>
                                        </div>
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
                                        <cn>特效编辑</cn>
                                        <en>Effect edit</en>
                                        <small>#{{layIndex+1}}</small>
                                    </div>
                                </div>
                                <div class="card-body" v-if="Object.keys(handleEditData).length !== 0">
                                    <div class="row">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>显示</cn>
                                                <en>Visable</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <bs-switch v-model="handleEditData.enable" :size="'normal'"></bs-switch>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="handleEditData.type === 'mask'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>强度</cn>
                                                <en>Strength</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <select class="form-select" v-model="handleEditData.content">
                                                <option value="8">8</option>
                                                <option value="16">16</option>
                                                <option value="32">32</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="handleEditData.type === 'pic'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>图片</cn>
                                                <en>Image</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <select class="form-select" v-model="handleEditData.content">
                                                <option v-for="(item,index) in handlePngConf" :key="index" :value="item.path">{{item.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="handleEditData.type === 'text'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>文字</cn>
                                                <en>Text</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <input class="form-control"  type="text" v-model.trim.lazy="handleEditData.content" />
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="handleEditData.type === 'time'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>格式</cn>
                                                <en>Format</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <input class="form-control" type="text" v-model.trim.lazy="handleEditData.content" />
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="handleEditData.type === 'time' || handleEditData.type === 'text'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>字体</cn>
                                                <en>Font</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <select class="form-select" v-model="handleEditData.font">
                                                <option v-for="(item,index) in handleFontConf" :key="index" :value="item.path">{{item.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="handleEditData.type === 'text'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>移动</cn>
                                                <en>Move</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="handleEditData.move" :min="-20" :max="20" :step="1" :fix="0"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>水平位置</cn>
                                                <en>Pos X</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="handleEditData.x" :min="0" :max="1" :step="0.001" :fix="3"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>垂直位置</cn>
                                                <en>Pos Y</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="handleEditData.y" :min="0" :max="1" :step="0.001" :fix="3"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="handleEditData.type === 'text' || handleEditData.type === 'mask' || handleEditData.type === 'rect' || handleEditData.type === 'border'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>宽度</cn>
                                                <en>Width</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="handleEditData.w" :min="0" :max="1" :step="0.001" :fix="3"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="handleEditData.type === 'mask' || handleEditData.type === 'rect' || handleEditData.type === 'border'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>高度</cn>
                                                <en>Height</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="handleEditData.h" :min="0" :max="1" :step="0.001" :fix="3"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="handleEditData.type === 'border'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>边框宽度</cn>
                                                <en>Border</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="handleEditData.border" :min="1" :max="50" :step="1" :fix="0"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4" id="color" v-if="handleEditData.type !== 'pic' && handleEditData.type !== 'mask'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>颜色</cn>
                                                <en>Color</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <picker-color v-model="handleEditData.color" :direct="'bottom'"></picker-color>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="handleEditData.type === 'text' || handleEditData.type === 'time'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>背景色</cn>
                                                <en>Back color</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <picker-color v-model="handleEditData.bgColor" :direct="'bottom'"></picker-color>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="handleEditData.type === 'text' || handleEditData.type === 'time' || handleEditData.type === 'pic'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>缩放</cn>
                                                <en>Scale</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="handleEditData.scale" :min="0.1" :max="4" :step="0.01" :fix="2"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="handleEditData.type !== 'mask'">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>透明度</cn>
                                                <en>Alpha</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="handleEditData.alpha" :min="0" :max="1" :step="0.01" :fix="2"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row text-center mt-4">
                                        <button type="button" class="btn border-3 btn-primary me-2 col-lg-2 offset-lg-5" @click="updateOverlayConf"><cn>保存</cn><en>Save</en></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header bg-transparent">
                                    <div class="d-flex align-items-center">
                                        <div class="p-2">
                                            <label class="mb-0 d-flex align-items-end">
                                                <cn>资源列表</cn>
                                                <en>Resource</en>
                                            </label>
                                        </div>
                                        <div class="ms-auto">
                                            <button class="btn border-2 btn-primary btn-sm" @click="uploadRes">
                                                <i class="fa-solid fa-upload me-1"></i>
                                                <label class="lp-cursor-pointer">
                                                    <cn>上传</cn>
                                                    <en>Upload</en>
                                                </label>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body" >
                                    <div class="row">
                                        <div class="team-list col-lg-12">
                                            <div class="p-0 m-0" v-for="(item,index) in handleResList" :key="index">
                                                <div class="row align-items-center px-2" >
                                                    <div class="col-8 text-center lp-text-overflow">
                                                        <span>{{item.name}}</span>
                                                    </div>
                                                    <div class="col-4 lp-align-center">
                                                        <button type="button" class="btn border-3 btn-primary btn-sm" @click="delCurrentRes(item.name)"><i class="fa-regular fa-trash-can me-1"></i><cn>删除</cn><en>Delete</en></button>
                                                    </div>
                                                </div>
                                                <hr>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <upload-modal :modal-title="'上传资源&Upload'" :modal-show="showModal" :modal-fade="true"
                          :upload-allow="['png','ttf']" :upload-action="'/link/upd/uploadRes.php'" :upload-count="2"
                          :upload-tip="'请把资源拖到此处，仅支持png图片，ttf格式字体...&Please drag the resourse here...'"
                          @upload-success="uploadSuccess" @upload-error="uploadError">
            </upload-modal>
        </main>
    </div>
<?php include ("./public/foot.inc") ?>
<script src="assets/plugins/fileinput/js/fileinput.js" type="module"></script>
<script src="assets/plugins/fileinput/js/locales/zh.js" type="module"></script>
<script src="assets/plugins/fileinput/themes/fa6/theme.min.js" type="module"></script>
<script type="module">
    import {rpc, alertMsg, confirm, func, isEmpty} from "./assets/js/lp.utils.js";
    import { useDefaultConf,useOverlayConf,useResConf,useHardwareConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,h5PlayerComponent,bootstrapSwitchComponent,nouiSliderComponent,vueColorPickerComponent,uploadModalComponent,languageOptionDirective } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed} = vue;
    const app = createApp({
        directives: {
            "language-option": languageOptionDirective
        },
        components:{
            "h5-player": h5PlayerComponent,
            "bs-switch" : bootstrapSwitchComponent,
            "noui-slider": nouiSliderComponent,
            "picker-color": vueColorPickerComponent,
            "upload-modal": uploadModalComponent
        },
        setup(props,context) {
            
            const { defaultConf } = useDefaultConf();
            const { overlayConf,updateOverlayConf } = useOverlayConf();
            const { resConf,handleResConf } = useResConf();
            const { hardwareConf } = useHardwareConf();

            const state = {
                activeChnId : ref(-1),
                chnImgUrl : ref(""),
                playerUrl: ref(""),
                playerCodec: ref(""),
                playerAudio: ref(false),
                playerProtocol:ref(""),
                bufferTime:ref(200),
                preType:ref("img"),
                preTypeEle:ref(null),
                handleEditData: reactive({}),
                layIndex : ref(0),
                colors : ref('#194d33'),
                showModal: ref(false),
                modalTitle:ref("")
            }
            
            const updateChnImage = () => {
                state.chnImgUrl.value = "snap/snap" + state.activeChnId.value + ".jpg?rnd=" + Math.random();
                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }

            const unwatch = watchEffect(()=>{
                if(defaultConf.length > 0 && Object.keys(overlayConf).length > 0 && state.preTypeEle.value !== null && state.preTypeEle.value !== undefined) {
                    for(let i=0;i<defaultConf.length;i++) {
                        let item = defaultConf[i];
                        const html = document.querySelector('html');
                        let lang = html.getAttribute('data-bs-language');
                        if(item.enable || hardwareConf.chip === 'HI3516CV610') {
                            state.activeChnId.value = i;
                            if (item.stream.rtmp || item.stream.webrtc) {
                                const protocol = item.stream.rtmp ? "rtmp" : "webrtc";
                                state.activeChnId.value = item.id;
                                if(protocol === 'webrtc')
                                    state.playerUrl.value = `http://${window.location.host}/webrtc?app=live&stream=${item.stream.suffix}`;
                                else
                                    state.playerUrl.value = `http://${window.location.host}/flv?app=live&stream=${item.stream.suffix}`;
                                state.playerCodec.value = item.encv.codec;
                                state.playerAudio.value = false;
                                state.playerProtocol.value = protocol;
                                state.preType.value = "vdo";
                                if(lang === 'cn')
                                    state.preTypeEle.value.add(new Option("视频", "vdo"));
                                else
                                    state.preTypeEle.value.add(new Option("video", "vdo"));
                            }
                            if(lang === 'cn')
                                state.preTypeEle.value.add(new Option("图片", "img"));
                            else
                                state.preTypeEle.value.add(new Option("image", "img"));
                            break;
                        }
                    }
                    editOverlay(0);
                    updateChnImage();
                    unwatch();
                }
            })

            const handleEnableConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return (!!item.enable && item.type !=="ndi");
                })
            })
    
            const handleOverlayConf = computed(()=>{
                return overlayConf[state.activeChnId.value] || [];
            });

            const handleEditData = computed(()=>{
                return handleOverlayConf.value[state.layIndex.value] || {};
            });

            const handlePngConf = computed(()=>{
               return resConf.filter((item,index) => {
                   if(item.name.includes(".png")) {
                       item.path = "/link/res/"+item.name;
                       return true;
                   }
               })
            });

            const handleFontConf = computed(()=>{
                return resConf.filter((item,index) => {
                    if(item.name.includes(".ttf") && item.name !== "led.ttf") {
                        item.path = "/link/res/"+item.name;
                        return true;
                    }
                })
            });

            const handleResList = computed(()=>{
                return resConf.filter((item,index) => {
                    return item.name !== "led.ttf";
                })
            });

            const onChangePlayerChn = (event) => {
                const selectElement = event.target;
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                const protocol = selectedOption.getAttribute('data-attr-protocol');
                const suffix = selectedOption.getAttribute('data-attr-suffix');
                const html = document.querySelector('html');
                let lang = html.getAttribute('data-bs-language');
                state.preTypeEle.value.options.length = 0;
                if(!isEmpty(protocol)) {
                    if(lang === 'cn') {
                        state.preTypeEle.value.add(new Option("视频", "vdo"));
                        state.preTypeEle.value.add(new Option("图片", "img"));
                    } else {
                        state.preTypeEle.value.add(new Option("video", "vdo"));
                        state.preTypeEle.value.add(new Option("image", "img"));
                    }
                    state.preType.value = "vdo";
                    state.playerCodec.value = selectedOption.getAttribute('data-attr-codec');
                    state.playerAudio.value = selectedOption.getAttribute('data-attr-audio');
                    if(protocol === 'webrtc')
                        state.playerUrl.value = `http://${window.location.host}/webrtc?app=live&stream=${suffix}`;
                    else
                        state.playerUrl.value = `http://${window.location.host}/flv?app=live&stream=${suffix}`;
                    state.playerProtocol.value = protocol;
                } else {
                    if(lang === 'cn')
                        state.preTypeEle.value.add(new Option("图片", "img"));
                    else
                        state.preTypeEle.value.add(new Option("image", "img"));
                    state.preType.value = "img";
                    state.playerUrl.value = `http://${window.location.host}/flv?app=live&stream=${suffix}`;
                    state.playerProtocol.value = "rtmp";
                }
            }

            const onChangeBufferTime = () => {
                localStorage.setItem("bufferTime",state.bufferTime.value);
            }

            const handleAutoStyle = () => {
                if(state.activeChnId.value < 0)
                    return "";
                const encv = defaultConf[state.activeChnId.value].encv;
                let { width, height} = encv;
                width = Number(width) > 0 ? Number(width) : 1920;
                height = Number(height) > 0 ? Number(height) : 1080;
                let ww = "100%";
                let hh = (16 * height) / (width * 9) * 100 + "%";
                if (width < height) {
                    hh = "100%";
                    ww = (9 * width) / (height * 16) * 100 + "%";
                }
                return `position: absolute;width: ${ww};height: ${hh};`;
            };

            const editOverlay = (idx) => {
                state.layIndex.value = idx;
            }

            const delOverlay = idx => {
                confirm( {
                    title: '<cn>删除特效</cn><en>Delete effect</en>',
                    content: '<cn>是否确认删除特效？</cn><en>Delete effect?</en>',
                    buttons: {
                        ok: {
                            text: "<cn>确认删除</cn><en>Confirm</en>",
                            btnClass: 'btn-primary',
                            keys: [ 'enter' ],
                            action: () => {
                                overlayConf[state.activeChnId.value].splice(idx, 1);
                                state.layIndex.value = 0;
                                updateOverlayConf("noTip");
                            }
                        },
                        cancel: {
                            text: "<cn>取消</cn><en>Cancel</en>",
                            action: () => {
                                console.log( 'the user clicked cancel' );
                            }
                        }

                    }
                } );
            }

            const addOverlay = type => {
                let lay={
                    type: type,
                    x: 0,
                    y: 0,
                    h: 0,
                    w: 0,
                    scale: 1,
                    content: "",
                    enable: false,
                    color: "#000000",
                    alpha: 1,
                    font: "/link/res/font.ttf"
                };
                if(lay.type === "time")
                    lay.content="yyyy-MM-dd hh:mm:ss";

                overlayConf[state.activeChnId.value].push(lay);
                editOverlay(overlayConf[state.activeChnId.value].length-1)
            }

            const delCurrentRes = resName => {
                confirm( {
                    title: '<cn>删除资源</cn><en>Delete effect</en>',
                    content: '<cn>是否确认删除</cn><en>Delete effect</en> '+ resName + '?',
                    buttons: {
                        ok: {
                            text: "<cn>确认删除</cn><en>Confirm</en>",
                            btnClass: 'btn-primary',
                            keys: [ 'enter' ],
                            action: () => {
                                func("/root/delResFile",resName).then(data => handleResConf());
                            }
                        },
                        cancel: {
                            text: "<cn>取消</cn><en>Cancel</en>"
                        }
                    }
                } );
            }

            const uploadRes = () => {
                state.showModal.value = !state.showModal.value;
            }

            const uploadSuccess = data => {
                handleResConf();
            }

            const uploadError = errMsg => {
                alertMsg(errMsg, 'error');
            }

            return {...state,defaultConf,handleEnableConf,onChangePlayerChn,onChangeBufferTime,
                handleOverlayConf,hardwareConf,handleEditData,handlePngConf,handleFontConf,
                handleResList, handleAutoStyle,editOverlay,delOverlay,addOverlay,delCurrentRes,
                uploadRes,uploadSuccess,uploadError,updateOverlayConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>