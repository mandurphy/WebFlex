
import {queryData, checkFileExists, func, alertMsg, rpc2, rpc3, deepCopy} from "./helper.js";
// const { ref,reactive } = Vue;
import { ref,reactive } from "../plugins/vue/vue.esm.prod.js";

export const useDefaultConf = () => {

    const defaultConf = reactive([]);
    queryData("config/config.json").then((conf)=>{
        defaultConf.splice(0, defaultConf.length, ...conf);
    });
    return { defaultConf }
}

export const useHardwareConf = () => {

    const hardwareConf = reactive({});
    queryData("config/hardware.json").then((conf)=>{
        Object.assign(hardwareConf, conf);
    })
    return { hardwareConf }
}

export const usePortConf = () => {

    const portConf = reactive({});
    queryData("config/port.json").then((conf)=>{
        Object.assign(portConf, conf);
    })

    const updatePortConf = () => {
        rpc3("update", [JSON.stringify( portConf, null, 2 )]).then(data => {
            if ( typeof ( data.error ) !== "undefined" )
                alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
            else
                alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
        });
    }

    return { portConf }
}

export const useOverlayConf = () => {

    const overlayConf = reactive([]);
    queryData("config/auto/overlay.json").then((conf)=>{
        overlayConf.splice(0, overlayConf.length, ...conf);
    })
    return { overlayConf }
}

export const useResConf = () => {

    const resConf = reactive([]);
    const updateResConf = () => {
        queryData("res/").then((conf)=>{
            resConf.splice(0, resConf.length, ...conf);
        })
    }
    updateResConf()
    return { resConf,updateResConf }
}

export const useDefLaysConf = () => {

    const defLaysConf = reactive([]);
    queryData("config/defLays.json").then((conf)=>{
        defLaysConf.splice(0, defLaysConf.length, ...conf);
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
    let conf = {"lang":"cn"}

    try {
        conf = request("config/lang.json");
    } catch (e) {
        console.log("get lang.json faild!")
    }

    Object.assign(languageConf, conf);
    return { languageConf }
}


export const usetNetManagerConf = () => {
    const netManagerConf = reactive({});
    queryData("config/netManager.json").then((conf)=>{
        Object.assign(netManagerConf, conf);
    })

    const updateNetManagerConf = (param) => {
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
        rpc2("net.update",[JSON.stringify(netManagerConf,null,2)]).then(data=>{
            if(data)
                alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
            else
                alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
        })
    }

    return { netManagerConf,updateNetManagerConf }
}

export const usePasswordConf = () => {
    const updateUserPasswd = param => {
        func("/link/mgr/conf/updatePasswdConf",param).then((data)=>{
            if(data.status === "success")
                alertMsg(data.msg, 'success');
            else
                alertMsg(data.msg, 'error');
        });
    }
    return { updateUserPasswd }
}

export const useVideoBufferConf = () => {

    const videoBufferConf= reactive({});
    queryData("config/videoBuffer.json").then((conf)=>{
        Object.assign(videoBufferConf,conf)
    })

    const updateVideoBufferConf = () => {
        func("/link/mgr/conf/updateVideoBufferConf",videoBufferConf).then((data)=>{
            if(data.status === "success")
                alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
            else
                alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
        });
    }
    return { videoBufferConf,updateVideoBufferConf }
}

export const useNtpConf = () => {

    const ntpConf= reactive({});
    queryData("config/ntp.json").then((conf)=>{
        Object.assign(ntpConf,conf)
    })

    const updateNtpConf = (noTip) => {
        func("/link/mgr/conf/updateNtpConf", ntpConf).then(data =>{
            if(noTip !== "noTip") {
                if(data.status === "success")
                    alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                else
                    alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
            }
        });
    }
    return { ntpConf,updateNtpConf }
}

export const useTimezoneConf = () => {

    const timezoneConf= reactive({});
    queryData("config/misc/timezone/tzselect.json").then((conf)=>{
        Object.assign(timezoneConf,conf)
    })

    const updateTimezoneConf = (noTip) => {
        func("/link/mgr/conf/updateTimezoneConf", timezoneConf).then(date =>{
            if(noTip !== "noTip") {
                if(data.status === "success")
                    alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                else
                    alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
            }
        })
    }

    return { timezoneConf,updateTimezoneConf }
}

export const useVersionConf = () => {

    const versionConf= reactive({});
    queryData("config/version.json").then((conf)=>{
        Object.assign(versionConf,conf)
    })
    return { versionConf }
}

export const useVerLogsConf = () => {

    const verLogsConf= reactive([]);
    queryData("config/verLogs.json").then((conf)=>{
        verLogsConf.splice(0, verLogsConf.length, ...conf);
    })
    return { verLogsConf }
}

export const usePushConf = () => {

    const pushConf= reactive({});
    queryData("config/push.json").then((conf)=>{
        Object.assign(pushConf,conf)
    })
    return { pushConf }
}

export const useUartConf = () => {

    const uartConf= reactive({});
    queryData("config/uart.json").then((conf)=>{
        Object.assign(uartConf,conf)
    })
    return { uartConf }
}

export const useButtonConf = () => {

    const buttonConf= reactive([]);
    checkFileExists("config/button.json").then(exists => {
        if(exists) {
            queryData("config/button.json").then((conf)=>{
                buttonConf.splice(0, buttonConf.length, ...conf);
            })
        }
    })
    return { buttonConf }
}

export const useIntercomConf = () => {

    const intercomConf= reactive({});
    queryData("config/intercom.json").then((conf)=>{
        Object.assign(intercomConf,conf)
    })
    return { intercomConf }
}

export const useMqttConf = () => {

    const mqttConf= reactive({});
    queryData("config/misc/mqtt.json").then((conf)=>{
        Object.assign(mqttConf,conf)
    })
    return { mqttConf }
}

export const useFrpEnableConf = () => {

    const frpEnableConf= ref(false);
    queryData("config/rproxy/frp_enable").then((conf)=>{
        frpEnableConf.value = conf;
    })
    return { frpEnableConf }
}

export const useFrpcConf = () => {

    const frpcConf= ref("");
    queryData("config/rproxy/frpc.ini").then((conf)=>{
        frpcConf.value = conf;
    })
    return { frpcConf }
}

export const useServiceConf = () => {

    const serviceConf= ref("");
    queryData("config/service.json").then((conf)=>{
        serviceConf.value = conf;
    })
    return { serviceConf }
}

export const useSlsConf = () => {

    const slsConf= ref("");
    queryData("config/sls.conf").then((conf)=>{
        slsConf.value = conf;
    })
    return { slsConf }
}

export const useRtmpConf = () => {

    const rtmpConf= ref("");
    queryData("config/rtmp.conf").then((conf)=>{
        rtmpConf.value = conf;
    })
    return { rtmpConf }
}

export const useNdiConf = () => {

    const ndiConf= ref("");
    queryData("config/ndi.json").then((conf)=>{
        ndiConf.value = JSON.stringify(conf,null,2);
    })
    return { ndiConf }
}

export const useSsidConf = () => {

    const ssidConf= reactive({});
    queryData("config/ssid.json").then((conf)=>{
        Object.assign(ssidConf,conf)
    })
    return { ssidConf }
}

export const useWpaConf = () => {

    const wpaConf= reactive([]);
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
    return { wpaConf }
}


