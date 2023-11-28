<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content fac" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-4">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header bg-transparent">
                                    <div class="p-2 mb-0 d-flex align-items-end">
                                        <cn>机型切换</cn>
                                        <en>Model switch</en>
                                    </div>
                                </div>
                                <div class="card-body" >
                                    <div class="row mt-3">
                                        <div class="col-lg-4 d-flex lp-align-center">
                                            <cn>机型</cn>
                                            <en>Model</en>
                                        </div>
                                        <div class="col-lg-8">
                                            <select class="form-select" v-model="curFac">
                                                <option v-for="(item,index) in facConf" :value="item">{{item}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row my-3">
                                        <div class="col-lg-12 text-center">
                                            <button type="button" class="btn btn-primary border-2 px-3" @click="updateFacConf">
                                                <cn>保存</cn>
                                                <en>Save</en>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header bg-transparent">
                                    <div class="p-2 mb-0 d-flex align-items-end">
                                        <cn>LPH</cn>
                                        <en>LPH</en>
                                    </div>
                                </div>
                                <div class="card-body" >
                                    <div class="row mt-3">
                                        <div class="col-lg-4 d-flex lp-align-center">
                                            <cn>认证模式</cn>
                                            <en>Auth</en>
                                        </div>
                                        <div class="col-lg-8">
                                            <select class="form-select" v-model="lphConf">
                                                <option value="0" cn="Digest认证+登录验证" en="Digest+Login" v-language-option></option>
                                                <option value="1" cn="仅Digest认证" en="Digest" v-language-option></option>
                                                <option value="2" cn="仅登录验证" en="Login" v-language-option></option>
                                                <option value="3" cn="不验证" en="None" v-language-option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row my-3">
                                        <div class="col-lg-12 text-center">
                                            <button type="button" class="btn btn-primary border-2 px-3" @click="updateLphConf">
                                                <cn>保存</cn>
                                                <en>Save</en>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>功能开关</cn>
                                <en>Function Switch</en>
                            </div>
                        </div>
                        <div class="card-body pb-4">
                            <div class="row">
                                <div class="col-lg-2 p-0 mt-3" v-if="Object.keys(hardwareConf).length > 0" v-for="(item,index) in Object.keys(hardwareConf.function)">
                                    <div class="row">
                                        <div class="col-lg-12 text-center">
                                            {{item}}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="row">
                                        <div class="col-lg-12 lp-align-center">
                                            <bs-switch v-model="hardwareConf.function[item]"></bs-switch>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row mt-3 mb-1">
                                <div class="col-lg-12 text-center" @click="updateHardwareConf">
                                    <button type="button" class="btn btn-primary border-2 px-4">
                                        <cn>保存</cn>
                                        <en>Save</en>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>EDID</cn>
                                <en>EDID</en>
                            </div>
                        </div>
                        <div class="card-body" >
                            <div class="row mt-2">
                                <div class="col-lg-3 d-flex lp-align-center">
                                    <cn>EDID</cn>
                                    <en>EDID</en>
                                </div>
                                <div class="col-lg-8">
                                    <select class="form-select" v-model="edidConf">
                                        <option value="1080">1080</option>
                                        <option value="4k">4k</option>
                                        <option value="RGB">RGB</option>
                                        <option value="ITE">ITE</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn btn-primary border-2 px-3" @click="updateEdidConf">
                                        <cn>保存</cn>
                                        <en>Save</en>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>ColorMode</cn>
                                <en>ColorMode</en>
                            </div>
                        </div>
                        <div class="card-body" >
                            <div class="row mt-2">
                                <div class="col-lg-4 d-flex lp-align-center">
                                    <cn>ColorMode</cn>
                                    <en>ColorMode</en>
                                </div>
                                <div class="col-lg-8">
                                    <select class="form-select" v-model.number="colorModeConf">
                                        <option value="0">Mode1</option>
                                        <option value="1">Mode2</option>
                                        <option value="2">Mode3</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn btn-primary border-2 px-3" @click="updateColorModeConf">
                                        <cn>保存</cn>
                                        <en>Save</en>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>单片机</cn>
                                <en>MCU</en>
                            </div>
                        </div>
                        <div class="card-body" >
                            <div class="row mt-2">
                                <div class="col-lg-4 d-flex lp-align-center">
                                    <cn>ColorMode</cn>
                                    <en>ColorMode</en>
                                </div>
                                <div class="col-lg-8">
                                    <select class="form-select" v-model.number="colorModeConf">
                                        <option value="0">Mode1</option>
                                        <option value="1">Mode2</option>
                                        <option value="2">Mode3</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn btn-primary border-2 px-3" @click="updateColorModeConf">
                                        <cn>保存</cn>
                                        <en>Save</en>
                                    </button>
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
    import { useHardwareConf,useFacConf,useLphConf,useColorModeConf,useEdidConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent,languageOptionDirective } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,onMounted,nextTick} = vue;
    const app = createApp({
        directives: {
            "language-option":languageOptionDirective
        },
        components: {
            "bs-switch" : bootstrapSwitchComponent
        },
        setup(props,context) {
            
            const { hardwareConf,updateHardwareConf } = useHardwareConf();
            const { curFac,facConf,updateFacConf } = useFacConf();
            const { lphConf,updateLphConf } = useLphConf();
            const { colorModeConf,updateColorModeConf } = useColorModeConf();
            const { edidConf,updateEdidConf} = useEdidConf();

            watchEffect(()=>{
                if(Object.keys(hardwareConf).length > 0)
                    curFac.value = hardwareConf.fac;
            })

            return {hardwareConf,updateHardwareConf,curFac,facConf,updateFacConf,
                colorModeConf,updateColorModeConf,edidConf,updateEdidConf,lphConf,updateLphConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>