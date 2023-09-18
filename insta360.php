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
                <div class="col-lg-6 force-equal-height-container">
                    <div class="card force-equal-height-item mb-0">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>Insta360预览</cn>
                                <en>Insta360 Preview</en>
                            </div>
                        </div>
                        <div class="card-body force-align-center">
                            <div class="row">
                                <div class="col-lg-12 mt-2">
                                    <img :src="chnImgUrl" class="card-img" alt="...">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 force-equal-height-container">
                    <div class="force-equal-height-item mb-0">
                        <div class="d-flex flex-column h-100">
                            <div class="flex-fill pb-2">
                                <div class="card h-100">
                                    <div class="card-body d-flex align-items-center">
                                        <ptz-direct :arrow-class="'arrow-direct'" :home-class="'home-direct'" :gop="5" :sticks="['up','down','left','right','home']" @ptz-move="handlePtzMove"></ptz-direct>
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
                                                    <div class="col-lg-4 force-align-center">
                                                        <bs-switch></bs-switch>
                                                    </div>
                                                    <div class="col-lg-4 force-align-center">
                                                        <bs-switch></bs-switch>
                                                    </div>
                                                    <div class="col-lg-4 force-align-center">
                                                        <bs-switch></bs-switch>
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
                                                    <div class="col-lg-4 force-align-center">
                                                        <bs-switch></bs-switch>
                                                    </div>
                                                    <div class="col-lg-4 force-align-center">
                                                        <bs-switch></bs-switch>
                                                    </div>
                                                    <div class="col-lg-4 force-align-center">
                                                        <bs-switch></bs-switch>
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
    import { rpc,alertMsg } from "./assets/js/cul.helper.js";
    import { useDefaultConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent,ptzDirectComponent } from "./assets/js/vue.helper.js"
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
                chnImgUrl: ref("assets/images/nosignal.jpg"),
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
                    state.chnImgUrl.value = "assets/images/nosignal.jpg";

                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }

            const handlePtzMove = type => {
                console.log(type,"@@@");
            }

            onMounted(()=>{

            })
            
            return {...state, handlePtzMove}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>