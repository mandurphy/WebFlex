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
        <main class="page-content insta360" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-6 lp-equal-height-container">
                    <div class="card lp-equal-height-item mb-0">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>Insta360预览</cn>
                                <en>Insta360 Preview</en>
                            </div>
                        </div>
                        <div class="card-body lp-align-center">
                            <div class="row">
                                <div class="col-lg-12 mt-2">
                                    <img :src="chnImgUrl" class="card-img" alt="...">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 lp-equal-height-container">
                    <div class="lp-equal-height-item mb-0">
                        <div class="d-flex flex-column h-100">
                            <div class="flex-fill pb-2">
                                <div class="card h-100">
                                    <div class="card-body d-flex align-items-center">
                                        <ptz-direct :arrow-class="'arrow-direct'" :home-class="'home-direct'" :gop="5" :sticks="['up','down','left','right','home']"
                                                    :zoom-val="ptz.z" :zoom-min="100" :zoom-max="400"
                                                    @ptz-move="handlePtzMove" @zoom-change="handleZoomChange" @call-preset="handleCallPreset" @set-preset="handleSetPreset"></ptz-direct>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-fill">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <div class="row h-100 d-flex align-items-center">
                                            <div class="col-lg-8 offset-lg-2">
                                                <div class="row">
                                                    <div class="col-lg-4 text-center">
                                                        <cn>自动跟踪</cn>
                                                        <en>auto track</en>
                                                    </div>
                                                    <div class="col-lg-4 text-center">
                                                        <cn>白板跟踪</cn>
                                                        <en>whiteboard</en>
                                                    </div>
                                                    <div class="col-lg-4 text-center">
                                                        <cn>俯拍模式</cn>
                                                        <en>Overhead</en>
                                                    </div>
                                                </div>
                                                <hr>
                                                <div class="row">
                                                    <div class="col-lg-4 lp-align-center">
                                                        <bs-switch v-model="options.tracking" @switch-change="onUsbCamOptionChange"></bs-switch>
                                                    </div>
                                                    <div class="col-lg-4 lp-align-center">
                                                        <bs-switch v-model="options.whiteboard" @switch-change="onUsbCamOptionChange"></bs-switch>
                                                    </div>
                                                    <div class="col-lg-4 lp-align-center">
                                                        <bs-switch v-model="options.overhead" @switch-change="onUsbCamOptionChange"></bs-switch>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-8 offset-lg-2 mt-2">
                                                <div class="row">
                                                    <div class="col-lg-4 text-center">
                                                        <cn>桌面模式</cn>
                                                        <en>desktop mode</en>
                                                    </div>
                                                    <div class="col-lg-4 text-center">
                                                        HDR
                                                    </div>
                                                    <div class="col-lg-4 text-center">
                                                        <cn>镜像</cn>
                                                        <en>mirror</en>
                                                    </div>
                                                </div>
                                                <hr>
                                                <div class="row">
                                                    <div class="col-lg-4 lp-align-center">
                                                        <bs-switch v-model="options.deskview" @switch-change="onUsbCamOptionChange"></bs-switch>
                                                    </div>
                                                    <div class="col-lg-4 lp-align-center">
                                                        <bs-switch v-model="options.hdr" @switch-change="onUsbCamOptionChange"></bs-switch>
                                                    </div>
                                                    <div class="col-lg-4 lp-align-center">
                                                        <bs-switch v-model="options.mirror" @switch-change="onUsbCamOptionChange"></bs-switch>
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
        </main>
    </div>
<?php include ("./public/foot.inc") ?>

<script type="module">
    import { rpc } from "./assets/js/lp.utils.js";
    import { useDefaultConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,bootstrapSwitchComponent,ptzDirectComponent } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,onMounted,nextTick} = vue;
    const app = createApp({
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "ptz-direct": ptzDirectComponent,
        },
        setup(props,context) {

            const { defaultConf } = useDefaultConf();

            const state = {
                chnIndex: ref(-1),
                chnImgUrl: ref("assets/img/nosignal.jpg"),
                ptz: reactive({ p: 0, t: 0, z: 300 }),
                options: reactive({tracking: false, whiteboard: false, overhead: false, deskview: false, hdr: false, mirror: false}),
                stepP: 0,
                stepT: 0,
                timerId: 0
            }

            const unwatch = watchEffect(()=>{
                if(defaultConf.length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].type !== "usb")
                            continue;
                        state.chnIndex.value = i;
                    }
                    updateChnImage();
                    unwatch();
                }
            })

            const updateChnImage = () => {
                if(defaultConf[state.chnIndex.value].enable)
                    state.chnImgUrl.value = "snap/snap" + state.chnIndex.value + ".jpg?rnd=" + Math.random();
                else
                    state.chnImgUrl.value = "assets/img/nosignal.jpg";

                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }

            const handleUsbCamState = () => {
                Promise.all([rpc("usb.ptz_get"), rpc("usb.insta360_get")]).then(([data1, data2]) => {
                    if(Object.keys(data1).length > 0)
                        Object.assign(state.ptz,data1);
                    if(Object.keys(data2).length > 0)
                        Object.assign(state.options,data2);
                    setTimeout(handleUsbCamState,500);
                });
            }

            const updatePtz = () => {
                state.ptz.p += state.stepP*3600;
                state.ptz.t += state.stepT*3600;
                rpc("usb.ptz_set", [state.ptz.p,state.ptz.t,state.ptz.p]);
            }

            const ptzMoveStart = () => {
                if(state.timerId === 0)
                    state.timerId=setInterval(updatePtz,100);
            }

            const ptzMoveStop = () => {
                if(state.timerId !== 0) {
                    clearInterval(state.timerId);
                    state.timerId = 0;
                }
                state.stepP = 0;
                state.stepT = 0;
            }

            const handlePtzMove = type => {
                if(type === "up") {
                    ptzMoveStart();
                    state.stepT = 1;
                }
                if(type === "right") {
                    ptzMoveStart();
                    state.stepP = 1;
                }
                if(type === "down") {
                    ptzMoveStart();
                    state.stepT = -1;
                }
                if(type === "left") {
                    ptzMoveStart();
                    state.stepP = -1;
                }
                if(type === "home") {
                    ptzMoveStop();
                    state.ptz.p = 0;
                    state.ptz.t = 0;
                    rpc("usb.ptz_set",[state.ptz.p,state.ptz.t,state.ptz.p]);
                }
                if(type === "move-stop")
                    ptzMoveStop();
            }

            const handleZoomChange = zoomVal => {
                state.ptz.z = zoomVal;
                rpc("usb.ptz_set",[state.ptz.p,state.ptz.t,state.ptz.p]);
            }

            const handleCallPreset = presetVal => {
                rpc("usb.preset_call", [presetVal]);
            }

            const handleSetPreset = presetVal => {
                rpc("usb.preset_set", [presetVal, state.ptz.p,state.ptz.t,state.ptz.p]);
            }

            const onUsbCamOptionChange = () => {
                rpc("usb.insta360_set", [state.options]);
            }

            onMounted(handleUsbCamState);
            
            return {...state, handlePtzMove,handleZoomChange,handleCallPreset,handleSetPreset,onUsbCamOptionChange}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>