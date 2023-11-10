<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content ndi" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>NDI预览</cn>
                                <en>NDI Preview</en>
                            </div>
                        </div>
                        <div class="card-body" >
                            <div class="row">
                                <div class="col-lg-12 mt-2">
                                    <img :src="chnImgUrl" class="card-img" alt="...">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>NDI解码设置</cn>
                                <en>NDI decode config</en>
                            </div>
                        </div>
                        <div class="card-body pb-4">
                            <div class="lp-aspect-ratio">
                                <div class="aspect-ratio-content d-flex flex-column justify-content-between" v-if="defaultConf.length > 0">
                                    <div class="row"></div>
                                    <div class="row"></div>
                                    <div class="row"></div>
                                    <div class="row">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>总开关</cn>
                                                <en>Main enable</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <bs-switch v-model="defaultConf[chnIndex].enable" @switch-change="updateDefaultConf" :size="'normal'"></bs-switch>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>已选择</cn>
                                                <en>Selected</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <input type="text" v-model.trim.lazy="defaultConf[chnIndex].ndirecv.name" class="form-control" readonly disabled>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>源列表</cn>
                                                <en>Source List</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <select class="form-select" v-model="ndiName">
                                                <option v-for="(item,index) in ndiList" :key="index" :value="item">{{item}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row"></div>
                                    <div class="row">
                                        <div class="col-lg-12 text-center">
                                            <button type="button" class="btn border-3 btn-primary px-4 me-3" @click="refreshNdiSourceList"><cn>刷新</cn><en>Refresh</en></button>
                                            <button type="button" class="btn border-3 btn-primary px-4 me-3" @click="updateNdiSourceSelect"><cn>选择</cn><en>Select</en></button>
                                            <button type="button" class="btn border-3 btn-primary px-4" @click="displayNdiSource"><cn>HDMI输出</cn><en>Display</en></button>
                                        </div>
                                    </div>
                                    <div class="row"></div>
                                    <div class="row"></div>
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
    import { rpc,alertMsg } from "./assets/js/lp.utils.js";
    import { useDefaultConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,onMounted,nextTick} = vue;
    const app = createApp({
        components:{
            "bs-switch" : bootstrapSwitchComponent
        },
        setup(props,context) {
            
            const { defaultConf,updateDefaultConf } = useDefaultConf();

            const state = {
                chnIndex: ref(-1),
                chnImgUrl: ref("assets/images/nosignal.jpg"),
                ndiName: ref(""),
                ndiList: reactive([])
            }

            const unwatch = watchEffect(()=>{
                if(defaultConf.length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].type !== "ndi")
                            continue;
                        state.chnIndex.value = i;
                        state.ndiName.value = defaultConf[i].ndirecv.name;
                    }
                    updateChnImage();
                    unwatch();
                }
            })

            const updateChnImage = () => {
                if(defaultConf[state.chnIndex.value].enable)
                    state.chnImgUrl.value = "snap/snap" + state.chnIndex.value + ".jpg?rnd=" + Math.random();
                else
                    state.chnImgUrl.value = "assets/images/nosignal.jpg";

                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }

            const refreshNdiSourceList = tip => {
                rpc("enc.getNDIList").then(data => {
                    state.ndiList.splice(0);
                    state.ndiList.push(...data);
                    if(tip !== "noTip")
                        alertMsg("<cn>刷新NDI源列表成功</cn><en>Refresh ndi source list successfully</en>")
                });
            }

            const updateNdiSourceSelect = () => {
                defaultConf[state.chnIndex.value].ndirecv.name = state.ndiName.value;
                updateDefaultConf();
            }

            const displayNdiSource = () => {
                defaultConf.forEach(item => {
                    if(item.type === "mix") {
                        item.output.enable = true;
                        item.output.src = defaultConf[state.chnIndex.value].id;
                    }
                });
                updateDefaultConf();
            }

            onMounted(()=>{
                refreshNdiSourceList("noTip");
            })
            
            return {...state,defaultConf,updateDefaultConf,refreshNdiSourceList,updateNdiSourceSelect,displayNdiSource}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>