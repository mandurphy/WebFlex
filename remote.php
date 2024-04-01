<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content remote" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-4 lp-equal-height-container">
                    <div class="card lp-equal-height-item">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>遥控器</cn>
                                <en>Remote control</en>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row h-100">
                                <div class="col-lg-6 offset-lg-3 h-100">
                                    <img src="assets/img/remote.png" :style="{width:'auto',height:imgHeight}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 lp-equal-height-container">
                    <div class="card lp-equal-height-item">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>功能设置</cn>
                                <en>Config</en>
                            </div>
                        </div>
                        <div class="card-body pb-4" ref="remoteEle">
                            <div class="row">
                                <div class="col-lg-2 lp-align-right pe-4">
                                    <cn>遥控模式</cn>
                                    <en>Mode</en>
                                </div>
                                <div class="col-lg-3 lp-align-center">
                                    <select v-if="Object.keys(precept).length > 0" class="form-select" v-model="precept.mods.used">
                                        <option v-for="item in precept.mods.sels" :value="item.name">{{item.name}}</option>
                                    </select>
                                </div>
                                <div class="col-lg-1 lp-align-center" v-if="Object.keys(useMod).length > 0 && useMod.name === 'PTZ'">
                                    <cn>频道</cn>
                                    <en>Channel</en>
                                </div>
                                <div class="col-lg-3 lp-align-center" v-if="Object.keys(useMod).length > 0 && useMod.name === 'PTZ'">
                                    <select v-if="Object.keys(useMod).length > 0" class="form-select" v-model="useMod.chn" @change="onPTZChnChange(index, $event.target.value)">
                                        <option v-for="item in handleModChnConf" :value="item.id">{{item.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-10 offset-lg-1">
                                    <div class="card" style="border-left: none;border-right: none;">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-1 lp-align-center">
                                                    <cn>图标</cn>
                                                    <en>Icon</en>
                                                </div>
                                                <div class="col-lg-4 lp-align-center">
                                                    <cn>功能</cn>
                                                    <en>Option</en>
                                                </div>
                                                <div class="col-lg-7 lp-align-center">
                                                    <cn>描述</cn>
                                                    <en>Description</en>
                                                </div>
                                            </div>
                                            <div v-for="(item,index) in handleRemoteDirects" :key="index">
                                                <hr>
                                                <div class="row mt-3">
                                                    <div class="col-lg-1 lp-align-center">
                                                        <i v-if="item.icon.includes('fa')" :class="item.icon"></i>
                                                        <span v-else class="font-16 fw-bold">{{item.icon}}</span>
                                                    </div>
                                                    <div class="col-lg-4 lp-align-center">
                                                        <div v-if="item.did >= 0">
                                                            <cn>{{item.cn}}</cn>
                                                            <en>{{item.en}}</en>
                                                        </div>
                                                        <div v-else>
                                                            <select class="form-select text-center" style="border: none;padding-top: 0;padding-bottom: 0;" v-model="item.val" @change="onModCustomValChange(index, $event.target.value)">
                                                                <option v-for="opt in handleCustomDirect" :cn="opt.ncn" :en="opt.nen" :value="opt.val" :key="opt.key" v-language-option></option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-7">
                                                        <div v-if="item.did >= 0">
                                                            <cn>{{item.dscn}}</cn>
                                                            <en>{{item.dsen}}</en>
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="useMod.name === 'PTZ'">
                                                                <cn>自定义按键，可以设置需要调用的预置位</cn>
                                                                <en>Custom keys to set the preset bits that need to be called</en>
                                                            </div>
                                                            <div v-if="useMod.name === 'Layout'">
                                                                <cn>自定义按键，可以设置需要调用的布局</cn>
                                                                <en>Custom keys allow you to set the layout you want to call</en>
                                                            </div>
                                                            <div v-if="useMod.name === 'Output'">
                                                                <cn>自定义按键，可以设置需要调用的视频通道</cn>
                                                                <en>Custom keys allow you to set the channel  you want to call</en>
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
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn btn-primary border-3 px-5" @click="updateRemoteConf">
                                        <cn>保存</cn>
                                        <en>Save</en>
                                    </button>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-11 offset-lg-1 tips">
                                    <cn>1、使用PTZ相关功能，需要在"实验功能"下的"Onvif PTZ"页面预先配置完成</cn>
                                    <en>1. To use the PTZ related functions, you need to pre-configure the "Onvif PTZ" page under "Laboratory"</en>
                                </div>
                                <div class="col-lg-11 offset-lg-1 tips">
                                    <cn>2、使用录制相关功能，需要在"扩展功能"下的"文件录制"页面预先配置完成</cn>
                                    <en>2. To use the record related functions, you need to pre-configure the "Record" page under "Extend"</en>
                                </div>
                                <div class="col-lg-11 offset-lg-1 tips">
                                    <cn>3、使用直播推流相关功能，需要在"直播推流"页面预先配置完成</cn>
                                    <en>3. To use the push related functions, you need to pre-configure them on the "Push" page</en>
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
    import resizeObserver from "./assets/plugins/polyfill/resize-observer-polyfill.esm.js"
    import {clearReactiveObject} from "./assets/js/lp.utils.js";
    import {useDefaultConf, useDirectsConf, useRemoteConf,useDefLaysConf} from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,filterKeywordPlugin,languageOptionDirective } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed,onMounted,nextTick} = vue;
    const app = createApp({
        directives:{ "language-option": languageOptionDirective },
        setup(props,context) {

            const { defaultConf } = useDefaultConf();
            const { defLaysConf } = useDefLaysConf();
            const { directsConf } = useDirectsConf();
            const { remoteConf,updateRemoteConf } = useRemoteConf();

            const state = {
                remoteEle:ref(null),
                imgHeight:ref("0"),
                precept: reactive({}),
                useMod: reactive({})
            }

            watchEffect(()=>{
                if(Object.keys(remoteConf).length > 0) {
                    clearReactiveObject(state.precept);
                    Object.assign(state.precept,remoteConf.precepts.find(pre => pre.name === remoteConf.used));
                    clearReactiveObject(state.useMod)
                    Object.assign(state.useMod,state.precept.mods.sels.find(sel => sel.name === state.precept.mods.used))
                }
            })

            const handleModChnConf = computed(() => {
                const { useMod } = state;
                if(useMod.name === 'PTZ')
                    return defaultConf.filter(item => (item.type === "net" && item.enable));
                if(useMod.name === 'Layout' || useMod.name === 'Output')
                    return defaultConf.filter(item => item.type === "mix");
                return [];
            })

            const handleCustomDirect = computed(() => {
                const { useMod } = state;

                if (useMod.name === 'PTZ') {
                    return Array.from({ length: 9 }, (_, i) => ({
                        val: i + 1,
                        ncn: `预置位 ${i + 1}`,
                        nen: `Preset ${i + 1}`,
                        key: i + 1
                    }));
                }

                if (useMod.name === 'Layout') {
                    return defLaysConf.map((lay, idx) => ({
                        val: lay.layId,
                        ncn: lay.layName,
                        nen: lay.layNameEn,
                        key: (idx + 1) * 10
                    }));
                }

                if (useMod.name === 'Output') {
                    return defaultConf.map((chn, idx) => ({
                        val: chn.id,
                        ncn: chn.name,
                        nen: chn.name,
                        key: (idx + 1) * 100
                    }));
                }

                return [];
            });

            const handleRemoteDirects = computed(() => {
                if (Object.keys(remoteConf).length <= 0 || Object.keys(directsConf).length <= 0) return [];
                const { precept, useMod } = state;
                return useMod.opts.map(opt => {
                    const key = precept.keys.find(it => it.kid === opt.kid);
                    const dct = directsConf.find(it => it.did === opt.did);
                    return { ...opt, ...key, ...dct };
                });
            });

            const onPTZChnChange = (index,value) => {
                state.precept.mods.sels.forEach(sel => {
                    if(sel.name === state.useMod.name)
                        sel.chn = Number(value);
                })
            }

            const onModCustomValChange = (index, value) => {
                state.useMod.opts[index].val = Number(value);
            };

            onMounted(()=>{
                const observer = new resizeObserver(entries => {
                    for (let entry of entries) {
                        const { height } = entry.contentRect;
                        if(height > 0)
                            state.imgHeight.value = height+"px";
                    }
                });
                observer.observe(state.remoteEle.value);
            })

            return {...state,defaultConf,remoteConf,updateRemoteConf,handleModChnConf,handleRemoteDirects,handleCustomDirect,onPTZChnChange,onModCustomValChange}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>