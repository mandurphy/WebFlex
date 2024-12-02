<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
<div data-simplebar>
    <main class="page-content service" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            RTMP
                        </div>
                    </div>
                    <div class="card-body pb-4 gpio-btn">
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 d-flex justify-content-center">
                                <label>
                                    <cn>配置</cn>
                                    <en>Config</en>
                                </label>
                            </div>
                            <div class="col-lg-8">
                                <textarea  class="form-control" name="config" v-model="rtmpConf"></textarea>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4" @click="updateRtmpConf">
                                    <cn>保存</cn>
                                    <en>Save</en>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3520DV400' && hardwareConf.chip !== 'HI3521DV100' && hardwareConf.chip !== 'HI3531DV100'">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            WebRTC
                        </div>
                    </div>
                    <div class="card-body pb-4 gpio-btn">
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 d-flex justify-content-center">
                                <label>
                                    <cn>配置</cn>
                                    <en>Config</en>
                                </label>
                            </div>
                            <div class="col-lg-8">
                                <textarea  class="form-control" name="config" v-model="webrtcConf"></textarea>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4" @click="updateWebRTCConf">
                                    <cn>保存</cn>
                                    <en>Save</en>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            SRT Live Server
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row mt-3" v-if="Object.keys(serviceConf).length > 0">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>启用</cn>
                                    <en>Enable</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <bs-switch v-model="serviceConf.sls" :size="'normal'"></bs-switch>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 d-flex justify-content-center">
                                <label>
                                    <cn>配置</cn>
                                    <en>Config</en>
                                </label>
                            </div>
                            <div class="col-lg-8">
                                <textarea  class="form-control" name="config" v-model="slsConf"></textarea>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4" @click="saveSrtConf">
                                    <cn>保存</cn>
                                    <en>Save</en>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            Frp
                        </div>
                    </div>
                    <div class="card-body pb-4 gpio-btn">
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>启用</cn>
                                    <en>Enable</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <bs-switch v-model="frpEnableConf" :size="'normal'"></bs-switch>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 d-flex justify-content-center">
                                <label>
                                    <cn>配置</cn>
                                    <en>Config</en>
                                </label>
                            </div>
                            <div class="col-lg-8">
                                <textarea  class="form-control" name="config" v-model="frpcConf"></textarea>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4" @click="saveFrpConf">
                                    <cn>保存</cn>
                                    <en>Save</en>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            NDI
                        </div>
                    </div>
                    <div class="card-body pb-4 gpio-btn">
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 d-flex justify-content-center">
                                <label>
                                    <cn>配置</cn>
                                    <en>Config</en>
                                </label>
                            </div>
                            <div class="col-lg-8">
                                <textarea  class="form-control" name="config" v-model="ndiConf"></textarea>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4" @click="updateNdiConf">
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
    import { alertMsg } from "./assets/js/lp.utils.js";
    import { useHardwareConf,useServiceConf,useSlsConf,useRtmpConf,useNdiConf,useFrpEnableConf,useFrpcConf,useWebRTCConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,bootstrapSwitchComponent } from "./assets/js/vue.helper.js";
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watch,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        components:{
            "bs-switch" : bootstrapSwitchComponent
        },
        setup(props,context) {

            const { hardwareConf } = useHardwareConf();
            const { serviceConf,updateServiceConf } = useServiceConf();
            const { slsConf,updateSlsConf } = useSlsConf();
            const { rtmpConf,updateRtmpConf } = useRtmpConf();
            const { ndiConf,updateNdiConf } = useNdiConf();
            const { frpEnableConf,updateFrpEnableConf } = useFrpEnableConf();
            const { frpcConf,updateFrpcConf } = useFrpcConf();
            const { webrtcConf,updateWebRTCConf } = useWebRTCConf();

            const saveSrtConf = () => {
                Promise.all([
                    updateServiceConf("noTip"),
                    updateSlsConf("noTip")
                ]).then((results) => {
                    const [data1, data2] = results;
                    if(data1.status==="success" && data2.status==="success")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                    else
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                });
            }

            const saveFrpConf = () => {
                Promise.all([
                    updateFrpEnableConf("noTip"),
                    updateFrpcConf("noTip")
                ]).then((results) => {
                    const [data1, data2] = results;
                    if(data1.status==="success" && data2.status==="success")
                        alertMsg('<cn>保存设置成功,重启设备生效</cn><en>Save config successfully，please restart the device!</en>', 'success');
                    else
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                });
            }
            
            return {hardwareConf,serviceConf,slsConf,rtmpConf,updateRtmpConf,ndiConf,updateNdiConf,
                frpEnableConf,frpcConf,saveSrtConf,saveFrpConf,webrtcConf,updateWebRTCConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>