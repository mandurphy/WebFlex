<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
    <link href="assets/plugins/nouislider/css/nouislider.min.css" rel="stylesheet">
    <link href="assets/plugins/fileinput/css/fileinput.min.css" rel="stylesheet" >
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content ndi" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-7 lp-equal-height-container">
                    <div class="card lp-equal-height-item">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>通道预览</cn>
                                <en>Channel Preview</en>
                            </div>
                        </div>
                        <div class="card-body" >
                            <div class="row">
                                <div class="col-lg-12 mt-2">
                                    <div style="position: relative">
                                        <img :src="chnImgUrl" class="card-img" alt="...">
                                        <div class="w-100 h-100" style="position: absolute;top: 0;" v-if="defaultConf.length > 0" @click="onPickPoint" ref="pointCtxEle">
                                            <div v-for="(item,index) in defaultConf[chnIndex].colorKey.point" :style="{'position':'absolute','left':item.x*100+'%','top':item.y*100+'%','width':'8px','height':'8px','marginLeft':'-4px','marginTop':'-4px','background':'red'}"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 lp-equal-height-container">
                    <div class="card lp-equal-height-item">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>参数设定</cn>
                                <en>Setting</en>
                            </div>
                        </div>
                        <div class="card-body d-flex flex-column justify-content-between" v-if="defaultConf.length > 0">
                            <div class="row">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>启关</cn>
                                        <en>Main enable</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <bs-switch v-model="defaultConf[chnIndex].enable" :size="'normal'"></bs-switch>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
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
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
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
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
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
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
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
                                    <button type="button" class="btn border-3 btn-primary px-2 me-2" @click="onStartPickColor"><cn>开始取色</cn><en>Pick color</en></button>
                                    <button type="button" class="btn border-3 btn-primary px-2 me-2" @click="onStopPickColor"><cn>停止取色</cn><en>Stop pick</en></button>
                                    <button type="button" class="btn border-3 btn-primary px-3" @click="onUpdatePickColor"><cn>更新</cn><en>Update</en></button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
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
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>自动更新</cn>
                                        <en>Auto Update</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <bs-switch v-model="defaultConf[chnIndex].colorKey.autoUpdate" :size="'normal'"></bs-switch>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn border-2 btn-primary px-5" @click="onSaveDefaultConf"><cn>保存</cn><en>Save</en></button>
                                </div>
                            </div>
                            <div class="row"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-5 offset-lg-7">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="d-flex align-items-center">
                                <div class="p-2">
                                    <label class="mb-0 d-flex align-items-end">
                                        <cn>资源列表</cn>
                                        <en>Resource</en>
                                    </label>
                                </div>
                                <div class="ms-auto">
                                    <button class="btn border-2 btn-primary btn-sm" @click="uploadRes">
                                        <i class="fa-solid fa-upload me-1"></i>
                                        <label class="lp-cursor-pointer">
                                            <cn>上传</cn>
                                            <en>Upload</en>
                                        </label>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body" >
                            <div class="row">
                                <div class="team-list col-lg-12">
                                    <div class="p-0 m-0" v-for="(item,index) in handleResImageConf" :key="index">
                                        <div class="row align-items-center px-2" >
                                            <div class="col-8 text-center lp-text-overflow">
                                                <span>{{item.name}}</span>
                                            </div>
                                            <div class="col-4 lp-align-center">
                                                <button type="button" class="btn border-3 btn-primary btn-sm" @click="delCurrentRes(item.name)"><i class="fa-regular fa-trash-can me-1"></i><cn>删除</cn><en>Delete</en></button>
                                            </div>
                                        </div>
                                        <hr>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <upload-modal modal-title="上传资源&Upload" :modal-show="showModal"
                          upload-allow="['jpg']" upload-action="/link/upd/uploadRes.php" upload-count="2"
                          upload-tip="请把资源拖到此处，仅支持jpg图片...&Please drag the resourse here..."
                          @upload-success="uploadSuccess" @upload-error="uploadError">
            </upload-modal>
        </main>
    </div>
<?php include ("./public/foot.inc") ?>
<script src="assets/plugins/fileinput/js/fileinput.js" type="module"></script>
<script src="assets/plugins/fileinput/js/locales/zh.js" type="module"></script>
<script src="assets/plugins/fileinput/themes/fa6/theme.min.js" type="module"></script>
<script type="module">
    import { rpc,confirm,func,checkFileExists,clearReactiveArray } from "./assets/js/lp.utils.js";
    import { useDefaultConf,useResConf } from "./assets/js/vue.hooks.js";
    import {ignoreCustomElementPlugin,filterKeywordPlugin,bootstrapSwitchComponent,nouiSliderComponent,uploadModalComponent,languageOptionDirective} from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed} = vue;
    const app = createApp({
        directives:{
            "language-option":languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "noui-slider": nouiSliderComponent,
            "upload-modal": uploadModalComponent
        },
        setup(props,context) {
            
            const { defaultConf,updateDefaultConf } = useDefaultConf();
            const { resConf,handleResConf } = useResConf();

            const state = {
                chnIndex: ref(-1),
                chnImgUrl: ref("assets/img/nosignal.jpg"),
                hadImg: false,
                hadEnable: false,
                hadPick: ref(false),
                pointCtxEle: ref(null),
                showModal: ref(false)
            }

            const unwatch = watchEffect(()=>{
                if(defaultConf.length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].type !== "colorKey")
                            continue;
                        state.chnIndex.value = i;
                        state.hadEnable = defaultConf[i].enable;
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

            const updateChnImage = async () => {
                if(state.hadEnable && !state.hadImg)
                    state.hadImg = await checkFileExists("snap/snap" + state.chnIndex.value + ".jpg");

                if(state.hadEnable && state.hadImg)
                    state.chnImgUrl.value = "snap/snap" + state.chnIndex.value + ".jpg?rnd=" + Math.random();
                else
                    state.chnImgUrl.value = "assets/img/nosignal.jpg";

                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }

            const onPickPoint = (event) => {
                if(!state.hadPick.value || !state.pointCtxEle.value)
                    return;
                const rect = state.pointCtxEle.value.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                defaultConf[state.chnIndex.value].colorKey.point.push({ x, y });
            }

            const onStartPickColor = () => {
                clearReactiveArray(defaultConf[state.chnIndex.value].colorKey.point);
                state.hadPick.value = true;
            }

            const onStopPickColor = () => {
                if(state.hadPick.value)
                    updateDefaultConf();
                state.hadPick.value = false;
            }

            const onUpdatePickColor = () => {
                rpc("enc.updateColorKey");
            }

            const onSaveDefaultConf = () => {
                updateDefaultConf().then(()=>{
                    state.hadEnable = defaultConf[state.chnIndex.value].enable;
                })
            }

            const delCurrentRes = resName => {
                confirm( {
                    title: '<cn>删除资源</cn><en>Delete effect</en>',
                    content: '<cn>是否确认删除</cn><en>Delete effect</en> '+ resName + '?',
                    buttons: {
                        ok: {
                            text: "<cn>确认删除</cn><en>Confirm</en>",
                            btnClass: 'btn-primary',
                            keys: [ 'enter' ],
                            action: () => {
                                func("/root/delResFile",resName).then(data => handleResConf());
                            }
                        },
                        cancel: {
                            text: "<cn>取消</cn><en>Cancel</en>"
                        }
                    }
                } );
            }

            const uploadRes = () => {
                state.showModal.value = !state.showModal.value;
            }

            const uploadSuccess = data => {
                handleResConf();
            }

            const uploadError = errMsg => {
                alertMsg(errMsg, 'error');
            }
            
            return {...state,defaultConf,onSaveDefaultConf,handleResImageConf,
                onPickPoint,onStartPickColor,onStopPickColor,onUpdatePickColor,
                delCurrentRes,uploadRes,uploadSuccess,uploadError}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>