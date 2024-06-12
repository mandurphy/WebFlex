
import { queryData,loadCSS } from "./lp.utils.js"

Promise.all([queryData("config/lang.json"),queryData("config/theme_standard.json")]).then(config => {
    const [ languageConf,themeConf ] = config;
    const html = document.querySelector('html');
    html.setAttribute("data-bs-language", languageConf.lang);
    html.setAttribute("data-bs-theme", themeConf.used);
    loadCSS(`assets/css/theme-active-${themeConf.active}.css`).then(link => {
        document.body.style.display = "block";
        html.dispatchEvent(new Event("loaded"));
    });
});