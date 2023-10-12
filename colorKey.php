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
        <main class="page-content ndi" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-7 force-equal-height-container">
                    <div class="card force-equal-height-item">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>通道预览</cn>
                                <en>Channel Preview</en>
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
                <div class="col-lg-5 force-equal-height-container">
                    <div class="card force-equal-height-item">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>参数设定</cn>
                                <en>Setting</en>
                            </div>
                        </div>
                        <div class="card-body d-flex flex-column justify-content-between" v-if="defaultConf.length > 0">
                            <div class="row">
                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                    <label>
                                        <cn>启关</cn>
                                        <en>Main enable</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <bs-switch v-model="defaultConf[chnIndex].enable" size="normal"></bs-switch>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                    <label>
                                        <cn>前景通道</cn>
                                        <en>Front Channel</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <select class="form-select" v-model="defaultConf[chnIndex].colorKey.srcA">
                                        <option v-for="(item,index) in defaultConf" :key="item.id" :value="item.id">{{item.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                    <label>
                                        <cn>背景类型</cn>
                                        <en>Background Type</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <select class="form-select" v-model="defaultConf[chnIndex].colorKey.srcB.type">
                                        <option value="img" cn="图片" en="Image" v-language-option></option>
                                        <option value="chn" cn="视频通道" en="Channel" v-language-option></option>
                                    </select>
                                </div>
                            </div>
                            <div class="row" v-if="defaultConf[chnIndex].colorKey.srcB.type === 'img'">
                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                    <label>
                                        <cn>背景图片</cn>
                                        <en>Background Image</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <select class="form-select" v-model="defaultConf[chnIndex].colorKey.srcB.path">
                                        <option v-for="(item,index) in handleResImageConf" :key="index" :value="item.path">{{item.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row" v-else>
                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                    <label>
                                        <cn>背景通道</cn>
                                        <en>Background Channel</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <select class="form-select" v-model="defaultConf[chnIndex].colorKey.srcB.id">
                                        <option v-for="(item,index) in defaultConf" :key="item.id" :value="item.id">{{item.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-8 offset-lg-3 text-center">
                                    <button type="button" class="btn border-3 btn-primary px-2 me-2" @click=""><cn>开始取色</cn><en>Pick color</en></button>
                                    <button type="button" class="btn border-3 btn-primary px-2 me-2" @click=""><cn>停止取色</cn><en>Stop pick</en></button>
                                    <button type="button" class="btn border-3 btn-primary px-3" @click=""><cn>更新</cn><en>Update</en></button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                    <label>
                                        <cn>容差</cn>
                                        <en>Tolerance</en>
                                    </label>
                                </div>
                                <div class="col-lg-6 pt-2">
                                    <noui-slider v-model="defaultConf[chnIndex].colorKey.tolerance" :min="0" :max="50" :step="1" :fix="0"></noui-slider>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 offset-lg-1 force-align-center">
                                    <label>
                                        <cn>自动更新</cn>
                                        <en>Auto Update</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <bs-switch v-model="defaultConf[chnIndex].colorKey.autoUpdate" size="normal"></bs-switch>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn border-2 btn-primary px-5" @click=""><cn>保存</cn><en>Save</en></button>
                                </div>
                            </div>
                            <div class="row"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
<?php include ("./public/foot.inc") ?>

<script type="module">
    import { rpc } from "./assets/js/lp.utils.js";
    import { useDefaultConf,useResConf } from "./assets/js/vue.hooks.js";
    import {ignoreCustomElementPlugin,bootstrapSwitchComponent,nouiSliderComponent,languageOptionDirective} from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed} = vue;
    const app = createApp({
        directives:{
            "language-option":languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "noui-slider": nouiSliderComponent
        },
        setup(props,context) {
            
            const { defaultConf,updateDefaultConf } = useDefaultConf();
            const { resConf } = useResConf();

            const state = {
                chnIndex: ref(-1),
                chnImgUrl: ref("assets/images/nosignal.jpg"),
            }

            const unwatch = watchEffect(()=>{
                if(defaultConf.length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].type !== "colorKey")
                            continue;
                        state.chnIndex.value = i;
                    }
                    updateChnImage();
                    unwatch();
                }
            })

            const handleResImageConf = computed(()=>{
                return resConf.filter(item => {
                    if(item.name.includes(".jpg")) {
                        item.path = "/link/res/"+item.name;
                        return true;
                    }
                })
            })

            const updateChnImage = () => {
                if(defaultConf[state.chnIndex.value].enable)
                    state.chnImgUrl.value = "snap/snap" + state.chnIndex.value + ".jpg?rnd=" + Math.random();
                else
                    state.chnImgUrl.value = "assets/images/nosignal.jpg";

                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }

            
            return {...state,defaultConf,updateDefaultConf,handleResImageConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>