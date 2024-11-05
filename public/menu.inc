<div id="menu">
    <menu class="menu">
        <header class="top-header">
            <nav class="navbar navbar-expand justify-content-between">
                <div class="btn-toggle-menu" @click="onToggleMenu">
                    <i class="fa-solid fa-bars"></i>
                </div>
                <search-setting></search-setting>
                <ul class="navbar-nav top-right-menu gap-2">
                    <li class="nav-item">
                        <a class="nav-link" style="font-size: 20px;">
                            <cn @click="updateSysLanguage('en')">En</cn>
                            <en @click="updateSysLanguage('cn')">中</en>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-if="Object.keys(themeConf).length > 0 && themeConf.mod  === 'link'">
                            <i v-if="themeConf.used==='default'" class="fa-regular fa-moon" @click="updateThemeConf('dark')"></i>
                            <i v-else class="fa-regular fa-sun" @click="updateThemeConf('default')"></i>
                        </a>
                    </li>
                    <li class="nav-item" v-if="Object.keys(webVerConf).length > 0 && webVerConf.switch">
                        <a class="nav-link" style="font-size: 19px;" @click="changeWeb">
                            <i class="fa-solid fa-arrow-right-arrow-left"></i>
                        </a>
                    </li>
                    <li class="nav-item" v-if="hadCap">
                        <capture-option></capture-option>
                    </li>
                    <li class="nav-item" v-if="hadLed">
                        <led-option></led-option>
                    </li>
                    <li class="nav-item">
                        <usb-option></usb-option>
                    </li>
                    <li class="nav-item" v-if="Object.keys(themeConf).length > 0 && themeConf.mod === 'style'">
                        <theme-color></theme-color>
                    </li>
<!--                    <li class="nav-item">-->
<!--                        <a class="nav-link" data-bs-toggle="offcanvas" href="#ThemeCustomizer"><i class="fa fa-gear"></i></a>-->
<!--                    </li>-->
                </ul>
            </nav>

        </header>

        <aside class="sidebar-wrapper">
            <div class="sidebar-header">
                <div class="logo-icon lp-cursor-pointer flex-grow-1" @click="onHrefDash" style="white-space: nowrap;overflow: hidden">
                    <img src="assets/img/logo.png" class="mt-1" style="max-height: 33px;">
                </div>
                <div class="sidebar-close flex-grow-0" @click="onCloseSidebar">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div class="sidebar-nav" ref="simplebarEle">
                <ul class="metismenu" ref="metismenuEle">
                    <li>
                        <a href="dashboard.php">
                            <div class="parent-icon"><i class="fa fa-tachometer"></i></div>
                            <div class="menu-title"><cn>设备状态</cn><en>Dashboard</en></div>
                        </a>
                    </li>
                    <li class="menu-label"><cn>基本设置</cn><en>Basic</en></li>
                    <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3516CV610'">
                        <a href="decode.php">
                            <div class="parent-icon"><i class="fa fa-image"></i></div>
                            <div class="menu-title"><cn>解码设置</cn><en>Decode</en></div>
                        </a>
                    </li>
                    <li>
                        <a href="encode.php">
                            <div class="parent-icon"><i class="fa-brands fa-joomla"></i></div>
                            <div class="menu-title"><cn>编码设置</cn><en>Encode</en></div>
                        </a>
                    </li>
                    <li>
                        <a href="stream.php">
                            <div class="parent-icon"><i class="fa fa-upload"></i></div>
                            <div class="menu-title"><cn>串流输出</cn><en>Stream</en></div>
                        </a>
                    </li>
                    <li>
                        <a href="push.php">
                            <div class="parent-icon"><i class="fa-solid fa-fan"></i></div>
                            <div class="menu-title"><cn>直播推流</cn><en>Push</en></div>
                        </a>
                    </li>
                    <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.videoOut">
                        <a href="output.php">
                            <div class="parent-icon"><i class="fa-solid fa-microchip"></i></div>
                            <div class="menu-title"><cn>接口输出</cn><en>Output</en></div>
                        </a>
                    </li>
                    <li>
                        <a href="sys.php">
                            <div class="parent-icon"><i class="fa-solid fa-gear"></i></div>
                            <div class="menu-title"><cn>系统设置</cn><en>System</en></div>
                        </a>
                    </li>
                    <li v-if="Object.keys(hardwareConf).length > 0 && (hardwareConf.function.overlay || hardwareConf.function.mix)" class="menu-label"><cn>视频特效</cn><en>Effect</en></li>
                    <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.overlay">
                        <a href="overlay.php">
                            <div class="parent-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                            <div class="menu-title"><cn>叠加特效</cn><en>Overlay</en></div>
                        </a>
                    </li>
                    <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.mix">
                        <a href="mix.php">
                            <div class="parent-icon"><i class="fa-solid fa-chart-simple"></i></div>
                            <div class="menu-title"><cn>视频混合</cn><en>Video mix</en></div>
                        </a>
                    </li>
                    <li class="menu-label"><cn>其他设置</cn><en>OTHER</en></li>
                    <li>
                        <a href="javascript:;" class="has-arrow">
                            <div class="parent-icon"><i class="fa-solid fa-puzzle-piece ms-1 mb-1"></i></div>
                            <div class="menu-title"><cn>扩展功能</cn><en>Extend</en></div>
                        </a>
                        <ul class="ps-3">
<!--                            <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.ndi">-->
<!--                                <a href="ndi.php">-->
<!--                                    <i class="fa-solid fa-desktop"></i>-->
<!--                                    <div class="menu-title"><cn>NDI解码</cn><en>NDI Decode</en></div>-->
<!--                                </a>-->
<!--                            </li>-->
                            <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.record">
                                <a href="record.php">
                                    <i class="fa-solid fa-folder-open"></i>
                                    <div class="menu-title"><cn>文件录制</cn><en>Record</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="player.php">
                                    <i class="fa-solid fa-circle-play"></i>
                                    <div class="menu-title"><cn>H5 播放器</cn><en>H5 Player</en></div>
                                </a>
                            </li>
                            <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.intercom">
                                <a href="intercom.php">
                                    <i class="fa-solid fa-headset"></i>
                                    <div class="menu-title"><cn>集成通信</cn><en>Intercom</en></div>
                                </a>
                            </li>
                            <li v-if="Object.keys(hardwareConf).length > 0 && (hardwareConf.function.remote)">
                                <a href="remote.php">
                                    <i class="fa-brands fa-cloudsmith"></i>
                                    <div class="menu-title"><cn>红外遥控</cn><en>Remote</en></div>
                                </a>
                            </li>
                            <li v-if="Object.keys(hardwareConf).length > 0 && (hardwareConf.function.serialport || hardwareConf.function.button)">
                                <a href="uart.php">
                                    <i class="fa-solid fa-link"></i>
                                    <div class="menu-title"><cn>串口、按键</cn><en>Serial, Button</en></div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3516CV610'">
                        <a href="javascript:;" class="has-arrow">
                            <div class="parent-icon"><i class="fa-solid fa-gears"></i></div>
                            <div class="menu-title"><cn>高级设置</cn><en>Options</en></div>
                        </a>
                        <ul class="ps-3">
                            <li>
                                <a href="group.php">
                                    <i class="fa-solid fa-server"></i>
                                    <div class="menu-title"><cn>群组设置</cn><en>Group</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="rproxy.php">
                                    <i class="fa-solid fa-comments"></i>
                                    <div class="menu-title"><cn>远程访问</cn><en>Reverse Proxy</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="service.php">
                                    <i class="fa-solid fa-cloud"></i>
                                    <div class="menu-title"><cn>服务设置</cn><en>Service</en></div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.chip !== 'HI3516CV610'">
                        <a href="javascript:;" class="has-arrow">
                            <div class="parent-icon"><i class="fa-solid fa-flask"></i></div>
                            <div class="menu-title"><cn>实验功能</cn><en>Laboratory</en></div>
                        </a>
                        <ul class="ps-3">
                            <li>
                                <a href="gb28181.php">
                                    <i class="fa-solid fa-cloud"></i>
                                    <div class="menu-title"><cn>GB28181</cn><en>GB28181</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="roi.php">
                                    <i class="fa-solid fa-circle-user"></i>
                                    <div class="menu-title"><cn>ROI</cn><en>ROI</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="insta360.php">
                                    <i class="fa-solid fa-camera"></i>
                                    <div class="menu-title"><cn>Insta360 Link</cn><en>Insta360 Link</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="onvif.php">
                                    <i class="fa fa-video-camera"></i>
                                    <div class="menu-title"><cn>Onvif PTZ</cn><en>Onvif PTZ</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="colorKey.php">
                                    <i class="fa fa-cut"></i>
                                    <div class="menu-title"><cn>抠像</cn><en>ColorKey</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="sync.php">
                                    <i class="fa-solid fa-bars-staggered"></i>
                                    <div class="menu-title"><cn>同步调节</cn><en>Synchronization</en></div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="sidebar-bottom">
                <div class="d-flex align-items-center px-3 gap-3 w-100 h-100" data-bs-toggle="dropdown">
                    <div class="user-icon">
                        <i class="fa-regular fa-user"></i>
                    </div>
                    <div class="user-info">
                        <h5 class="mb-0 user-name">Admin</h5>
                        <p class="mb-0 user-designation"><cn>系统管理员</cn><en>administrator</en></p>
                    </div>
                    <div class="logout-icon" @click="onLogout">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>
            </div>
        </aside>
    </menu>
</div>
<script type="module">
    import vue from "../assets/js/vue.build.js";
    import Metismenu from '../assets/plugins/metismenu/js/metisMenu.esm.js';
    import { func,updateSysLanguage,confirm } from "../assets/js/lp.utils.js";
    import { useThemeConf,useHardwareConf,useWebVerConf } from "../assets/js/vue.hooks.js"
    import { ignoreCustomElementPlugin,usbOptionComponent,searchSettingComponent,ledOptionComponent,themeActiveColorComponent,captureOptionComponent } from "../assets/js/vue.helper.js"
    import mutationObserver from '../assets/plugins/polyfill/mutationobserver.esm.js';

    const { createApp,ref,reactive,watchEffect,watch,nextTick,onMounted } = vue;
    const menu = createApp({
        components:{
            "usb-option": usbOptionComponent,
            "led-option": ledOptionComponent,
            "search-setting": searchSettingComponent,
            "theme-color": themeActiveColorComponent,
            "capture-option": captureOptionComponent
        },
        setup() {
           const { themeConf,updateThemeConf } = useThemeConf();
           const { webVerConf,updateWebVerConf } = useWebVerConf();
           const { hardwareConf } = useHardwareConf();

           const state = {
               simplebarEle: ref(null),
               metismenuEle: ref(null),
               isMenuToggled : ref(false),
               hadLed: ref(false),
               hadCap: ref(false),
               simplebar: null,
           }

           const onLogout = () => {
               func("/login/onLogout")
                   .then((ret)=>{
                       if(ret.status === "success")
                           location.href = "/";
                   });
           }

           const unwatch = watch(hardwareConf,()=>{
               if(Object.keys(hardwareConf).length > 0) {
                   nextTick(()=>{
                       let as = document.querySelectorAll(".sidebar-wrapper .metismenu li a");
                       for (let i = 0; i < as.length; i++) {
                           if (as[i].href === window.location.protocol+"//"+window.location.host+""+window.location.pathname) {
                               as[i].classList.add("active");
                               let parent = as[i].parentElement;
                               while (parent && parent.tagName === "LI") {
                                   parent.classList.add("mm-active");
                                   parent = parent.parentElement;
                                   if (parent && parent.tagName === "UL")
                                       parent.classList.add("mm-show");
                                   parent = parent.parentElement;
                               }
                               break;
                           }
                       }
                       new Metismenu(state.metismenuEle.value);
                       state.simplebar = new SimpleBar(state.simplebarEle.value);
                       observeMenuChanges(state.metismenuEle.value);
                       unwatch();
                   })
               }
           })

           watch(state.isMenuToggled,() => {
               const body = document.querySelector('body');
               if(state.isMenuToggled.value)
                   body.classList.add('toggled');
               else
                   body.classList.remove('toggled');
           })

            const observeMenuChanges = element => {
                const observer = new mutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                            const target = mutation.target;
                            if (target.classList.contains('mm-active'))
                                setTimeout(()=> state.simplebar.recalculate(),230);
                        }
                    });
                });

                observer.observe(element, {
                    attributes: true,
                    subtree: true,
                    attributeFilter: ['class'],
                });
            }

           const onHrefDash = () => {
                location.href="/dashboard.php";
           }

           const onToggleMenu = () => {
               state.isMenuToggled.value = !state.isMenuToggled.value;
               localStorage.setItem("menu-toggled",state.isMenuToggled.value);
           }

           const onCloseSidebar = () => {
               state.isMenuToggled.value = false;
               localStorage.setItem("menu-toggled",state.isMenuToggled.value);
           }

           const changeWeb = () => {
               confirm({
                   title: '<cn>切换版本</cn><en>Switch Web</en>',
                   content: '<cn>是否切换至经典版页面,并重新启动？</cn><en>Whether to switch to the classic version and restart?</en>',
                   buttons: {
                       ok: {
                           text: "<cn>切换</cn><en>Switch</en>",
                           btnClass: 'btn-primary',
                           keys: ['enter'],
                           action: () => {
                               webVerConf.web = "classic";
                               updateWebVerConf();
                           }
                       },
                       cancel: {
                           text: "<cn>取消</cn><en>Cancel</en>"
                       }

                   }
               });
           }

           onMounted(()=>{
               state.isMenuToggled.value = localStorage.getItem("menu-toggled") ? JSON.parse(localStorage.getItem("menu-toggled")) : false;
               func("/system/hadLedDevice").then(ret => state.hadLed.value = ret.data);
               func("/system/hadCapture").then(ret => state.hadCap.value = ret.data);
           });

           return {...state,hardwareConf,themeConf,webVerConf,updateThemeConf,onHrefDash,onLogout,
               onToggleMenu,onCloseSidebar,updateSysLanguage,changeWeb}
       }
    });
    menu.use(ignoreCustomElementPlugin);
    menu.mount('#menu');
</script>