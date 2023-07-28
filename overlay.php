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
                                                <option v-for="(item,index) in handleEnableConf" :value="item.id">{{item.name}}</option>
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
                                        <div class="dropdown ms-auto">
                                            <button type="button" class="btn-option dropdown-toggle dropdown-toggle-nocaret cursor-pointer" data-bs-toggle="dropdown"><i class="fa-solid fa-ellipsis-vertical "></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a class="dropdown-item" href="javascript:;">
                                                        <cn>添加特效</cn>
                                                        <en>New effect</en>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body" >
                                    <div class="row">
                                        <div class="team-list col-lg-12 ps-4">
                                            <div v-for="(item,index) in handleOverlayConf">
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
                                                        <button type="button" class="btn border-3 btn-primary btn-sm" @click="onEditOverlay(index)"><i class="fa-solid fa-wand-magic me-1"></i><cn>编辑</cn><en>Edit</en></button>
                                                        <button type="button" class="btn border-3 btn-primary btn-sm ms-2" @click="onEditOverlay(index)"><i class="fa-solid fa-wand-magic me-1"></i><cn>编辑</cn><en>Edit</en></button>
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
                                            <bootstrap-switch v-model="editData.enable" size="normal"></bootstrap-switch>
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
                                                <option v-for=""></option>
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
                                            <input class="form-control"  type="text" v-model="editData.content" />
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
                                            <input class="form-control" type="text" v-model="editData.content" />
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
                                            <select class="form-control"></select>
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
                                            <w-slider v-model="editData.move" min="-20" max="20" step="1" fix="0"></w-slider>
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
                                            <w-slider v-model="editData.x" min="0" max="1" step="0.001" fix="3"></w-slider>
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
                                            <w-slider v-model="editData.y" min="0" max="1" step="0.001" fix="3"></w-slider>
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
                                            <w-slider v-model="editData.w" min="0" max="1" step="0.001" fix="3"></w-slider>
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
                                            <w-slider v-model="editData.h" min="0" max="1" step="0.001" fix="3"></w-slider>
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
                                            <w-slider v-model="editData.border" min="1" max="50" step="1" fix="0"></w-slider>
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
                                            <input class="form-control" class="form-control" type="text"/>
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
                                            <input class="form-control" class="form-control" type="text"/>
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
                                            <w-slider v-model="editData.scale" min="0.1" max="4" step="0.01" fix="2"></w-slider>
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
                                            <w-slider v-model="editData.alpha" min="0" max="1" step="0.01" fix="2"></w-slider>
                                        </div>
                                    </div>
                                    <div class="row text-center mt-4">
                                        <button type="button" class="btn border-3 btn-primary me-2 col-lg-2 offset-lg-5" @click="saveConf"><cn>保存</cn><en>Save</en></button>
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
                                        <div class="dropdown ms-auto">
                                            <button type="button" class="btn-option dropdown-toggle dropdown-toggle-nocaret cursor-pointer" data-bs-toggle="dropdown"><i class="fa-solid fa-ellipsis-vertical "></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a class="dropdown-item" href="javascript:;">
                                                        <cn>上传资源</cn>
                                                        <en>Upload</en>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body" >
                                    <div class="row">
                                        <div class="team-list col-lg-12">
                                            <div class="p-0 m-0" v-for="(item,index) in resConf">
                                                <div class="row align-items-center px-2" >
                                                    <div class="col-8 text-center force-text-overflow">
                                                        <span>{{item.name}}</span>
                                                    </div>
                                                    <div class="col-4 force-align-center">
                                                        <button type="button" class="btn border-3 btn-primary btn-sm"><i class="fa-regular fa-trash-can me-1"></i><cn>删除</cn><en>Delete</en></button>
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
        </main>
    </div>
<?php include ("./public/foot.inc") ?>

<script src="assets/plugins/nouislider/js/nouislider.min.js"></script>
<script type="module">
    import { rpc,alertMsg } from "./assets/js/helper.js";
    import { useDefaultConf,useOverlayConf,useResConf } from "./assets/js/confHooks.js";
    import { bootstrapSwitchComponent,wSliderComponent } from "./assets/js/vueHelper.js"
    
    const {createApp,ref,reactive,watch,watchEffect,computed} = Vue;
    const app = createApp({
        components:{
            "bootstrap-switch" : bootstrapSwitchComponent,
            "w-slider": wSliderComponent
        },
        setup(props,context) {
            
            const { defaultConf } = useDefaultConf();
            const { overlayConf } = useOverlayConf();
            const { resConf } = useResConf();
            
            let state = {
                chnIndex : ref(-1),
                chnImgUrl : ref(""),
                editData: reactive({}),
                layIndex : ref(-1)
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
            
            const unwatch = watchEffect(()=>{
                if(Object.keys(defaultConf).length > 0 && Object.keys(overlayConf).length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].enable) {
                            state.chnIndex.value = i;
                            break;
                        }
                    }
                    onEditOverlay(0);
                    updateChnImage();
                    unwatch();
                }
            })
            
            const onEditOverlay = (idx) => {
                state.layIndex.value = idx;
                Object.assign(state.editData, overlayConf[state.chnIndex.value][idx]);
            }
            
            const saveConf = () => {
                Object.assign(overlayConf[state.chnIndex.value][state.layIndex.value], state.editData);
                rpc("enc.updateOverlay", [ JSON.stringify( overlayConf, null, 2 ) ]).then(data => {
                    if ( typeof ( data.error ) != "undefined" )
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                    else
                        alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                });
            }
            
            return {...state,handleEnableConf,handleOverlayConf,resConf,onEditOverlay,saveConf}
        }
    });
    app.mount('#app');
</script>
</body>
</html>