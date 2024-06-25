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
                                    <div class="row">
                                        <div class="col-lg-4 d-flex lp-align-center">
                                            <cn>机型</cn>
                                            <en>Model</en>
                                        </div>
                                        <div class="col-lg-8">
                                            <select class="form-select" v-model="hardwareConf.fac">
                                                <option v-for="(item,index) in facConf" :value="item">{{item}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-lg-4 d-flex lp-align-center">
                                            <cn>类型</cn>
                                            <en>Chip</en>
                                        </div>
                                        <div class="col-lg-8">
                                            <input class="form-control" type="text" v-model.trim.lazy="hardwareConf.chip" readonly disabled>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-lg-12 text-center">
                                            <button type="button" class="btn btn-primary border-2 px-3" @click="updateFacConf(hardwareConf.fac)">
                                                <cn>保存</cn>
                                                <en>Save</en>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-if="Object.keys(webVerConf).length > 0">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header bg-transparent">
                                    <div class="p-2 mb-0 d-flex align-items-end">
                                        <cn>网页版本</cn>
                                        <en>Web Version</en>
                                    </div>
                                </div>
                                <div class="card-body" >
                                    <div class="row">
                                        <div class="col-lg-4 d-flex lp-align-center">
                                            <cn>默认版本</cn>
                                            <en>Default</en>
                                        </div>
                                        <div class="col-lg-8">
                                            <select class="form-select" v-model="webVerConf.web">
                                                <option cn="经典版" en="classic" value="classic" v-language-option></option>
                                                <option cn="标准版" en="standard" value="standard" v-language-option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-lg-4 d-flex lp-align-center">
                                            <cn>允许切换</cn>
                                            <en>Switch</en>
                                        </div>
                                        <div class="col-lg-8">
                                            <select class="form-select" v-model="webVerConf.switch">
                                                <option :value=true>true</option>
                                                <option :value=false>false</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-lg-12 text-center">
                                            <button type="button" class="btn btn-primary border-2 px-3" @click="updateWebVerConf(false,'tip')">
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
                            <div class="row mt-4 mb-2">
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
                                <cn>LPH</cn>
                                <en>LPH</en>
                            </div>
                        </div>
                        <div class="card-body" >
                            <div class="row mt-2">
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
                            <div class="row mt-3">
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
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>输入EDID</cn>
                                <en>Input Edid</en>
                            </div>
                        </div>
                        <div class="card-body" >
                            <div class="row mt-2">
                                <div class="col-lg-3 d-flex lp-align-center">
                                    <cn>EDID</cn>
                                    <en>EDID</en>
                                </div>
                                <div class="col-lg-8">
                                    <select class="form-select" v-model="inputEdidConf">
                                        <option v-for="(item,index) in handInputEdidFiles" :value="item">{{item}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn btn-primary border-2 px-3" @click="updateInputEdidConf">
                                        <cn>保存</cn>
                                        <en>Save</en>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4" v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.fac === 'REC1'">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>输出EDID</cn>
                                <en>Output edid</en>
                            </div>
                        </div>
                        <div class="card-body" >
                            <div class="row mt-2">
                                <div class="col-lg-3 d-flex lp-align-center">
                                    <cn>EDID</cn>
                                    <en>EDID</en>
                                </div>
                                <div class="col-lg-8">
                                    <select class="form-select" v-model="outputEdidConf">
                                        <option v-for="(item,index) in handOutputEdidFiles" :value="item">{{item}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn btn-primary border-2 px-3" @click="updateOutputEdidConf">
                                        <cn>保存</cn>
                                        <en>Save</en>
                                    </button>
                                    <button type="button" class="btn btn-primary border-2 px-3 ms-1" @click="deleteCustomEdidFile">
                                        <cn>删除</cn>
                                        <en>Delete</en>
                                    </button>
                                    <loading-button custom-class="btn btn-primary border-2 px-3 ms-1 checkEdid" @button-click="identifyEdid" :had-loading="checkLoading">
                                        <cn>识别</cn>
                                        <en>Identify</en>
                                    </loading-button>
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
                <div class="col-lg-4" v-if="Object.keys(mcuConf).length > 0">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>单片机</cn>
                                <en>MCU</en>
                            </div>
                        </div>
                        <div class="card-body" >
                            <div class="row my-2" v-for="(item,index) in Object.keys(mcuConf)">
                                <div class="col-lg-3 text-center">
                                    {{item.replace('Version','')}}
                                </div>
                                <div class="col-lg-9">
                                    <div class="row" v-for="(it,idx) in mcuConf[item]">
                                        <div class="col-lg-12">
                                            {{it}}
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
    import { useHardwareConf,useFacConf,useLphConf,useColorModeConf,useEdidConf,useMcuConf,useWebVerConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent,languageOptionDirective,loadingButtonComponent } from "./assets/js/vue.helper.js"
    import {alertMsg, confirm, func, isEmpty, extractAryEle, removeAryEle} from "./assets/js/lp.utils.js";
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed,onMounted,nextTick} = vue;
    const app = createApp({
        directives: {
            "language-option":languageOptionDirective
        },
        components: {
            "bs-switch" : bootstrapSwitchComponent,
            "loading-button": loadingButtonComponent
        },
        setup(props,context) {
            
            const { hardwareConf,updateHardwareConf } = useHardwareConf();
            const { facConf,updateFacConf } = useFacConf();
            const { lphConf,updateLphConf } = useLphConf();
            const { colorModeConf,updateColorModeConf } = useColorModeConf();
            const { inputEdidConf,outputEdidConf,edidFiles,
                handleEdidConf,updateInputEdidConf, updateOutputEdidConf,
                addOutputEdidConf,delCustomEdidFile } = useEdidConf();
            const { mcuConf } = useMcuConf();
            const { webVerConf,updateWebVerConf } = useWebVerConf();

            const checkLoading = ref(false);

            const handInputEdidFiles = computed(() => {
                const inputEdidAry = ['1080','4k','ITE','RGB','YUV','colorMode'];
                if(edidFiles.length === 0)
                    return [];
                return extractAryEle(edidFiles,inputEdidAry);
            });

            const deleteCustomEdidFile = () => {
                if(outputEdidConf.value === "default") {
                    alertMsg('<cn>默认EDID文件禁止删除</cn><en>Deletion of EDID files is prohibited by default</en>', 'error');
                    return;
                }

                confirm({
                    title: '<cn>删除</cn><en>Delete</en>',
                    content: '<cn>是否删除EDID文件: '+outputEdidConf.value+'？</cn><en>Whether to delete Edid file: '+outputEdidConf.value+'?</en>',
                    buttons: {
                        ok: {
                            text: "<cn>删除</cn><en>Delete</en>",
                            btnClass: 'btn-primary',
                            keys: ['enter'],
                            action: () => {
                                delCustomEdidFile(outputEdidConf.value+".bin").then(()=>{
                                    handleEdidConf();
                                    alertMsg('<cn>删除成功</cn><en>Edid file has been delete!</en>', 'success');
                                })
                            }
                        },
                        cancel: {
                            text: "<cn>取消</cn><en>Cancel</en>",
                            action: () => {}
                        }
                    }
                });
            }

            const handOutputEdidFiles = computed(() => {
                const outputEdidAry = ['1080','4k','ITE','RGB','YUV','colorMode'];
                if(edidFiles.length === 0)
                    return [];
                return removeAryEle(edidFiles,outputEdidAry);
            });

            const identifyEdid = type => {
                checkLoading.value = true;
                addOutputEdidConf().then(hadFile => {
                    if(!hadFile) {
                        alertMsg('<cn>Edid识别失败</cn><en>Identify Edid failed!</en>', 'error');
                        alertMsg('<cn>请检查HDMI输出是否插入Edid有效源</cn><en>Check that the HDMI output is plugged into a valid Edid source!</en>', 'error');
                        return;
                    }
                    setTimeout(()=>{
                        checkLoading.value = false;
                        confirm({
                            title: '<cn>生成EDID</cn><en>Make EDID</en>',
                            content: `<div class="row">
                                        <div class="col-lg-11">
                                            <div class="row mt-2">
                                                <div class="col-lg-3 lp-align-center">
                                                    <label>
                                                        <cn>文件名</cn>
                                                        <en>Edid name</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" id="custom_edid" style="box-shadow: none" autocomplete="off">
                                                </div>
                                            </div>
                                        </div>
                                      </div>`,
                            buttons: {
                                ok: {
                                    text: "<cn>生成</cn><en>Make</en>",
                                    btnClass: 'btn-primary',
                                    action: () => {
                                        const ele = document.querySelector("#custom_edid");
                                        let value = ele.value;
                                        if(!isEmpty(value)) {
                                            const validValues = ['4K', '1080', 'ITE', 'RGB', 'YUV', 'COLORMODE'];
                                            if(validValues.includes(value.toUpperCase())) {
                                                alertMsg('<cn>不能覆盖默认Edid文件</cn><en>Default Edid file cannot be overwritten!</en>', 'error');
                                                return;
                                            }
                                            value = value.replace(".bin","");
                                            func("/root/addCustomEdid",{"edid":value}).then(ret=>{
                                                handleEdidConf();
                                                alertMsg('<cn>Edid文件已生成</cn><en>Edid file has been generated!</en>', 'success');
                                                alertMsg('<cn>注意，若插拔Edid源，需要重启设备才能正常识别</cn><en>Note If the Edid source is inserted or removed, you need to restart the device for normal identification!</en>', 'success',8000);
                                            })
                                            return;
                                        }
                                        alertMsg('<cn>文件名不能为空</cn><en>The file name cannot be empty!</en>', 'error');
                                    }
                                },
                                cancel: {
                                    text: "<cn>取消</cn><en>Cancel</en>",
                                    action: () => {
                                    }
                                }
                            }
                        });
                    },1000);
                })
            }

            return {hardwareConf,updateHardwareConf,facConf,updateFacConf, colorModeConf, updateColorModeConf,
                inputEdidConf,outputEdidConf,handInputEdidFiles,handOutputEdidFiles, updateInputEdidConf,updateOutputEdidConf,
                addOutputEdidConf,deleteCustomEdidFile,lphConf,updateLphConf,mcuConf,webVerConf,updateWebVerConf,checkLoading,identifyEdid}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>