<div id="menu">
    <menu :class="['menu',{'sidebar-hovered': isSidebarHovered}]">
        <header class="top-header">
            <nav class="navbar navbar-expand justify-content-between">
                <div class="btn-toggle-menu" @click="onToggleMenu">
                    <i class="fa-solid fa-bars"></i>
                </div>
                <div class="position-relative search-bar d-lg-block d-none" data-bs-toggle="modal" data-bs-target="#searchModal">
                    <input class="form-control form-control-sm rounded-5 px-5" disabled type="search" placeholder="Search">
                    <span class="position-absolute ms-3 translate-middle-y start-0 top-50">
                    <i class="fa fa-search"></i>
                </span>
                </div>
                <ul class="navbar-nav top-right-menu gap-2">
                    <li class="nav-item dark-mode">
                        <a class="nav-link dark-mode-icon" href="javascript:;"><i class="fa-regular fa-moon"></i></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="offcanvas" href="#ThemeCustomizer"><i class="fa fa-gear"></i></a>
                    </li>
                </ul>
            </nav>
        </header>

        <aside class="sidebar-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
            <div class="sidebar-header">
                <div class="logo-icon">
                    <img src="assets/images/logo-icon.png" class="logo-img" alt="">
                </div>
                <div class="logo-name flex-grow-1">
                    <h5 class="mb-0 fw-bold">LinkPi</h5>
                </div>

                <div class="sidebar-close" @click="onCloseSidebar">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div class="sidebar-nav">
                <ul class="metismenu">
                    <li>
                        <a href="dashboard.php">
                            <div class="parent-icon"><i class="fa fa-tachometer"></i></div>
                            <div class="menu-title"><cn>设备状态</cn><en>Dashboard</en></div>
                        </a>
                    </li>
                    <li>
                        <a href="dashboard1.php">
                            <div class="parent-icon"><i class="fa fa-tachometer"></i></div>
                            <div class="menu-title"><cn>设备状态1</cn><en>Dashboard</en></div>
                        </a>
                    </li>
                    <li>
                        <a href="decode.php">
                            <div class="parent-icon"><i class="fa fa-image"></i></div>
                            <div class="menu-title"><cn>解码设置</cn><en>Decode</en></div>
                        </a>
                    </li>
                    <li>
                        <a href="encode.php">
                            <div class="parent-icon"><i class="fa fa-image"></i></div>
                            <div class="menu-title"><cn>编码设置</cn><en>Encode</en></div>
                        </a>
                    </li>
                    <li>
                        <a href="stream.php">
                            <div class="parent-icon"><i class="fa fa-upload"></i></div>
                            <div class="menu-title"><cn>输出设置</cn><en>Stream</en></div>
                        </a>
                    </li>
                    <li>
                        <a href="overlay.php">
                            <div class="parent-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                            <div class="menu-title"><cn>叠加特效</cn><en>Overlay</en></div>
                        </a>
                    </li>
                    <li>
                        <a href="mix.php">
                            <div class="parent-icon"><i class="fa-solid fa-chart-simple"></i></div>
                            <div class="menu-title"><cn>视频混合</cn><en>Video mix</en></div>
                        </a>
                    </li>

                    <li>
                        <a href="sys.php">
                            <div class="parent-icon"><i class="fa-solid fa-gear"></i></div>
                            <div class="menu-title"><cn>系统设置</cn><en>System</en></div>
                        </a>
                    </li>

                    <li class="menu-label"><cn>其他设置</cn><en>Other Setting</en></li>
                    <li>
                        <a href="javascript:;" class="has-arrow">
                            <div class="parent-icon"><i class="fa-solid fa-puzzle-piece ms-1 mb-1"></i></div>
                            <div class="menu-title"><cn>扩展功能</cn><en>Extend</en></div>
                        </a>
                        <ul>
                            <li>
                                <a href="ndi.php">
                                    <i class="fa-solid fa-desktop"></i>
                                    <div class="menu-title"><cn>NDI解码</cn><en>NDI decode</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="record.php">
                                    <i class="fa-solid fa-folder-open"></i>
                                    <div class="menu-title"><cn>文件录制</cn><en>Record</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="push.php">
                                    <i class="fa-solid fa-circle-arrow-up"></i>
                                    <div class="menu-title"><cn>多平台直播</cn><en>Multiple Push</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="player.php">
                                    <i class="fa-solid fa-circle-play"></i>
                                    <div class="menu-title"><cn>H5 播放器</cn><en>H5 Player</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="intercom.php">
                                    <i class="fa-solid fa-headset"></i>
                                    <div class="menu-title"><cn>集成通信</cn><en>Intercom</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="explorer.php">
                                    <i class="fa-brands fa-usb"></i>
                                    <div class="menu-title"><cn>U盘助手</cn><en>Usb Disk</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="uart.php">
                                    <i class="fa-solid fa-link"></i>
                                    <div class="menu-title"><cn>串口、按键</cn><en>Serial, Button</en></div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:;" class="has-arrow">
                            <div class="parent-icon"><i class="fa-solid fa-gears"></i></div>
                            <div class="menu-title"><cn>高级设置</cn><en>Options</en></div>
                        </a>
                        <ul>
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
                                    <div class="menu-title"><cn>服务设置</cn><en>Reverse Proxy</en></div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:;" class="has-arrow">
                            <div class="parent-icon"><i class="fa-solid fa-flask"></i></div>
                            <div class="menu-title"><cn>实验功能</cn><en>Laboratory</en></div>
                        </a>
                        <ul>
                            <li>
                                <a href="gb28181.php">
                                    <i class="fa-solid fa-cloud"></i>
                                    <div class="menu-title">GB28181</div>
                                </a>
                            </li>
                            <li>
                                <a href="roi.php">
                                    <i class="fa-solid fa-circle-user"></i>
                                    <div class="menu-title">ROI</div>
                                </a>
                            </li>
                            <li>
                                <a href="insta360.php">
                                    <i class="fa-solid fa-camera"></i>
                                    <div class="menu-title">Insta360 Link</div>
                                </a>
                            </li>
                            <li>
                                <a href="onvif.php">
                                    <i class="fa fa-video-camera"></i>
                                    <div class="menu-title">Onvif PTZ</div>
                                </a>
                            </li>
                            <li>
                                <a href="sync.php">
                                    <i class="fa-solid fa-bars-staggered"></i>
                                    <div class="menu-title"><cn>同步调节</cn><en>Synchronization</en></div>
                                </a>
                            </li>
                            <li>
                                <a href="colorKey.php">
                                    <i class="fa fa-cut"></i>
                                    <div class="menu-title"><cn>抠像</cn><en>ColorKey</en></div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="sidebar-bottom dropdown dropup-center dropup">
                <div class="dropdown-toggle d-flex align-items-center px-3 gap-3 w-100 h-100" data-bs-toggle="dropdown">
                    <div class="user-img">
                        <img src="assets/images/avatar.png" alt="">
                    </div>
                    <div class="user-info">
                        <h5 class="mb-0 user-name">Admin</h5>
                        <p class="mb-0 user-designation"><cn>系统管理员</cn><en>administrator</en></p>
                    </div>
                </div>
                <ul class="dropdown-menu dropdown-menu-end">
<!--                    <li>-->
<!--                        <div class="dropdown-divider mb-0"></div>-->
<!--                    </li>-->
                    <li class="py-2">
                        <a class="dropdown-item" href="javascript:;" @click="onLogout">
                            <i class="fa-solid fa-right-from-bracket me-2"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>

        <!--start overlay-->
        <div class="overlay btn-toggle-menu"></div>
        <!--end overlay-->

        <!-- Search Modal -->
        <div class="modal" id="searchModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header gap-2">
                        <div class="position-relative popup-search w-100">
                            <input class="form-control form-control-lg ps-5 border border-3 border-primary" type="search" placeholder="Search">
                            <span class="position-absolute ms-3 translate-middle-y start-0 top-50">
                            <i class="fa fa-search"></i>
                        </span>
                        </div>
                        <button type="button" class="btn-close d-xl-none" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="search-list">
                            <p class="mb-1">Html Templates</p>
                            <div class="list-group">
                                <a href="javascript:;" class="list-group-item list-group-item-action active align-items-center d-flex gap-2"><i class="bi bi-filetype-html fs-5"></i>Best Html Templates</a>
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-award fs-5"></i>Html5 Templates</a>
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-box2-heart fs-5"></i>Responsive Html5 Templates</a>
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-camera-video fs-5"></i>eCommerce Html Templates</a>
                            </div>
                            <p class="mb-1 mt-3">Web Designe Company</p>
                            <div class="list-group">
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-chat-right-text fs-5"></i>Best Html Templates</a>
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-cloud-arrow-down fs-5"></i>Html5 Templates</a>
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-columns-gap fs-5"></i>Responsive Html5 Templates</a>
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-collection-play fs-5"></i>eCommerce Html Templates</a>
                            </div>
                            <p class="mb-1 mt-3">Software Development</p>
                            <div class="list-group">
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-cup-hot fs-5"></i>Best Html Templates</a>
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-droplet fs-5"></i>Html5 Templates</a>
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-exclamation-triangle fs-5"></i>Responsive Html5 Templates</a>
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-eye fs-5"></i>eCommerce Html Templates</a>
                            </div>
                            <p class="mb-1 mt-3">Online Shoping Portals</p>
                            <div class="list-group">
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-facebook fs-5"></i>Best Html Templates</a>
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-flower2 fs-5"></i>Html5 Templates</a>
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-geo-alt fs-5"></i>Responsive Html5 Templates</a>
                                <a href="javascript:;" class="list-group-item list-group-item-action align-items-center d-flex gap-2"><i class="bi bi-github fs-5"></i>eCommerce Html Templates</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--start theme customization-->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="ThemeCustomizer" aria-labelledby="ThemeCustomizerLable">
            <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title" id="ThemeCustomizerLable">Theme Customizer</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <h6 class="mb-0">Theme Variation</h6>
                <hr>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="LightTheme" value="option1">
                    <label class="form-check-label" for="LightTheme">Light</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="DarkTheme" value="option2" checked="">
                    <label class="form-check-label" for="DarkTheme">Dark</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="SemiDarkTheme" value="option3">
                    <label class="form-check-label" for="SemiDarkTheme">Semi Dark</label>
                </div>
                <hr>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="MinimalTheme" value="option3">
                    <label class="form-check-label" for="MinimalTheme">Minimal Theme</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="ShadowTheme" value="option4">
                    <label class="form-check-label" for="ShadowTheme">Shadow Theme</label>
                </div>

            </div>
        </div>
    </menu>
</div>

<script type="module">
    import { func } from "../assets/js/helper.js";
    const { createApp,ref,watchEffect,onMounted } = Vue;
    const menu = createApp({
       setup() {

           const state = {
               isMenuToggled : ref(false),
               isSidebarHovered: ref(false)
           }

           const onLogout = () => {
               func("/link/mgr/login/onLogout")
                   .then((ret)=>{
                       if(ret.status === "success")
                           location.href = "/";
                   });
           }

           watchEffect(()=>{
               const body = document.querySelector('body');
               if(state.isMenuToggled.value)
                   body.classList.add('toggled');
               else
                   body.classList.remove('toggled');
           })

           const onToggleMenu = () => {
               state.isMenuToggled.value = !state.isMenuToggled.value;
           }

           const onMouseEnter = () => {
               if(state.isMenuToggled.value)
                   state.isSidebarHovered.value = true;
           };

           const onMouseLeave = () => {
               if(state.isSidebarHovered.value)
                   state.isSidebarHovered.value = false;
           };

           const onCloseSidebar = () => {
               state.isMenuToggled.value = false;
           }

           onMounted(()=>{
               $(".metismenu").metisMenu();
               new SimpleBar(document.querySelector(".sidebar-nav"));

               let as = document.querySelectorAll(".sidebar-wrapper .metismenu li a");
               for (let i = 0; i < as.length; i++) {
                   if (as[i].href === window.location.href) {
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
           });

           return {...state,onLogout,onToggleMenu,onMouseEnter,onMouseLeave,onCloseSidebar}
       }
    });
    menu.mount('#menu');
</script>