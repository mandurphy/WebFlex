<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<main class="player" id="app" v-cloak>
    <h5-player :url="playerUrl" :canplay="true" :codec="playerCodec" :audio="playerAudio" :protocol="playerProtocol" :buffer="bufferTime"></h5-player>
</main>
<script src="assets/js/lp.loader.js" type="module"></script>
<script src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/plugins/pace/js/pace.min.js"></script>
<script src="assets/plugins/simplebar/js/simplebar.min.js"></script>
<script src="assets/plugins/passive/passive.events.min.js"></script>
<script type="module">
    import { useDefaultConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,h5PlayerComponent } from "./assets/js/vue.helper.js"
    import { getUrlParam } from "./assets/js/lp.utils.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watch,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        components:{
            "h5-player": h5PlayerComponent
        },
        setup(props,context) {
            
            const { defaultConf } = useDefaultConf();
            const chnId = parseInt(getUrlParam("channel"));

            const state = {
                activeChnId : ref(0),
                playerUrl: ref(""),
                playerCodec: ref(""),
                playerAudio: ref(false),
                playerProtocol:ref(""),
                bufferTime:ref(200)
            }
            
            const unwatch = watch(defaultConf,(value)=>{
                for(let i=0;i<defaultConf.length;i++) {
                    let item = defaultConf[i];
                    if(chnId && item.id !== chnId)
                        continue;
                    if (item.enable && (item.stream.rtmp || item.stream.webrtc)) {
                        const protocol = item.stream.rtmp ? "rtmp" : "webrtc";
                        state.activeChnId.value = item.id;
                        if(protocol === 'webrtc')
                            state.playerUrl.value = `http://${window.location.host}/webrtc?app=live&stream=${item.stream.suffix}`;
                        else
                            state.playerUrl.value = `http://${window.location.host}/flv?app=live&stream=${item.stream.suffix}`;
                        state.playerCodec.value = item.encv.codec;
                        state.playerAudio.value = item.enca.codec !== "close";
                        state.playerProtocol.value = protocol
                        break;
                    }
                }
                unwatch();
            })

            onMounted(()=>{
                let buffer = localStorage.getItem("bufferTime");
                if(buffer !== null && buffer !== undefined)
                    state.bufferTime.value = buffer;
            })
            
            return {...state}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>