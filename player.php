<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content player" id="app" v-cloak>
            <div class="card">
                <div class="card-body" >
                    <div class="row">
                        <div class="d-flex align-items-center gap-3 px-2 py-1">
                            <div class="flex-grow-0">
                                <label class="fw-bold">
                                    <cn>频道</cn>
                                    <en>Channel</en>:
                                </label>
                            </div>
                            <div class="flex-grow-0">
                                <select class="form-select" v-model="activeChnId" @change="onChangePlayerChn">
                                    <option v-for="(item,index) in handleActivePlayerConf" :value="item.id" :data-attr-codec="item.encv.codec" :data-attr-suffix="item.stream.suffix" :data-attr-audio="item.enca.codec !== 'close'">{{item.name}}</option>
                                </select>
                            </div>
                            <div class="flex-grow-0" v-if="playerCodec === 'h265'">
                                <label class="fw-bold">
                                    <cn>缓冲</cn>
                                    <en>Buffer</en>:
                                </label>
                            </div>
                            <div class="flex-grow-0" v-if="playerCodec === 'h265'">
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="bufferTime" @change="onChangeBufferTime">
                                    <span class="input-group-text">ms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 mt-2 mb-2">
                            <w-player :url="playerUrl" :codec="playerCodec" :audio="playerAudio" :buffer="bufferTime"></w-player>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-lg-12 tips">
                            <cn>1、使用h5播放器，需要在输出设置页面开启对应视频通道的rtmp输出协议</cn>
                            <en>1. To use H5 player, enable the RTMP protocol for the corresponding video channel</en>
                        </div>
                        <div class="col-lg-12 tips">
                            <cn>2、播放h265编码的视频流对电脑配置要求较高,如果遇到音视频卡顿问题,请更换性能更好的电脑播放</cn>
                            <en>2. Playing H265 encoded video stream has high requirements for computer configuration. If you encounter audio and video delay problem, please replace the device with better performance</en>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
<?php include ("./public/foot.inc") ?>

<script src="assets/plugins/flvjs/flv.js"></script>
<script src="assets/plugins/jessibuca/jessibuca.js"></script>
<script type="module">
    import { useDefaultConf } from "./assets/js/confHooks.js";
    import { wPlayerComponent } from "./assets/js/vueHelper.js"
    
    const {createApp,ref,reactive,watch,watchEffect,computed,onMounted} = Vue;
    const app = createApp({
        components:{
            "w-player": wPlayerComponent
        },
        setup(props,context) {
            
            const { defaultConf } = useDefaultConf();

            const state = {
                activeChnId : ref(0),
                playerUrl: ref(""),
                playerCodec: ref(""),
                playerAudio: ref(false),
                bufferTime:ref(200)
            }
            
            const unwatch = watch(defaultConf,(value)=>{
                for(let i=0;i<defaultConf.length;i++) {
                    let item = defaultConf[i];
                    if (item.enable && item.stream.rtmp) {
                        state.activeChnId.value = item.id;
                        state.playerUrl.value = 'http://'+window.location.host+'/flv?app=live&stream='+item.stream.suffix;
                        state.playerCodec.value = item.encv.codec;
                        state.playerAudio.value = item.enca.codec !== "close";
                        break;
                    }
                }
                unwatch();
            })
            
            const handleActivePlayerConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return !!(item.enable && item.stream.rtmp);
                })
            })
            
            const onChangeBufferTime = () => {
                console.log(state.bufferTime.value)
                localStorage.setItem("bufferTime",state.bufferTime.value);
            }
            
            const onChangePlayerChn = (event) => {
                const selectElement = event.target;
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                state.playerUrl.value = 'http://'+window.location.host+'/flv?app=live&stream='+selectedOption.getAttribute('data-attr-suffix');
                state.playerCodec.value = selectedOption.getAttribute('data-attr-codec');
                state.playerAudio.value = selectedOption.getAttribute('data-attr-audio');
            }
            
            onMounted(()=>{
                let buffer = localStorage.getItem("bufferTime");
                if(buffer !== null && buffer !== undefined)
                    state.bufferTime.value = buffer;
            })
            
            return {...state,handleActivePlayerConf,onChangePlayerChn,onChangeBufferTime}
        }
    });
    app.mount('#app');
</script>
</body>
</html>