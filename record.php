<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
<div data-simplebar>
    <main class="page-content record" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-12 mx-auto">
                <div class="card">
                    <div class="card-header bg-transparent d-flex">
                        <div class="flex-grow-1">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>录制参数</cn>
                                <en>Record Config</en>
                            </div>
                        </div>
                        <div class="flex-grow-0 pe-2 pt-2">
                            <i class="fa-solid fa-gear fa-lg lp-cursor-pointer"></i>
                        </div>
                        <div class="flex-grow-0 pe-2 pt-2">
                            <i class="fa-solid fa-gear fa-lg lp-cursor-pointer"></i>
                        </div>
                        <div class="flex-grow-0 pe-2 pt-2">
                            <i class="fa-solid fa-gear fa-lg lp-cursor-pointer"></i>
                        </div>
                        <div class="flex-grow-0 pe-2 pt-2">
                            <i class="fa-solid fa-gear fa-lg lp-cursor-pointer"></i>
                        </div>
                    </div>
                    <div class="card-body" >
                        <div class="row my-3">
                            <div class="col-lg-3 text-center">
                                <cn>通道选择</cn>
                                <en>Channel select</en>
                            </div>
                            <div class="col-lg-8">
                                <div class="row row-cols-5" v-if="Object.keys(recordConf).length > 0">
                                    <div class="form-check form-check-primary mb-2" v-for="(item,index) in handleEnableConf" :key="item.id">
                                        <input class="form-check-input" type="checkbox" v-model="recordConf.any.chns" :value="item.id">
                                        <label class="form-check-label">
                                            {{item.name}}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row my-3">
                            <div class="col-lg-3 lp-align-center">
                                <cn>全局控制</cn>
                                <en>Overall config</en>
                            </div>
                            <div class="col-lg-8">
                                <div class="row" v-if="Object.keys(recordConf).length > 0">
                                    <div class="col-lg-12">
                                        <div class="row row-cols-5">
                                            <div class="col-lg ps-4">
                                                <label>Mp4</label>
                                            </div>
                                            <div class="col-lg ps-4">
                                                <label>TS</label>
                                            </div>
                                            <div class="col-lg ps-4">
                                                <label>FLV</label>
                                            </div>
                                            <div class="col-lg ps-4">
                                                <label>MKV</label>
                                            </div>
                                            <div class="col-lg ps-4">
                                                <label>MOV</label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="col-lg-12">
                                        <div class="row row-cols-5">
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.any.mp4"></bs-switch>
                                            </div>
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.any.ts"></bs-switch>
                                            </div>
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.any.flv"></bs-switch>
                                            </div>
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.any.mkv"></bs-switch>
                                            </div>
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.any.mov"></bs-switch>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="my-3">
                        <div class="row">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn btn-primary border-3 px-3" @click="updateRecordConf">
                                    <cn>保存参数</cn>
                                    <en>Save config</en>
                                </button>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-6 offset-lg-3">
                                <div class="rec-bar">
                                    <div class="row">
                                        <div class="col-7 d-flex lp-align-right">
                                            <button type="button" class="btn border-3 btn-primary" @click="onStartRecord">
                                                <i class="fa-solid fa-video me-1"></i>
                                                <cn>录制</cn>
                                                <en>Record</en>
                                            </button>
                                            <button type="button" class="btn border-3 btn-default ms-2" @click="onStopRecord">
                                                <i class="fa-solid fa-stop me-1"></i>
                                                <cn>全部停止</cn>
                                                <en>Stop All</en>
                                            </button>
                                        </div>
                                        <div class="col-5 text-center p-0" style="line-height: 34px;">
                                            <strong class="font-12">
                                                <cn>已用空间</cn>
                                                <en>Used Space</en>:
                                                <span>{{diskSpace}}</span>
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12 mx-auto">
                <ul class="nav nav-tabs nav-primary" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" data-bs-toggle="tab" href="#tab1" role="tab" aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa fa-sign-in me-1"></i></div>
                                <div class="tab-title"><cn>频道信息</cn><en>Channels</en></div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-bs-toggle="tab" href="#tab2" role="tab" aria-selected="false">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-solid fa-download me-1"></i></div>
                                <div class="tab-title"><cn>文件管理</cn><en>File Manager</en></div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="tab-content py-3 pe-2 ps-2">
                    <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                        <div class="row">
                            <div class="col-2 text-center">
                                <cn>频道名称</cn>
                                <en>Channel name</en>
                            </div>
                            <div class="col text-center">
                                MP4
                            </div>
                            <div class="col text-center">
                                TS
                            </div>
                            <div class="col text-center">
                                FLV
                            </div>
                            <div class="col text-center">
                                MKV
                            </div>
                            <div class="col text-center">
                                MOV
                            </div>
                            <div class="col text-center">
                                <cn>暂停</cn>
                                <en>pause</en>
                            </div>
                            <div class="col text-center">
                                <cn>录制时间</cn>
                                <en>recordTime</en>
                            </div>
                            <div class="col-1 text-center"></div>
                        </div>
                        <hr >
                        <div class="row mt-1" v-for="(item,index) in handleMergeRecordConf" :key="item.id">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-2 text-center">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.chnName" readonly disabled>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.mp4" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.ts" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.flv" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.mkv" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.mov" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.isPause" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        {{item.durTime}}
                                    </div>
                                    <div class="col-1 lp-align-center">
<!--                                        <i class="fa-solid fa-ellipsis-vertical lp-cursor-pointer"></i>-->
                                    </div>
                                </div>
                                <hr >
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="tab2" role="tabpanel">
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
<?php include ("./public/foot.inc") ?>

<script type="module">
    import { rpc,func,alertMsg } from "./assets/js/lp.utils.js";
    import { useDefaultConf,useRecordConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        components:{
            "bs-switch" : bootstrapSwitchComponent
        },
        setup: function (props, context) {

            const {defaultConf} = useDefaultConf();
            const {recordConf, handleRecordConf ,updateRecordConf} = useRecordConf();

            const state = {
                recDuration:reactive({}),
                diskSpace: ref("--/--"),
            }

            const handleEnableConf = computed(() => {
                return defaultConf.filter((item, index) => {
                    return item.enable && item.type !== "ndi" && item.type !== "file";
                })
            });

            const handleMergeRecordConf = computed(() => {
                if(!recordConf.hasOwnProperty("channels")) return [];

                if(defaultConf.length > 0 && Object.keys(state.recDuration).length > 0) {
                    return recordConf.channels.filter((chn, index) => {
                        const conf = defaultConf.find(item => item.id === chn.id);
                        if (!conf.enable)
                            recordConf.any.chns = recordConf.any.chns.filter(item => item !== conf.id);
                        chn.enable = conf.enable;
                        chn.durTime = state.recDuration["chn" + index];
                        return conf.enable;
                    });
                }

                return recordConf.channels;
            })

            const onStartRecord = async () => {
                const isMountDisk = await rpc("rec.isMountDisk");
                if (!isMountDisk) {
                    alertMsg('<cn>启动录制失败，没有找到外部存储设备！</cn><en>Failed to start recording,no external storage device was found!</en>', 'error');
                    return;
                }

                const any = recordConf.any;
                const channels = recordConf.channels;

                any.chns.forEach(chn => {
                    channels.forEach(channel => {
                        if (chn === channel.id) {
                            for (let key in channel) {
                                if (any.hasOwnProperty(key)) {
                                    channel[key] = any[key];
                                }
                            }
                        }
                    });
                });

                const result = await rpc("rec.execute", [JSON.stringify(recordConf, null, 2)]);
                if (result) {
                    alertMsg('<cn>启动录制成功</cn><en>Recording started successfully!</en>', 'success');
                    return;
                }
                alertMsg('<cn>启动录制失败，没有找到外部存储设备！</cn><en>Failed to start recording,no external storage device was found!</en>', 'error');
            }

            const onStopRecord = () => {
                rpc("rec.stop").then( data => {
                    if(data){
                        handleRecordConf();
                        alertMsg('<cn>停止录制成功</cn><en>Recording stoped successfully!</en>', 'success');
                        return;
                    }
                    alertMsg('<cn>停止录制失败！</cn><en>Failed to stop recording</en>', 'error');
                } );
            }

            const onStartRecordByFormat = async () => {
                const result = await rpc("rec.execute", [JSON.stringify(recordConf, null, 2)]);
                if (result) {
                    alertMsg('<cn>启动录制成功</cn><en>Recording started successfully!</en>', 'success');
                    return;
                }
                alertMsg('<cn>启动录制失败，没有找到外部存储设备！</cn><en>Failed to start recording,no external storage device was found!</en>', 'error');
            }

            const handleDiskSpace = () => {
                func("/mgr/system/getMountDiskSpace").then(data => {
                    if (data.status === "error") {
                        state.diskSpace.value = "--/--";
                        return;
                    }
                    state.diskSpace.value = data.data.used + " / " + data.data.total
                });
            }

            const handleRecordDurTime = () => {
                rpc("rec.getDurTime").then( data => Object.assign(state.recDuration,JSON.parse(data)) );
                setTimeout(handleRecordDurTime,1000);
            }

            onMounted(() => {
                handleDiskSpace();
                handleRecordDurTime();
            })

            return {...state, recordConf ,updateRecordConf,handleEnableConf,handleMergeRecordConf,onStartRecord,onStopRecord,onStartRecordByFormat}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>