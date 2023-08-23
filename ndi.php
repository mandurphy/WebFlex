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
                            <div class="force-aspect-ratio">
                                <div class="aspect-ratio-content d-flex flex-column justify-content-between">
                                    <div class="row"></div>
                                    <div class="row"></div>
                                    <div class="row">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>总开关</cn>
                                                <en>Main enable</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <bootstrap-switch v-model="" size="normal"></bootstrap-switch>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>源设备名</cn>
                                                <en>Source name</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>源列表</cn>
                                                <en>Source List</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <select class="form-select" v-model="">
                                                <option v-for=""></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12 text-center">
                                            <button type="button" class="btn border-3 btn-primary px-4 me-3"><cn>刷新</cn><en>Refresh</en></button>
                                            <button type="button" class="btn border-3 btn-primary px-4 me-3"><cn>选择</cn><en>Select</en></button>
                                            <button type="button" class="btn border-3 btn-primary px-4"><cn>输出</cn><en>Display</en></button>
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
    import { rpc,alertMsg } from "./assets/js/helper.js";
    import { useDefaultConf } from "./assets/js/confHooks.js";
    import { bootstrapSwitchComponent } from "./assets/js/vueHelper.js"
    import vue from "./assets/plugins/vue/vue.build.js";

    const {createApp,ref,watchEffect} = vue;
    const app = createApp({
        components:{
            "bootstrap-switch" : bootstrapSwitchComponent
        },
        setup(props,context) {
            
            const { defaultConf } = useDefaultConf();

            const state = {
                chnIndex: ref(-1),
                chnImgUrl: ref("assets/images/nosignal.jpg"),
            }
            
            const updateChnImage = () => {
                if(defaultConf[state.chnIndex.value].enable)
                    state.chnImgUrl.value = "snap/snap" + state.chnIndex.value + ".jpg?rnd=" + Math.random();
                else
                    state.chnImgUrl.value = "assets/images/nosignal.jpg";
                
                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }
            
            
            const unwatch = watchEffect(()=>{
                if(Object.keys(defaultConf).length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].type !== "ndi")
                            continue;
                        state.chnIndex.value = i;
                    }
                    updateChnImage();
                    unwatch();
                }
            })
            
            
            const saveConf = () => {
                // rpc( "enc.updateOverlay", [ JSON.stringify( overlayConf, null, 2 ) ], data => {
                //     if ( typeof ( data.error ) != "undefined" )
                //         alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                //     else
                //         alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                // } );
            }
            
            return {...state,saveConf}
        }
    });
    app.mount('#app');
</script>
</body>
</html>