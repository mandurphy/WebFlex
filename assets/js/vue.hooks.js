
import {queryData, checkFileExists, func, alertMsg,rpc, rpc2, rpc3, deepCopy} from "./cul.helper.js";
import vue from "./vue.build.js";
const { ref,reactive,onMounted } = vue;

export const useDefaultConf = () => {
    const defaultConf = reactive([]);
    const handleDefaultConf = () => {
        queryData("config/config.json").then((conf)=>{
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
    onMounted(()=> {
        handleDefaultConf();
    })
    return { defaultConf,updateDefaultConf }
}

export const useHardwareConf = () => {
    const hardwareConf = reactive({});
    const handleHardwareConf = () => {
        queryData("config/hardware.json").then((conf)=>{
            Object.assign(hardwareConf, conf);
        })
    }
    onMounted(() => {
        handleHardwareConf();
    })
    return { hardwareConf }
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
    onMounted(() => {
        handlePortConf();
    })
    return { portConf }
}

export const useOverlayConf = () => {
    const overlayConf = reactive([]);
    const handleOverlayConf = () => {
        queryData("config/auto/overlay.json").then((conf)=>{
            overlayConf.splice(0, overlayConf.length, ...conf);
        })
    }
    const updateOverlayConf = (tip = "tip") => {
        return new Promise((resolver,reject)=>{
            rpc("enc.updateOverlay", [ JSON.stringify( overlayConf, null, 2 ) ]).then(data => {
                if ( typeof ( data.error ) != "undefined" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolver();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config success!</en>', 'success');
                }
            });
        })
    }

    onMounted(()=>{
        handleOverlayConf();
    })
    return { overlayConf,updateOverlayConf }
}

export const useResConf = () => {
    const resConf = reactive([]);
    const handleResConf = () => {
        queryData("res/").then((conf)=>{
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
    onMounted(()=>{
        handleDefLaysConf();
    })
    return { defLaysConf }
}

export const useLanguageConf = () => {
    const request = (url) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();

        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText);
        } else {
            throw new Error(xhr.statusText);
        }
    }

    const languageConf = reactive({});

    const handleLanguageConf = () => {
        let conf = {"lang":"cn"}

        try {
            conf = request("config/lang.json");
        } catch (e) {
            console.log("get lang.json faild!")
        }

        Object.assign(languageConf, conf);
    }

    handleLanguageConf();

    return { languageConf }
}


export const usetNetManagerConf = (tip = "tip") => {
    const netManagerConf = reactive({});
    const handleNetManagerConf = () => {
        queryData("config/netManager.json").then((conf)=>{
            Object.assign(netManagerConf, conf);
        })
    }
    const updateNetManagerConf = (param,tip = "tip") => {
        if(param !== undefined) {
            const adapter = {};
            deepCopy(param).forEach(item => {
                if(item.type !== "dongle") {
                    const dev = item.dev;
                    delete item.dev;
                    delete item.type;
                    adapter[dev] = item;
                }
            });
            netManagerConf.interface = adapter;
        }

        return new Promise((resolve,reject)=>{
            rpc2("net.update",[JSON.stringify(netManagerConf,null,2)]).then(data=>{
                if(data) {
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
    onMounted(()=>{
        handleNetManagerConf();
    })
    return { netManagerConf,updateNetManagerConf }
}

export const usePasswordConf = () => {
    const updateUserPasswd = (param,tip = "tip") => {
        return new Promise((resolve,reject)=>{
            func("/link/mgr/conf/updatePasswdConf",param).then((data)=>{
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
            func("/link/mgr/conf/updateVideoBufferConf",videoBufferConf).then((data)=>{
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
    onMounted(()=>{
        handleVideoBufferConf();
    })
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
            func("/link/mgr/conf/updateNtpConf", ntpConf).then((data)=>{
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
    onMounted(()=>{
        handleNtpConf();
    })
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
            func("/link/mgr/conf/updateTimezoneConf", timezoneConf).then((data)=>{
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
    onMounted(()=>{
        handleTimezoneConf();
    })
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
    onMounted(()=>{
        handleVerLogsConf();
    })
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
            rpc("push.update", [ JSON.stringify( pushConf, null, 2 ) ]).then(data => {
                if ( typeof ( data.error ) !== "undefined" ) {
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                    reject();
                    return;
                }
                resolve();
            });
        })
    }
    onMounted(()=>{
        handlePushConf();
    })
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
    onMounted(()=>{
        handleButtonConf();
    })
    return { buttonConf }
}

export const useIntercomConf = () => {
    const intercomConf= reactive({});
    const handleIntercomConf = () => {
        queryData("config/intercom.json").then((conf)=>{
            Object.assign(intercomConf,conf)
        })
    }
    onMounted(()=>{
        handleIntercomConf();
    })
    return { intercomConf }
}

export const useMqttConf = () => {
    const mqttConf= reactive({});
    const handleMqttConf = () => {
        queryData("config/misc/mqtt.json").then((conf)=>{
            Object.assign(mqttConf,conf)
        })
    }
    onMounted(()=>{
        handleMqttConf();
    })
    return { mqttConf }
}

export const useFrpEnableConf = () => {
    const frpEnableConf= ref(false);
    const handleFrpEnableConf = () => {
        queryData("config/rproxy/frp_enable").then((conf)=>{
            frpEnableConf.value = conf;
        })
    }
    onMounted(()=>{
        handleFrpEnableConf();
    })
    return { frpEnableConf }
}

export const useFrpcConf = () => {
    const frpcConf= ref("");
    const handleFrpcConf = () => {
        queryData("config/rproxy/frpc.ini").then((conf)=>{
            frpcConf.value = conf;
        })
    }
    onMounted(()=>{
        handleFrpcConf();
    })
    return { frpcConf }
}

export const useServiceConf = () => {
    const serviceConf= ref("");
    const handleServiceConf = () => {
        queryData("config/service.json").then((conf)=>{
            serviceConf.value = conf;
        })
    }
    onMounted(()=>{
        handleServiceConf();
    })
    return { serviceConf }
}

export const useSlsConf = () => {
    const slsConf= ref("");
    const handleSlsConf = () => {
        queryData("config/sls.conf").then((conf)=>{
            slsConf.value = conf;
        })
    }
    onMounted(()=>{
        handleSlsConf();
    })
    return { slsConf }
}

export const useRtmpConf = () => {
    const rtmpConf= ref("");
    const handleRtmpConf = () => {
        queryData("config/rtmp.conf").then((conf)=>{
            rtmpConf.value = conf;
        })
    }
    onMounted(()=>{
        handleRtmpConf();
    })
    return { rtmpConf }
}

export const useNdiConf = () => {
    const ndiConf= ref("");
    const handleNdiConf = () => {
        queryData("config/ndi.json").then((conf)=>{
            ndiConf.value = JSON.stringify(conf,null,2);
        })
    }
    onMounted(()=>{
        handleNdiConf();
    })
    return { ndiConf }
}

export const useSsidConf = () => {
    const ssidConf= reactive({});
    const handleSSIDConf = () => {
        queryData("config/ssid.json").then((conf)=>{
            Object.assign(ssidConf,conf)
        })
    }
    onMounted(()=>{
        handleSSIDConf();
    })
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
    onMounted(()=>{
        handleWpaConf();
    })
    return { wpaConf }
}


export const useRecordConf = () => {
    const recordConf = reactive({});
    const handleRecordConf = () => {
        queryData("config/record.json").then(conf => {
            Object.assign(recordConf,conf)
        })
    }
    const updateRecordConf = (tip = "tip") => {
        return new Promise((resolver,reject) => {
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
    onMounted(()=>{
        handleRecordConf();
    })
    return { recordConf,updateRecordConf }
}

export const useGb28181Conf = () => {
    const gb28181Conf = reactive({});
    const handleGb28181Conf = () => {
        queryData("config/auto/gb28181.json").then(conf => {
            Object.assign(gb28181Conf,conf)
        })
    }

    const updateGb28181Conf = (tip = "tip") => {
        return new Promise((resolver,reject) => {
            rpc( "gb28181.update", [JSON.stringify( gb28181Conf, null, 2 ) ]).then( data => {
                if ( typeof ( data.error ) != "undefined" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolver();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            });
        })
    }

    onMounted(()=>{
        handleGb28181Conf();
    })
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
        return new Promise((resolver,reject) => {
            rpc( "enc.updateRoi", [JSON.stringify( roiConf, null, 2 ) ]).then( data => {
                if ( typeof ( data.error ) != "undefined" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolver();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            });
        })
    }

    onMounted(()=>{
        handleRoiConf();
    })
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
        return new Promise((resolver,reject) => {
            rpc("sync.update", [JSON.stringify( syncConf, null, 2 ) ]).then( data => {
                if ( typeof ( data.error ) != "undefined" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolver();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            } );
        })
    }

    onMounted(()=>{
        handleSyncConf();
    })

    return { syncConf,updateSyncConf }
}



