
import { queryData,loadStyle,loadCSS } from "./lp.utils.js"

Promise.all([queryData("config/lang.json"),queryData("config/theme_standard.json")]).then(config => {
    const [ languageConf,themeConf ] = config;
    const html = document.querySelector('html');
    html.setAttribute("data-bs-language", languageConf.lang);
    html.setAttribute("data-bs-theme", themeConf.used);

    if(!themeConf.hasOwnProperty("active"))
        themeConf.active = "default";
    html.setAttribute("data-bs-theme-active", themeConf.active);

    if(!themeConf.hasOwnProperty("mod"))
        themeConf.mod = "link";

    if(themeConf.mod === "style") {
        const activeTheme = themeConf.themeActives.find(item => item.active === themeConf.active);
        const cssVariables = Object.entries(activeTheme.colors)
            .map(([key, value]) => `--${key}: ${value};`)
            .join(' ');
        let style = `:root { ${cssVariables} }`;
        loadStyle(style).then(link => {
            document.body.style.display = "block";
            html.dispatchEvent(new Event("loaded"));
        });
    } else {
        loadCSS(`assets/css/theme-active-${themeConf.active}.css`).then(link => {
            document.body.style.display = "block";
            html.dispatchEvent(new Event("loaded"));
        });
    }

});