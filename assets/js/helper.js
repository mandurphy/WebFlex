
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

export const func = (url,data) => {
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

export const rpc = (func, params, callbak, usrdata) => {
    let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC' });
    if(params===undefined || params===null)
        params=[];

    if(callbak!==undefined)
        jsonrpc.call(func, params, function(data){callbak(data,usrdata);}, function(res){console.log(res)});
    else
        jsonrpc.call(func, params, function(data){}, function(res){console.log(res)});
}

export const rpc2 = (func, params, callbak, usrdata) => {
    let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC2' });
    if(params===undefined || params===null)
        params=[];

    if(callbak!==undefined)
        jsonrpc.call(func, params, function(data){callbak(data,usrdata);}, function(res){console.log(res)});
    else
        jsonrpc.call(func, params, function(data){}, function(res){console.log(res)});
}

export const rpc3 = (func, params, callbak, usrdata) => {
    let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC3' });
    if(params===undefined || params===null)
        params=[];

    if(callbak!==undefined)
        jsonrpc.call(func, params, function(data){callbak(data,usrdata);}, function(res){console.log(res)});
    else
        jsonrpc.call(func, params, function(data){}, function(res){console.log(res)});
}

export const rpc4 = (func, params, callbak, usrdata) => {
    let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RP4' });
    if(params===undefined || params===null)
        params=[];

    if(callbak!==undefined)
        jsonrpc.call(func, params, function(data){callbak(data,usrdata);}, function(res){console.log(res)});
    else
        jsonrpc.call(func, params, function(data){}, function(res){console.log(res)});
}

export const rpc5 = (func, params, callbak, usrdata) => {
    let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC5' });
    if(params===undefined || params===null)
        params=[];

    if(callbak!==undefined)
        jsonrpc.call(func, params, function(data){callbak(data,usrdata);}, function(res){console.log(res)});
    else
        jsonrpc.call(func, params, function(data){}, function(res){console.log(res)});
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





