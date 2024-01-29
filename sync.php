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
        <main class="page-content sync" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>功能说明</cn>
                                <en>Function Description</en>
                            </div>
                        </div>
                        <div class="card-body" >
                            <p>
                                <cn>编码器本身的接口同步性已经在出厂时校准过，大多数情况下无需额外调节。但是如果输入输出设备链路比较复杂，或外设本身存在同步性问题，可以通过下面的参数进行微调。</cn>
                                <en>The interface synchronization of the encoder itself has been calibrated at the factory and no additional adjustment is required in most cases. However, if the input and output device link is relatively complex, or the peripheral itself has synchronization problems, you can fine-tune it through the following parameters.</en>
                            </p>
                            <p>
                                <cn>由于视频接口的延迟是固定的，额外增加视频缓冲的代价较高，以下调节都是针对音频接口的。</cn>
                                <en>Since the delay of the video interface is fixed, the cost of additional video buffering is higher. The following adjustments are all for the audio interface.</en>
                            </p>
                            <p>
                                <cn><strong>时间戳偏移:</strong>仅影响串流输出时的音频时间戳偏移，如果该设备只用于编码，那么调节这个参数是最精确高效的。</cn>
                                <en><strong>Timestamp offset:</strong> It only affects the audio timestamp offset during streaming output. If the device is only used for encoding, then adjusting this parameter is the most accurate and efficient.</en>
                            </p>
                            <p>
                                <cn><strong>硬件延迟:</strong>在音频接口增加额外的缓冲，使其产生延迟，主要针对解码场景或输入混音等功能。</cn>
                                <en><strong>Hardware delay:</strong> Adding additional buffers to the audio interface to cause delays, mainly for functions such as decoding scenes or input mixing.</en>
                            </p>
                            <p>
                                <cn><strong>帧:</strong>通常情况下, 一个音频帧的时长为21.3ms</cn>
                                <en><strong>Frame:</strong> Normally, the duration of an audio frame is 21.3ms.</en>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body" >
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="card">
                                        <div class="card-header bg-transparent">
                                            <div class="p-2 mb-0 d-flex align-items-end">
                                                <cn>输入同步调节</cn>
                                                <en>Input Synchronization</en>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-3 text-center">
                                                    <cn>接口名称</cn>
                                                    <en>Interface name</en>
                                                </div>
                                                <div class="col-lg-4 text-center">
                                                    <cn>时间戳偏移(ms)</cn>
                                                    <en>Timestamp offset</en>
                                                </div>
                                                <div class="col-lg-4 text-center">
                                                    <cn>硬件延迟(帧)</cn>
                                                    <en>Hardwa delay(frame)</en>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row mt-2" v-for="(item,index) in handleAiConf">
                                                <div class="col-lg-3">
                                                    <input class="form-control" disabled readonly v-model.trim.lazy="item.name">
                                                </div>
                                                <div class="col-lg-4 p-3">
                                                    <noui-slider v-model="item.delay" :min="-500" :max="500" :step="1" :fix="0"></noui-slider>
                                                </div>
                                                <div class="col-lg-4 p-3">
                                                    <noui-slider v-model="item.delay2" :min="0" :max="25" :step="1" :fix="0"></noui-slider>
                                                </div>
                                                <hr>
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
                                                <cn>输出同步调节</cn>
                                                <en>Output Synchronization</en>
                                            </div>
                                        </div>
                                        <div class="card-body" >
                                            <div class="row">
                                                <div class="col-lg-3 text-center">
                                                    <cn>接口名称</cn>
                                                    <en>Interface name</en>
                                                </div>
                                                <div class="col-lg-4 text-center">
                                                    <cn>硬件延迟(帧)</cn>
                                                    <en>Hardwa delay(frame)</en>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row mt-2" v-for="(item,index) in handleAoConf">
                                                <div class="col-lg-3">
                                                    <input class="form-control" disabled readonly v-model.trim.lazy="item.name">
                                                </div>
                                                <div class="col-lg-4 p-3">
                                                    <noui-slider v-model="item.delay" :min="0" :max="25" :step="1" :fix="0"></noui-slider>
                                                </div>
                                                <hr>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn btn-primary px-5 py-2" @click="updateSyncConf">
                                        <cn>保存</cn>
                                        <en>Save</en>
                                    </button>
                                    <button type="button" class="btn btn-default px-5 py-2 ms-2" @click="onResetSyncConf">
                                        <cn>重置</cn>
                                        <en>Reset</en>
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
    import { useSyncConf } from "./assets/js/vue.hooks.js";
    import {ignoreCustomElementPlugin,filterKeywordPlugin, bootstrapSwitchComponent, nouiSliderComponent} from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "noui-slider": nouiSliderComponent
        },
        setup(props,context) {
            
            const { syncConf,updateSyncConf } = useSyncConf();

            const state = {

            }

            const handleAiConf = computed(()=>{
                return syncConf.filter(item => {
                    return item.type === "ai";
                })
            });

            const handleAoConf = computed(()=>{
                return syncConf.filter(item => {
                    return item.type === "ao";
                })
            });

            const onResetSyncConf = () => {
                for(let i=0;i<syncConf.length;i++) {
                    if(syncConf[i].type === "ao") {
                        syncConf[i].delay = syncConf[i].defDelay;
                        continue;
                    }
                    syncConf[i].delay=syncConf[i].defDelay;
                    syncConf[i].delay2=syncConf[i].defDelay2;
                }
                updateSyncConf();
            }
            return {...state,updateSyncConf,handleAiConf,handleAoConf,onResetSyncConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>