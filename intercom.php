<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content intercom" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-6" v-for="(rowItems, rowIndex) in handleDevicesArray" :key="rowIndex">
                    <div class="row row-cols-4">
                        <div class="col-lg-3" v-for="(item, index) in rowItems" :key="index">
                            <div class="card">
                                <div class="card-header bg-transparent">
                                    <div class="py-1 px-2 text-center">
                                        {{ item.title }}
                                    </div>
                                </div>
                                <div class="card-body text-center">
                                    <div :class="['intercomBtn','state'+item.state]">
                                        <i :class="['fa fa-microphone intercomMic',{'lp-display-hide':!item.talking}]"></i>
                                        <span>{{ item.content }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="row" v-if="Object.keys(intercomConf).length > 0">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>集成通信设置</cn>
                                <en>Intercom config</en>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row mt-3">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>开关</cn>
                                        <en>Enable</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <bs-switch v-model="intercomConf.intercom.enable" :size="'normal'"></bs-switch>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>服务器IP</cn>
                                        <en>Server IP</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" v-model="intercomConf.intercom.ip">
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>服务器端口</cn>
                                        <en>Server port</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" v-model="intercomConf.intercom.port">
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>名称</cn>
                                        <en>Name</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" v-model="intercomConf.intercom.name">
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>本机ID</cn>
                                        <en>Local ID</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <select class="form-select" v-model="intercomConf.intercom.did">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>目标ID</cn>
                                        <en>Target ID</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <select class="form-select" v-model="intercomConf.intercom.tid">
                                        <option value="-1">ALL</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>缓冲时间</cn>
                                        <en>Buffer time</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <select class="form-select" v-model="intercomConf.intercom.buf">
                                        <option value="8">200ms</option>
                                        <option value="16">400ms</option>
                                        <option value="24">600ms</option>
                                        <option value="32">800ms</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>麦克增益</cn>
                                        <en>Mic gain</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <select class="form-select" v-model="intercomConf.intercom.gain">
                                        <option value="24">+24db</option>
                                        <option value="18">+18db</option>
                                        <option value="12">+12db</option>
                                        <option value="6">+6db</option>
                                        <option value="0">+0db</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row my-4">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>自动静音</cn>
                                        <en>Auto mute</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <select class="form-select" v-model="intercomConf.intercom.vad">
                                        <option value="-1" cn="按键发言" en="Press to speak" v-language-option></option>
                                        <option value="0" cn="常开" en="Keep open" v-language-option></option>
                                        <option value="40" cn="低" en="Low" v-language-option></option>
                                        <option value="50" cn="中" en="Mid" v-language-option></option>
                                        <option value="65" cn="高" en="High" v-language-option></option>
                                    </select>
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
                                        <cn>导播软件对接</cn>
                                        <en>Director software hook</en>
                                    </div>
                                </div>
                                <div class="card-body" >
                                    <div class="row mt-3">
                                        <div class="col-lg-2 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>开关</cn>
                                                <en>Enable</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <bs-switch v-model="intercomConf.vmix.enable" :size="'normal'"></bs-switch>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-lg-2 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>模式</cn>
                                                <en>Model</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <select class="form-select" v-model="intercomConf.vmix.mode">
                                                <option value="vmix">vMix</option>
                                                <option value="sinsam">Sinsam</option>
                                                <option value="rs232">RS232</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row my-4">
                                        <div class="col-lg-2 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>导播IP</cn>
                                                <en>Director IP</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <input type="text" class="form-control" v-model="intercomConf.vmix.ip">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header bg-transparent">
                                    <div class="p-2 mb-0 d-flex align-items-end">
                                        <cn>集成通信服务端</cn>
                                        <en>Intercom server</en>
                                    </div>
                                </div>
                                <div class="card-body" >
                                    <div class="row my-3">
                                        <div class="col-lg-2 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>开关</cn>
                                                <en>Enable</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <bs-switch v-model="intercomConf.server.enable" :size="'normal'"></bs-switch>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header bg-transparent">
                                    <div class="p-2 mb-0 d-flex align-items-end">
                                        <cn>Tally灯控制</cn>
                                        <en>Tally light control</en>
                                    </div>
                                </div>
                                <div class="card-body" >
                                    <div class="row mt-3 mb-4">
                                        <div class="col-lg-4" v-if="!hadLed">
                                            <div class="row">
                                                <div class="col-lg-5 lp-align-center">
                                                    <label>
                                                        <cn>开关</cn>
                                                        <en>Enable</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <bs-switch v-model="intercomConf.tally.enable" :size="'normal'"></bs-switch>
                                                </div>
                                            </div>
                                        </div>
                                        <div :class="['col-lg-3',{'offset-lg-2':hadLed}]">
                                            <button type="button" class="btn border-3 btn-primary px-4" @click="showTallyModal = !showTallyModal">
                                                <cn>测试</cn>
                                                <en>Test</en>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row my-4">
                                <button type="button" @click="updateIntercomConf" class="col-2 offset-5 btn border-3 btn-primary text-center"><cn>保存</cn><en>Save</en></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <tally-modal :modal-title="'Tally灯测试&Tally test'" :modal-show="showTallyModal"
                           :confirm-btn-name="'测试&Test'" :cancel-btn-name="'取消&Cancel'" @confirm-btn-click="onTallyTest">
                <div class="row">
                    <div class="col-lg-2 lp-align-center">
                        <cn>PVM</cn>
                        <en>PVM</en>
                    </div>
                    <div class="col-lg-2 lp-align-center">
                        <select class="form-select" v-model="tallyPVMVal">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                    <div class="col-lg-2 lp-align-center">
                        <cn>PGM</cn>
                        <en>PGM</en>
                    </div>
                    <div class="col-lg-3 lp-align-center">
                        <select class="form-select" v-model="tallyPGMVal">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                </div>
            </tally-modal>
        </main>
    </div>
    <?php include ("./public/foot.inc") ?>

<script type="module">
    import {rpc, alertMsg, clearReactiveObject, func} from "./assets/js/lp.utils.js";
    import { useIntercomConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,bootstrapSwitchComponent,languageOptionDirective,customModalComponent } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";
    const {createApp,ref,reactive,watch,watchEffect,computed,onMounted} = vue;

    const app = createApp({
        directives: {
            "language-option": languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "tally-modal": customModalComponent
        },
        setup(props,context) {
    
            const { intercomConf,defIntercomConf,updateIntercomConf } = useIntercomConf();

            const state = {
                showTallyModal:ref(false),
                tallyPVMVal: ref(1),
                tallyPGMVal: ref(1),
                intercomState: reactive({}),
                hadLed: ref(false)
            }
            
            const handleDevicesArray = computed(()=>{

                const deviceList = [
                    { id: 1, title: 'offline', content: '1',talking:false, state:-1 },
                    { id: 2, title: 'offline', content: '2',talking:false, state:-1 },
                    { id: 3, title: 'offline', content: '3',talking:false, state:-1 },
                    { id: 4, title: 'offline', content: '4',talking:false, state:-1 },
                    { id: 5, title: 'offline', content: '5',talking:false, state:-1 },
                    { id: 6, title: 'offline', content: '6',talking:false, state:-1 },
                    { id: 7, title: 'offline', content: '7',talking:false, state:-1 },
                    { id: 8, title: 'offline', content: '8',talking:false, state:-1 },
                ];

                if(Object.keys(state.intercomState).length > 0 && Object.keys(intercomConf).length > 0) {
                    deviceList.forEach(dev => {
                        if(dev.id === parseInt(defIntercomConf.intercom.did) && defIntercomConf.intercom.enable && defIntercomConf.server.enable) {
                            dev.title = defIntercomConf.intercom.name;
                            dev.talking = state.intercomState.talking;
                            dev.state = 0;
                        }
                    })
                    state.intercomState.intercom.forEach((item,index) => {
                        deviceList.forEach((dev,idx) => {
                            if(dev.id === item.id || dev.id === parseInt(intercomConf.intercom.did)) {
                                if(dev.id === item.id) {
                                    dev.title = item.name;
                                } else {
                                    dev.title = intercomConf.intercom.name;
                                    dev.talking = state.intercomState.talking;
                                }
                                let count = 0;
                                if(state.intercomState.tally)
                                    count = state.intercomState.tally.length;
                                if(idx < count)
                                    dev.state = state.intercomState.tally[idx];
                                else
                                    dev.state = 0;
                            }
                        })
                    })
                }

                const result = [];
                const columns = 4;
                for (let i = 0; i < deviceList.length; i += columns)
                    result.push(deviceList.slice(i, i + columns));
                return result;
            });

            const onTallyTest = () => {
                const list=new Array(8).fill(0);
                list[state.tallyPVMVal.value-1] = 2;
                list[state.tallyPGMVal.value-1] = 1;
                rpc( "intercom.setTally", [list]);
            }

            const handleIntercomState = () => {
                rpc( "intercom.getState").then(data => {
                    clearReactiveObject(state.intercomState);
                    Object.assign(state.intercomState,data);
                })
                setTimeout(handleIntercomState,500);
            }

            const hadLedDevice = () => func("/system/hadLedDevice").then(ret => state.hadLed.value = ret.data);

            onMounted(()=>{
                handleIntercomState();
                hadLedDevice();
            })
            
            return {...state,intercomConf,updateIntercomConf,handleDevicesArray,onTallyTest}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>