
import { useLanguageConf,useThemeConf } from "./vue.hooks.js";

window.addEventListener("load",  () => {
    const { languageConf } = useLanguageConf();
    const { themeConf } = useThemeConf();
    const lang = languageConf["lang"];
    const html = document.querySelector('html');
    html.setAttribute('data-bs-language', lang);
    html.setAttribute('data-bs-theme', themeConf.used);
    document.body.style.display = "block";
    html.dispatchEvent(new Event("loaded"));
});

