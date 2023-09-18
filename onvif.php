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
    <main class="page-content onvif" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="row">
                            <div class="d-flex align-items-center gap-3 px-2 py-1">
                                <div class="flex-grow-0">
                                    <cn>频道</cn>
                                    <en>Channel</en>:
                                </div>
                                <div class="flex-grow-0">
                                    <select class="form-select" v-model="chnIndex">
                                        <option v-for="(item,index) in handleEnableConf" :key="item.id" :value="item.id">{{item.name}}</option>
                                    </select>
                                </div>
                                <div class="flex-grow-0 pt-2">
                                    <small>
                                        <cn>需要开启对应通道的rtmp协议输出流</cn>
                                        <en>Need to enable the rtmp protocol output stream of the corresponding channel</en>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body" >
                        <div class="row">
                            <div class="col-lg-7 force-equal-height-container">
                                <div class="card force-equal-height-item">
                                    <div class="card-body d-flex flex-column">
                                        <div class="row mt-3 flex-grow-1 force-align-center">
                                            <div class="col-lg-12">
                                                <img :src="chnImgUrl" class="card-img" alt="...">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 force-equal-height-container">
                                <div class="card force-equal-height-item">
                                    <div class="card-header bg-transparent">
                                        <div class="p-2 mb-0 d-flex align-items-end">
                                            <cn>Onvif PTZ配置</cn>
                                            <en>Onvif PTZ Config</en>
                                        </div>
                                    </div>
                                    <div class="card-body d-flex flex-column justify-content-between">
                                        <div class="row"></div>
                                        <div class="row">
                                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                                <label>
                                                    <cn>用户名</cn>
                                                    <en>Username</en>
                                                </label>
                                            </div>
                                            <div class="col-lg-7">
                                               <input class="form-control">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                                <label>
                                                    <cn>密码</cn>
                                                    <en>Password</en>
                                                </label>
                                            </div>
                                            <div class="col-lg-7">
                                                <input class="form-control">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                                <label>
                                                    <cn>水平速度</cn>
                                                    <en>Horizontal speed</en>
                                                </label>
                                            </div>
                                            <div class="col-lg-7">
                                                <noui-slider v-model="" :min="0.01" :max="1" :step="0.01" :fix="2"></noui-slider>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                                <label>
                                                    <cn>垂直速度</cn>
                                                    <en>Vertical speed</en>
                                                </label>
                                            </div>
                                            <div class="col-lg-7">
                                                <noui-slider v-model="" :min="0.01" :max="1" :step="0.01" :fix="2"></noui-slider>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                                <label>
                                                    <cn>变焦速度</cn>
                                                    <en>zoom speed</en>
                                                </label>
                                            </div>
                                            <div class="col-lg-7">
                                                <noui-slider v-model="" :min="0.01" :max="1" :step="0.01" :fix="2"></noui-slider>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-12 text-center">
                                                <button type="button" class="btn border-3 btn-primary px-4" @click="updateGb28181Conf"><cn>保存</cn><en>Save</en></button>
                                            </div>
                                        </div>
                                        <div class="row"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 force-equal-height-container">
                <div class="force-equal-height-item">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header bg-transparent">
                                    <div class="p-2 mb-0 d-flex align-items-end">
                                        <cn>摄像机控制</cn>
                                        <en>Camera control</en>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <ptz-direct :arrow-class="'arrow-direct'" :home-class="'home-direct'" :gop="5" @ptz-move="handlePtzMove"></ptz-direct>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header bg-transparent">
                                    <div class="p-2 mb-0 d-flex align-items-end">
                                        <cn>自动巡视</cn>
                                        <en>Auto Patrol</en>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row my-3">
                                        <div class="col-lg-3 d-flex align-items-center justify-content-end">
                                            <cn>方案</cn>
                                            <en>Scene</en>
                                        </div>
                                        <div class="col-lg-3 force-align-center">
                                            <select class="form-select">
                                                <option value="plan1" cn="方案1" en="plan1" v-language-option></option>
                                                <option value="plan2" cn="方案1" en="plan1" v-language-option></option>
                                                <option value="plan3" cn="方案1" en="plan1" v-language-option></option>
                                            </select>
                                        </div>
                                        <div class="col-lg-6">
                                            <button type="button" class="btn border-3 btn-primary px-3 me-2" @click=""><cn>编辑</cn><en>Edit</en></button>
                                            <button type="button" class="btn border-3 btn-primary px-3" @click=""><cn>启用</cn><en>Enable</en></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 force-equal-height-container">
                <div class="card force-equal-height-item">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>查找设备</cn>
                            <en>Search Devices</en>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div class="row"></div>
                        <div class="row">
                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                <label>
                                    <cn>设备</cn>
                                    <en>Device</en>
                                </label>
                            </div>
                            <div class="col-lg-5">
                                <select class="form-select"></select>
                            </div>
                            <div class="col-lg-2">
                                <loading-button custom-class="btn border-3 btn-primary px-2 me-2">
                                    <cn>搜索设备</cn>
                                    <en>Search</en>
                                </loading-button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                <label>
                                    <cn>用户名</cn>
                                    <en>Username</en>
                                </label>
                            </div>
                            <div class="col-lg-7">
                                <input class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                <label>
                                    <cn>密码</cn>
                                    <en>Password</en>
                                </label>
                            </div>
                            <div class="col-lg-7">
                                <input class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                <label>
                                    <cn>流分辨率</cn>
                                    <en>Resolution</en>
                                </label>
                            </div>
                            <div class="col-lg-5">
                                <select class="form-select"></select>
                            </div>
                            <div class="col-lg-2">
                                <button type="button" class="btn border-3 btn-primary px-4 me-2">
                                    <cn>获取</cn>
                                    <en>Get</en>
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                <label>
                                    <cn>绑定通道</cn>
                                    <en>Bind</en>
                                </label>
                            </div>
                            <div class="col-lg-7">
                                <select class="form-select"></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4" @click="updateGb28181Conf"><cn>保存</cn><en>Save</en></button>
                            </div>
                        </div>
                        <div></div>
                        <div class="row">
                            <div class="col-lg-12">
                                <small class="mx-3" style="color: gray">
                                    <cn>提示：点击保存按钮会自动打开对应通道的rtmp输出流</cn>
                                    <en>Tip: Clicking the Save button will automatically open the rtmp output stream for the channel</en>
                                </small>
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
    import vue from "./assets/js/vue.build.js";
    import { rpc } from "./assets/js/cul.helper.js";
    import { useDefaultConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent,nouiSliderComponent,ptzDirectComponent,languageOptionDirective,loadingButtonComponent } from "./assets/js/vue.helper.js"

    const {createApp,ref,reactive,watchEffect,computed,onMounted,nextTick} = vue;
    const app = createApp({
        directives:{
            "language-option":languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "noui-slider": nouiSliderComponent,
            "ptz-direct": ptzDirectComponent,
            "loading-button": loadingButtonComponent
        },
        setup(props,context) {

            const { defaultConf } = useDefaultConf();

            const state = {
                chnIndex : ref(-1),
                chnImgUrl : ref(""),
            }

            const updateChnImage = () => {
                state.chnImgUrl.value = "snap/snap" + state.chnIndex.value + ".jpg?rnd=" + Math.random();
                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }

            const unwatch = watchEffect(()=>{
                if(defaultConf.length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].enable) {
                            state.chnIndex.value = i;
                            break;
                        }
                    }
                    updateChnImage();
                    unwatch();
                }
            })

            const handleEnableConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return !!item.enable;
                })
            })

            return {...state,handleEnableConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>