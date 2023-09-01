<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content uart" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>基本设置</cn>
                                <en>Basic config</en>
                            </div>
                        </div>
                        <div class="card-body pb-4" v-if="Object.keys(uartConf).length > 0">
                            <div class="row mt-3">
                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                    <label>
                                        <cn>串口</cn>
                                        <en>Serial port</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <select class="form-select" v-model="uartConf.device">
                                        <option value="/dev/ttyAMA1">ttyAMA1</option>
                                        <option value="/dev/ttyUSB0">ttyUSB0</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                    <label>
                                        <cn>波特率</cn>
                                        <en>BaudRate</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <select class="form-select" v-model="uartConf.baudRate">
                                        <option value="115200">115200</option>
                                        <option value="9600">9600</option>
                                        <option value="4800">4800</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                    <label>
                                        <cn>网络端口</cn>
                                        <en>Socket port</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model="uartConf.port">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                    <label>
                                        <cn>IP地址</cn>
                                        <en>IP Address</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model="uartConf.ip">
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn border-3 btn-primary px-4 me-3" @click="saveUartConf">
                                        <cn>保存</cn>
                                        <en>Save</en>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.button">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>按键定义</cn>
                                <en>Button define</en>
                            </div>
                        </div>
                        <div class="card-body pb-4 gpio-btn">
                            <div class="row mt-5">
                                <div class="col-lg-2 offset-lg-1 force-align-center"></div>
                                <div class="col-lg-4">
                                    <cn>短按</cn>
                                    <en>Short Press</en>
                                </div>
                                <div class="col-lg-3">
                                    <cn>长按</cn>
                                    <en>Long Press</en>
                                </div>
                            </div>
                            <div class="row mt-4" v-for="(item,index) in buttonConf">
                                <div class="col-lg-2 offset-lg-1 force-align-center">
                                    <label>{{item.name}}</label>
                                </div>
                                <div class="col-lg-4">
                                    <select class="form-select" v-model="item.click">
                                        <option value="push.start" cn="开始推流" en="Start push" v-language-option></option>
                                        <option value="push.stop" cn="停止推流" en="Stop push" v-language-option></option>
                                        <option value="rec.start" cn="开始录制" en="Start record" v-language-option></option>
                                        <option value="rec.stop" cn="停止录制" en="Stop record" v-language-option></option>
                                        <option value="" cn="无" en="None" v-language-option></option>
                                    </select>
                                </div>
                                <div class="col-lg-3">
                                    <select class="form-select" v-model="item.press">
                                        <option value="enc.setNetDhcp">DHCP</option>
                                        <option value="" cn="无" en="None" v-language-option></option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn border-3 btn-primary px-4" @click="saveButtonConf">
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
    import { rpc,rpc6,alertMsg } from "./assets/js/cul.helper.js";
    import { useHardwareConf,useButtonConf,useUartConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent,languageOptionDirective } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watch,watchEffect,computed} = vue;
    const app = createApp({
        directives: {
          "language-option": languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent
        },
        setup(props,context) {
    
            const { hardwareConf } = useHardwareConf();
            const { buttonConf } = useButtonConf();
            const { uartConf } = useUartConf();
            
            const saveUartConf = () => {
                rpc( "uart.update", [ JSON.stringify( uartConf, null, 2 ) ]).then(data => {
                    if ( typeof ( data.error ) != "undefined" )
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                    else
                        alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                })
            }
            
            const saveButtonConf = () => {
                rpc6( "gpio.update", [ JSON.stringify( buttonConf, null, 2 ) ]).then(data => {
                    if ( typeof ( data.error ) != "undefined" )
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                    else
                        alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                })
            }
            
            return {hardwareConf,buttonConf,uartConf,saveUartConf,saveButtonConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>