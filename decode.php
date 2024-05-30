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
    <main class="page-content decode" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-12 mx-auto">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>全局配置</cn>
                            <en>Overall config</en>
                        </div>
                    </div>
                    <div class="card-body overflow-auto" >
                        <div class="row">
                            <div class="col-lg-12" v-if="Object.keys(globalConf).length !== 0">
                                <div class="row">
                                    <div class="col-2 text-center"></div>
                                    <div class="col-2 text-center">
                                        <cn>帧率</cn>
                                        <en>framerate</en>
                                    </div>
                                    <div class="col text-center">
                                        <cn>缓冲模式</cn>
                                        <en>buffer mode</en>
                                    </div>
                                    <div class="col-2 text-center">
                                        <cn>缓冲时间</cn>
                                        <en>buffer time</en>
                                    </div>
                                    <div class="col text-center">
                                        <cn>协议</cn>
                                        <en>protocol</en>
                                    </div>
                                    <div class="col text-center">
                                        <cn>视频解码</cn>
                                        <en>video decode</en>
                                    </div>
                                    <div class="col text-center">
                                        <cn>音频解码</cn>
                                        <en>audio decode</en>
                                    </div>
                                    <div class="col text-center"></div>
                                </div>
                                <hr >
                                <div class="row mt-1">
                                    <div class="col-lg-12">
                                        <div class="row">
                                            <div class="col-2 text-center p-0 pt-2">
                                                <cn>拉流配置</cn>
                                                <en>Pull config</en>
                                            </div>
                                            <div class="col-2">
                                                <input type="text" class="form-control" v-model.trim.lazy="globalConf.net.framerate">
                                            </div>
                                            <div class="col">
                                                <select class="form-select" v-model="globalConf.net.bufferMode">
                                                    <option value="0" cn="一般" en="Normal" v-language-option></option>
                                                    <option value="1" cn="实时" en="NoBuffer" v-language-option></option>
                                                    <option value="2" cn="缓冲" en="Buffer" v-language-option></option>
                                                    <option value="3" cn="帧同步" en="Sync" v-language-option></option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <input type="text" class="form-control" v-model.trim.lazy="globalConf.net.minDelay">
                                            </div>
                                            <div class="col">
                                                <select class="form-select" v-model="globalConf.net.protocol">
                                                    <option value="udp">UDP</option>
                                                    <option value="tcp">TCP</option>
                                                </select>
                                            </div>
                                            <div class="col lp-align-center">
                                                <bs-switch v-model="globalConf.net.decodeV"></bs-switch>
                                            </div>
                                            <div class="col lp-align-center">
                                                <bs-switch v-model="globalConf.net.decodeA"></bs-switch>
                                            </div>
                                            <div class="col lp-align-center"></div>
                                        </div>
                                        <hr >
                                    </div>
                                </div>
                                <div class="row text-center mt-3">
                                    <div class="col-lg-12">
                                        <button type="button" class="btn  border-3 btn-primary me-2" @click="saveGlobalConfByLocal">
                                            <cn>应用到全部</cn>
                                            <en>Apply to all</en>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-lg-12 mx-auto">
                <ul class="nav nav-tabs nav-primary" role="tablist">
                    <li class="nav-item" role="presentation" @click="tabType = 'net'">
                        <a class="nav-link active" data-bs-toggle="tab" href="#tab1" role="tab" aria-selected="false">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-brands fa-internet-explorer me-1"></i></div>
                                <div class="tab-title"><cn>网络输入</cn><en>Network stream</en></div>
                            </div>
                        </a>
                    </li>
                    <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.carousel" class="nav-item" role="presentation" @click="tabType = 'file'">
                        <a class="nav-link" data-bs-toggle="tab" href="#tab2" role="tab" aria-selected="false">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-regular fa-file-audio me-1"></i></div>
                                <div class="tab-title"><cn>文件轮播</cn><en>File carousel</en></div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation" @click="tabType = 'push'">
                        <a class="nav-link" data-bs-toggle="tab" href="#tab3" role="tab" aria-selected="false">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-solid fa-arrow-down-short-wide me-1"></i></div>
                                <div class="tab-title"><cn>接收推流</cn><en>Receive stream</en></div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="tab-content py-3 pe-2 ps-2">
                    <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                        <div class="row">
                            <div class="col-2 text-center">
                                <cn>频道名称</cn>
                                <en>channel name</en>
                            </div>
                            <div class="col-3 text-center">
                                <cn>流地址</cn>
                                <en>stream url</en>
                            </div>
                            <div class="col text-center">
                                <cn>帧率</cn>
                                <en>framerate</en>
                            </div>
                            <div class="col text-center">
                                <cn>缓冲模式</cn>
                                <en>buffer mode</en>
                            </div>
                            <div class="col text-center">
                                <cn>缓冲时间</cn>
                                <en>buffer time</en>
                            </div>
                            <div class="col text-center">
                                <cn>协议</cn>
                                <en>protocol</en>
                            </div>
                            <div class="col text-center">
                                <cn>视频解码</cn>
                                <en>video decode</en>
                            </div>
                            <div class="col text-center">
                                <cn>音频解码</cn>
                                <en>audio decode</en>
                            </div>
                            <div class="col text-center">
                                <cn>开关</cn>
                                <en>enable</en>
                            </div>
                            <div class="col text-center">
                                <cn>HDMI</cn>
                                <en>HDMI</en>
                            </div>
                        </div>
                        <hr >
                        <div class="row mt-1" v-for="(item,index) in handleNetConf" :key="item.id">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-2 text-center">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.name">
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.net.path">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.net.framerate">
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="item.net.bufferMode">
                                            <option value="0" cn="一般" en="Normal" v-language-option></option>
                                            <option value="1" cn="实时" en="NoBuffer" v-language-option></option>
                                            <option value="2" cn="缓冲" en="Buffer" v-language-option></option>
                                            <option value="3" cn="帧同步" en="Sync" v-language-option></option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.net.minDelay">
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="item.net.protocol">
                                            <option value="udp">UDP</option>
                                            <option value="tcp">TCP</option>
                                        </select>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.net.decodeV"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.net.decodeA"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.enable"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <button type="button" class="btn btn-primary border-1 px-3" @click="onDisplayHdmi(item.id,item.enable)">
                                            <cn>输出</cn>
                                            <en>display</en>
                                        </button>
                                    </div>
                                </div>
                                <hr >
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab2" role="tabpanel">
                        <div class="row">
                            <div class="col-2 text-center">
                                <cn>频道名称</cn>
                                <en>channel name</en>
                            </div>
                            <div class="col text-center">
                                <cn>视频解码</cn>
                                <en>video decode</en>
                            </div>
                            <div class="col text-center">
                                <cn>音频解码</cn>
                                <en>audio decode</en>
                            </div>
                            <div class="col text-center">
                                <cn>开关</cn>
                                <en>enable</en>
                            </div>
                            <div class="col text-center">
                                <cn>HDMI</cn>
                                <en>HDMI</en>
                            </div>
                            <div class="col-6"></div>
                        </div>
                        <hr >
                        <div class="row mt-1">
                            <div class="col-lg-12">
                                <div class="row" v-if="Object.keys(handleVideoFileConf).length > 0">
                                    <div class="col-2 text-center">
                                        <input type="text" class="form-control" v-model.trim.lazy="handleVideoFileConf.name">
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="handleVideoFileConf.decodeV"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="handleVideoFileConf.decodeA"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="handleVideoFileConf.enable"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <button type="button" class="btn btn-primary border-1 px-3" @click="onDisplayHdmi(handleVideoFileConf.id,handleVideoFileConf.enable)">
                                            <cn>输出</cn>
                                            <en>display</en>
                                        </button>
                                    </div>
                                    <div class="col-6"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="card" style="border-left: none;border-right: none">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col text-center">
                                                <cn>序号</cn>
                                                <en>Num.</en>
                                            </div>
                                            <div class="col-3 text-center">
                                                <cn>文件名称</cn>
                                                <en>File name</en>
                                            </div>
                                            <div class="col text-center">
                                                <cn>时长</cn>
                                                <en>Duration</en>
                                            </div>
                                            <div class="col-4 text-center">
                                                <cn>时间轴</cn>
                                                <en>Timeline</en>
                                            </div>
                                            <div class="col-3 text-center">
                                                <cn>操作</cn>
                                                <en>Option</en>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row" v-for="(item,index) in handleVideoFileConf.file">
                                            <div class="col text-center pt-2">
                                                {{index+1}}
                                            </div>
                                            <div class="col-3">
                                                <select class="form-select" v-model="handleVideoFileConf.file[index]">
                                                    <option cn="无" en="none" value="" v-language-option></option>
                                                    <option v-for="(it,idx) in handleUsbMp4File" :key="idx" :value="it.name">{{it.name}}</option>
                                                </select>
                                            </div>
                                            <div class="col text-center pt-2">
                                                {{formatTime(onHandleFileDuration(item))}}
                                            </div>
                                            <div class="col-4 pt-3">
                                                <noui-slider :func-value="onHandleFilePostion(item)" :min="0" :max="onHandleFileDuration(item)" :step="1000" :fix="2" :format="'time'" :index="index" @slide-end="onTimelineSliderEnd"></noui-slider>
                                            </div>
                                            <div class="col-3 text-center">
                                                <button type="button" class="btn btn-primary px-3" @click="onVideoFileOption('up',index)">
                                                    <i class="fa-solid fa-arrow-up"></i>
                                                </button>
                                                <button type="button" class="btn btn-primary px-3 ms-2" @click="onVideoFileOption('down',index)">
                                                    <i class="fa-solid fa-arrow-down"></i>
                                                </button>
                                                <button type="button" class="btn btn-primary px-3 ms-2" @click="onVideoFileOption('play',index)">
                                                    <i class="fa-solid fa-play"></i>
                                                </button>
                                                <button type="button" class="btn btn-primary px-3 ms-2" @click="onVideoFileOption('del',index)">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </button>
                                            </div>
                                            <hr>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab3" role="tabpanel">
                        <div class="row">
                            <div class="col-2 text-center">
                                <cn>描述</cn>
                                <en>description</en>
                            </div>
                            <div class="col-5 text-center">
                                <cn>推流地址</cn>
                                <en>stream url</en>
                            </div>
                            <div class="col text-center">
                                <cn>解码通道</cn>
                                <en>decode channel</en>
                            </div>
                            <div class="col text-center">
                                <cn>用户名</cn>
                                <en>username</en>
                            </div>
                            <div class="col text-center">
                                <cn>密码</cn>
                                <en>password</en>
                            </div>
                            <div class="col text-center">
                                <cn>启用认证</cn>
                                <en>auth</en>
                            </div>
                            <div class="col text-center">
                                <cn>操作</cn>
                                <en>option</en>
                            </div>
                        </div>
                        <hr >
                        <div class="row mt-1" v-for="(item,index) in handleRXPushConf" :key="item.id">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-2 text-center">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.desc">
                                    </div>
                                    <div class="col-5">
                                        <div class="input-group">
                                            <button class="btn btn-primary input-group-text input-group-addon lp-cursor-pointer" @click="onResetRXPushChnUrl(index)">
                                                <i class="fa-solid fa-repeat"></i>
                                            </button>
                                            <input class="form-control" v-model.trim.lazy="item.url" disabled readonly>
                                            <button class="btn btn-primary input-group-text input-group-addon lp-cursor-pointer" @click="onCopyRXPushChnUrl(index)">
                                                <i class="fa-regular fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="item.bind">
                                            <option v-if="handleNetConf.length > 0" v-for="(it,index) in handleNetConf" :key="index" :value="it.id">{{it.name}}</option>
                                            <option value="-1" cn="关闭" en="Close" v-language-option></option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.uname">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.passwd">
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.auth"></bs-switch>
                                    </div>

                                    <div class="col lp-align-center">
                                        <button type="button" class="btn btn-primary border-1 px-3" @click="onDelRXPushChn(index)">
                                            <cn>删除</cn>
                                            <en>delete</en>
                                        </button>
                                    </div>
                                </div>
                                <hr >
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-12 tips">
                                <cn>1、设备作为流媒体服务器使用，可以接收其他设备推送的RTMP流。</cn>
                                <en>1. After the decoding channel is set, the stream address of the corresponding channel is automatically replaced with the current decoding address when saving.</en>
                            </div>
                            <div class="col-lg-12 tips">
                                <cn>2、需要绑定解码通道时，请确定要绑定的通道没有正在使用。</cn>
                                <en>2. Make sure that the binding channel is not in use</en>
                            </div>
                            <div class="col-lg-12 tips">
                                <cn>3、设置解码通道后，保存时，会自动把该通道的流地址替换为当前的解码地址。</cn>
                                <en>3. After the decoding channel is set, the stream address of the corresponding channel is automatically replaced with the current decoding address when saving.</en>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-lg-12 text-center" v-if="tabType!=='push'">
                            <button type="button" class="btn btn-primary border-3 px-5 me-2" v-if="tabType==='file'" @click="onAddVideoFile">
                                <cn>添加</cn>
                                <en>Add</en>
                            </button>
                            <button type="button" class="btn btn-primary border-3 px-5" @click="saveDefaultConf">
                                <cn>保存</cn>
                                <en>Save</en>
                            </button>
                        </div>
                        <div class="col-lg-12 text-center" v-if="tabType==='push'">
                            <button type="button" class="btn btn-primary border-3 px-5 me-2" @click="onAddRXPushChn">
                                <cn>添加</cn>
                                <en>Add</en>
                            </button>
                            <button type="button" class="btn btn-primary border-3 px-5" @click="saveRXPushConf">
                                <cn>保存</cn>
                                <en>Save</en>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
<?php include ("./public/foot.inc") ?>
<script type="module">
    
    import { rpc, extend, deepCopy, confirm, swap, clearReactiveArray, clearReactiveObject, formatTime, alertMsg, isEmpty } from "./assets/js/lp.utils.js";
    import { useDefaultConf,useUsbFilesConf,useHardwareConf,useRXPushConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,bootstrapSwitchComponent,multipleSelectComponent,nouiSliderComponent,languageOptionDirective } from "./assets/js/vue.helper.js"
    import { md5 } from "./assets/plugins/md5/js.md5.esm.js";
    import vue from "./assets/js/vue.build.js";
    const {createApp,ref,reactive,watch,toRefs,computed,onMounted} = vue;

    const app = createApp({
        directives:{
            "language-option": languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "multiple-select": multipleSelectComponent,
            "noui-slider": nouiSliderComponent
        },
        setup(props,context) {
            
            const { defaultConf,updateDefaultConf } = useDefaultConf();
            const { hardwareConf } = useHardwareConf();
            const { rxPushConf,updateRXPushConf } = useRXPushConf();
            const { usbFiles } = useUsbFilesConf();

            const state = {
                globalConf: reactive({}),
                tabType: ref("net"),
                playList: reactive([]),
                playPostion:reactive([])
            }

            const unwatch = watch(defaultConf, (value) => {
                for (let i = 0; i < defaultConf.length; i++) {
                    if(defaultConf[i].type === "net" && Object.keys(state.globalConf).length === 0)
                        Object.assign(state.globalConf, deepCopy(defaultConf[i]));
                }
                unwatch();
            });

            const handleNetConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return item.type === 'net';
                })
            })

            const onDisplayHdmi = (chnId,chnEnable) => {
                if(chnEnable) {
                    const mix = defaultConf.find(item => item.type === "mix");
                    mix.output.src = chnId;
                    updateDefaultConf("noTip").then(()=>{
                        alertMsg("<cn>输出至HDMI成功</cn><en>Display hdmi successfully!</en>","success");
                    })
                } else
                    alertMsg("<cn>通道未开启</cn><en>Display hdmi successfully!</en>","error");
            }

            const handleVideoFileConf = computed(()=>{
                if(defaultConf.length > 0) {
                    return defaultConf.find(item => {
                        if(item.type === "file") {
                            if(item.file.length < 1)
                                item.file.push("");
                            return true;
                        }
                    })
                }
                return {};
            })

            const handleUsbMp4File = computed(()=>{
                return usbFiles.filter((item,index) => {
                    return !!(item.type === 'file' && (item.name.endsWith(".mp4") || item.name.endsWith(".flv") || item.name.endsWith(".ts")))
                })
            })

            const handleRXPushConf = computed(() => {
                if(rxPushConf.length > 0) {
                     rxPushConf.map(item => {
                        item.url = item.url.replace(/rtmp:\/\/[^\/]+\/(.*?)(\?.*)?$/, `rtmp://${window.location.hostname}/$1`);
                        let auth = md5(`uname=${item.uname}&passwd=${item.passwd}`).toUpperCase();
                        auth = auth.length > 16 ? auth.substring(0,16) : auth;
                        if (item.auth)
                            item.url += '?Auth='+auth;
                        return item;
                    })
                }



                return rxPushConf.length > 0
                        ? rxPushConf.map(item => {
                            if(isEmpty(item.url)) item.url = updatePushUrl();
                            let url = new URL(item.url);
                            url.search = '';
                            item.url = url.toString();
                            let auth = md5(`uname=${item.uname}&passwd=${item.passwd}`).toUpperCase();
                            auth = auth.length > 16 ? auth.substring(0,16) : auth;
                            if (item.auth)
                                item.url += '?Auth='+auth;
                            return item;
                        }) : [];
            });

            const saveGlobalConfByLocal = () => {
                for ( let i = 0; i < defaultConf.length; i++ ) {
                    if (defaultConf[i].type !== "net")
                        continue;
                    delete state.globalConf.net.path;
                    extend(defaultConf[i].net, deepCopy(state.globalConf.net));
                }
                saveDefaultConf();
            }

            const onVideoFileOption = (type,index) => {
                if(type !== "play") {
                    defaultConf.forEach(item => {
                        if(item.type === "file") {
                            if(type === "up" && index !== 0)
                                swap(item.file,index,index-1);
                            if(type === "down" && index < item.file.length-1)
                                swap(item.file,index,index+1);
                            if(type === "del")
                                item.file.splice(index, 1);
                            return true;
                        }
                    })
                } else {
                    rpc("enc.play", [index, 0]);
                }
            }

            const onGetPlayList = () => {
                rpc("enc.getPlayList").then(list => {
                    clearReactiveArray(state.playList);
                    state.playList.push(...list);
                } );
            }

            const onGetPlayPosition = () => {
                rpc("enc.getPlayPosition").then( obj => {
                    clearReactiveObject(state.playPostion);
                    Object.assign(state.playPostion,obj)
                } );
                setTimeout(onGetPlayPosition,1000);
            }

            const onHandleFileDuration = fileName => {
                let duration = 0;
                state.playList.forEach(item => {
                    if(item.name === fileName) {
                        duration = item.duration
                    }
                })
                return duration;
            }

            const onHandleFilePostion = fileName => {
                let postion = 0;
                if(Object.keys(state.playPostion).length > 0 && state.playPostion.file === fileName)
                    postion = state.playPostion.position;
                return postion;
            }

            const onAddVideoFile = () => {
                defaultConf.forEach(item => {
                    if(item.type === "file")
                        item.file.push("");
                })
            }

            const onTimelineSliderEnd = (val,index) => {
                const [hours, minutes, seconds] = val.split(':').map(Number);
                rpc("enc.play",[index,((hours * 60 + minutes) * 60 + seconds) * 1000]);
            }
            
            const saveDefaultConf = () => {
                const maxENC = hardwareConf.capability.encode.maxPixel;
                let sum=0;
                for ( let i = 0; i < defaultConf.length; i++ ) {
                    if(defaultConf[i].enable && defaultConf[i].encv !== undefined){
                        if(defaultConf[i].encv.codec !== "close")
                            sum+=defaultConf[i].encv.width*defaultConf[i].encv.height*defaultConf[i].encv.framerate;
                        if(defaultConf[i].enable2 && defaultConf[i].encv2.codec !== "close"){
                            sum+=defaultConf[i].encv2.width*defaultConf[i].encv2.height*defaultConf[i].encv2.framerate;
                        }
                    }
                }

                if(maxENC > 0 && sum > maxENC) {
                    confirm( {
                        title: '<cn>警告</cn><en>Warning</en>',
                        content: '<cn>超出编码性能上限，请调整编码参数！</cn><en>The limit of encode performance is exceeded. Please adjust the encode parameters!</en>',
                        buttons: {
                            ok: {
                                text: "<cn>知道了</cn><en>I know</en>",
                                btnClass: 'btn-primary',
                                keys: [ 'enter' ],
                                action: () => updateDefaultConf()
                            }
                        }
                    } );
                    return;
                }

                for(let i=0;i<defaultConf.length;i++) {
                    if(defaultConf[i].type === "net") {
                        if(defaultConf[i].net.decodeV) {
                            if(defaultConf[i].encv.codec === "close") {
                                defaultConf[i].encv.codec = "h264";
                                defaultConf[i].encv.profile = "high";
                            }
                        }
                        if(defaultConf[i].net.decodeA) {
                            if(defaultConf[i].enca.codec === "close")
                                defaultConf[i].enca.codec = "aac";
                        }
                    }
                }
                updateDefaultConf().then(onGetPlayList);
            }

            const updatePushUrl = (length=12) => {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let key = '';
                for (let i = 0; i < length; i++) {
                    key += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                return "rtmp://"+window.location.hostname+"/live/"+key;
            }

            const onResetRXPushChnUrl = index => {
                rxPushConf[index].url = updatePushUrl();
            }

            const onCopyRXPushChnUrl = index => {
                const textarea = document.createElement("textarea");
                textarea.value = rxPushConf[index].url;
                textarea.style.display = 'none';
                document.body.appendChild(textarea);
                textarea.select();
                let success = document.execCommand("copy");
                document.body.removeChild(textarea);
                if (!success) {
                    alertMsg('<cn>复制失败，请手动复制</cn><en>Copy failed, please copy manually</en>', 'error');
                    return;
                }
                alertMsg('<cn>已复制</cn><en>Have copied</en>', 'success');
            }

            const onAddRXPushChn = () => {
                rxPushConf.push({
                    "desc":"New Recive",
                    "bind":-1,
                    "auth":false,
                    "uname":"admin",
                    "passwd":"admin",
                    "url":updatePushUrl()
                })
            }
            const onDelRXPushChn = index => {
                rxPushConf.splice(index, 1);
            }

            const saveRXPushConf = () => {
                let hadBind = false;
                rxPushConf.forEach(item => {
                    if(item.bind !== "-1") {
                        defaultConf.forEach(conf => {
                            if(conf.id === item.bind && conf.type === 'net') {
                                hadBind = true;
                                conf.net.path = item.url.replace(/rtmp:\/\/[^\/]+\/(.*?)(\?.*)?$/, 'rtmp://127.0.0.1/$1');
                            }
                        })
                    }
                })
                if(hadBind) updateDefaultConf('noTip');
                updateRXPushConf();
            }

            onMounted(()=>{
                onGetPlayList();
                onGetPlayPosition();
            });
            
            return {...state,defaultConf,hardwareConf,handleVideoFileConf,handleUsbMp4File,onAddVideoFile, onVideoFileOption, formatTime,onTimelineSliderEnd,
                onHandleFileDuration,onHandleFilePostion, onDisplayHdmi,handleNetConf, saveGlobalConfByLocal,saveDefaultConf,
                handleRXPushConf,onResetRXPushChnUrl, onCopyRXPushChnUrl,onAddRXPushChn,onDelRXPushChn,saveRXPushConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>