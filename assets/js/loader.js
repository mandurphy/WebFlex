
import { useLanguageConf } from "./confHooks.js";

window.addEventListener("load",  () => {

    let { languageConf } = useLanguageConf();
    const lang = languageConf["lang"];
    const html = document.querySelector('html');
    html.setAttribute('data-bs-language', lang);
    html.setAttribute('data-bs-theme', "default");
    document.body.style.display = "block";
    html.dispatchEvent(new Event("loaded"));
});


