<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
    <link href="assets/plugins/timepicker/css/bootstrap-timepicker.min.css" rel="stylesheet">
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content push" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-7 lp-equal-height-container">
                    <div class="card lp-equal-height-item">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>视频预览</cn>
                                <en>Preview</en>
                                <small>
                                    <cn>推流后可见</cn>
                                    <en>visible when pushing</en>
                                </small>
                            </div>
                        </div>
                        <div class="card-body d-flex">
                            <div class="row flex-grow-1 lp-align-center">
                                <div class="col-lg-12">
                                    <h5-player v-show="hadPlayed" :url="playUrl" :codec="playerCodec" :audio="true" :canplay="hadPlayed"></h5-player>
                                    <div v-show="!hadPlayed" class="lp-aspect-ratio">
                                        <div class="aspect-ratio-content lp-align-center" style="background: #555">
                                            <label class="text-white" style="font-size: 3.5rem">
                                                <cn style="letter-spacing: 10px">停止推流</cn>
                                                <en>STOP PUSH</en>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 lp-equal-height-container">
                    <div class="lp-equal-height-item d-flex flex-column">
                        <div class="row flex-grow-1 pb-2">
                            <div class="col-lg-12">
                                <div class="card h-100 d-flex flex-column">
                                    <div class="card-header bg-transparent">
                                        <div class="p-2 mb-0 d-flex align-items-end">
                                            <cn>基本设置</cn>
                                            <en>Basic config</en>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="d-flex flex-column justify-content-between h-100" v-if="Object.keys(pushConf).length > 0">
                                            <div class="row">
                                                <div class="col-lg-4 lp-align-right pe-4">
                                                    <label>
                                                        <cn>视频源</cn>
                                                        <en>Video source</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-6">
                                                    <select class="form-select" v-model="pushConf.srcV" @change="onChangeSrcV">
                                                        <option v-for="(item,index) in handleEnableConf" :value="item.id">{{item.name}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-4 lp-align-right pe-4">
                                                    <label>
                                                        <cn>音频源</cn>
                                                        <en>Audio source</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-6">
                                                    <select class="form-select" v-model="pushConf.srcA">
                                                        <option value="-1" cn="无" en="None" v-language-option></option>
                                                        <option v-for="(item,index) in handleEnableConf" :value="item.id">{{item.name}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-4 lp-align-right pe-4">
                                                    <label>
                                                        <cn>码流</cn>
                                                        <en>Stream</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-6">
                                                    <select class="form-select" v-model="pushConf.srcV_chn">
                                                        <option value="main" cn="主码流" en="Main Stream" v-language-option></option>
                                                        <option v-if="defaultSubEnable" value="sub" cn="辅码流" en="Sub Stream" v-language-option></option>
                                                        <option v-else value="sub" cn="辅码流(未启用)" en="Sub Stream(not enable)" v-language-option></option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-4 lp-align-right pe-4">
                                                    <label>
                                                        <cn>定时开启</cn>
                                                        <en>start time</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-3">
                                                    <select class="form-select" v-model="pushCron.start.day">
                                                        <option cn="从不" en="never" value="x" v-language-option></option>
                                                        <option cn="每天" en="everyday" value="*" v-language-option></option>
                                                        <option cn="每周一" en="monday" value="1" v-language-option></option>
                                                        <option cn="每周二" en="tuesday" value="2" v-language-option></option>
                                                        <option cn="每周三" en="wednesday" value="3" v-language-option></option>
                                                        <option cn="每周四" en="thursday" value="4" v-language-option></option>
                                                        <option cn="每周五" en="friday" value="5" v-language-option></option>
                                                        <option cn="每周六" en="saturday" value="6" v-language-option></option>
                                                        <option cn="每周日" en="sunday" value="0" v-language-option></option>
                                                    </select>
                                                </div>
                                                <div class="col-lg-3">
                                                    <time-picker v-model="pushCron.start.time"></time-picker>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-4 lp-align-right pe-4">
                                                    <label>
                                                        <cn>定时结束</cn>
                                                        <en>stop time</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-3">
                                                    <select class="form-select" v-model="pushCron.stop.day">
                                                        <option cn="从不" en="never" value="x" v-language-option></option>
                                                        <option cn="每天" en="everyday" value="*" v-language-option></option>
                                                        <option cn="每周一" en="monday" value="1" v-language-option></option>
                                                        <option cn="每周二" en="tuesday" value="2" v-language-option></option>
                                                        <option cn="每周三" en="wednesday" value="3" v-language-option></option>
                                                        <option cn="每周四" en="thursday" value="4" v-language-option></option>
                                                        <option cn="每周五" en="friday" value="5" v-language-option></option>
                                                        <option cn="每周六" en="saturday" value="6" v-language-option></option>
                                                        <option cn="每周日" en="sunday" value="0" v-language-option></option>
                                                    </select>
                                                </div>
                                                <div class="col-lg-3">
                                                    <time-picker v-model="pushCron.stop.time"></time-picker>
                                                </div>
                                            </div>
<!--                                            <div class="hr-container">-->
<!--                                                <hr>-->
<!--                                                <span class="hr-text">OR</span>-->
<!--                                            </div>-->
                                            <div class="row">
                                                <div class="col-lg-4 lp-align-right pe-4">
                                                    <label>
                                                        <cn>开机启动</cn>
                                                        <en>auto push</en>
                                                    </label>
                                                </div>
                                                <div class="col-lg-6">
                                                    <select class="form-select" v-model="pushConf.autorun">
                                                        <option cn="关闭" en="OFF" value="false" v-language-option></option>
                                                        <option cn="开启" en="ON" value="true" v-language-option></option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-lg-12 text-center">
                                                    <button type="button" class="btn border-3 btn-primary px-5" @click="savePushConf">
                                                        <cn>保存</cn>
                                                        <en>Save</en>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row flex-grow-0">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="push-bar">
                                            <div class="row">
                                                <div class="col-4 text-center" style="line-height: 34px;">
                                                    <strong>{{pushTimeCount}}</strong>
                                                </div>
                                                <div class="col-7 d-flex align-items-start">
                                                    <button type="button" :class="['btn border-3',{'btn-primary':!pushState.pushing},{'btn-default disabled':pushState.pushing}]" @click="onPushStart">
                                                        <i class="fa-solid fa-video me-1"></i>
                                                        <cn>推流</cn>
                                                        <en>Push</en>
                                                    </button>
                                                    <button type="button" :class="['btn border-3 ms-1',{'btn-primary':pushState.pushing},{'btn-default disabled':!pushState.pushing}]" @click="onPushStop">
                                                        <i class="fa-solid fa-stop me-1"></i>
                                                        <cn>停止</cn>
                                                        <en>Stop</en>
                                                    </button>
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
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>推流设置</cn>
                                <en>Push config</en>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-2 text-center">
                                    <cn>描述</cn>
                                    <en>Description</en>
                                </div>
                                <div class="col-lg-5 text-center">
                                    <cn>推流地址</cn>
                                    <en>Push Url</en>
                                </div>
                                <div class="col-lg-2 text-center">
                                    <cn>兼容性</cn>
                                    <en>Compatible</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>启用</cn>
                                    <en>Enable</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>操作</cn>
                                    <en>Option</en>
                                </div>
                                <div class="col-lg-1 text-center">
                                    <cn>速度</cn>
                                    <en>Speed</en>
                                </div>
                            </div>
                            <hr class="my-3">
                            <div class="row" v-if="Object.keys(pushConf).length > 0" v-for="(item,index) in pushConf.url">
                                <div class="co-lg-12">
                                    <div class="row">
                                        <div class="col-lg-2">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.des">
                                        </div>
                                        <div class="col-lg-5">
                                            <input type="text" class="form-control" v-model.trim.lazy="item.path">
                                        </div>
                                        <div class="col-lg-2">
                                            <select class="form-select" v-model="item.flvflags">
                                                <option cn="标准" en="normal" value="" v-language-option></option>
                                                <option value="ext_header">enhanced-rtmp</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-1 lp-align-center">
                                            <bs-switch v-model="item.enable"></bs-switch>
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            <button type="button" class="btn border-3 btn-primary" @click="delPushUrl(index)">
                                                <cn>移除</cn>
                                                <en>delete</en>
                                            </button>
                                        </div>
                                        <div class="col-lg-1 text-center">
                                            {{getPushSpeed(index)}} kb/s
                                        </div>
                                    </div>
                                    <hr class="my-3">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn border-3 btn-primary px-5" @click="addPushUrl">
                                        <cn>添加</cn>
                                        <en>Add</en>
                                    </button>
                                    <button type="button" class="btn border-3 btn-primary px-5 ms-2" @click="savePushConf">
                                        <cn>保存</cn>
                                        <en>Save</en>
                                    </button>
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
    import { rpc,func,alertMsg } from "./assets/js/lp.utils.js";
    import { useDefaultConf,usePushConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,bootstrapSwitchComponent,h5PlayerComponent,timepickerComponent,languageOptionDirective } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        directives: {
          "language-option": languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "h5-player": h5PlayerComponent,
            "time-picker": timepickerComponent
        },
        setup(props,context) {

            const { defaultConf } = useDefaultConf();
            const { pushConf,updatePushConf } = usePushConf();

            const state = {
                playerCodec:ref("h264"),
                defaultSubEnable:ref(null),
                hadPlayed:ref(false),
                playUrl:ref('http://'+window.location.host+'/flv?app=live&stream=preview'),
                pushTimeCount:ref("00:00:00"),
                updateTime:0,
                pushCron: reactive({
                    start:{
                        day:"x",
                        time:"00:00"
                    },
                    stop: {
                        day:"x",
                        time:"00:00"
                    }
                }),
                pushState:reactive({
                    duration:0,
                    pushing:false,
                    speed:[]
                }),
            }

            const unwatch = watchEffect(()=>{
                if(Object.keys(pushConf).length > 0) {
                    defaultConf.forEach(item => {
                        if(item.id === pushConf.srcV) {
                            if(pushConf.srcV_chn === "sub" && item.enable2)
                                state.playerCodec.value = item.encv2.codec;
                            else
                                state.playerCodec.value = item.encv.codec;
                        }
                    });
                    unwatch();
                }
            })

            const handleEnableConf = computed(()=>{
               return defaultConf.filter((item,index) => {
                   if(item.enable && state.defaultSubEnable.value === null)
                       state.defaultSubEnable.value = item.enable2;
                   return !!item.enable;
               })
            });

            const handlePushCrontab = () => {
                func("/system/getPushCrontab").then(result => {
                    const keys = Object.keys(result.data);
                    keys.forEach(key => {
                        const value = result.data[key];
                        if(value === null)
                            return;
                        let list = value.split(" ");
                        if(list.length === 8) {
                            state.pushCron[key].day = list[4];
                            state.pushCron[key].time = list[1]+":"+list[0];
                        }
                    });
                })
            }

            const onChangeSrcV = () => {
                defaultConf.forEach(item => {
                    if(item.id === pushConf.srcV)
                        state.defaultSubEnable.value = item.enable2;
                    return true;
                })
            }

            const handlePushState = () => {
                rpc("push.getState").then(data => {
                    Object.assign(state.pushState, data);
                    state.updateTime = new Date().getTime() / 1000;
                    state.hadPlayed.value = state.pushState.pushing;
                });
                setTimeout(handlePushState,2000);
            }

            const getPushSpeed = index => {
                return state.pushState.speed[index];
            }

            const handlePushTimeCount = () => {
                if (state.pushState.pushing) {
                    const fix = num => {
                        if ( num < 10 )
                            return '0' + num;
                        else
                            return num;
                    }
                    let now = new Date();
                    let diff = now.getTime() / 1000 - state.updateTime + state.pushState.duration/1000;
                    let h = Math.floor(diff / 3600);
                    let m = Math.floor( diff % 3600 / 60 );
                    let s = Math.floor( diff % 60 );
                    state.pushTimeCount.value = "[" + fix(h) + ":" + fix( m ) + ":" + fix( s ) + "]"
                } else {
                    state.pushTimeCount.value = "[--:--:--]";
                }
                setTimeout(handlePushTimeCount,1000);
            }
            
            const onPushStart = () => {
                rpc("push.start").then(()=>{
                    handlePushState();
                });
            }
            
            const onPushStop = () => {
                rpc("push.stop").then(()=>{
                    handlePushState();
                });
            }
            
            const addPushUrl = () => {
                pushConf.url.push({
                    "des": "platform "+ (pushConf.url.length+1),
                    "enable": false,
                    "path": ""
                })
            }
            
            const delPushUrl = (index) => {
                pushConf.url.splice(index,1);
            }

            const savePushConf = () => {
                defaultConf.forEach(item => {
                    if(item.id === pushConf.srcV) {
                        if(pushConf.srcV_chn === "sub" && item.enable2)
                            state.playerCodec.value = item.encv2.codec;
                        else
                            state.playerCodec.value = item.encv.codec;
                    }
                });

                updatePushConf().then(()=>{
                    func("/system/setPushCrontab",state.pushCron).then(data => {
                        if(data.status === "success")
                            alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                    });
                })
            }

            onMounted(() => {
                handlePushCrontab();
                handlePushState();
                handlePushTimeCount();
            })
            
            return {...state,pushConf,onChangeSrcV,onPushStart,onPushStop,addPushUrl,delPushUrl,handleEnableConf,getPushSpeed,savePushConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>