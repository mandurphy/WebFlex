<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
<div data-simplebar>
    <main class="page-content record" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-12 mx-auto">
                <div class="card">
                    <div class="card-header bg-transparent d-flex">
                        <div class="flex-grow-1">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>录制参数</cn>
                                <en>Record Config</en>
                            </div>
                        </div>
                        <div class="flex-grow-0 pe-2 pt-2" @click="setRecordOption">
                            <i class="fa-solid fa-gear fa-lg lp-cursor-pointer"></i>
                        </div>
                    </div>
                    <div class="card-body" >
                        <div class="row my-3">
                            <div class="col-lg-3 text-center">
                                <cn>通道选择</cn>
                                <en>Channel select</en>
                            </div>
                            <div class="col-lg-8">
                                <div class="row row-cols-5" v-if="Object.keys(recordConf).length > 0">
                                    <div class="form-check form-check-primary mb-2" v-for="(item,index) in handleEnableConf" :key="item.id">
                                        <input class="form-check-input" type="checkbox" v-model="recordConf.any.chns" :value="item.id">
                                        <label class="form-check-label">
                                            {{item.name}}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row my-3">
                            <div class="col-lg-3 lp-align-center">
                                <cn>全局控制</cn>
                                <en>Overall config</en>
                            </div>
                            <div class="col-lg-8">
                                <div class="row" v-if="Object.keys(recordConf).length > 0">
                                    <div class="col-lg-12">
                                        <div class="row row-cols-5">
                                            <div class="col-lg ps-4">
                                                <label>Mp4</label>
                                            </div>
                                            <div class="col-lg ps-4">
                                                <label>TS</label>
                                            </div>
                                            <div class="col-lg ps-4">
                                                <label>FLV</label>
                                            </div>
                                            <div class="col-lg ps-4">
                                                <label>MKV</label>
                                            </div>
                                            <div class="col-lg ps-4">
                                                <label>MOV</label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="col-lg-12">
                                        <div class="row row-cols-5">
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.any.mp4"></bs-switch>
                                            </div>
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.any.ts"></bs-switch>
                                            </div>
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.any.flv"></bs-switch>
                                            </div>
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.any.mkv"></bs-switch>
                                            </div>
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.any.mov"></bs-switch>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="my-3">
                        <div class="row">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn btn-primary border-3 px-3" @click="updateRecordConf">
                                    <cn>保存参数</cn>
                                    <en>Save config</en>
                                </button>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-6 offset-lg-3">
                                <div class="rec-bar">
                                    <div class="row">
                                        <div class="col-7 d-flex lp-align-right">
                                            <button type="button" class="btn border-3 btn-primary" @click="onStartRecord">
                                                <i class="fa-solid fa-video me-1"></i>
                                                <cn>录制</cn>
                                                <en>Record</en>
                                            </button>
                                            <button type="button" class="btn border-3 btn-default ms-2" @click="onStopRecord">
                                                <i class="fa-solid fa-stop me-1"></i>
                                                <cn>全部停止</cn>
                                                <en>Stop All</en>
                                            </button>
                                        </div>
                                        <div class="col-5 text-center p-0" style="line-height: 34px;">
                                            <strong class="font-12">
                                                <cn>已用空间</cn>
                                                <en>Used Space</en>:
                                                <span>{{diskSpace}}</span>
                                            </strong>
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
            <div class="col-lg-12 mx-auto">
                <ul class="nav nav-tabs nav-primary" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" data-bs-toggle="tab" href="#tab1" role="tab" aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa fa-sign-in me-1"></i></div>
                                <div class="tab-title"><cn>频道信息</cn><en>Channels</en></div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-bs-toggle="tab" href="#tab2" role="tab" aria-selected="false">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-solid fa-download me-1"></i></div>
                                <div class="tab-title"><cn>文件管理</cn><en>File Manager</en></div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="tab-content py-3 pe-2 ps-2">
                    <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                        <div class="row">
                            <div class="col-2 text-center">
                                <cn>频道名称</cn>
                                <en>Channel name</en>
                            </div>
                            <div class="col text-center">
                                MP4
                            </div>
                            <div class="col text-center">
                                TS
                            </div>
                            <div class="col text-center">
                                FLV
                            </div>
                            <div class="col text-center">
                                MKV
                            </div>
                            <div class="col text-center">
                                MOV
                            </div>
                            <div class="col text-center">
                                <cn>暂停</cn>
                                <en>pause</en>
                            </div>
                            <div class="col text-center">
                                <cn>录制时间</cn>
                                <en>recordTime</en>
                            </div>
                            <div class="col-1 text-center"></div>
                        </div>
                        <hr >
                        <div class="row mt-1" v-for="(item,index) in handleMergeRecordConf" :key="item.id">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-2 text-center">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.chnName" readonly disabled>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.mp4" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.ts" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.flv" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.mkv" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.mov" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        <bs-switch v-model="item.isPause" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col lp-align-center">
                                        {{item.durTime}}
                                    </div>
                                    <div class="col-1 lp-align-center">
<!--                                        <i class="fa-solid fa-ellipsis-vertical lp-cursor-pointer"></i>-->
                                    </div>
                                </div>
                                <hr >
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="tab2" role="tabpanel">
                        <div class="row">
                            <div class="col-lg-12"></div>
                        </div>
                        <div class="row" v-for="(dir,index) in Object.keys(recordFiles)" :key="index">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-header rec-file-title py-2 d-flex">
                                        <div class="flex-grow-1 text-center font-20">
                                            <span>{{dir}}</span>
                                        </div>
                                        <div class="flex-grow-0 pe-2 pt-2">
                                            <i class="fa-solid fa-trash-can fa-lg lp-cursor-pointer" @click="delRecordFileByName(dir)"></i>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="row row-cols-2 row-cols-lg-5 g-3">
                                            <div v-for="(item,idx) in Object.keys(recordFiles[dir])" :key="idx*100" class="col">
                                                <div class="card">
                                                    <div class="card-header bg-transparent font-14 d-flex">
                                                        <div class="flex-grow-1 text-center">
                                                            <span class="ms-5">{{handleChnNameById(item)}}</span>
                                                        </div>
                                                        <div v-if="handleMp4Array(dir,item).length" class="flex-grow-0 lp-cursor-pointer" @click="showVideoPlayer(dir,item)">
                                                            <i class="fa-regular fa-circle-play font-16"></i>
                                                        </div>
                                                        <div class="flex-grow-0 ms-2 lp-cursor-pointer">
                                                            <div class="dropdown ms-auto">
                                                                <div type="button" class="btn-option dropdown-toggle dropdown-toggle-nocaret cursor-pointer" data-bs-toggle="dropdown">
                                                                    <i class="fa-regular fa-circle-down font-16"></i>
                                                                </div>
                                                                <ul class="dropdown-menu">
                                                                    <li v-for="(itm,ix) in handleRecordFileFormat(dir,item)" class="text-center" @click="onDownloadRecordFile(dir,item,itm)">
                                                                        <a class="dropdown-item" href="javascript:;">{{itm}}</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <img :src="makeImgUrl(dir,item)" class="card-img-top">
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
                    </div>
                </div>
            </div>
        </div>
        <player-modal :modal-title="playerModalTitle" :modal-show="showPlayerModal" :modal-size="'modal-xl'" :had-footer="playerModalFooter"
                      :confirm-btn-name="'上一分段&Previous Fragment'" :cancel-btn-name="'下一分段&Next Fragment'"
                      :cancel-close-modal="false" @cancel-btn-click="playFragment('next')"
                      @confirm-btn-click="playFragment('last')" @modal-visible="playModalVisible">
            <video-player :url="playerUrl"></video-player>
        </player-modal>
        <setting-modal :modal-title="'分段设置&Fragment Setting'" :modal-show="showSettingModal"
                      :confirm-btn-name="'保存&Save'" :cancel-btn-name="'取消&Cancel'" @confirm-btn-click="saveFragmentSetting">
            <div class="row">
                <div class="col-lg-3 offset-lg-1 lp-align-center">
                    <cn>分段大小 (GB)</cn>
                    <en>Fragment size(GB)</en>
                </div>
                <div class="col-lg-4">
                    <input type="text" class="form-control disabled"  disabled readonly v-model.number.trim.lazy="handleFragmentConf.segmentSize">
                </div>
                <div class="col-lg-3 lp-align-center">
                    <bs-switch v-model="handleFragmentConf.segmentSizeEnable"></bs-switch>
                </div>
            </div>
        </setting-modal>
    </main>
</div>
<?php include ("./public/foot.inc") ?>

<script type="module">
    import {rpc, func, alertMsg, confirm} from "./assets/js/lp.utils.js";
    import { useDefaultConf,useRecordConf,useRecordFiles } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent,customModalComponent,videoPlayerComponent } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "player-modal": customModalComponent,
            "setting-modal": customModalComponent,
            "video-player": videoPlayerComponent,
        },
        setup: function (props, context) {

            const { defaultConf } = useDefaultConf();
            const { recordConf, handleRecordConf ,updateRecordConf } = useRecordConf();
            const { recordFiles,handleRecordFiles } = useRecordFiles();

            const state = {
                recDuration:reactive({}),
                diskSpace: ref("--/--"),
                showPlayerModal: ref(false),
                playerUrl: ref(""),
                playerModalTitle: ref("正在播放"),
                playerModalFooter: ref(false),
                showSettingModal: ref(false)
            }

            const handleEnableConf = computed(() => {
                return defaultConf.filter((item, index) => {
                    return item.enable && item.type !== "ndi" && item.type !== "file";
                })
            });

            const handleMergeRecordConf = computed(() => {
                if(!recordConf.hasOwnProperty("channels")) return [];
                if(defaultConf.length > 0 && Object.keys(state.recDuration).length > 0) {
                    return recordConf.channels.filter((chn, index) => {
                        const conf = defaultConf.find(item => item.id === chn.id);
                        if (!conf.enable)
                            recordConf.any.chns = recordConf.any.chns.filter(item => item !== conf.id);
                        chn.enable = conf.enable;
                        chn.durTime = state.recDuration["chn" + index];
                        return conf.enable;
                    });
                }
                return recordConf.channels;
            })

            const handleFragmentConf = computed(() => {
                if(!recordConf.hasOwnProperty("channels")) return {};
                if(!recordConf["any"].hasOwnProperty("fragment")){
                    recordConf["any"]["fragment"] = {
                        segmentDura: 0,
                        segmentSize: 1,
                        segmentDuraEnable: false,
                        segmentSizeEnable: false
                    }
                }
                return recordConf["any"]["fragment"];
            })

            const onStartRecord = async () => {
                const isMountDisk = await rpc("rec.isMountDisk");
                if (!isMountDisk) {
                    alertMsg('<cn>启动录制失败，没有找到外部存储设备！</cn><en>Failed to start recording,no external storage device was found!</en>', 'error');
                    return;
                }

                const any = recordConf.any;
                const channels = recordConf.channels;

                any.chns.forEach(chn => {
                    channels.forEach(channel => {
                        if (chn === channel.id) {
                            for (let key in channel) {
                                if (any.hasOwnProperty(key)) {
                                    channel[key] = any[key];
                                }
                            }
                        }
                    });
                });

                const result = await rpc("rec.execute", [JSON.stringify(recordConf, null, 2)]);
                if (result) {
                    alertMsg('<cn>启动录制成功</cn><en>Recording started successfully!</en>', 'success');
                    setTimeout(handleRecordFiles,500);
                    return;
                }
                alertMsg('<cn>启动录制失败，没有找到外部存储设备！</cn><en>Failed to start recording,no external storage device was found!</en>', 'error');
            }

            const onStopRecord = () => {
                rpc("rec.stop").then( data => {
                    if(data){
                        handleRecordConf();
                        alertMsg('<cn>停止录制成功</cn><en>Recording stoped successfully!</en>', 'success');
                        return;
                    }
                    alertMsg('<cn>停止录制失败！</cn><en>Failed to stop recording</en>', 'error');
                } );
            }

            const onStartRecordByFormat = async type => {
                const result = await rpc("rec.execute", [JSON.stringify(recordConf, null, 2)]);
                if (result) {
                    if(type) {
                        setTimeout(handleRecordFiles,500);
                        alertMsg('<cn>启动录制成功</cn><en>Recording started successfully!</en>', 'success');
                    } else {
                        alertMsg('<cn>停止录制成功</cn><en>Recording started successfully!</en>', 'success');
                    }
                    return;
                }
                alertMsg('<cn>操作失败，没有找到外部存储设备！</cn><en>Operation failed, external storage device not found! </en>', 'error');
            }

            const handleDiskSpace = () => {
                func("/system/getMountDiskSpace").then(data => {
                    if (data.status === "error") {
                        state.diskSpace.value = "--/--";
                        return;
                    }
                    state.diskSpace.value = data.data.used + " / " + data.data.total
                });
            }

            const handleRecordDurTime = () => {
                rpc("rec.getDurTime").then( data => Object.assign(state.recDuration,JSON.parse(data)) );
                setTimeout(handleRecordDurTime,1000);
            }

            const handleChnNameById = chnId => {
                if(defaultConf.length > 0) {
                    const chnConf = defaultConf.find(item => item.id === parseInt(chnId));
                    return chnConf.name;
                }
                return "";
            }

            const makeImgUrl = (dir,chnId) => {
                const [dateName,fileName] = dir.split("_");
                return  "files/" + dir + "/" + chnId + "/" + fileName + "0.jpg";
            }

            const delRecordFileByName = dirName => {
                confirm({
                    title: '<cn>删除</cn><en>Delete</en>',
                    content: '<cn>是否删除文件'+dirName+' ？</cn><en>Do you want to delete the file '+dirName+' ?</en>',
                    buttons: {
                        ok: {
                            text: "<cn>删除</cn><en>Delete</en>",
                            btnClass: 'btn-primary',
                            keys: ['enter'],
                            action: () => {
                                func("/root/delRecordFile",{"name":dirName}).then(res => {
                                    alertMsg(res.msg,res.status);
                                    if(res.status === "success")
                                        handleRecordFiles();
                                })
                            }
                        },
                        cancel: {
                            text: "<cn>取消</cn><en>Cancel</en>",
                            action: () => {}
                        }
                    }
                });
            }

            const handleMp4Array = (dir,chnId) => {
                return recordFiles[dir][chnId].filter(file => file.toLowerCase().endsWith('.mp4')).reverse();
            }

            const showVideoPlayer = (dir,chnId) => {
                const mp4Array = handleMp4Array(dir,chnId);
                state.playerModalFooter.value = mp4Array.length  > 1;
                state.playerUrl.value = "files/" + dir + "/" + chnId + "/" + mp4Array[0];
                if(mp4Array.length > 1)
                    state.playerModalTitle.value = "正在播放 "+dir+" (1/"+mp4Array.length+")&Playing "+dir+" (1/"+mp4Array.length+")";
                else
                    state.playerModalTitle.value = "正在播放 "+dir+"&Playing "+dir;
                state.showPlayerModal.value = !state.showPlayerModal.value;
            }

            const playFragment = type =>{
                if(state.playerUrl.value) {
                    const [,dir,chnId,fileName] = state.playerUrl.value.split("/");
                    const mp4Array = handleMp4Array(dir,chnId);
                    let index = mp4Array.indexOf(fileName);
                    if(type === "next") {
                        if(index+1 < mp4Array.length)
                            index += 1;
                    }

                    if(type === "last") {
                        if(index-1 >= 0)
                            index -= 1;
                    }
                    state.playerUrl.value = "files/" + dir + "/" + chnId + "/" + mp4Array[index];
                    state.playerModalTitle.value = "正在播放 "+dir+" ("+(index+1)+"/"+mp4Array.length+")&Playing "+dir+" ("+(index+1)+"/"+mp4Array.length+")";
                }
            }

            const playModalVisible = visible => {
                if(!visible)
                    state.playerUrl.value = "";
            }

            const handleRecordFileFormat= (dir,chnId) => {
                const formats = [];
                recordFiles[dir][chnId].forEach(file => {
                    const [,fileFormat] = file.split(".");
                    if(fileFormat !== "jpg" && !formats.includes(fileFormat.toUpperCase()))
                        formats.push(fileFormat.toUpperCase());
                })
                return formats;
            }

            const onDownloadRecordFile = (dir,chnId,format) => {
                format = format.toLowerCase();
                const count = recordFiles[dir][chnId].filter(file => file.toLowerCase().endsWith('.'+format)).length;
                recordFiles[dir][chnId].forEach((file,index) => {
                    const [,fileFormat] = file.split(".");
                    if(fileFormat === format) {
                        setTimeout(()=> {
                            const url = "/files/"+dir+"/"+chnId+"/"+file;
                            let downName = dir+"."+format;
                            if(count > 1)
                                downName = dir+"_"+(index+1)+"."+format;
                            const eleA = document.createElement('a');
                            eleA.href = url;
                            eleA.download = downName;
                            eleA.dispatchEvent(new MouseEvent('click'));
                        },200 * index)
                    }
                })
            }

            const setRecordOption = () => {
                state.showSettingModal.value = !state.showSettingModal.value;
            }

            const saveFragmentSetting = () => {
                updateRecordConf();
            }

            onMounted(() => {
                handleDiskSpace();
                handleRecordDurTime();
            })

            return {...state, recordConf ,updateRecordConf,handleEnableConf,recordFiles,handleMergeRecordConf,
                handleFragmentConf, onStartRecord,onStopRecord,onStartRecordByFormat,handleChnNameById,makeImgUrl,
                delRecordFileByName, showVideoPlayer,handleMp4Array,handleRecordFileFormat,onDownloadRecordFile,
                setRecordOption,saveFragmentSetting,playFragment,playModalVisible}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>