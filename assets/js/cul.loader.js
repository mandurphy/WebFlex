
import { useLanguageConf } from "./vue.hooks.js";

window.addEventListener("load",  () => {
    const { languageConf } = useLanguageConf();
    const lang = languageConf["lang"];
    const html = document.querySelector('html');
    html.setAttribute('data-bs-language', lang);
    html.setAttribute('data-bs-theme', "default");
    document.body.style.display = "block";
    html.dispatchEvent(new Event("loaded"));
});


