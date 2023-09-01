<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content roi" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-6">
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
                                        <select class="form-select" v-model="chnIndex">
                                            <option v-for="(item,index) in handleEnableConf" :key="item.id" :value="item.id">{{item.name}}</option>
                                        </select>
                                    </div>
                                    <div class="flex-grow-0">
                                        <label class="fw-bold">
                                            <cn>区域</cn>
                                            <en>Area</en>:
                                        </label>
                                    </div>
                                    <div class="flex-grow-0">
                                        <select class="form-select" v-model="areaIndex" @change="handleAreaChange">
                                            <option value="0" en="area_0" cn="区域0" v-language-option></option>
                                            <option value="1" en="area_1" cn="区域1" v-language-option></option>
                                            <option value="2" en="area_2" cn="区域2" v-language-option></option>
                                            <option value="3" en="area_3" cn="区域3" v-language-option></option>
                                            <option value="4" en="area_4" cn="区域4" v-language-option></option>
                                            <option value="5" en="area_5" cn="区域5" v-language-option></option>
                                            <option value="6" en="area_6" cn="区域6" v-language-option></option>
                                            <option value="7" en="area_7" cn="区域7" v-language-option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 mt-2">
                                    <div style="position: relative;display:block">
                                        <img :src="chnImgUrl" class="card-img" style="width: 100%;height: auto;">
                                        <div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" ref="touchHandler">
                                            <vue-drag-resize v-if="roiConf.length > 0" :key="renderKey" :is-active="true" :x="areaX" :y="areaY" :w="areaW" :h="areaH" :parent-limitation="true" @resizestop="handleAreaPos" @dragstop="handleAreaPos">
                                                <div style="width: 100%;height: 100%;cursor: move"></div>
                                            </vue-drag-resize>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>感兴趣编码区域</cn>
                                <en>Region Of Interest</en>
                            </div>
                        </div>
                        <div class="card-body pb-4">
                            <div class="force-aspect-ratio">
                                <div class="aspect-ratio-content d-flex flex-column justify-content-between" v-if="roiConf.length > 0">
                                    <div class="row"></div>
                                    <div class="row"></div>
                                    <div class="row"></div>
                                    <div class="row">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>开关</cn>
                                                <en>Enable</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <bs-switch v-model="roiConf[chnIndex][areaIndex].enable" size="normal"></bs-switch>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>绝对QP</cn>
                                                <en>ABS QP</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <bs-switch v-model="roiConf[chnIndex][areaIndex].abs" size="normal"></bs-switch>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                QP
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <input class="form-control" v-model.trim.lazy="roiConf[chnIndex][areaIndex].qp">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>背景帧率</cn>
                                                <en>BG framerate</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <input class="form-control" v-model.trim.lazy="roiConf[chnIndex][areaIndex].framerate">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12 text-center">
                                            <button type="button" class="btn border-3 btn-primary px-4 me-3" @click="updateRoiConf">
                                                <cn>保存</cn>
                                                <en>Save</en>
                                            </button>
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
    import vue from "./assets/js/vue.build.js";
    import vueDragResize from "./assets/plugins/vueDragResize/js/vue3-drag-resize.esm.js";
    import { rpc,deepCopy } from "./assets/js/cul.helper.js";
    import { useDefaultConf,useRoiConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent,languageOptionDirective } from "./assets/js/vue.helper.js"
    const {createApp,ref,reactive,watchEffect,computed,nextTick,onMounted} = vue;

    const app = createApp({
        directives:{
            "language-option" : languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "vue-drag-resize" : vueDragResize
        },
        setup(props,context) {
            
            const { defaultConf,updateDefaultConf } = useDefaultConf();
            const { roiConf,updateRoiConf } = useRoiConf();

            const numRef = initialValue => {
                const numericValue = ref(Number(initialValue));
                return new Proxy(numericValue, {
                    get(target, key) {
                        return target[key];
                    },
                    set(target, key, value) {
                        const numeric = Number(value);
                        if (!isNaN(numeric)) {
                            target[key] = numeric;
                        } else {
                            target[key] = value;
                        }
                        return true;
                    },
                });
            }

            const state = {
                chnIndex : numRef(0),
                chnImgUrl : ref(""),
                areaIndex: numRef(0),
                renderKey: ref(0),
                areaX:ref(0),
                areaY:ref(0),
                areaW:ref(0),
                areaH:ref(0)
            }

            const updateChnImage = () => {
                state.chnImgUrl.value = "snap/snap" + state.chnIndex.value + ".jpg?rnd=" + Math.random();
                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }

            const unwatch = watchEffect(()=>{
                if(defaultConf.length > 0 && roiConf.length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].enable) {
                            state.chnIndex.value = i;
                            break;
                        }
                    }
                    handleAreaChange();
                    updateChnImage();
                    unwatch();
                }
            })

            const handleEnableConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return !!item.enable;
                })
            })


            const handleAreaChange = () => {
                state.areaX.value = roiConf[state.chnIndex.value][state.areaIndex.value].x;
                state.areaY.value = roiConf[state.chnIndex.value][state.areaIndex.value].y;
                state.areaW.value = roiConf[state.chnIndex.value][state.areaIndex.value].w;
                state.areaH.value = roiConf[state.chnIndex.value][state.areaIndex.value].h;
                state.renderKey.value = state.renderKey.value+1;
            }

            const handleAreaPos = rect => {
                roiConf[state.chnIndex.value][state.areaIndex.value].x = rect.left;
                roiConf[state.chnIndex.value][state.areaIndex.value].y = rect.top;
                roiConf[state.chnIndex.value][state.areaIndex.value].w = rect.width;
                roiConf[state.chnIndex.value][state.areaIndex.value].h = rect.height;
            }
            
            return {...state,defaultConf,updateDefaultConf,handleEnableConf,roiConf,updateRoiConf,handleAreaChange,handleAreaPos}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>