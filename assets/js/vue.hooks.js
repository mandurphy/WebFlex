import {alertMsg, checkFileExists, clearReactiveArray, clearReactiveObject, deepCopy, func, isEmpty, queryData, rpc, rpc2, rpc3, rpc4,loadStyle} from "./lp.utils.js";
import vue from "./vue.build.js";

const { ref,reactive,onMounted } = vue;

export const useDefaultConf = () => {
    const defaultConf = reactive([]);
    const handleDefaultConf = async () => {
        queryData("config/config.json").then((conf)=>{
            clearReactiveArray(defaultConf);
            defaultConf.splice(0, defaultConf.length, ...conf);
        });
    }
    const updateDefaultConf = (tip= "tip") => {
        return new Promise((resolve,reject)=>{
            rpc( "enc.update", [ JSON.stringify( defaultConf, null, 2 ) ]).then(data => {
                if ( typeof ( data.error ) != "undefined" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                    resolve();
                }
            });
        })
    }
    onMounted(handleDefaultConf);
    return { defaultConf,handleDefaultConf,updateDefaultConf }
}

export const useHardwareConf = () => {
    const hardwareConf = reactive({});
    const handleHardwareConf = () => {
        queryData("config/hardware.json").then((conf)=>{
            Object.assign(hardwareConf, conf);
        })
    }
    const updateHardwareConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            func("/conf/updateHardwareConf",hardwareConf).then(data => {
                if ( data.status !== "success" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleHardwareConf);
    return { hardwareConf,updateHardwareConf }
}

export const useBoardConf = () => {
    const boardConf = reactive({});
    const handleBoardConf = () => {
        queryData("config/board.json").then((conf)=>{
            Object.assign(boardConf, conf);
        })
    }
    onMounted(handleBoardConf);
    return { boardConf }
}

export const usePortConf = () => {
    const portConf = reactive({});
    const handlePortConf = () => {
        queryData("config/port.json").then((conf)=>{
            Object.assign(portConf, conf);
        })
    }
    const updatePortConf = (tip = "tip") => {
        return new Promise((resolve,reject)=>{
            rpc3("update", [JSON.stringify( portConf, null, 2 )]).then(data => {
                if ( typeof ( data.error ) !== "undefined" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            });
        })
    }
    onMounted(handlePortConf);
    return { portConf,updatePortConf }
}

export const useOverlayConf = () => {
    const overlayConf = reactive([]);
    const handleOverlayConf = () => {
        queryData("config/auto/overlay.json").then((conf)=>{
            overlayConf.splice(0, overlayConf.length, ...conf);
        })
    }
    const updateOverlayConf = (tip = "tip") => {
        return new Promise((resolve,reject)=>{
            rpc("enc.updateOverlay", [ JSON.stringify( overlayConf, null, 2 ) ]).then(data => {
                if ( typeof ( data.error ) != "undefined" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                }
            });
        })
    }

    onMounted(handleOverlayConf);
    return { overlayConf,updateOverlayConf }
}

export const useResConf = () => {
    const resConf = reactive([]);
    const handleResConf = () => {
        queryData("res/").then((conf)=>{
            clearReactiveArray(resConf);
            resConf.splice(0, resConf.length, ...conf);
        })
    }
    onMounted(() => {
        handleResConf();
    })
    return { resConf,handleResConf }
}

export const useDefLaysConf = () => {
    const defLaysConf = reactive([]);
    const handleDefLaysConf = () => {
        queryData("config/defLays.json").then((conf)=>{
            defLaysConf.splice(0, defLaysConf.length, ...conf);
        })
    }
    onMounted(handleDefLaysConf);
    return { defLaysConf }
}

export const useThemeConf = () => {
    const themeConf = reactive({});
    const handleThemeConf = () => {
        queryData("config/theme_standard.json").then(conf => {
            clearReactiveObject(themeConf);
            if(!conf.hasOwnProperty("mod"))
                conf.mod = "link";
            Object.assign(themeConf,conf);
        })
    }
    const updateThemeConf = (type = "default") => {
        return new Promise((resolve,reject)=>{
            themeConf.used = type;
            func("/conf/updateThemeConf",themeConf).then(data => {
                if ( data.status === "success" ) {
                    const html = document.querySelector('html');
                    html.setAttribute('data-bs-theme', type);
                    resolve();
                    return;
                }
                reject();
            })
        })
    }

    const handleThemeActiveLinkStyle = async () => {
        const linkStyle = {};
        let themeActive = "default";
        if(themeConf.hasOwnProperty("active"))
            themeActive = themeConf.active;
        const conf = await queryData(`assets/css/theme-active-${themeActive}.css`);
        const regex = /--([\w-]+)\s*:\s*([^;]+)/g;
        let match;
        while ((match = regex.exec(conf)) !== null) {
            const [,name, value] = match;
            linkStyle[name.trim()] = value.trim();
        }
        return linkStyle;
    }

    const updateThemeActiveConf = (type = "default",active="default") => {
        return new Promise((resolve,reject)=>{
            themeConf.used = type;
            themeConf.active = active;
            func("/conf/updateThemeConf",themeConf).then(data => {
                if ( data.status === "success" ) {
                    const html = document.querySelector('html');
                    html.setAttribute('data-bs-theme-active', active);
                    let style = makeThemeActiveStyle();
                    loadStyle(style).then(()=>{});
                    resolve();
                    return;
                }
                reject();
            })
        })
    }

    const makeThemeActiveStyle = () => {
        const activeTheme = themeConf.themeActives.find(item => item.active === themeConf.active);
        const cssVariables = Object.entries(activeTheme.colors)
            .map(([key, value]) => `--${key}: ${value};`)
            .join(' ');
        return `:root { ${cssVariables} }`;
    }

    onMounted(handleThemeConf);
    return { themeConf,updateThemeConf,handleThemeActiveLinkStyle,updateThemeActiveConf,makeThemeActiveStyle }
}

export const useNetManagerConf = (tip = "tip") => {
    const netManagerConf = reactive({});

    const formatMac = mac => {
        mac = mac.toUpperCase();
        mac = mac.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
        mac = mac.replace(/(.{2})(.{2})(.{2})(.{2})(.{2})(.{2})/, '$1:$2:$3:$4:$5:$6');
        return mac;
    }
    const handleNetManagerConf = async () => {

        const [conf,mac, mac2] = await Promise.all([
            queryData("config/netManager.json"),
            await checkFileExists("config/mac") ? queryData("config/mac",{responseType: 'text'}) : Promise.resolve(""),
            await checkFileExists("config/mac2") ? queryData("config/mac2",{responseType: 'text'}) : Promise.resolve("")
        ]);

        Object.keys(conf.interface).forEach(item => {
            if(item.includes("eth")) {
                if(item === "eth0")
                    conf.interface[item].mac = formatMac(mac);
                else
                    conf.interface[item].mac = formatMac(mac2);
            }
        });
        clearReactiveObject(netManagerConf);
        Object.assign(netManagerConf, conf);
    }

    const updateNetManagerConf = (tip = "tip") => {
        let mac = "",mac2 = "";
        const conf = deepCopy(netManagerConf);
        Object.keys(conf.interface).forEach(item => {
            if(item.includes("eth")) {
                if(conf.interface[item].hasOwnProperty("mac")) {
                    if(item === "eth0")
                        mac = conf.interface[item].mac;
                    else
                        mac2 = conf.interface[item].mac;
                }
                delete conf.interface[item].mac;
            }
        });

        return new Promise((resolve,reject)=>{
            const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
            const promiseList = [];
            if(!isEmpty(mac)) {
                if(!macRegex.test(mac)) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>Mac地址格式错误</cn><en>Mac address format error</en>', 'error');
                    return;
                } else
                    promiseList.push(func("/conf/updateMacConf",mac));
            }
            if(!isEmpty(mac2)) {
                if(!macRegex.test(mac2)) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>Mac地址格式错误</cn><en>Mac address format error</en>', 'error');
                    return;
                } else
                    promiseList.push(func("/conf/updateMac2Conf",mac2));
            }
            promiseList.push(rpc2("net.update",[JSON.stringify(conf,null,2)]));

            Promise.all(promiseList).then((results) => {
                if(results.every(ret => typeof ret === "boolean" ? ret : (ret?.status === "success"))) {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                } else {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                }
            })
        })
    }
    onMounted(handleNetManagerConf);
    return { netManagerConf,updateNetManagerConf }
}

export const usePasswordConf = () => {
    const updateUserPasswd = (param,tip = "tip") => {
        return new Promise((resolve,reject)=>{
            func("/conf/updatePasswdConf",param).then((data)=>{
                if(data.status === "success") {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg(data.msg, 'success');
                } else {
                    reject();
                    if(tip !== "noTip")
                        alertMsg(data.msg, 'error');
                }
            });
        })
    }
    return { updateUserPasswd }
}

export const useVideoBufferConf = () => {
    const videoBufferConf= reactive({});
    const handleVideoBufferConf = () => {
        queryData("config/videoBuffer.json").then((conf)=>{
            Object.assign(videoBufferConf,conf)
        })
    }
    const updateVideoBufferConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            func("/conf/updateVideoBufferConf",videoBufferConf).then((data)=>{
                if(data.status === "success") {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                } else {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                }
            });
        })
    }
    onMounted(handleVideoBufferConf);
    return { videoBufferConf,updateVideoBufferConf }
}

export const useNtpConf = () => {
    const ntpConf= reactive({});
    const handleNtpConf = () => {
        queryData("config/ntp.json").then((conf)=>{
            Object.assign(ntpConf,conf)
        })
    }
    const updateNtpConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            func("/conf/updateNtpConf", ntpConf).then((data)=>{
                if(data.status === "success") {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                } else {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                }
            });
        })
    }
    onMounted(handleNtpConf);
    return { ntpConf,updateNtpConf }
}

export const useTimezoneConf = () => {
    const timezoneConf= reactive({});
    const handleTimezoneConf = () => {
        queryData("config/misc/timezone/tzselect.json").then((conf)=>{
            Object.assign(timezoneConf,conf)
        })
    }
    const updateTimezoneConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            func("/conf/updateTimezoneConf", timezoneConf).then((data)=>{
                if(data.status === "success") {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                } else {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                }
            });
        })
    }
    onMounted(handleTimezoneConf);
    return { timezoneConf,updateTimezoneConf }
}

export const useVersionConf = () => {
    const versionConf= reactive({});
    const handleVersionConf = () => {
        queryData("config/version.json").then((conf)=>{
            Object.assign(versionConf,conf)
        })
    }
    onMounted(()=>{
        handleVersionConf();
    })
    return { versionConf }
}

export const useVerLogsConf = () => {
    const verLogsConf= reactive([]);
    const handleVerLogsConf = () => {
        queryData("config/verLogs.json").then((conf)=>{
            verLogsConf.splice(0, verLogsConf.length, ...conf);
        })
    }
    onMounted(handleVerLogsConf);
    return { verLogsConf }
}

export const usePushConf = () => {
    const pushConf= reactive({});
    const handlePushConf = () => {
        queryData("config/push.json").then((conf)=>{
            Object.assign(pushConf,conf)
        })
    }
    const updatePushConf = (tip = "tip") => {
        return new Promise((resolve,reject)=> {
            const push_conf = deepCopy(pushConf);
            const urls = push_conf.url;
            urls.forEach(item => {
                if(item.type === "rtmp") {
                    let server = item.server;
                    let key = item.key;
                    if(!isEmpty(server) && server.endsWith("/"))
                        server = server.substring(0, server.length - 1);
                    if(!isEmpty(key) && key.startsWith("/"))
                        key = key.substring(1);
                    item.path = server + "/" + key;
                }
                if(item.type === "srt") {
                    item.path = `srt://${item.ip}`;
                    if(!isEmpty(item.port))
                        item.path += `:${item.port}`;
                    item.path += `?mode=${item.mode}`;
                    if(!isEmpty(item.latency))
                        item.path += `&latency=${item.latency}`;
                    if(!isEmpty(item.passphrase))
                        item.path += `&passphrase=${item.passphrase}`;
                    if(!isEmpty(item.streamid))
                        item.path += `&streamid=${item.streamid}`;
                }
                delete item.duration;
                delete item.speed;
            })
            rpc("push.update", [ JSON.stringify( push_conf, null, 2 ) ]).then(data => {
                if (!data) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            });
        })
    }

    onMounted(handlePushConf);
    return { pushConf,updatePushConf }
}

export const useUartConf = () => {
    const uartConf= reactive({});
    const handleUartConf = () => {
        queryData("config/uart.json").then((conf)=>{
            Object.assign(uartConf,conf)
        })
    }
    onMounted(()=>{
        handleUartConf();
    })
    return { uartConf }
}

export const useButtonConf = () => {
    const buttonConf= reactive([]);
    const handleButtonConf = () => {
        checkFileExists("config/button.json").then(exists => {
            if(exists) {
                queryData("config/button.json").then((conf)=>{
                    buttonConf.splice(0, buttonConf.length, ...conf);
                })
            }
        })
    }
    onMounted(handleButtonConf);
    return { buttonConf }
}

export const useIntercomConf = () => {
    const intercomConf= reactive({});
    const defIntercomConf = reactive({});
    const handleIntercomConf = () => {
        queryData("config/intercom.json").then((conf)=>{
            Object.assign(intercomConf,conf)
            Object.assign(defIntercomConf,deepCopy(conf))
        })
    }

    const updateIntercomConf = (tip='tip') => {
        return new Promise((resolve,reject) => {
            rpc("intercom.update", [ intercomConf ]).then(( res ) => {
                if ( typeof ( res.error ) != "undefined" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error')
                } else {
                    resolve();
                    clearReactiveObject(defIntercomConf);
                    Object.assign(defIntercomConf,deepCopy(intercomConf))
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                }
            });
        })
    }
    onMounted(handleIntercomConf);
    return { intercomConf,defIntercomConf,updateIntercomConf }
}

export const useMqttConf = () => {
    const mqttConf= reactive({});
    const handleMqttConf = () => {
        queryData("config/misc/mqtt.json").then((conf)=>{
            Object.assign(mqttConf,conf)
        })
    }
    const updateMqttConf = (tip='tip') => {
        return new Promise((resolve,reject) => {
            rpc4( "mqtt.update", [mqttConf]).then( data => {
                if ( typeof ( data.error ) != "undefined" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                }
            } );
        })
    }
    onMounted(handleMqttConf);
    return { mqttConf,updateMqttConf }
}

export const useFrpEnableConf = () => {
    const frpEnableConf= ref(false);
    const handleFrpEnableConf = () => {
        queryData("config/rproxy/frp_enable").then((conf)=>{
            frpEnableConf.value = conf;
        })
    }
    const updateFrpEnableConf = (tip='tip') => {
        return new Promise((resolve,reject) => {
            func("/conf/updateFrpEnableConf",frpEnableConf.value.toString()).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleFrpEnableConf);
    return { frpEnableConf,updateFrpEnableConf }
}

export const useFrpcConf = () => {
    const frpcConf= ref("");
    const handleFrpcConf = () => {
        queryData("config/rproxy/frpc.ini").then((conf)=>{
            frpcConf.value = conf;
        })
    }
    const updateFrpcConf = (tip='tip') => {
        return new Promise((resolve,reject) => {
            func("/conf/updateFrpcConf",frpcConf.value).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleFrpcConf);
    return { frpcConf,updateFrpcConf }
}

export const useServiceConf = () => {
    const serviceConf= reactive({});
    const handleServiceConf = () => {
        queryData("config/service.json").then((conf)=>{
            clearReactiveObject(serviceConf);
            Object.assign(serviceConf,conf);
        })
    }
    const updateServiceConf = (tip='tip') => {
        return new Promise((resolve,reject) => {
            func("/conf/updateServiceConf",serviceConf).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleServiceConf);
    return { serviceConf,updateServiceConf }
}

export const useSlsConf = () => {
    const slsConf= ref("");
    const handleSlsConf = () => {
        queryData("config/sls.conf").then((conf)=>{
            slsConf.value = conf;
        })
    }
    const updateSlsConf = (tip='tip') => {
        return new Promise((resolve,reject) => {
            func("/conf/updateSlsConf",slsConf.value).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleSlsConf);
    return { slsConf,updateSlsConf }
}

export const useRtmpConf = () => {
    const rtmpConf= ref("");
    const handleRtmpConf = () => {
        queryData("config/rtmp.conf").then((conf)=>{
            rtmpConf.value = conf;
        })
    }
    const updateRtmpConf = (tip = 'tip') => {
        return new Promise((resolve,reject) => {
            func("/conf/updateRtmpConf",rtmpConf.value).then(data => {
                if ( data.status !== "success" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleRtmpConf);
    return { rtmpConf,updateRtmpConf }
}

export const useNdiConf = () => {
    const ndiConf= ref("");
    const handleNdiConf = () => {
        queryData("config/ndi.json").then((conf)=>{
            ndiConf.value = JSON.stringify(conf,null,4);
        })
    }
    const updateNdiConf = (tip = 'tip') => {
        return new Promise((resolve,reject) => {
            func("/conf/updateNdiConf",ndiConf.value).then(data => {
                if ( data.status !== "success" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败,格式错误</cn><en>Failed to save, format error!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleNdiConf);
    return { ndiConf,updateNdiConf }
}

export const useSsidConf = () => {
    const ssidConf= reactive({});
    const handleSSIDConf = () => {
        queryData("config/ssid.json").then((conf)=>{
            Object.assign(ssidConf,conf)
        })
    }
    onMounted(handleSSIDConf);
    return { ssidConf }
}

export const useWpaConf = () => {
    const wpaConf= reactive([]);
    const handleWpaConf = () => {
        checkFileExists("config/wpa.conf").then(exists => {
            if(exists) {
                queryData("config/wpa.conf").then((conf)=>{
                    const networkList = [];
                    const regex = /network={([\s\S]*?)}/g;
                    let match;
                    while ((match = regex.exec(conf)) !== null) {
                        const networkObjStr = match[1].trim();
                        const lines = networkObjStr.split("\n");
                        const networkObj = {};
                        for (const line of lines) {
                            let [key, value] = line.split("=");
                            if(value === undefined)
                                continue;
                            value = value.trim();
                            value = value.replace(/^"(.*)"$/, '$1');
                            networkObj[key.trim()] = value;
                        }
                        networkList.push(networkObj);
                    }
                    wpaConf.splice(0, wpaConf.length, ...networkList);
                })
            }
        })
    }
    onMounted(handleWpaConf);
    return { wpaConf }
}


export const useRecordConf = () => {
    const recordConf = reactive({});
    const handleRecordConf = () => {
        queryData("config/record.json").then(conf => {
            clearReactiveObject(recordConf);
            Object.assign(recordConf,conf)
        })
    }
    const updateRecordConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            rpc("rec.update", [JSON.stringify(recordConf, null, 2)]).then(data => {
                if(tip !== "noTip") {
                    if ( typeof ( data.error ) !== "undefined" )
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                    else
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }

    onMounted(handleRecordConf);

    return { recordConf,handleRecordConf,updateRecordConf }
}

export const useRecordFiles = () => {
    const recordFiles = reactive({});
    const handleRecordFiles = () => {
        func("/root/getRecordFiles").then(conf => {
            clearReactiveObject(recordFiles);
            Object.assign(recordFiles,conf.data);
        })
    }
    onMounted(handleRecordFiles);
    return { recordFiles,handleRecordFiles }
}

export const useGb28181Conf = () => {
    const gb28181Conf = reactive({});
    const handleGb28181Conf = () => {
        queryData("config/auto/gb28181.json").then(conf => {
            Object.assign(gb28181Conf,conf)
        })
    }

    const updateGb28181Conf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            rpc( "gb28181.update", [JSON.stringify( gb28181Conf, null, 2 ) ]).then( data => {
                if ( typeof ( data.error ) != "undefined" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            });
        })
    }

    onMounted(handleGb28181Conf);
    return { gb28181Conf,updateGb28181Conf }
}

export const useRoiConf = () => {
    const roiConf = reactive([]);
    const handleRoiConf = () => {
        queryData("config/auto/roi.json").then(conf => {
            roiConf.splice(0, roiConf.length, ...conf);
        })
    }

    const updateRoiConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            rpc( "enc.updateRoi", [JSON.stringify( roiConf, null, 2 ) ]).then( data => {
                if ( typeof ( data.error ) != "undefined" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            });
        })
    }

    onMounted(handleRoiConf);
    return { roiConf,updateRoiConf }
}

export const useSyncConf = () => {
    const syncConf = reactive([]);
    const handleSyncConf = () => {
        queryData("config/auto/sync.json").then(conf => {
            syncConf.splice(0,syncConf.length,...conf)
        })
    }

    const updateSyncConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            rpc("sync.update", [ syncConf ]).then( data => {
                if ( typeof ( data.error ) != "undefined" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            } );
        })
    }

    onMounted(handleSyncConf);

    return { syncConf,updateSyncConf }
}

export const usePtzConf = () => {
    const ptzConf = reactive({});
    const handlePtzConf = () => {
        queryData("config/auto/ptz.json").then((conf)=>{
            Object.assign(ptzConf, conf);
        })
    }
    const updatePtzConf = (tip = "tip") => {
        return new Promise((resolve,reject)=>{
            func("/conf/updatePtzConf",ptzConf).then(data => {
                if ( data.status !== "success" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handlePtzConf);
    return { ptzConf,updatePtzConf }
}

export const useUsbFilesConf = () => {
    const usbFiles = reactive([]);
    const handleUsbFilesConf = () => {
        queryData("files/").then(conf => {
            usbFiles.splice(0, usbFiles.length, ...conf);
        })
    }
    onMounted(handleUsbFilesConf);
    return { usbFiles }
}

export const useDiskConf = () => {
    const diskConf = reactive({});
    const handleDiskConf = () => {
        queryData("config/misc/disk.json").then(conf => {
            clearReactiveObject(diskConf);
            Object.assign(diskConf,conf)
        })
    }
    const updateDiskConf = conf => {
        return new Promise(async (resolve,reject)=>{
            let result = await func("/conf/updateDiskConf", conf);
            if(result.status === "error") {
                alertMsg(result.msg,result.status);
                reject();
                return;
            }
            resolve();
        });
    }
    onMounted(handleDiskConf);
    return { diskConf,handleDiskConf,updateDiskConf }
}

export const useGroupConf = () => {
    const groupConf = reactive({});
    const handleGroupConf = () => {
        queryData("config/group.json").then(conf => {
            clearReactiveObject(groupConf);
            Object.assign(groupConf,conf);
        })
    }

    const updateGroupConf = (tip = "tip") => {
        return new Promise(async (resolve,reject)=>{
            rpc("group.update", [groupConf]).then (data => {
                if (!data) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            } );
        });

    }

    onMounted(handleGroupConf);
    return { groupConf,updateGroupConf }
}

export const useRttyConf = () => {
    const rttyConf = reactive({});
    const handleGroupConf = () => {
        rpc("enc.getSN").then(sn=> {
            queryData("config/rtty.json").then(conf => {
                conf.id = sn;
                clearReactiveObject(rttyConf);
                Object.assign(rttyConf,conf);
            })
        })
    }
    const updateRttyConf = (tip = "tip") => {
        return new Promise(async (resolve,reject)=>{
            func("/conf/updateRttyConf",rttyConf).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        });

    }
    onMounted(handleGroupConf);
    return { rttyConf,updateRttyConf }
}

export const useFacConf = () => {
    const facConf = reactive([]);
    const handleFacConf = () => {
        func("/root/scanFacDir").then(data => {
            if(data.status === "success") {
                clearReactiveArray(facConf);
                facConf.push(...(data.data));
            }
        })
    }

    const updateFacConf = (curFac,tip = "tip") => {
        return new Promise((resolve,reject) => {
            func("/root/changeFacType",curFac).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleFacConf);
    return { facConf,updateFacConf }
}

export const useColorModeConf = () => {
    const colorModeConf = ref(0);
    const handleColorModeConf = () => {
        func("/root/getColorMode").then(data => {
            if(data.status === "success") {
                data.data = data.data.replace(/\\+/g, '');
                colorModeConf.value = parseInt(data.data);
            }
        })
    }

    const updateColorModeConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            func("/root/setColorMode",colorModeConf.value).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleColorModeConf);
    return { colorModeConf,updateColorModeConf }
}

export const useLphConf = () => {
    const lphConf = ref("");
    const handleLphConf = () => {
        func("/root/getLphAuth").then(data => {
            if(data.status === "success")
                lphConf.value = data.data;
        })
    }

    const updateLphConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            func("/root/setLphAuth",lphConf.value).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleLphConf);
    return { lphConf,updateLphConf }
}

export const useEdidConf = () => {
    const inputEdidConf = ref("");
    const outputEdidConf = ref("");
    const edidFiles = reactive([]);
    const handleEdidConf = () => {
        func("/root/getEdidConf").then(data => {
            if(data.status === "success") {
                const inputEdid = data.data.inputEdidFile;
                const [inEdid,] = inputEdid.split(".");
                inputEdidConf.value = inEdid;

                const outputEdid = data.data.outputEdidFile;
                const [outEdid,] = outputEdid.split(".");
                outputEdidConf.value = outEdid;

                const edidFileList = data.data.edidFiles.map(filename => filename.replace(/\.bin$/, ''));
                clearReactiveArray(edidFiles);
                edidFiles.push(...edidFileList);
            }
        })
    }

    const updateInputEdidConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            func("/root/setInputEdidConf",inputEdidConf.value).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }

    const updateOutputEdidConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            func("/root/setOutputEdidConf",outputEdidConf.value).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功,断电重启设备生效</cn><en>The settings are saved successfully and will take effect after powering off and restarting the device</en>', 'success');
                }
            })
        })
    }

    const addOutputEdidConf = () => {
        return new Promise(resolve => {
            delCustomEdidFile("@it6630.bin").then(()=>{
                rpc("enc.addOutputEdid",["@it6630.bin"]).then(ret => {
                    checkFileExists("/config/edid/@it6630.bin").then(res => {
                        resolve(res);
                    })
                })
            })
        })
    }

    const delCustomEdidFile = edid => {
        return new Promise(resolve => {
            func("/root/delCustomEdid",{"edid":edid}).then(()=>{
               resolve();
            })
        })
    }

    onMounted(handleEdidConf);
    return { inputEdidConf,outputEdidConf,edidFiles,handleEdidConf,updateInputEdidConf,updateOutputEdidConf,addOutputEdidConf,delCustomEdidFile }
}

export const useSnConf = () => {
    const sn = ref("");
    const handleSnConf = () => {
        rpc( "enc.getSN").then( data => sn.value = data.replace(/[\r\n]/g,""));
    }

    onMounted(handleSnConf);
    return { sn }
}

export const useMcuConf = () => {
    const mcuConf =reactive({});
    const handleMcuConf = () => {
        func("/conf/handleMcuConf").then(data => {
            if(data.status === "success") {
                clearReactiveObject(mcuConf);
                Object.assign(mcuConf,data.data);
            }
        })
    }

    onMounted(handleMcuConf);
    return { mcuConf }
}

export const useWebVerConf = () => {
    const webVerConf =reactive({});
    const handleWebVerConf = () => {
        queryData("config/misc/webVer.json").then((conf)=>{
            Object.assign(webVerConf,conf)
        });
    }

    const updateWebVerConf = (turn = true,tip = "noTip") => {
        return new Promise((resolve,reject) => {
            webVerConf.turn = turn;
            func("/system/changeWebVersion",webVerConf).then(data => {
                if ( data.status !== "success" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }

    onMounted(handleWebVerConf);
    return { webVerConf,updateWebVerConf }
}


export const useRemoteConf = () => {
    const remoteConf =reactive({});
    const handleRemoteConf = () => {
        queryData("config/misc/remote_std/remote.json").then((conf)=>{
            Object.assign(remoteConf,conf)
        });
    }

    const updateRemoteConf = (tip = 'tip') => {
        return new Promise((resolve,reject) => {
            func("/conf/updateRemoteConf",remoteConf).then(data => {
                if ( data.status !== "success" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }

    onMounted(handleRemoteConf);
    return { remoteConf,updateRemoteConf }
}

export const useDirectsConf = () => {
    const directsConf =reactive([]);
    const handleDirectsConf = () => {
        queryData("config/misc/remote_std/directs.json").then((conf)=>{
            clearReactiveArray(directsConf);
            directsConf.push(...conf);
        });
    }

    onMounted(handleDirectsConf);
    return { directsConf }
}

export const useHelpCodeConf = () => {
    const helpCode =ref("");
    const handleHelpCodeConf = () => {
        func("/system/getHelpCode").then(ret => {
            helpCode.value = ret.data;
        })
    }
    onMounted(handleHelpCodeConf);
    return { helpCode }
}

export const useRXPushConf = () => {
    const rxPushConf = reactive([]);
    const handleRstreamConf = () => {
        queryData("config/misc/rxPush.json").then((conf) => {
            rxPushConf.splice(0, rxPushConf.length, ...conf);
        });
    }
    const updateRXPushConf = (tip= "tip") => {
        return new Promise((resolve,reject)=>{
            let tempConf = deepCopy(rxPushConf);
            tempConf.forEach(item => {
                if(item.hasOwnProperty("server"))
                    delete item.server;
                if(item.hasOwnProperty("key"))
                    delete item.key;
            })
            func("/conf/updateRXPushConf",tempConf).then(data => {
                if ( data.status !== "success" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleRstreamConf);
    return {rxPushConf,updateRXPushConf}
}

export const useSrtPushConf = () => {
    const srtPushConf = reactive([]);
    const handleSrtPushConf = () => {
        queryData("config/misc/srtPush.json").then((conf) => {
            srtPushConf.splice(0, srtPushConf.length, ...conf);
        });
    }
    const updateSrtPushConf = (tip= "tip") => {
        return new Promise((resolve,reject)=>{
            func("/conf/updateSrtPushConf",srtPushConf).then(data => {
                if ( data.status !== "success" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleSrtPushConf);
    return {srtPushConf,updateSrtPushConf}
}

export const useLedConf = () => {
    const ledConf = reactive({});
    const handleLedConf = () => {
        queryData("config/led/config.json").then((conf) => {
            clearReactiveObject(ledConf);
            Object.assign(ledConf,conf);
        });
    }
    const updateLedConf = (tip= "tip") => {
        return new Promise((resolve,reject)=>{
            rpc("led.update",[ledConf]).then(() => {
                func("/conf/updateLedConf",ledConf).then(data => {
                    if ( data.status !== "success" ) {
                        reject();
                        if(tip !== "noTip")
                            alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                    } else {
                        resolve();
                        if(tip !== "noTip")
                            alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                    }
                })
            })
        })
    }
    onMounted(handleLedConf);
    return {ledConf,updateLedConf}
}

export const useWebRTCConf = () => {
    const webrtcConf = ref("");
    const handleLedConf = () => {
        queryData("config/rproxy/webrtc.json").then((conf) => {
            webrtcConf.value = JSON.stringify(conf,null,4);
        });
    }
    const updateWebRTCConf = (tip= "tip") => {
        return new Promise((resolve,reject)=>{
            func("/conf/updateWebRTCConf",webrtcConf.value).then(data => {
                if ( data.status !== "success" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功,重启设备生效</cn><en>Save config successfully,and restart takes effect!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleLedConf);
    return {webrtcConf,updateWebRTCConf}
}

export const useNdiReciveConf = () => {
    const ndiReciveConf = reactive([]);
    const handleNdiReciveConf = () => {
        queryData("config/misc/ndiRecive.json").then((conf) => {
            ndiReciveConf.splice(0, ndiReciveConf.length, ...conf);
        });
    }
    const updateNdiReciveConf = (tip= "tip") => {
        return new Promise((resolve,reject)=>{
            func("/conf/updateNdiReciveConf",ndiReciveConf).then(data => {
                if ( data.status !== "success" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleNdiReciveConf);
    return {ndiReciveConf,updateNdiReciveConf}
}

export const useCaptureConf = () => {
    const captureConf = reactive({});
    const handleCaptureConf = () => {
        checkFileExists("config/misc/capture.json").then(exists => {
            if(exists) {
                queryData("config/misc/capture.json").then((conf) => {
                    clearReactiveObject(captureConf);
                    Object.assign(captureConf,conf);
                });
            }
        })
    }
    const updateCaptureConf = (tip= "tip") => {
        return new Promise((resolve,reject)=>{
            rpc("capture.update", [captureConf]).then(data => {
                if (!data) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            });
        })
    }
    onMounted(handleCaptureConf);
    return {captureConf,updateCaptureConf}
}




