<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
    <link href="assets/plugins/nouislider/css/nouislider.min.css" rel="stylesheet">
</head>
<body>
<?php include ("./public/menu.inc") ?>
<div data-simplebar style="padding: 0;">
    <main class="page-content mix" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-6 mx-auto">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="d-flex align-items-center gap-3 px-2 py-1">
                                <div class="flex-grow-0">
                                    <label class="fw-bold">
                                        <cn>频道</cn>
                                        <en>Channel</en>:
                                    </label>
                                </div>
                                <div class="flex-grow-0">
                                    <select class="form-select">
                                        <option v-if="defaultConf.length > 0 && mixIndex > -1" :value="defaultConf[mixIndex].id">{{defaultConf[mixIndex].name}}</option>
                                    </select>
                                </div>
                                <div class="flex-grow-0">
                                    <label class="fw-bold">
                                        <cn>布局</cn>
                                        <en>Layout</en>:
                                    </label>
                                </div>
                                <div class="flex-grow-0">
                                    <select class="form-select" v-model="curLayId" @change="onChangeLayout">
                                        <option v-for="(item,index) in defLaysConf" :value="item.layId">{{item.layName}}</option>
                                    </select>
                                </div>
                                <div class="flex-grow-1 d-flex justify-content-end pe-3">
                                    <i class="fa-solid fa-gear fa-lg lp-cursor-pointer" @click="hrefDefLayout"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 mt-2 mb-2">
                                <img :src="chnImgUrl" class="card-img" alt="...">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="col-lg-6 mx-auto">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>布局设定</cn>
                            <en>Layout config</en>
                        </div>
                    </div>
                    <div class="card-body pb-4" >
                        <div class="lp-aspect-ratio">
                            <div class="aspect-ratio-content bg-black">
                                <div class="lay-border" v-for="(item,index) in handleActiveDefLayConf.layouts" :style="{position:'absolute',width:item.pos.w * 100+'%',height:item.pos.h*100+'%',left:item.pos.x*100+'%',top:item.pos.y*100+'%'}">
                                    <div :style="{width:'100%',height:'100%',backgroundColor: handleLayBackColor(index)}">
                                        <div class="d-flex align-items-center gap-1 border-0 px-2 py-1">
                                            <div class="flex-grow-1">
                                                <select class="form-select" v-model="defaultConf[mixIndex].srcV[index]" @change="updateDefaultConf('noTip')">
                                                    <option value="-1" cn="空" en="none" v-language-option></option>
                                                    <option v-for="(it,index) in handleLayoutChnSelect(defaultConf[mixIndex].srcV[index])" :value="it.id">{{it.name}}</option>
                                                </select>
                                            </div>
                                            <div class="flex-grow-0">
                                                <button :class="['btn',{'btn-default':handleActiveVolume(index)},{'px-2 btn-primary':!handleActiveVolume(index)}]" @click="onUpdateActiveVolume(defaultConf[mixIndex].srcV[index])">
                                                    <i :class="['fa-solid',{'fa-volume-off':handleActiveVolume(index)},{'fa-volume-high':!handleActiveVolume(index)}]"></i>
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
    </main>
</div>
<?php include ("./public/foot.inc") ?>
<script type="module">
    
    import { rpc,confirm } from "./assets/js/lp.utils.js";
    import { useDefaultConf,useDefLaysConf,useHardwareConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent,nouiSliderComponent,languageOptionDirective } from "./assets/js/vue.helper.js"
    import mutationObserver from './assets/plugins/polyfill/mutationobserver.esm.js';
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        directives:{
            "language-option": languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "noui-slider": nouiSliderComponent
        },
        setup(props,context) {
            
            const { defaultConf,updateDefaultConf } = useDefaultConf();
            const { defLaysConf } = useDefLaysConf();
            const { hardwareConf } = useHardwareConf();

            const state = {
                chnImgUrl: ref(""),
                curLayId: ref(-1),
                mixIndex: ref(-1),
                curTheme: ref("default")
            }
            
            const updateChnImage = () => {
                if(defaultConf[state.mixIndex.value].enable)
                    state.chnImgUrl.value = "snap/snap" + defaultConf[state.mixIndex.value].id + ".jpg?rnd=" + Math.random();
                else
                    state.chnImgUrl.value = "assets/img/nosignal.jpg";
                setTimeout(() => { rpc( "enc.snap" ) },200)
                setTimeout(updateChnImage,500);
            }
    
            const handleEnableConf = computed(()=>{
                return defaultConf.filter((item,index)=>{
                    return !!item.enable;
                })
            })
            
            const handleActiveDefLayConf = computed(()=>{
                return defLaysConf.find((item) => item.layId === state.curLayId.value) || {};
            });
            
            const handleLayoutChnSelect = computed(() => {
                return (chnId) => {
                    let srcV = defaultConf[state.mixIndex.value].srcV;
                    return defaultConf.filter((item,index)=>{
                        return !(srcV.indexOf(item.id) > -1 && item.id !== chnId);
                    });
                };
            });
    
            const handleActiveVolume = index => {
                if(index < defaultConf[state.mixIndex.value].srcV.length) {
                    const idx = defaultConf[state.mixIndex.value].srcV[index].toString();
                    return !defaultConf[state.mixIndex.value].srcA.includes(idx) && !defaultConf[state.mixIndex.value].srcA.includes(Number(idx));
                }
            };
            
            const onUpdateActiveVolume = chnId => {
                if(chnId === "-1")
                    return;
                chnId = chnId.toString();
                defaultConf[state.mixIndex.value].srcA = defaultConf[state.mixIndex.value].srcA.map(item => item = item.toString());
                defaultConf[state.mixIndex.value].srcV = defaultConf[state.mixIndex.value].srcV.map(item => item = item.toString());
                let idx = defaultConf[state.mixIndex.value].srcA.indexOf(chnId);
                if(idx === -1)
                    defaultConf[state.mixIndex.value].srcA.push(chnId);
                else
                    defaultConf[state.mixIndex.value].srcA.splice(idx, 1);
                updateDefaultConf("noTip");
            };
    
            const unwatch = watchEffect(()=>{
                if(defaultConf.length > 0 && Object.keys(defLaysConf).length > 0) {
                    for(let i=0;i<defaultConf.length;i++) {
                        if(defaultConf[i].type !== "mix")
                            continue;
    
                        var layList = [];
                        let mixChn = defaultConf[i];
                        for (let j = 0; j < mixChn.layout.length; j++) {
                            let layout = mixChn.layout[j];
                            let layObj = {
                                "a": layout.a,
                                "x": layout.x,
                                "y": layout.y,
                                "w": layout.w,
                                "h": layout.h,
                                "index": layout.index
                            }
                            layList.push(layObj);
                        }
                        let curLayStr = JSON.stringify(layList);
                        
                        for (let j = 0; j < defLaysConf.length; j++) {
                            let las = defLaysConf[j].layouts;
                            let layout = [];
                            for (let k = 0; k < las.length; k++) {
                                layout.push(las[k].pos);
                            }
                            if(curLayStr === JSON.stringify(layout)) {
                                state.curLayId.value = defLaysConf[j].layId;
                                break;
                            }
                        }
                        state.mixIndex.value = i;
                    }
                    updateChnImage();
                    unwatch();
                }
            })

            const hrefDefLayout = () => {
                confirm({
                    title: '<cn>布局</cn><en>Layout</en>',
                    content: '<cn>是否打开布局管理器？</cn><en>Jump to Layout Manager?</en>',
                    buttons: {
                        ok: {
                            text: "<cn>打开</cn><en>Confirm</en>",
                            btnClass: 'btn-primary',
                            keys: ['enter'],
                            action: () => window.location.href = "defLayout.php"
                        },
                        cancel: {
                            text: "<cn>取消</cn><en>Cancel</en>",
                            action: () => {}
                        }
                    }
                });
            }
            
            const onChangeLayout = () => {
                let layout = [];
                let srcV = [];
                let mark = false;
                for(let i=0;i<defLaysConf.length;i++) {
                    if(state.curLayId.value === defLaysConf[i].layId) {
                        let las = defLaysConf[i].layouts;
                        for (let j = 0; j < las.length; j++) {
                            layout.push(las[j].pos);
                            if(las[j].id < 0) {
                                srcV.push("-1");
                            } else {
                                srcV.push(las[j].id + "");
                                mark = true;
                            }
                        }
                    }
                }
                
                if(!mark) {
                    if (srcV.length >= defaultConf[state.mixIndex.value].srcV.length)
                        srcV.splice(0, defaultConf[state.mixIndex.value].srcV.length, ...defaultConf[state.mixIndex.value].srcV);
                    else
                        srcV = defaultConf[state.mixIndex.value].srcV.slice(0, srcV.length);
                }
                defaultConf[state.mixIndex.value].srcV.splice(0, defaultConf[state.mixIndex.value].srcV.length, ...srcV);
                defaultConf[state.mixIndex.value].layout.splice(0, defaultConf[state.mixIndex.value].layout.length, ...layout);
                updateDefaultConf("noTip");
                const options = document.querySelectorAll(`option[cn]`);
                options.forEach(option => {
                    option.textContent = option.getAttribute('cn');
                });
            }
            
            const handleLayBackColor = (idx) => {
                let color = 0;
                if(state.curTheme.value !== "dark") {
                    if(idx % 2 === 0)
                        color = 128 + 25 * (idx / 2);
                    else
                        color = 128 - 25 * (idx / 2 + 1);
                } else
                    color = 85 - 15 * (idx / 2 + 1);
                return "rgb(" + color + "," + color + "," + color + ")";
            }

            onMounted(()=>{
                const html = document.querySelector('html');
                const observer = new mutationObserver(mutations => {
                    mutations.forEach(mutation => {
                        if (mutation.type === 'attributes' && mutation.attributeName === "data-bs-theme")
                            state.curTheme.value = mutation.target.getAttribute("data-bs-theme");
                    });
                });
                const config = {
                    attributes: true,
                    attributeFilter: ["data-bs-theme"],
                    subtree: false
                };
                observer.observe(html, config);
            });

            return {...state,defaultConf,defLaysConf,hardwareConf,handleEnableConf,handleActiveDefLayConf,
                hrefDefLayout,onChangeLayout,handleLayBackColor,handleActiveVolume,onUpdateActiveVolume,
                handleLayoutChnSelect,updateDefaultConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>