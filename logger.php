<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
    <link href="assets/plugins/xterm/css/xterm.css" rel="stylesheet">
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content logger" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-10">
                    <div class="card">
                        <div class="card-body" >
                            <div class="row">
                                <div class="d-flex align-items-center gap-3 px-2 py-1">
                                    <div class="flex-grow-0">
                                        <label class="fw-bold">
                                            <cn>日志</cn>
                                            <en>Log</en>:
                                        </label>
                                    </div>
                                    <div class="flex-grow-0">
                                        <select class="form-select" ref="selEle" v-model="logType" @change="onChangeLogType">
                                            <option value="system">System</option>
                                            <option value="logmpp">Logmpp</option>
                                            <option value="kernel">Kernel</option>
                                            <option value="nginx_access">Ngx_Access</option>
                                            <option value="nginx_error">Ngx_Error</option>
                                        </select>
                                    </div>
                                    <div class="flex-grow-1 d-flex justify-content-end pe-3">
                                        <i class="fa-solid fa-download fa-lg lp-cursor-pointer" @click="onDownloadLogs"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 mt-2 mb-2">
                                    <div class="xterm-aspect-ratio">
                                        <div class="xterm-aspect-content">
                                            <div class="xterm" ref="xtermEle"></div>
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
<script src="assets/plugins/xterm/js/xterm.min.js"></script>
<script src="assets/plugins/xterm/js/xterm-addon-fit.min.js"></script>
<script type="module">
    import { useWebSocket } from "./assets/js/vue.hooks.js"
    import { ignoreCustomElementPlugin,filterKeywordPlugin } from "./assets/js/vue.helper.js"
    import { rpc8,isEmpty,formatDate } from "./assets/js/lp.utils.js"
    import JsZip from "./assets/plugins/jszip/jszip.esm.js"
    import { saveAs } from "./assets/plugins/jszip/filesaver.esm.js";
    import resizeObserver from './assets/plugins/polyfill/resize-observer-polyfill.esm.js';
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watch,watchEffect,computed,onMounted,onUnmounted} = vue;
    const app = createApp({
        setup(props,context) {

            const { isConnected, message,sendMessage } = useWebSocket(`ws://${location.host}/logger.io`);
            const state = {
                selEle: ref(null),
                xtermEle: ref(null),
                logType: ref("system"),
                terminal: null,
                fitAddon: null,
                hadIterm: false
            }

            const unwatch = watch(isConnected,()=>{
                if(isConnected.value) {
                    sendMessage("reset:"+state.logType.value);
                    unwatch();
                }
            })

            watchEffect(()=>{
                if(isConnected.value && !isEmpty(message.value) && state.terminal) {
                    const result = JSON.parse(message.value);
                    if(result.level === "all")
                        state.terminal.reset();
                    state.terminal.write(result.data);
                }
            })

            const onChangeLogType = () => {
                sendMessage("reset:"+state.logType.value);
            }

            const onKeepLiveHeart = () =>{
                sendMessage("keep:live");
                setTimeout(onKeepLiveHeart,1000);
            }

            const initTerminal = () => {
                const html = document.querySelector('html');
                const useTheme = html.getAttribute("data-bs-theme");
                const termThemes = {
                    default: { background: '#212529', foreground: '#ffffff' },
                    dark: { background: '#000000', foreground: '#ffffff' },
                };
                state.terminal = new Terminal({
                    cursorBlink: false,
                    disableStdin: true,
                    theme: termThemes[useTheme],
                });
                state.fitAddon = new FitAddon.FitAddon();
                state.terminal.loadAddon(state.fitAddon);
                state.terminal.open(state.xtermEle.value);
                state.fitAddon.fit();
            }

            const removeAnsiCodes = str => {
                // 匹配 ANSI escape codes，正则表达式会匹配所有类似于 \u001B[31m 的转义码
                const ansiRegex = /\x1b\[[0-9;]*m/g;
                return str.replace(ansiRegex, '');
            }

            const onDownloadLogs = () => {
                const selectElement = state.selEle.value;
                const options = Array.from(selectElement.options);
                rpc8("log.getLogs").then(data => {
                    const zip = new JsZip();
                    options.forEach(option => {
                        if(data.hasOwnProperty(option.value))
                            zip.file(option.value+".txt", removeAnsiCodes(data[option.value]));
                    })
                    zip.generateAsync({ type: "blob" }).then(content => saveAs(content, "logs_"+formatDate("yyyyMMddhhmm")+".zip"));
                })
            }

            const onListenSizeChange = () => {
                const observer = new resizeObserver(entries => {
                    entries.forEach(entry => {
                        const { width, height } = entry.contentRect;
                        if (width > 0 && height > 0) {
                            if(state.hadIterm) {
                                state.fitAddon.fit();
                                return;
                            }
                            initTerminal();
                            onKeepLiveHeart();
                            state.hadIterm = true;
                        }
                    });
                });
                const aspectRatioElement = document.querySelector('.xterm-aspect-ratio').parentElement;
                if (aspectRatioElement)
                    observer.observe(aspectRatioElement);
            }

            onMounted(() => {
                onListenSizeChange();
            });
            
            return { ...state,onChangeLogType,onDownloadLogs }
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.use(filterKeywordPlugin);
    app.mount('#app');
</script>
</body>
</html>