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
            <div class="col-lg-7 lp-equal-height-container">
                <div class="card lp-equal-height-item">
                    <div class="card-header bg-transparent d-flex">
                        <div class="flex-grow-1">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>录制格式</cn>
                                <en>Record Format</en>
                            </div>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between" >
                        <div class="row"></div>
                        <div class="row my-3">
                            <div class="col-lg-3 text-center">
                                <cn>通道选择</cn>
                                <en>Channel select</en>
                            </div>
                            <div class="col-lg-8">
                                <div class="row row-cols-5" v-if="Object.keys(recordConf).length > 0">
                                    <div class="form-check form-check-primary mb-2" v-for="(item,index) in handleEnableConf" :key="item.id">
                                        <input class="form-check-input" type="checkbox" v-model="recordConf.chns" :value="item.id">
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
                                                <label>
                                                    <cn>MP4</cn>
                                                    <en>MP4</en>
                                                </label>
                                            </div>
                                            <div class="col-lg ps-4">
                                                <label>
                                                    <cn>TS</cn>
                                                    <en>TS</en>
                                                </label>
                                            </div>
                                            <div class="col-lg ps-4">
                                                <label>
                                                    <cn>FLV</cn>
                                                    <en>FLV</en>
                                                </label>
                                            </div>
                                            <div class="col-lg ps-4">
                                                <label>
                                                    <cn>MKV</cn>
                                                    <en>MKV</en>
                                                </label>
                                            </div>
                                            <div class="col-lg ps-4">
                                                <label>
                                                    <cn>MOV</cn>
                                                    <en>MOV</en>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="col-lg-12">
                                        <div class="row row-cols-5">
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.format.mp4"></bs-switch>
                                            </div>
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.format.ts"></bs-switch>
                                            </div>
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.format.flv"></bs-switch>
                                            </div>
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.format.mkv"></bs-switch>
                                            </div>
                                            <div class="col-lg p-0">
                                                <bs-switch v-model="recordConf.format.mov"></bs-switch>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row"></div>
                        <hr class="my-3">
                        <div class="row">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn btn-primary border-3 px-3" @click="updateRecordConf">
                                    <cn>保存参数</cn>
                                    <en>Save config</en>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 lp-equal-height-container">
                <div class="card lp-equal-height-item">
                    <div class="card-header bg-transparent d-flex">
                        <div class="flex-grow-1">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>录制参数</cn>
                                <en>Record Config</en>
                            </div>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between" v-if="Object.keys(recordConf).length > 0">
                        <div class="row">
                            <div class="col-lg-4 lp-align-right pe-4">
                                <label>
                                    <cn>录制模式</cn>
                                    <en>record mode</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <select class="form-select" v-model="recordConf.type">
                                    <option value="normal" cn="常规录制" en="normal" v-language-option></option>
                                    <option value="loop" cn="循环录制" en="loop" v-language-option></option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-4 lp-align-right pe-4">
                                <label>
                                    <cn>分段存储</cn>
                                    <en>fragment file</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <select class="form-select" v-model="recordConf.fragment.enable">
                                    <option :value="true" cn="开启" en="ON" v-language-option></option>
                                    <option :value="false" cn="关闭" en="OFF" v-language-option></option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-3" v-if="recordConf.fragment.enable">
                            <div class="col-lg-4 lp-align-right pe-4">
                                <label>
                                    <cn>分段模式</cn>
                                    <en>fragment mode</en>
                                </label>
                            </div>
                            <div class="col-lg-6" v-if="recordConf.fragment.enable">
                                <select class="form-select" v-model="recordConf.fragment.mode">
                                    <option value="dura" cn="录制时长" en="record duration" v-language-option></option>
                                    <option value="size" cn="文件大小" en="file size" v-language-option></option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-3" v-if="recordConf.fragment.enable && recordConf.fragment.mode==='dura'">
                            <div class="col-lg-4 lp-align-right pe-4">
                                <label>
                                    <cn>分段时长</cn>
                                    <en>fragment duration</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <div class="input-group">
                                    <input class="form-control" type="text" v-model.trim.lazy="recordConf.fragment.dura">
                                    <span class="input-group-text input-group-addon lp-cursor-pointer">
                                        <cn>秒</cn>
                                        <en>Sec</en>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3" v-if="recordConf.fragment.enable && recordConf.fragment.mode==='size'">
                            <div class="col-lg-4 lp-align-right pe-4">
                                <label>
                                    <cn>分段大小</cn>
                                    <en>fragment size</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <div class="input-group">
                                    <input class="form-control" type="text" v-model.trim.lazy="recordConf.fragment.size">
                                    <span class="input-group-text input-group-addon lp-cursor-pointer">
                                        <cn>Mb</cn>
                                        <en>Mb</en>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-4 lp-align-right pe-4">
                                <label>
                                    <cn>开机录制</cn>
                                    <en>Auto record</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <select class="form-select" v-model="recordConf.auto">
                                    <option :value="true" cn="开启" en="ON" v-language-option></option>
                                    <option :value="false" cn="关闭" en="OFF" v-language-option></option>
                                </select>
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
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-lg-7 mx-auto">
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
                                <div class="tab-title"><cn>文件管理-常规</cn><en>Normal File Manager</en></div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-bs-toggle="tab" href="#tab3" role="tab" aria-selected="false">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class="fa-solid fa-download me-1"></i></div>
                                <div class="tab-title"><cn>文件管理-循环</cn><en>Loop File Manager</en></div>
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
                                <cn>MP4</cn>
                                <en>MP4</en>
                            </div>
                            <div class="col text-center">
                                <cn>TS</cn>
                                <en>TS</en>
                            </div>
                            <div class="col text-center">
                                <cn>FLV</cn>
                                <en>FLV</en>
                            </div>
                            <div class="col text-center">
                                <cn>MKV</cn>
                                <en>MKV</en>
                            </div>
                            <div class="col text-center">
                                <cn>MOV</cn>
                                <en>MOV</en>
                            </div>
                            <div class="col text-center">
                                <cn>暂停</cn>
                                <en>pause</en>
                            </div>
                            <div class="col-2 text-center">
                                <cn>录制文件名</cn>
                                <en>record name</en>
                            </div>
                            <div class="col text-center">
                                <cn>录制时间</cn>
                                <en>record time</en>
                            </div>
                        </div>
                        <hr >
                        <div class="row mt-1" v-for="(item,index) in handleMergeRecState" :key="item.id">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-2 text-center">
                                        <input type="text" class="form-control" v-model.trim.lazy="item.name" readonly disabled>
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
                                        <bs-switch v-model="item.pause" @switch-change="onStartRecordByFormat"></bs-switch>
                                    </div>
                                    <div class="col-2 lp-align-center">
                                        {{item.curFileName}}
                                    </div>
                                    <div class="col lp-align-center">
                                        {{item.durTime}}
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
                        <div class="row" v-for="(dir,index) in Object.keys(recordFilesNormal)" :key="index">
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
                                            <div v-for="(item,idx) in Object.keys(recordFilesNormal[dir])" :key="idx" class="col">
                                                <div class="card">
                                                    <div class="card-header bg-transparent font-14 d-flex">
                                                        <div class="flex-grow-1 text-center">
                                                            <span class="ms-5">{{item}}</span>
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

                    <div class="tab-pane fade" id="tab3" role="tabpanel">
                        <div class="row">
                            <div class="col-lg-12"></div>
                        </div>
                        <div class="row" v-for="(dir,index) in Object.keys(recordFilesLoop)" :key="index">
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
                                            <div v-for="(item,idx) in Object.keys(recordFilesLoop[dir])" :key="idx" class="col">
                                                <div class="card">
                                                    <div class="card-header bg-transparent font-14 d-flex">
                                                        <div class="flex-grow-1 text-center">
                                                            <span class="ms-5">{{item}}</span>
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
    </main>
</div>
<?php include ("./public/foot.inc") ?>

<script type="module">
    import {rpc, func, alertMsg, confirm, isEmpty, clearReactiveArray} from "./assets/js/lp.utils.js";
    import { useDefaultConf,useRecordConf,useRecordFiles } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,languageOptionDirective,bootstrapSwitchComponent,customModalComponent,videoPlayerComponent } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        directives: {
            "language-option": languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "player-modal": customModalComponent,
            "video-player": videoPlayerComponent,
        },
        setup: function (props, context) {

            const { defaultConf } = useDefaultConf();
            const { recordConf, handleRecordConf ,updateRecordConf } = useRecordConf();
            const { recordFilesNormal,recordFilesLoop,handleRecordFiles } = useRecordFiles();

            const state = {
                recChnList:reactive([]),
                diskSpace: ref("--/--"),
                showPlayerModal: ref(false),
                playerUrl: ref(""),
                playerModalTitle: ref("正在播放"),
                playerModalFooter: ref(false),
                showSettingModal: ref(false)
            }

            const handleEnableConf = computed(() => {
                return defaultConf.filter(item => {
                    return item.enable && item.type !== "ndi";
                })
            });

            const handleMergeRecState = computed(() => {
                if (!isEmpty(state.recChnList)) {
                    return state.recChnList.filter(recChn =>
                            defaultConf.some(item => item.id === recChn.id && item.enable)
                    );
                }

                return defaultConf
                        .filter(conf => conf.enable)
                        .map(({ id, name }) => ({
                            id,
                            name,
                            mp4: false,
                            ts: false,
                            flv: false,
                            mkv: false,
                            mov: false,
                            curFileName: "------",
                            durTime: "--:--:--"
                        }));
            })

            const onStartRecord = async () => {
                const isMountDisk = await rpc("rec.isMountDisk");
                if (!isMountDisk) {
                    alertMsg('<cn>启动录制失败，没有找到外部存储设备！</cn><en>Failed to start recording,no external storage device was found!</en>', 'error');
                    return;
                }

                const result = await rpc("rec.start");
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
                const result = await rpc("rec.execute", [JSON.stringify(state.recChnList)]);
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

            const handleRecChnsState = () => {
                rpc("rec.getRecChnsState").then( data => {
                    clearReactiveArray(state.recChnList);
                    state.recChnList.splice(0, state.recChnList.length, ...data);
                })
                setTimeout(handleRecChnsState,1000);
            }

            const makeImgUrl = (dir, name) => {
                const regex = /\d{4}-\d{2}-\d{2}_\d{6}/;
                const basePath = regex.test(dir) ? `${dir}/${name}` : dir;
                return `files/${basePath}/preview.jpg`;
            };

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

            const handleMp4Array = (dir, rdir) => {
                const regex = /\d{4}-\d{2}-\d{2}_\d{6}/;
                const files = regex.test(dir) ? recordFilesNormal[dir][rdir] : recordFilesLoop[dir][rdir];
                return files.filter(file => file.toLowerCase().endsWith('.mp4')).reverse();
            };

            const showVideoPlayer = (dir, rdir) => {
                const mp4Array = handleMp4Array(dir, rdir);
                const regex = /\d{4}-\d{2}-\d{2}_\d{6}/;
                const basePath = regex.test(dir) ? `${dir}/${rdir}` : dir;
                const titleBase = regex.test(dir) ? dir : rdir;
                const titleSuffix = mp4Array.length > 1 ? ` (${1}/${mp4Array.length})` : '';
                state.playerModalTitle.value = `正在播放 ${titleBase}${titleSuffix} & Playing ${titleBase}${titleSuffix}`;
                state.playerModalFooter.value = mp4Array.length > 1;
                state.playerUrl.value = `files/${basePath}/${mp4Array[0]}`;
                state.showPlayerModal.value = !state.showPlayerModal.value;
            };

            const playFragment = type =>{
                if(!state.playerUrl.value) return;
                const urlList = state.playerUrl.value.split("/");
                const dir = urlList[1];
                let rdir,fileName;
                if(urlList.length === 4) {
                    rdir = urlList[2];
                    fileName = urlList[3];
                } else {
                    fileName = urlList[2];
                    const match = fileName.match(/^(rec_\d{5})(?:_\d+)?\.mp4$/);
                    rdir = match[1];
                }
                const mp4Array = handleMp4Array(dir,rdir);
                let index = mp4Array.indexOf(fileName);
                if (type === "next" && index + 1 < mp4Array.length) index++;
                if (type === "last" && index - 1 >= 0) index--;

                const basePath = urlList.length === 4 ? `${dir}/${rdir}` : dir;
                const titleBase = urlList.length === 4 ? dir : rdir;
                const titleSuffix = mp4Array.length > 1 ? ` (${index+1}/${mp4Array.length})` : '';
                state.playerUrl.value = `files/${basePath}/${mp4Array[index]}`;
                state.playerModalTitle.value = `正在播放 ${titleBase}${titleSuffix} & Playing ${titleBase}${titleSuffix}`;
            }

            const playModalVisible = visible => {
                if(!visible)
                    state.playerUrl.value = "";
            }

            const handleRecordFileFormat = (dir, rdir) => {
                const formats = [];
                const regex = /\d{4}-\d{2}-\d{2}_\d{6}/;
                const files = regex.test(dir) ? recordFilesNormal[dir][rdir] : recordFilesLoop[dir][rdir];
                files.forEach(file => {
                    const [, fileFormat] = file.split(".");
                    const formatUpper = fileFormat.toUpperCase();
                    if (fileFormat !== "jpg" && !formats.includes(formatUpper))
                        formats.push(formatUpper);
                });
                return formats;
            };

            const onDownloadRecordFile = (dir, rdir, format) => {
                format = format.toLowerCase();
                const regex = /\d{4}-\d{2}-\d{2}_\d{6}/;
                const files = regex.test(dir) ? recordFilesNormal[dir][rdir] : recordFilesLoop[dir][rdir];
                const formatFiles = files.filter(file => file.toLowerCase().endsWith(`.${format}`));
                const basePath = regex.test(dir) ? `/files/${dir}/${rdir}` : `/files/${dir}`;
                formatFiles.forEach((file, index) => {
                    setTimeout(() => {
                        const url = `${basePath}/${file}`;
                        const eleA = document.createElement('a');
                        eleA.href = url;
                        eleA.download = file;
                        eleA.dispatchEvent(new MouseEvent('click'));
                    }, 200 * index);
                });
            };

            const saveFragmentSetting = () => {
                updateRecordConf();
            }

            onMounted(() => {
                handleDiskSpace();
                handleRecChnsState();
            })

            return {...state, recordConf ,updateRecordConf,handleEnableConf,recordFilesNormal,recordFilesLoop,
                handleMergeRecState, onStartRecord,onStopRecord,onStartRecordByFormat,makeImgUrl,
                delRecordFileByName, showVideoPlayer,handleMp4Array,handleRecordFileFormat,onDownloadRecordFile,
                saveFragmentSetting,playFragment,playModalVisible}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>