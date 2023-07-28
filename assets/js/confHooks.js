
import { queryData,checkFileExists } from "./helper.js";
const { ref,reactive } = Vue;

export const useDefaultConf = () => {

    let defaultConf = reactive([]);
    queryData("config/config.json").then((conf)=>{
        defaultConf.splice(0, defaultConf.length, ...conf);
    });
    return { defaultConf }
}

export const useHardwareConf = () => {

    let hardwareConf = reactive({});
    queryData("config/hardware.json").then((conf)=>{
        Object.assign(hardwareConf, conf);
    })
    return { hardwareConf }
}

export const usePortConf = () => {

    let portConf = reactive({});
    queryData("config/port.json").then((conf)=>{
        Object.assign(portConf, conf);
    })
    return { portConf }
}

export const useOverlayConf = () => {

    let overlayConf = reactive([]);
    queryData("config/auto/overlay.json").then((conf)=>{
        overlayConf.splice(0, overlayConf.length, ...conf);
    })
    return { overlayConf }
}

export const useResConf = () => {

    let resConf = reactive([]);
    queryData("res/").then((conf)=>{
        resConf.splice(0, resConf.length, ...conf);
    })
    return { resConf }
}

export const useDefLaysConf = () => {

    let defLaysConf = reactive([]);
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

    let languageConf = reactive({});
    let conf = {"lang":"cn"}

    try {
        conf = request("config/lang.json");
    } catch (e) {
        console.log("get lang.json faild!")
    }

    Object.assign(languageConf, conf);
    return { languageConf }
}

export const useNetConf = () => {

    let netConf= reactive({});
    queryData("config/net.json").then((conf)=>{
        Object.assign(netConf, conf);
    })
    return { netConf }
}

export const useNet2Conf = () => {

    let net2Conf= reactive({});
    checkFileExists("config/net2.json").then(exists => {
        if(exists) {
            queryData("config/net2.json").then((conf)=>{
                Object.assign(net2Conf, conf);
            })
        }
    })
    return { net2Conf }
}

export const useWifiConf = () => {

    let wifiConf= reactive({});
    queryData("config/wifi.json").then((conf)=>{
        Object.assign(wifiConf, conf);
    })
    return { wifiConf }
}

export const useMacConf = () => {

    let macConf= ref("");
    queryData("config/mac").then((conf)=>{
        macConf.value = conf;
    })
    return { macConf }
}

export const useMac2Conf = () => {

    let mac2Conf= ref("");
    checkFileExists("config/mac2").then(exists => {
        if(exists) {
            queryData("config/mac2").then((conf)=>{
                mac2Conf.value = conf;
            })
        }
    })
    return { mac2Conf }
}

export const useVideoBufferConf = () => {

    let videoBufferConf= reactive({});
    queryData("config/videoBuffer.json").then((conf)=>{
        Object.assign(videoBufferConf,conf)
    })
    return { videoBufferConf }
}

export const useNtpConf = () => {

    let ntpConf= reactive({});
    queryData("config/ntp.json").then((conf)=>{
        Object.assign(ntpConf,conf)
    })
    return { ntpConf }
}

export const useTimezoneConf = () => {

    let timezoneConf= reactive({});
    queryData("config/misc/timezone/tzselect.json").then((conf)=>{
        Object.assign(timezoneConf,conf)
    })
    return { timezoneConf }
}

export const useVersionConf = () => {

    let versionConf= reactive({});
    queryData("config/version.json").then((conf)=>{
        Object.assign(versionConf,conf)
    })
    return { versionConf }
}

export const usePushConf = () => {

    let pushConf= reactive({});
    queryData("config/push.json").then((conf)=>{
        Object.assign(pushConf,conf)
    })
    return { pushConf }
}

export const useUartConf = () => {

    let uartConf= reactive({});
    queryData("config/uart.json").then((conf)=>{
        Object.assign(uartConf,conf)
    })
    return { uartConf }
}

export const useButtonConf = () => {

    let buttonConf= reactive([]);
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

    let intercomConf= reactive({});
    queryData("config/intercom.json").then((conf)=>{
        Object.assign(intercomConf,conf)
    })
    return { intercomConf }
}

export const useMqttConf = () => {

    let mqttConf= reactive({});
    queryData("config/misc/mqtt.json").then((conf)=>{
        Object.assign(mqttConf,conf)
    })
    return { mqttConf }
}

export const useFrpEnableConf = () => {

    let frpEnableConf= ref(false);
    queryData("config/rproxy/frp_enable").then((conf)=>{
        frpEnableConf.value = conf;
    })
    return { frpEnableConf }
}

export const useFrpcConf = () => {

    let frpcConf= ref("");
    queryData("config/rproxy/frpc.ini").then((conf)=>{
        frpcConf.value = conf;
    })
    return { frpcConf }
}

export const useServiceConf = () => {

    let serviceConf= ref("");
    queryData("config/service.json").then((conf)=>{
        serviceConf.value = conf;
    })
    return { serviceConf }
}

export const useSlsConf = () => {

    let slsConf= ref("");
    queryData("config/sls.conf").then((conf)=>{
        slsConf.value = conf;
    })
    return { slsConf }
}

export const useRtmpConf = () => {

    let rtmpConf= ref("");
    queryData("config/rtmp.conf").then((conf)=>{
        rtmpConf.value = conf;
    })
    return { rtmpConf }
}

export const useNdiConf = () => {

    let ndiConf= ref("");
    queryData("config/ndi.json").then((conf)=>{
        ndiConf.value = JSON.stringify(conf,null,2);
    })
    return { ndiConf }
}

export const useSsidConf = () => {

    let ssidConf= reactive({});
    queryData("config/ssid.json").then((conf)=>{
        Object.assign(ssidConf,conf)
    })
    return { ssidConf }
}


