<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content gb28181" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>服务器设置</cn>
                                <en>Server config</en>
                                <small>
                                    <cn>提示：该功能正在调试中，大部分参数都需要重启后生效.</cn>
                                    <en>Tip: This function is being debugged, and most parameters need to be restarted to take effect</en>
                                </small>
                            </div>
                        </div>
                        <div class="card-body" >

                            <div class="row">
                                <div class="col-lg-7">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="d-flex align-items-center gap-3 px-2 py-1">
                                                    <div class="flex-grow-0">
                                                        <label class="fw-bold">
                                                            <cn>频道</cn>
                                                            <en>Channel</en>:
                                                        </label>
                                                    </div>
                                                    <div class="flex-grow-0">
                                                        <select class="form-select" v-model="chnIndex">
                                                            <option v-for="(item,index) in handleEnableConf" :key="item.id" :value="item.id">{{item.name}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-lg-12">
                                                    <img :src="chnImgUrl" class="card-img" alt="..." style="height: 100%">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-5" v-if="Object.keys(gb28181Conf).length > 0">
                                    <div class="card">
                                        <div class="card-body" >
                                            <div class="row mt-3">
                                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                                    <label>
                                                        <cn>启用</cn>
                                                        <en>Enable</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <bs-switch v-model="gb28181Conf.server.enable" size="normal"></bs-switch>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                                    <label>
                                                        <cn>品牌</cn>
                                                        <en>Brand</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <input class="form-control" v-model.trim.lazy="gb28181Conf.server.Manufacture">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                                    <label>
                                                        <cn>设备型号</cn>
                                                        <en>Model</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <input class="form-control" v-model.trim.lazy="gb28181Conf.server.mode">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                                    <label>
                                                        <cn>本机ID</cn>
                                                        <en>Local ID</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <input class="form-control" v-model.trim.lazy="gb28181Conf.server.id">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                                    <label>
                                                        <cn>服务器ID</cn>
                                                        <en>Server ID</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <input class="form-control" v-model.trim.lazy="gb28181Conf.server.svrId">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                                    <label>
                                                        <cn>服务器域</cn>
                                                        <en>Server domain</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <input class="form-control" v-model.trim.lazy="gb28181Conf.server.realm">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                                    <label>
                                                        <cn>服务器IP</cn>
                                                        <en>Server IP</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <input class="form-control" v-model.trim.lazy="gb28181Conf.server.svrIp">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                                    <label>
                                                        <cn>服务器端口</cn>
                                                        <en>Server Port</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <input class="form-control" v-model.trim.lazy="gb28181Conf.server.svrPort">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                                    <label>
                                                        <cn>密码</cn>
                                                        <en>Password</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-7">
                                                    <input class="form-control" v-model.trim.lazy="gb28181Conf.server.passwd">
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-lg-12 text-center">
                                                    <button type="button" class="btn border-3 btn-primary px-4" @click="updateGb28181Conf"><cn>保存</cn><en>Save</en></button>
                                                </div>
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
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>通道设置</cn>
                                <en>Channel config</en>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-3 text-center">
                                    <label>
                                        <cn>频道名称</cn>
                                        <en>Channel Name</en>
                                    </label>
                                </div>
                                <div class="col-lg-3 text-center">
                                    <label>
                                        <cn>通道名称</cn>
                                        <en>Stream Name</en>
                                    </label>
                                </div>
                                <div class="col-lg-3 text-center">
                                    <label>
                                        <cn>通道ID</cn>
                                        <en>Stream ID</en>
                                    </label>
                                </div>
                                <div class="col-lg-3 text-center">
                                    <label>
                                        <cn>启用</cn>
                                        <en>Enable</en>
                                    </label>
                                </div>
                            </div>
                            <hr>
                            <div v-for="(item,index) in handleGb28181Channels">
                                <div class="row mt-3">
                                    <div class="col-lg-3">
                                        <input class="form-control" v-model.trim.lazy="item.chnName" readonly disabled>
                                    </div>
                                    <div class="col-lg-3">
                                        <input class="form-control" v-model.trim.lazy="item.name">
                                    </div>
                                    <div class="col-lg-3">
                                        <input class="form-control" v-model.trim.lazy="item.chnId">
                                    </div>
                                    <div class="col-lg-3 force-align-center">
                                        <bs-switch v-model="item.enable" size="normal"></bs-switch>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn border-3 btn-primary px-5" @click="updateGb28181Conf"><cn>保存</cn><en>Save</en></button>
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
    import vue from "./assets/js/vue.build.js";
    import { rpc } from "./assets/js/rps.helper.js";
    import { useDefaultConf,useGb28181Conf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent } from "./assets/js/vue.helper.js"

    const {createApp,ref,reactive,watchEffect,computed,onMounted,nextTick} = vue;
    const app = createApp({
        components:{
            "bs-switch" : bootstrapSwitchComponent
        },
        setup(props,context) {

            const { defaultConf } = useDefaultConf();
            const { gb28181Conf,updateGb28181Conf } = useGb28181Conf();

            const state = {
                chnIndex : ref(-1),
                chnImgUrl : ref(""),
            }

            const updateChnImage = () => {
                state.chnImgUrl.value = "snap/snap" + state.chnIndex.value + ".jpg?rnd=" + Math.random();
                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }

            const handleGb28181Channels = computed(() => {
                if(defaultConf.length > 0 && Object.keys(gb28181Conf).length > 0) {
                    return gb28181Conf.channel.filter(item => {
                        const match = defaultConf.find(conf => conf.enable && item.id === conf.id);
                        if (match) {
                            return {
                                ...item,
                                chnName: match.name
                            };
                        }
                        return false;
                    });
                }
                return [];
            });

            const unwatch = watchEffect(()=>{
                if(defaultConf.length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].enable) {
                            state.chnIndex.value = i;
                            break;
                        }
                    }
                    updateChnImage();
                    unwatch();
                }
            })

            const handleEnableConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return !!item.enable;
                })
            })
            
            return {...state,gb28181Conf,updateGb28181Conf,handleGb28181Channels,handleEnableConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>