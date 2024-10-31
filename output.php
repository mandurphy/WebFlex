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
    <main class="page-content output" id="app" v-cloak>
        <div v-if="Object.keys(hardwareConf).length > 0" :class="['row',{'lp-display-hide':!hardwareConf.function.videoOut}]">
            <div class="col-lg-6 lp-equal-height-container" v-if="hardwareConf.fac !== 'ENCS1' && hardwareConf.fac !== 'VGA1'">
                <div class="card lp-equal-height-item">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>输出</cn>
                            <en>Output</en>
                            <div v-if="hardwareConf.fac !== 'ENC1Pro' && hardwareConf.fac !== 'ENC1V3' && hardwareConf.fac !== 'ENC2V3'">1</div>
                            <div v-if="hardwareConf.fac === 'ENC2V3'">2</div>
                        </div>
                    </div>
                    <div class="card-body" v-if="defaultConf.length > 0 && mixIndex > -1">
                        <div class="row">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <cn>HDMI输出</cn>
                                <en>HDMI Output</en>
                            </div>
                            <div class="col-lg-6">
                                <bs-switch v-model="defaultConf[mixIndex].output.enable" :size="'normal'"></bs-switch>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>接口模式</cn>
                                    <en>Interface</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <select class="form-select" v-model="defaultConf[mixIndex].output.type">
                                    <option value="hdmi">HDMI</option>
                                    <option value="dvi">DVI</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
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
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
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
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>左右镜像</cn>
                                    <en>mirror</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <bs-switch v-model="defaultConf[mixIndex].output.mirror" :size="'normal'"></bs-switch>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>视频源</cn>
                                    <en>video source</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <select class="form-select" v-model="defaultConf[mixIndex].output.src">
                                    <option v-for="(item,index) in defaultConf" :key="item.id" :value="item.id">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>低延时</cn>
                                    <en>low latency</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <bs-switch v-model="defaultConf[mixIndex].output.lowLatency" :size="'normal'"></bs-switch>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>色域转换</cn>
                                    <en>CSC</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <select class="form-select" v-model="defaultConf[mixIndex].output.csc.matrix">
                                    <option value="identity" cn="不转换" en="Identity" v-language-option></option>
                                    <option value="601_709">601 to 709</option>
                                    <option value="709_601">709 to 601</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>亮度</cn>
                                    <en>luma</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <noui-slider v-model="defaultConf[mixIndex].output.csc.luma" :min="0" :max="100" :step="1" :fix="0"></noui-slider>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>对比度</cn>
                                    <en>contrast</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <noui-slider v-model="defaultConf[mixIndex].output.csc.contrast" :min="0" :max="100" :step="1" :fix="0"></noui-slider>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>饱和度</cn>
                                    <en>saturation</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <noui-slider v-model="defaultConf[mixIndex].output.csc.saturation" :min="0" :max="100" :step="1" :fix="0"></noui-slider>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>色调</cn>
                                    <en>hue</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <noui-slider v-model="defaultConf[mixIndex].output.csc.hue" :min="0" :max="100" :step="1" :fix="0"></noui-slider>
                            </div>
                        </div>
                        <div class="row my-5 mb-3">
                            <div class="col-lg-12 text-center">
                                <button type="button" @click="updateDefaultConf" class="btn border-3 btn-primary px-5 text-center"><cn>保存</cn><en>Save</en></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 lp-equal-height-container" v-if="hardwareConf.fac !== 'ENC1Pro' && hardwareConf.fac !== 'ENC1V3'">
                <div class="card lp-equal-height-item">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>输出</cn>
                            <en>Output</en>
                            <div v-if="hardwareConf.fac !== 'ENCS1' && hardwareConf.fac !== 'VGA1' && hardwareConf.fac !== 'ENC2V3'">2</div>
                            <div v-if="hardwareConf.fac === 'ENC2V3'">1</div>
                        </div>
                    </div>
                    <div class="card-body" v-if="defaultConf.length > 0 && mixIndex > -1">
                        <div class="row">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label v-if="Object.keys(hardwareConf).length > 0">
                                    {{hardwareConf.capability.extraVo}}
                                    <cn>开关</cn>
                                    <en>enable</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <bs-switch v-model="defaultConf[mixIndex].output2.enable" :size="'normal'"></bs-switch>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>接口模式</cn>
                                    <en>Interface</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <select v-if="Object.keys(hardwareConf).length > 0 && Object.keys(boardConf).length > 0" class="form-select" v-model="defaultConf[mixIndex].output2.type">
                                    <option v-if="hardwareConf.chip === 'SS626V100' && ('HDMI-OUT2' in boardConf.interfaceA)" value="hdmi1">HDMI</option>
                                    <option v-if="hardwareConf.chip !== 'SS626V100' && ('HDMI-OUT2' in boardConf.interfaceA)" value="bt1120">HDMI</option>
                                    <option v-if="'SDI-OUT' in boardConf.interfaceA" value="bt1120">SDI</option>
                                    <option value="vga">VGA</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>分辨率</cn>
                                    <en>resolution</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <select v-if="Object.keys(hardwareConf).length > 0 && Object.keys(boardConf).length > 0" class="form-select" v-model="defaultConf[mixIndex].output2.output">
                                    <option v-if="hardwareConf.chip=== 'SS626V100' && ('HDMI-OUT2' in boardConf.interfaceA)" value="3840x2160_60">4K60</option>
                                    <option v-if="hardwareConf.chip=== 'SS626V100' && ('HDMI-OUT2' in boardConf.interfaceA)" value="3840x2160_50">4K50</option>
                                    <option v-if="defaultConf[mixIndex].output2.type === 'bt1120' && ('HDMI-OUT2' in boardConf.interfaceA)" value="3840x2160_30">4K30</option>
                                    <option value="1080P60">1080P60</option>
                                    <option value="1080I60">1080I60</option>
                                    <option value="1080P50">1080P50</option>
                                    <option value="1080I50">1080I50</option>
                                    <option value="1080P30">1080P30</option>
                                    <option value="1080P25">1080P25</option>
                                    <option value="720P60">720P60</option>
                                    <option value="720P50">720P50</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
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
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>左右镜像</cn>
                                    <en>mirror</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <bs-switch v-model="defaultConf[mixIndex].output2.mirror" :size="'normal'"></bs-switch>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>视频源</cn>
                                    <en>video source</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <select class="form-select" v-model="defaultConf[mixIndex].output2.src">
                                    <option v-for="(item,index) in defaultConf" :key="item.id" :value="item.id">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>低延时</cn>
                                    <en>low latency</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <bs-switch v-model="defaultConf[mixIndex].output2.lowLatency" :size="'normal'"></bs-switch>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>色域转换</cn>
                                    <en>CSC</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <select class="form-select" v-model="defaultConf[mixIndex].output2.csc.matrix">
                                    <option value="identity" cn="不转换" en="Identity" v-language-option></option>
                                    <option value="601_709">601 to 709</option>
                                    <option value="709_601">709 to 601</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>亮度</cn>
                                    <en>luma</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <noui-slider v-model="defaultConf[mixIndex].output2.csc.luma" :min="0" :max="100" :step="1" :fix="0"></noui-slider>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>对比度</cn>
                                    <en>contrast</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <noui-slider v-model="defaultConf[mixIndex].output2.csc.contrast" :min="0" :max="100" :step="1" :fix="0"></noui-slider>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>饱和度</cn>
                                    <en>saturation</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <noui-slider v-model="defaultConf[mixIndex].output2.csc.saturation" :min="0" :max="100" :step="1" :fix="0"></noui-slider>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>色调</cn>
                                    <en>hue</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <noui-slider v-model="defaultConf[mixIndex].output2.csc.hue" :min="0" :max="100" :step="1" :fix="0"></noui-slider>
                            </div>
                        </div>
                        <div class="row my-5 mb-3">
                            <div class="col-lg-12 text-center">
                                <button type="button" @click="updateDefaultConf" class="btn border-3 btn-primary px-5 text-center"><cn>保存</cn><en>Save</en></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
<?php include ("./public/foot.inc") ?>
<script type="module">

    import { useDefaultConf,useHardwareConf,useBoardConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,bootstrapSwitchComponent,nouiSliderComponent,languageOptionDirective } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        directives:{
            "language-option": languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "noui-slider": nouiSliderComponent
        },
        setup(props,context) {
            
            const { defaultConf,updateDefaultConf } = useDefaultConf();
            const { hardwareConf } = useHardwareConf();
            const { boardConf } = useBoardConf();

            const state = {
                mixIndex: ref(-1),
            }

            const unwatch = watchEffect(()=>{
                if(defaultConf.length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].type !== "mix")
                            continue;
                        state.mixIndex.value = i;
                    }
                    unwatch();
                }
            })

            return {...state,defaultConf,hardwareConf,boardConf,updateDefaultConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>