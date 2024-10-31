import JsonRpcClient from '../plugins/jsonrpc/jquery.jsonrpc.js';
import axios from '../plugins/axios/axios.esm.js';
import Lobibox from '../plugins/notifications/js/lobibox.min.js'
import JqueryConfirm from '../plugins/confirm/js/jquery-confirm.esm.js'

export const getUrlParam = (key) => {
    let param = "";
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if(pair[0] === key)
            param = pair[1]
    }
    param = param.replace(/%22/g, "");
    return param;
}

export const updateSysLanguage = param => {
    if(param) {
        func("/conf/updateLangConf", param).then(result => {
            if(result.status === "success") {
                const html = document.querySelector('html');
                html.setAttribute('data-bs-language', param);
            }
        })
    }
}

//size mini normal large
export const alertMsg = (message, type = "success",delay = 5000,size = "mini") => {

    let icon = "fa-solid fa-circle-check";
    if(type === "error")
        icon = "fa-solid fa-circle-xmark";
    if(type === "info")
        icon = "fa-solid fa-circle-info ";
    if(type === "warning")
        icon = "fa-solid fa-triangle-exclamation";

    return Lobibox.notify(type, {
        pauseDelayOnHover: true,
        continueDelayOnInactiveTab: false,
        size: size,
        sound: false,
        position: 'top right',
        icon: icon,
        msg: message,
        delay: delay,
    });
}

export const confirm = (options) => {
    const jc = new JqueryConfirm();
    return jc.confirm(options);
}

export const request = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    } else {
        throw new Error(xhr.statusText);
    }
}

export const queryData = (url,options= {}) => {
    return new Promise((resolve,reject)=>{
        axios.get(url+"?rnd="+Math.random(),options)
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

export const axios_post = (url,data = []) => {
    return new Promise((resolve,reject)=>{
        axios.post(url, data)
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
export const rpc = (func, params = []) => {
    return new Promise((resolve,reject)=>{
        let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC' });
        jsonrpc.call(func, params, data => { resolve(data); }, error =>{ console.log(error);reject(error); });
    })
}

//netManager
export const rpc2 = (func, params = []) => {
    return new Promise((resolve,reject)=>{
        let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC2' });
        jsonrpc.call(func, params, data => { resolve(data); }, error =>{ console.log(error);reject(error); });
    })
}

//port
export const rpc3 = (func, params = []) => {
    return new Promise((resolve,reject)=>{
        let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC3' });
        jsonrpc.call(func, params, data => { resolve(data); }, error =>{ console.log(error);reject(error); });
    })
}

//mqtt
export const rpc4 = (func, params = []) => {
    return new Promise((resolve,reject)=>{
        let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC4' });
        jsonrpc.call(func, params, data => { resolve(data); }, error =>{ console.log(error);reject(error); });
    })
}

//onvif
export const rpc5 = (func, params = []) => {
    return new Promise((resolve,reject)=>{
        let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC5' });
        jsonrpc.call(func, params, data => { resolve(data); }, error =>{ console.log(error);reject(error); });
    })
}

// monitor
export const rpc6 = (func, params = []) => {
    return new Promise((resolve,reject)=>{
        let jsonrpc = new JsonRpcClient({ ajaxUrl: '/RPC6' });
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

export const extend = (target, ...sources) => {
    if (!target) return {};

    sources.forEach(source => {
        if (source) {
            Object.assign(target, source);
        }
    });

    return target;
}

export const clearReactiveObject = (reactiveObj) => {
    const keys = Object.keys(reactiveObj);
    keys.forEach((key) => {
        delete reactiveObj[key];
    });
};

export const clearReactiveArray = (reactiveArray) => {
    reactiveArray.splice(0);
};

export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

export const popover = (ele,param) => {
    if(ele === null || ele === undefined)
        return {};
    if(param.content.includes("<cn>")) {
        const html = document.querySelector('html');
        let lang = html.getAttribute('data-bs-language');
        if(lang === null)
            lang = "cn";
        const regex = new RegExp(`<${lang}>(.*?)<\/${lang}>`);
        param.content = param.content.match(regex)[1];
    }
    return new bootstrap.Popover(ele, param)
}

export const formatDate =  (fmt,date = new Date()) => {
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor( ( date.getMonth() + 3 ) / 3 ),
        "S": date.getMilliseconds()
    };
    if ( /(y+)/.test( fmt ) ) fmt = fmt.replace( RegExp.$1, ( date.getFullYear() + "" ).substr( 4 - RegExp.$1.length ) );
    for ( let k in o )
        if ( new RegExp( "(" + k + ")" ).test( fmt ) ) fmt = fmt.replace( RegExp.$1, ( RegExp.$1.length == 1 ) ? ( o[ k ] ) : ( ( "00" + o[ k ] ).substr( ( "" + o[ k ] ).length ) ) );
    return fmt;
}

export const deepEqualIgnoreProps = (obj1, obj2, ignoreProps) => {
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }
    const keys1 = Object.keys(obj1).filter(key => !ignoreProps.includes(key));
    const keys2 = Object.keys(obj2).filter(key => !ignoreProps.includes(key));
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqualIgnoreProps(obj1[key], obj2[key], ignoreProps)) {
            return false;
        }
    }
    return true;
}

export const rebootConfirm = (msg) => {
    confirm( {
        title: '<cn>重启</cn><en>Reboot</en>',
        content: '<cn>'+msg+'</cn><en>Reboot immediately?</en>',
        buttons: {
            ok: {
                text: "<cn>确认重启</cn><en>Confirm</en>",
                btnClass: 'btn-primary',
                keys: [ 'enter' ],
                action: function () {
                    func("/system/systemReboot");
                }
            },
            cancel: {
                text: "<cn>取消</cn><en>Cancel</en>",
                action: function () {
                    console.log( 'the user clicked cancel' );
                }
            }
        }
    } );
}

export const resetConfirm = () => {
    confirm( {
        title: '<cn>还原</cn><en>Reset</en>',
        content: '<cn>是否还原全部设置？</cn><en>Reset all config to default and reboot immediately?</en>',
        buttons: {
            ok: {
                text: "<cn>确认</cn><en>Confirm</en>",
                btnClass: 'btn-primary',
                keys: [ 'enter' ],
                action: function () {
                    func("/system/systemReset");
                }
            },
            cancel: {
                text: "<cn>取消</cn><en>Cancel</en>",
                action: function () {
                    console.log( 'the user clicked cancel' );
                }
            }
        }
    } );
}

export const splitArray = (array,count) => {
    return Array.from({ length: Math.ceil(array.length / count) }, (_, index) =>
        array.slice(index * count, index * count + count)
    );
}

export const isEmpty = value => {
    if (value === null || value === undefined) {
        return true;
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
        return false;
    }
    return !value.trim();
}

export const swap = (array, index1, index2) => {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    console.log(array,index1,index2);
}

export const formatTime = (msec, format="hh:mm:ss") => {
    const seconds = Math.floor((msec / 1000) % 60);
    const minutes = Math.floor((msec / (1000 * 60)) % 60);
    const hours = Math.floor((msec / (1000 * 60 * 60)) % 24);
    const days = Math.floor(msec / (1000 * 60 * 60 * 24));

    const formattedTime = format
        .replace('dd', String(days).padStart(2, '0'))
        .replace('hh', String(hours).padStart(2, '0'))
        .replace('mm', String(minutes).padStart(2, '0'))
        .replace('ss', String(seconds).padStart(2, '0'));

    return formattedTime;
}

export const loadCSS = (href) => {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href+"?rnd="+Math.random();
        link.onload = () => resolve(link);
        link.onerror = () => reject(new Error(`Failed to load ${href}`));
        document.head.appendChild(link);
    });
}

export const loadStyle = style => {
    return new Promise((resolve, reject) => {
        const styleEle = document.createElement('style');
        styleEle.textContent = style;
        document.head.appendChild(styleEle);
        resolve(styleEle);
    });
}

export const extractAryEle = (originalArray, elementsToInclude) => {
    return originalArray.filter(element => elementsToInclude.includes(element));
}

export const removeAryEle = (originalArray, elementsToRemove) => {
    return originalArray.filter(element => !elementsToRemove.includes(element));
}






