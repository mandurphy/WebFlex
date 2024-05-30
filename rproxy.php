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
            <div class="col-lg-6 mqtt lp-equal-height-container" v-if="handleDocumentTitle==='LinkPi'">
                <div class="card lp-equal-height-item">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>远程访问</cn>
                            <en>Reverse Proxy</en>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between" v-if="Object.keys(mqttConf).length > 0">
                        <div class="row"></div>
                        <div class="row"></div>
                        <div class="row">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>启用</cn>
                                    <en>Enable</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <bs-switch v-model="mqttConf.enable" :size="'normal'"></bs-switch>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>状态</cn>
                                    <en>Connect</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <span v-html="mqttConnect"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>设备名</cn>
                                    <en>Device name</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model="mqttConf.name">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4 me-3" @click="bindMqtt">
                                    <cn>扫码绑定</cn>
                                    <en>Bind</en>
                                </button>
                                <button type="button" class="btn border-3 btn-primary px-4 me-3" @click="updateMqttConf">
                                    <cn>保存</cn>
                                    <en>Save</en>
                                </button>
                            </div>
                        </div>
                        <div class="row"></div>
                        <div class="row"></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 lp-equal-height-container">
                <div class="card lp-equal-height-item">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>Rtty</cn>
                            <en>Rtty</en>
                        </div>
                    </div>
                    <div class="card-body pb-4 gpio-btn">
                        <div class="row mt-3" v-if="Object.keys(rttyConf).length > 0">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>启用</cn>
                                    <en>Enable</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <bs-switch v-model="rttyConf.enable" :size="'normal'"></bs-switch>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 d-flex justify-content-center">
                                <label>
                                    <cn>描述</cn>
                                    <en>Desc</en>
                                </label>
                            </div>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" v-model.trim.lazy="rttyConf.des">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 d-flex justify-content-center">
                                <label>
                                    <cn>IP</cn>
                                    <en>IP</en>
                                </label>
                            </div>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" v-model.trim.lazy="rttyConf.ip">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 d-flex justify-content-center">
                                <label>
                                    <cn>ID</cn>
                                    <en>ID</en>
                                </label>
                            </div>
                            <div class="col-lg-8">
                                <input type="text" class="form-control disabled" disabled readonly v-model.trim.lazy="rttyConf.id">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 d-flex justify-content-center">
                                <label>
                                    <cn>Token</cn>
                                    <en>Token</en>
                                </label>
                            </div>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" v-model.trim.lazy="rttyConf.token">
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4" @click="saveRttyConf">
                                    <cn>保存</cn>
                                    <en>Save</en>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <mqtt-modal :modal-title="'扫一扫绑定设备&Scan qrcode'" :modal-show="showMqttModal"
                    :had-confirm-btn="false" :cancel-btn-name="'确定&OK'" @modal-visible="onModalVisible">
            <div class="text-center" ref="qrcodeHandler"></div>
        </mqtt-modal>
    </main>
</div>
<?php include ("./public/foot.inc") ?>
<script src="assets/plugins/qrcode/qrcode.js"></script>
<script type="module">
    import { rpc4,func,alertMsg } from "./assets/js/lp.utils.js";
    import { useMqttConf,useRttyConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,bootstrapSwitchComponent,customModalComponent } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watch,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "mqtt-modal": customModalComponent
        },
        setup(props,context) {
            
            const { mqttConf,updateMqttConf } = useMqttConf();
            const { rttyConf,updateRttyConf } = useRttyConf();

            const state = {
                mqttConnect : ref("<cn>未连接</cn><en>not connected</en>"),
                qrcodeHandler: ref(null),
                showMqttModal: ref(false),
                timeoutId: ref(-1)
            }

            const handleDocumentTitle = computed(()=>{
                return document.title;
            })
            const handleMqttState = () => {
                rpc4("mqtt.getMqttState").then(data => {
                    if(data.connected)
                        state.mqttConnect.value = '<cn>已连接</cn><en>connected</en>';
                    else
                        state.mqttConnect.value = '<cn>未连接</cn><en>not connected</en>';
                });
                setTimeout(handleMqttState,2000);
            }

            const checkBind = type => {
                if(type) {
                    rpc4( "mqtt.bindOK").then(data => {
                        if(!data) {
                            state.timeoutId.value = setTimeout(()=> checkBind(type), 500);
                            return;
                        }
                        state.showMqttModal.value = !state.showMqttModal.value;
                        alertMsg('<cn>绑定成功</cn><en>Bind successfully!</en>', 'success');
                    });
                    return;
                }
                clearTimeout(state.timeoutId.value);
            }

            const bindMqtt = () => {
                rpc4("mqtt.startBind").then( data => {
                    state.qrcodeHandler.value.innerHTML = "";
                    new QRCode(state.qrcodeHandler.value, "https://mqtt.linkpi.cn/wechat?sn=" + data);
                    state.showMqttModal.value = !state.showMqttModal.value;
                } );
            }

            const onModalVisible = visible => {
                checkBind(visible);
            }

            const saveRttyConf = () => {
                updateRttyConf().then(()=>{
                    func("/system/reloadRtty");
                })
            }
            
            onMounted(handleMqttState);
            return {...state,mqttConf,rttyConf,handleDocumentTitle,updateMqttConf,saveRttyConf,bindMqtt,onModalVisible}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>