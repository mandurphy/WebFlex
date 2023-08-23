<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
<div data-simplebar>
    <main class="page-content rproxy" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-6 mqtt">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>远程访问</cn>
                            <en>Reverse Proxy</en>
                        </div>
                    </div>
                    <div class="card-body" v-if="Object.keys(mqttConf).length > 0">
                        <div class="row mt-5">
                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                <label>
                                    <cn>启用</cn>
                                    <en>Enable</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                               <bootstrap-switch v-model="mqttConf.enable" size="normal"></bootstrap-switch>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                <label>
                                    <cn>状态</cn>
                                    <en>Connect</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <span v-html="mqttConnect"></span>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 offset-lg-1 force-align-center">
                                <label>
                                    <cn>设备名</cn>
                                    <en>Device name</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model="mqttConf.name">
                            </div>
                        </div>
                        <div class="row mt-4 mb-5">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4 me-3" @click="">
                                    <cn>扫码绑定</cn>
                                    <en>Bind</en>
                                </button>
                                <button type="button" class="btn border-3 btn-primary px-4 me-3" @click="">
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
                            <div class="col-lg-2 offset-lg-1 force-align-center">
                                <label>
                                    <cn>启用</cn>
                                    <en>Enable</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <bootstrap-switch v-model="frpEnableConf" size="normal"></bootstrap-switch>
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
                                <button type="button" class="btn border-3 btn-primary px-4" @click="">
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
    import { rpc4,alertMsg } from "./assets/js/helper.js";
    import { useMqttConf,useFrpEnableConf,useFrpcConf } from "./assets/js/vueHooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent } from "./assets/js/vueHelper.js"
    import vue from "./assets/plugins/vue/vue.build.js";

    const {createApp,ref,reactive,watch,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        components:{
            "bootstrap-switch" : bootstrapSwitchComponent
        },
        setup(props,context) {
            
            const { mqttConf } = useMqttConf();
            const { frpEnableConf } = useFrpEnableConf();
            const { frpcConf } = useFrpcConf();

            const state = {
                mqttConnect : ref("<cn>未连接</cn><en>not connected</en>")
            }
            
            const saveUartConf = () => {
                // rpc( "uart.update", [ JSON.stringify( uartConf, null, 2 ) ]).then(data => {
                //     if ( typeof ( data.error ) != "undefined" )
                //         alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                //     else
                //         alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                // })
            }
            
            const saveButtonConf = () => {
                // rpc6( "gpio.update", [ JSON.stringify( buttonConf, null, 2 ) ]).then(data => {
                //     if ( typeof ( data.error ) != "undefined" )
                //         alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                //     else
                //         alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                // })
            }
            
            const handleMqttState = () => {
                rpc4("mqtt.getMqttState").then(data => {
                    if(data.connected)
                        state.mqttConnect.value = '<cn>已连接</cn><en>connected</en>';
                    else
                        state.mqttConnect.value = '<cn>未连接</cn><en>not connected</en>';
                });
                setTimeout(handleMqttState,2000);
            }
            
            onMounted(()=>{
                handleMqttState();
            })
            
            
            return {...state,mqttConf,frpEnableConf,frpcConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>