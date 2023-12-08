
import { queryData } from "./lp.utils.js"

Promise.all([queryData("config/lang.json"),queryData("config/theme_standard.json")]).then(config => {
    const [ languageConf,themeConf ] = config;
    const html = document.querySelector('html');
    html.setAttribute('data-bs-language', languageConf.lang);
    html.setAttribute('data-bs-theme', themeConf.used);
    document.body.style.display = "block";
    html.dispatchEvent(new Event("loaded"));
});