<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
    <link href="assets/plugins/nouislider/css/nouislider.min.css" rel="stylesheet">
    <link href="assets/plugins/confirm/css/jquery-confirm.min.css" rel="stylesheet">
    <link href="assets/plugins/fileinput/css/fileinput.min.css" rel="stylesheet" >
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content overlay" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-7">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body" >
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <select class="form-select" v-model="chnIndex">
                                                <option v-for="(item,index) in handleEnableConf" :key="item.id" :value="item.id">{{item.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12 mt-2">
                                            <img :src="chnImgUrl" class="card-img" alt="...">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header bg-transparent">
                                    <div class="d-flex align-items-center">
                                        <div class="p-2">
                                            <label class="mb-0 d-flex align-items-end">
                                                <cn>特效列表</cn>
                                                <en>Effect list</en>
                                            </label>
                                        </div>
                                        <div class="dropdown ms-auto force-cursor-pointer">
                                            <button type="button" class="btn border-3 btn-primary btn-sm dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
                                                <i class="fa-solid fa-plus me-1"></i>
                                                <label class="force-cursor-pointer">
                                                    <cn>添加</cn>
                                                    <en>Add</en>
                                                </label>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a class="dropdown-item" @click="addOverlay('pic')">
                                                        <cn>水印</cn>
                                                        <en>Pic</en>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" @click="addOverlay('text')">
                                                        <cn>字幕</cn>
                                                        <en>Text</en>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" @click="addOverlay('mask')">
                                                        <cn>马赛克</cn>
                                                        <en>Mosaic</en>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" @click="addOverlay('time')">
                                                        <cn>时间</cn>
                                                        <en>Time</en>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" @click="addOverlay('rect')">
                                                        <cn>矩形</cn>
                                                        <en>Rect</en>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" @click="addOverlay('border')">
                                                        <cn>边框</cn>
                                                        <en>Border</en>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body" >
                                    <div class="row">
                                        <div class="team-list col-lg-12 ps-4">
                                            <div v-for="(item,index) in handleOverlayConf" :key="item.id">
                                                <div :class="['row align-items-center border-start border-4 px-2',layIndex !== index ? 'border-grey' : 'border-warning']">
                                                    <div class="col-1">
                                                        <div>#{{index+1}}</div>
                                                    </div>
                                                    <div class="col-2">
                                                        <h6 class="mb-1 fw-bold" v-if="item.type==='pic'">
                                                            <cn>水印</cn>
                                                            <en>Image</en>
                                                        </h6>
                                                        <h6 class="mb-1 fw-bold" v-else-if="item.type==='text'">
                                                            <cn>字幕</cn>
                                                            <en>Text</en>
                                                        </h6>
                                                        <h6 class="mb-1 fw-bold" v-else-if="item.type==='time'">
                                                            <cn>时间</cn>
                                                            <en>Time</en>
                                                        </h6>
                                                        <h6 class="mb-1 fw-bold" v-else-if="item.type==='mask'">
                                                            <cn>马赛克</cn>
                                                            <en>Mosaic</en>
                                                        </h6>
                                                        <h6 class="mb-1 fw-bold" v-else-if="item.type==='rect'">
                                                            <cn>矩形</cn>
                                                            <en>Rect</en>
                                                        </h6>
                                                        <h6 class="mb-1 fw-bold" v-else="item.type==='border'">
                                                            <cn>边框</cn>
                                                            <en>Border</en>
                                                        </h6>
                                                    </div>
                                                    <div class="col force-text-overflow">
                                                        <span>{{item.content}}</span>
                                                    </div>
                                                    <div class="col text-center">
                                                        <div>x:{{item.x}},y:{{item.y}}</div>
                                                    </div>
                                                    <div class="col-3 force-align-center">
                                                        <button type="button" class="btn border-3 btn-primary btn-sm" @click="editOverlay(index)"><i class="fa-solid fa-brush me-1"></i><cn>编辑</cn><en>Edit</en></button>
                                                        <button type="button" class="btn border-3 btn-primary btn-sm ms-2" @click="delOverlay(index)"><i class="fa-regular fa-trash-can me-1"></i><cn>删除</cn><en>Delete</en></button>
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
                </div>
                <div class="col-lg-5">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header bg-transparent">
                                    <div class="p-2 mb-0 d-flex align-items-end">
                                        <cn>特效编辑</cn>
                                        <en>Effect edit</en>
                                        <small>#{{layIndex+1}}</small>
                                    </div>
                                </div>
                                <div class="card-body" v-if="Object.keys(editData).length !== 0">
                                    <div class="row">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>显示</cn>
                                                <en>Visable</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <bs-switch v-model="editData.enable" size="normal"></bs-switch>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="editData.type === 'mask'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>强度</cn>
                                                <en>Strength</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <select class="form-select" v-model="editData.content">
                                                <option value="8">8</option>
                                                <option value="16">16</option>
                                                <option value="32">32</option>
                                                <option value="64">64</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="editData.type === 'pic'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>图片</cn>
                                                <en>Image</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <select class="form-select" v-model="editData.content">
                                                <option v-for="(item,index) in handlePngConf" :key="index" :value="item.path">{{item.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="editData.type === 'text'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>文字</cn>
                                                <en>Text</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <input class="form-control"  type="text" v-model.trim.lazy="editData.content" />
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="editData.type === 'time'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>格式</cn>
                                                <en>Format</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <input class="form-control" type="text" v-model.trim.lazy="editData.content" />
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="editData.type === 'time' || editData.type === 'text'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>字体</cn>
                                                <en>Font</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <select class="form-select" v-model="editData.font">
                                                <option v-for="(item,index) in handleFontConf" :key="index" :value="item.path">{{item.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="editData.type === 'text'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>移动</cn>
                                                <en>Move</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="editData.move" min="-20" max="20" step="1" fix="0"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>水平位置</cn>
                                                <en>Pos X</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="editData.x" min="0" max="1" step="0.001" fix="3"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>垂直位置</cn>
                                                <en>Pos Y</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="editData.y" min="0" max="1" step="0.001" fix="3"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="editData.type === 'text' || editData.type === 'mask' || editData.type === 'rect' || editData.type === 'border'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>宽度</cn>
                                                <en>Width</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="editData.w" min="0" max="1" step="0.001" fix="3"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="editData.type === 'mask' || editData.type === 'rect' || editData.type === 'border'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>高度</cn>
                                                <en>Height</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="editData.h" min="0" max="1" step="0.001" fix="3"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="editData.type === 'border'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>边框宽度</cn>
                                                <en>Border</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="editData.border" min="1" max="50" step="1" fix="0"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4" id="color" v-if="editData.type !== 'pic' && editData.type !== 'mask'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>颜色</cn>
                                                <en>Color</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <picker-color v-model="editData.color" direct="bottom"></picker-color>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="editData.type === 'text' || editData.type === 'time'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>背景色</cn>
                                                <en>Back color</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <picker-color v-model="editData.bgColor" direct="bottom"></picker-color>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="editData.type === 'text' || editData.type === 'time' || editData.type === 'pic'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>缩放</cn>
                                                <en>Scale</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="editData.scale" min="0.1" max="4" step="0.01" fix="2"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row mt-4" v-if="editData.type !== 'mask'">
                                        <div class="col-lg-3 offset-lg-1 force-align-center">
                                            <label>
                                                <cn>透明度</cn>
                                                <en>Alpha</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-6">
                                            <noui-slider v-model="editData.alpha" min="0" max="1" step="0.01" fix="2"></noui-slider>
                                        </div>
                                    </div>
                                    <div class="row text-center mt-4">
                                        <button type="button" class="btn border-3 btn-primary me-2 col-lg-2 offset-lg-5" @click="saveOverlayConf"><cn>保存</cn><en>Save</en></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
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
                                                <label class="force-cursor-pointer">
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
                                            <div class="p-0 m-0" v-for="(item,index) in resConf" :key="index">
                                                <div class="row align-items-center px-2" >
                                                    <div class="col-8 text-center force-text-overflow">
                                                        <span>{{item.name}}</span>
                                                    </div>
                                                    <div class="col-4 force-align-center">
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
                </div>
            </div>
            <upload-modal modal-title="上传资源&Upload" :modal-show="showModal" modal-fade="true"
                          upload-allow="['png','ttf']" upload-action="/link/upd/uploadRes.php" upload-count="2"
                          upload-tip="请把资源拖到此处，仅支持png图片，ttf格式字体...&Please drag the resourse here..."
                          @upload-success="uploadSuccess" @upload-error="uploadError">
            </upload-modal>
        </main>
    </div>
<?php include ("./public/foot.inc") ?>

<script src="assets/plugins/nouislider/js/nouislider.min.js"></script>
<script src="assets/plugins/fileinput/js/fileinput.js" type="module"></script>
<script src="assets/plugins/fileinput/js/locales/zh.js" type="module"></script>
<script src="assets/plugins/fileinput/themes/fa6/theme.min.js" type="module"></script>
<script type="module">
    import { rpc,alertMsg,confirm,func } from "./assets/js/cul.helper.js";
    import { useDefaultConf,useOverlayConf,useResConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent,nouiSliderComponent,vueColorPickerComponent,uploadModalComponent } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed} = vue;
    const app = createApp({
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "noui-slider": nouiSliderComponent,
            "picker-color": vueColorPickerComponent,
            "upload-modal": uploadModalComponent
        },
        setup(props,context) {
            
            const { defaultConf } = useDefaultConf();
            const { overlayConf } = useOverlayConf();
            const { resConf,handleResConf } = useResConf();

            const state = {
                chnIndex : ref(-1),
                chnImgUrl : ref(""),
                editData: reactive({}),
                layIndex : ref(-1),
                colors : ref('#194d33'),
                showModal: ref(false),
                modalTitle:ref(""),
            }

            
            const updateChnImage = () => {
                state.chnImgUrl.value = "snap/snap" + state.chnIndex.value + ".jpg?rnd=" + Math.random();
                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }
    
            const handleEnableConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return !!item.enable;
                })
            })
    
            const handleOverlayConf = computed(()=>{
                return overlayConf[state.chnIndex.value];
            });

            const handlePngConf = computed(()=>{
               return resConf.filter((item,index) => {
                   if(item.name.includes(".png")) {
                       item.path = "/link/res/"+item.name;
                       return true;
                   }
               })
            });

            const handleFontConf = computed(()=>{
                return resConf.filter((item,index) => {
                    if(item.name.includes(".ttf")) {
                        item.path = "/link/res/"+item.name;
                        return true;
                    }
                })
            });

            const unwatch = watchEffect(()=>{
                if(defaultConf.length > 0 && Object.keys(overlayConf).length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].enable) {
                            state.chnIndex.value = i;
                            break;
                        }
                    }
                    editOverlay(0);
                    updateChnImage();
                    unwatch();
                }
            })
            
            const editOverlay = (idx) => {
                state.layIndex.value = idx;
                Object.assign(state.editData, overlayConf[state.chnIndex.value][idx]);
            }

            const delOverlay = idx => {
                confirm( {
                    title: '<cn>删除特效</cn><en>Delete effect</en>',
                    content: '<cn>是否确认删除特效？</cn><en>Delete effect?</en>',
                    buttons: {
                        ok: {
                            text: "<cn>确认删除</cn><en>Confirm</en>",
                            btnClass: 'btn-primary',
                            keys: [ 'enter' ],
                            action: () => {
                                overlayConf[state.chnIndex.value].splice(idx, 1);
                                saveOverlayConf();
                            }
                        },
                        cancel: {
                            text: "<cn>取消</cn><en>Cancel</en>",
                            action: () => {
                                console.log( 'the user clicked cancel' );
                            }
                        }

                    }
                } );
            }
            const addOverlay = type => {
                let lay={
                    type: type,
                    x: 0,
                    y: 0,
                    h: 0,
                    w: 0,
                    scale: 1,
                    content: "",
                    enable: false,
                    color: "#000000",
                    alpha: 1,
                    font: "/link/res/font.ttf"
                };
                if(lay.type === "time")
                    lay.content="yyyy-MM-dd hh:mm:ss";

                overlayConf[state.chnIndex.value].push(lay);
                editOverlay(overlayConf[state.chnIndex.value].length-1)
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
                                func("/link/mgr/root/delResFile",resName).then(data => {
                                    handleResConf();
                                });
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
            
            const saveOverlayConf = () => {
                Object.assign(overlayConf[state.chnIndex.value][state.layIndex.value], state.editData);
                rpc("enc.updateOverlay", [ JSON.stringify( overlayConf, null, 2 ) ]).then(data => {
                    if ( typeof ( data.error ) != "undefined" )
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                    else
                        alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                });
            }

            return {...state,handleEnableConf,handleOverlayConf,handlePngConf,handleFontConf,resConf,
                editOverlay,delOverlay,addOverlay,delCurrentRes,uploadRes,uploadSuccess,uploadError,saveOverlayConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>