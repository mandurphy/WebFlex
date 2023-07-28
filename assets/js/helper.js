
import JsonRpcClient from '../plugins/jsonrpc/jquery.jsonrpc.js';
import '../plugins/axios/axios.min.js';
import { useLanguageConf } from "./confHooks.js";

export const getUrlParam = (key) => {
    let param = "";
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if(pair[0] == key)
            param = pair[1]
    }
    return param;
}

export const updateSysLanguage = async param => {

    if(param !== undefined)
        await func("/link/mgr/conf/updateLangConf", param);

    let { languageConf } = useLanguageConf();
    const lang = languageConf["lang"];
    const html = document.querySelector('html');
    html.setAttribute('data-bs-language', lang);
}

//size mini normal large
export const alertMsg = (message, type = "success", size = "mini") => {

    let icon = "fa-solid fa-circle-check";
    if(type === "error")
        icon = "fa-solid fa-circle-xmark";
    if(type === "info")
        icon = "fa-solid fa-circle-info ";
    if(type === "warning")
        icon = "fa-solid fa-triangle-exclamation";

    Lobibox.notify(type, {
        pauseDelayOnHover: true,
        continueDelayOnInactiveTab: false,
        size:size,
        sound:false,
        position: 'top right',
        icon: icon,
        msg: message
    });
}

export const queryData = (url) => {
    return new Promise((resolve,reject)=>{
        axios.get(url)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.error('请求出错:', error);
                reject(error);
            });
    })
}

export const func = (url,data = []) => {
    return new Promise((resolve,reject)=>{
        axios.post('/link/relay.php', {url:url,data:data})
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.error('请求出错:', error);
                reject(error);
            });
    })
}

//encoder
export const rpc = (func, params) => {
    return new Promise((resolve,reject)=>{
        let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC' });
        if(params === undefined || params === null)
            params=[];
        jsonrpc.call(func, params, data => { resolve(data); }, error =>{ console.log(error);reject(error); });
    })
}

//wifi
export const rpc2 = (func, params, callbak, usrdata) => {
    return new Promise((resolve,reject)=>{
        let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC2' });
        if(params === undefined || params === null)
            params=[];
        jsonrpc.call(func, params, data => { resolve(data); }, error =>{ console.log(error);reject(error); });
    })
}

//port
export const rpc3 = (func, params, callbak, usrdata) => {
    return new Promise((resolve,reject)=>{
        let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC3' });
        if(params === undefined || params === null)
            params=[];
        jsonrpc.call(func, params, data => { resolve(data); }, error =>{ console.log(error);reject(error); });
    })
}

//mqtt
export const rpc4 = (func, params, callbak, usrdata) => {
    return new Promise((resolve,reject)=>{
        let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC4' });
        if(params === undefined || params === null)
            params=[];
        jsonrpc.call(func, params, data => { resolve(data); }, error =>{ console.log(error);reject(error); });
    })
}

export const rpc5 = (func, params, callbak, usrdata) => {
    return new Promise((resolve,reject)=>{
        let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC5' });
        if(params === undefined || params === null)
            params=[];
        jsonrpc.call(func, params, data => { resolve(data); }, error =>{ console.log(error);reject(error); });
    })
}

// monitor
export const rpc6 = (func, params) => {
    return new Promise((resolve,reject)=>{
        let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC6' });
        if(params === undefined || params === null)
            params=[];
        jsonrpc.call(func, params, data => { resolve(data); }, error =>{ console.log(error);reject(error); });
    })
}


export const checkFileExists = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(true);
            } else {
                resolve(false);
            }
        };
        xhr.onerror = () => {
            reject(new Error('请求出错'));
        };
        xhr.send();
    });
}

export const getConfigData = (url,options) => {
    return new Promise((resolve, reject) => {
        window.URL = window.URL || window.webkitURL
        const xhr = new XMLHttpRequest()
        if (options.responseType) {
            xhr.responseType = options.responseType
        }
        xhr.open('get', 'http://'+location.hostname+'/config/'+url, true)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr);
            }
        }
        xhr.onerror = () => {
            reject(new Error('请求出错'));
        };
        xhr.send()
    });
}





