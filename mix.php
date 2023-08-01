<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
    <link href="assets/plugins/nouislider/css/nouislider.min.css" rel="stylesheet">
</head>
<body>
<?php include ("./public/menu.inc") ?>
<div data-simplebar>
    <main class="page-content mix" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-6 mx-auto">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="d-flex align-items-center gap-3 px-2 py-1">
                                <div class="flex-grow-0">
                                    <label class="fw-bold">
                                        <cn>频道</cn>
                                        <en>Channel</en>:
                                    </label>
                                </div>
                                <div class="flex-grow-0">
                                    <select class="form-select">
                                        <option v-if="Object.keys(defaultConf).length > 0 && mixIndex > -1" :value="defaultConf[mixIndex].id">{{defaultConf[mixIndex].name}}</option>
                                    </select>
                                </div>
                                <div class="flex-grow-0">
                                    <label class="fw-bold">
                                        <cn>布局</cn>
                                        <en>Layout</en>:
                                    </label>
                                </div>
                                <div class="flex-grow-0">
                                    <select class="form-select" v-model="curLayId" @change="onChangeLayout">
                                        <option v-for="(item,index) in defLaysConf" :value="item.layId">{{item.layName}}</option>
                                    </select>
                                </div>
                                <div class="flex-grow-1 d-flex justify-content-end pe-3">
                                    <i class="fa-solid fa-gear fa-lg force-cursor-pointer"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 mt-2 mb-2">
                                <img :src="chnImgUrl" class="card-img" alt="...">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="col-lg-6 mx-auto">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>布局设定</cn>
                            <en>Layout config</en>
                        </div>
                    </div>
                    <div class="card-body pb-4" >
                        <div class="force-aspect-ratio">
                            <div class="aspect-ratio-content">
                                <div v-for="(item,index) in handleActiveDefLayConf.layouts" :style="{position:'absolute',padding:'1px',width:item.pos.w * 100+'%',height:item.pos.h*100+'%',left:item.pos.x*100+'%',top:item.pos.y*100+'%'}">
                                    <div :style="{width:'100%',height:'100%',backgroundColor: handleLayBackColor(index)}">
                                        <div class="d-flex align-items-center gap-1 border-0 px-2 py-1">
                                            <div class="flex-grow-1">
                                                <select class="form-select" v-model="defaultConf[mixIndex].srcV[index]" @change="saveConf('noTip')">
                                                    <option value="-1" cn="空" en="none" v-language-option></option>
                                                    <option v-for="(it,index) in handleLayoutChnSelect(defaultConf[mixIndex].srcV[index])" :value="it.id">{{it.name}}</option>
                                                </select>
                                            </div>
                                            <div class="flex-grow-0">
                                                <button :class="['btn',{'btn-default':handleActiveVolume(index)},{'px-2 btn-primary':!handleActiveVolume(index)}]" @click="onUpdateActiveVolume(defaultConf[mixIndex].srcV[index])">
                                                    <i :class="['fa-solid',{'fa-volume-off':handleActiveVolume(index)},{'fa-volume-high':!handleActiveVolume(index)}]"></i>
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
        
        <div v-if="Object.keys(hardwareConf).length > 0" :class="['row',{'force-display-hide':!hardwareConf.function.videoOut}]">
            <div class="col-lg-12 mx-auto">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>输出设置</cn>
                            <en>Output Config</en>
                        </div>
                    </div>
                    <div class="card-body" v-if="Object.keys(defaultConf).length > 0">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="row">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>Mix开关</cn>
                                            <en>Mix enable</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <bootstrap-switch v-model="defaultConf[mixIndex].enable" size="normal"></bootstrap-switch>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>HDMI输出</cn>
                                            <en>HDMI Output</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <bootstrap-switch v-model="defaultConf[mixIndex].output.enable" size="normal"></bootstrap-switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>接口模式</cn>
                                            <en>Interface</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <select class="form-select">
                                            <option value="hdmi">HDMI</option>
                                            <option value="dvi">DVI</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>分辨率</cn>
                                            <en>resolution</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <select class="form-select" v-model="defaultConf[mixIndex].output.output">
                                            <option v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.capability.maxOutput === '4K60'" value="3840x2160_60">4K60</option>
                                            <option v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.capability.maxOutput === '4K60'" value="3840x2160_50">4K50</option>
                                            <option v-if="Object.keys(hardwareConf).length > 0 && (hardwareConf.capability.maxOutput === '4K60' || hardwareConf.capability.maxOutput === '4K30')" value="3840x2160_30">4K30</option>
                                            <option value="1080P60">1080P60</option>
                                            <option value="1080I60">1080I60</option>
                                            <option value="1080P50">1080P50</option>
                                            <option value="1080I50">1080I50</option>
                                            <option value="1080P30">1080P30</option>
                                            <option value="1080P25">1080P25</option>
                                            <option value="1080P24">1080P24</option>
                                            <option value="720P60">720P60</option>
                                            <option value="720P50">720P50</option>
                                            <option value="1920x2160_30">1920x2160_30</option>
                                            <option value="2560x1600_60">2560x1600_60</option>
                                            <option value="2560x1440_60">2560x1440_60</option>
                                            <option value="2560x1440_30">2560x1440_30</option>
                                            <option value="1920x1200_60">1920x1200_60</option>
                                            <option value="1680x1050_60">1680x1050_60</option>
                                            <option value="1600x1200_60">1600x1200_60</option>
                                            <option value="1440x900_60">1440x900_60</option>
                                            <option value="1366x768_60">1366x768_60</option>
                                            <option value="1280x1024_60">1280x1024_60</option>
                                            <option value="1280x800_60">1280x800_60</option>
                                            <option value="1024x768_60">1024x768_60</option>
                                            <option value="800x600_60">800x600_60</option>
                                            <option value="576P50">576P50</option>
                                            <option value="480P60">480P60</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>旋转</cn>
                                            <en>rotate</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <select class="form-select" v-model="defaultConf[mixIndex].output.rotate">
                                            <option value="0">0</option>
                                            <option value="90">90</option>
                                            <option value="180">180</option>
                                            <option value="270">270</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>视频源</cn>
                                            <en>video source</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <select class="form-select" v-model="defaultConf[mixIndex].output.src">
                                            <option v-for="(item,index) in handleEnableConf" :value="item.id">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>低延时</cn>
                                            <en>low latency</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <bootstrap-switch v-model="defaultConf[mixIndex].output.lowLatency" size="normal"></bootstrap-switch>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>色域转换</cn>
                                            <en>CSC</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <select class="form-select" v-model="defaultConf[mixIndex].output.csc.matrix">
                                            <option value="identity" cn="不转换" en="Identity"></option>
                                            <option value="601_709">601 to 709</option>
                                            <option value="709_601">709 to 601</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>亮度</cn>
                                            <en>luma</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <noui-slider v-model="defaultConf[mixIndex].output.csc.luma" min="0" max="100" step="1" fix="0"></noui-slider>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>对比度</cn>
                                            <en>contrast</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <noui-slider v-model="defaultConf[mixIndex].output.csc.contrast" min="0" max="100" step="1" fix="0"></noui-slider>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>饱和度</cn>
                                            <en>saturation</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <noui-slider v-model="defaultConf[mixIndex].output.csc.saturation" min="0" max="100" step="1" fix="0"></noui-slider>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>色调</cn>
                                            <en>hue</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <noui-slider v-model="defaultConf[mixIndex].output.csc.hue" min="0" max="100" step="1" fix="0"></noui-slider>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-lg-6">
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label v-if="Object.keys(hardwareConf).length > 0">
                                            {{hardwareConf.capability.extraVo}}
                                            <cn>开关</cn>
                                            <en>enable</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <bootstrap-switch v-model="defaultConf[mixIndex].output2.enable" size="normal"></bootstrap-switch>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>分辨率</cn>
                                            <en>resolution</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <select class="form-select" v-model="defaultConf[mixIndex].output2.output">
                                            <option value="1080P60">1080P60</option>
                                            <option value="1080I60">1080I60</option>
                                            <option value="1080P50">1080P50</option>
                                            <option value="1080I50">1080I50</option>
                                            <option value="1080P30">1080P30</option>
                                            <option value="720P60">720P60</option>
                                            <option value="720P50">720P50</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>旋转</cn>
                                            <en>rotate</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <select class="form-select" v-model="defaultConf[mixIndex].output2.rotate">
                                            <option value="0">0</option>
                                            <option value="90">90</option>
                                            <option value="180">180</option>
                                            <option value="270">270</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>视频源</cn>
                                            <en>video source</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <select class="form-select" v-model="defaultConf[mixIndex].output2.src">
                                            <option v-for="(item,index) in handleEnableConf" :value="item.id">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>低延时</cn>
                                            <en>low latency</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <bootstrap-switch v-model="defaultConf[mixIndex].output2.lowLatency" size="normal"></bootstrap-switch>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>色域转换</cn>
                                            <en>CSC</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <select class="form-select" v-model="defaultConf[mixIndex].output2.csc.matrix">
                                            <option value="identity" cn="不转换" en="Identity"></option>
                                            <option value="601_709">601 to 709</option>
                                            <option value="709_601">709 to 601</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>亮度</cn>
                                            <en>luma</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <noui-slider v-model="defaultConf[mixIndex].output2.csc.luma" min="0" max="100" step="1" fix="0"></noui-slider>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>对比度</cn>
                                            <en>contrast</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <noui-slider v-model="defaultConf[mixIndex].output2.csc.contrast" min="0" max="100" step="1" fix="0"></noui-slider>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>饱和度</cn>
                                            <en>saturation</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <noui-slider v-model="defaultConf[mixIndex].output2.csc.saturation" min="0" max="100" step="1" fix="0"></noui-slider>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 offset-lg-1 force-align-center">
                                        <label>
                                            <cn>色调</cn>
                                            <en>hue</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <noui-slider v-model="defaultConf[mixIndex].output2.csc.hue" min="0" max="100" step="1" fix="0"></noui-slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="mt-4 mb-4">
                        <div class="row mb-3">
                            <button type="button" @click="saveConf" class="col-2 offset-5 btn border-3 btn-primary text-center"><cn>保存</cn><en>Save</en></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
<?php include ("./public/foot.inc") ?>

<script src="assets/plugins/nouislider/js/nouislider.min.js"></script>
<script type="module">
    
    import { rpc,alertMsg } from "./assets/js/helper.js";
    import { useDefaultConf,useDefLaysConf,useHardwareConf } from "./assets/js/confHooks.js";
    import { bootstrapSwitchComponent,nouiSliderComponent,languageOptionDirective } from "./assets/js/vueHelper.js"
    
    const {createApp,ref,reactive,watchEffect,computed} = Vue;
    const app = createApp({
        directives:{
            "language-option": languageOptionDirective
        },
        components:{
            "bootstrap-switch" : bootstrapSwitchComponent,
            "noui-slider": nouiSliderComponent
        },
        setup(props,context) {
            
            const { defaultConf } = useDefaultConf();
            const { defLaysConf } = useDefLaysConf();
            const { hardwareConf } = useHardwareConf();

            const state = {
                chnImgUrl: ref(""),
                curLayId: ref(-1),
                mixIndex: ref(-1)
            }
            
            const updateChnImage = () => {
                state.chnImgUrl.value = "snap/snap" + defaultConf[state.mixIndex.value].id + ".jpg?rnd=" + Math.random();
                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }
    
            const handleEnableConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return !!item.enable;
                })
            })
            
            const handleActiveDefLayConf = computed(()=>{
                return defLaysConf.find((item) => item.layId === state.curLayId.value) || {};
            });
            
            const handleLayoutChnSelect = computed(() => {
                return (chnId) => {
                    let srcV = defaultConf[state.mixIndex.value].srcV;
                    return defaultConf.filter((item,index)=>{
                        return !(srcV.indexOf(item.id) > -1 && item.id !== chnId);
                    });
                };
            });
    
            const handleActiveVolume = index => {
                return defaultConf[state.mixIndex.value].srcA.indexOf(defaultConf[state.mixIndex.value].srcV[index]) === -1;
            };
            
            const onUpdateActiveVolume = chnId => {
                if(chnId === "-1")
                    return;
                
                let idx = defaultConf[state.mixIndex.value].srcA.indexOf(chnId);
                if(idx === -1)
                    defaultConf[state.mixIndex.value].srcA.push(chnId);
                else
                    defaultConf[state.mixIndex.value].srcA.splice(idx, 1);
                
                saveConf("noTip");
            };
    
            const unwatch = watchEffect(()=>{
                if(Object.keys(defaultConf).length > 0 && Object.keys(defLaysConf).length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].type !== "mix")
                            continue;
    
                        var layList = [];
                        let mixChn = defaultConf[i];
                        for (let j = 0; j < mixChn.layout.length; j++) {
                            let layout = mixChn.layout[j];
                            let layObj = {
                                "a": layout.a,
                                "x": layout.x,
                                "y": layout.y,
                                "w": layout.w,
                                "h": layout.h,
                                "index": layout.index
                            }
                            layList.push(layObj);
                        }
                        let curLayStr = JSON.stringify(layList);
                        
                        for (let j = 0; j < defLaysConf.length; j++) {
                            let las = defLaysConf[j].layouts;
                            let layout = [];
                            for (let k = 0; k < las.length; k++) {
                                layout.push(las[k].pos);
                            }
                            if(curLayStr === JSON.stringify(layout)) {
                                state.curLayId.value = defLaysConf[j].layId;
                                break;
                            }
                        }
                        state.mixIndex.value = i;
                    }
                    updateChnImage();
                    unwatch();
                }
            })
            
            const onChangeLayout = () => {
                let layout = [];
                let srcV = [];
                let mark = false;
                for(let i=0;i<defLaysConf.length;i++) {
                    if(state.curLayId.value === defLaysConf[i].layId) {
                        let las = defLaysConf[i].layouts;
                        for (let j = 0; j < las.length; j++) {
                            layout.push(las[j].pos);
                            if(las[j].id < 0) {
                                srcV.push("-1");
                            } else {
                                srcV.push(las[j].id + "");
                                mark = true;
                            }
                        }
                    }
                }
                
                if(!mark)
                {
                    if (srcV.length >= defaultConf[state.mixIndex.value].srcV.length)
                        srcV.splice(0, defaultConf[state.mixIndex.value].srcV.length, ...defaultConf[state.mixIndex.value].srcV);
                    else
                        srcV = defaultConf[state.mixIndex.value].srcV.slice(0, srcV.length);
                }
                defaultConf[state.mixIndex.value].srcV.splice(0, defaultConf[state.mixIndex.value].srcV.length, ...srcV);
                defaultConf[state.mixIndex.value].layout.splice(0, defaultConf[state.mixIndex.value].layout.length, ...layout);
                saveConf("noTip");
                const options = document.querySelectorAll(`option[cn]`);
                options.forEach(option => {
                    option.textContent = option.getAttribute('cn');
                });
            }
            
            const handleLayBackColor = (idx) => {
                let color = 128;
                if(idx % 2 === 0)
                    color += 25 * (idx / 2);
                else
                    color -= 25 * (idx / 2 + 1);
                return "rgb(" + color + "," + color + "," + color + ")";
            }
            
            const saveConf = (tip) => {
                rpc( "enc.update", [ JSON.stringify( defaultConf, null, 2 ) ]).then(data => {
                    if(tip != "noTip") {
                        if ( typeof ( data.error ) != "undefined" )
                            alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                        else
                            alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                    }
                });
            }
            
            return {...state,defaultConf,defLaysConf,hardwareConf,handleEnableConf,handleActiveDefLayConf,onChangeLayout,handleLayBackColor,handleActiveVolume,onUpdateActiveVolume,handleLayoutChnSelect,saveConf}
        }
    });
    app.mount('#app');
</script>
</body>
</html>