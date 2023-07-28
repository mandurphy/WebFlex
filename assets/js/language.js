
import {useLanguageConf} from "./confHooks.js";

window.addEventListener("load", async () => {

    let { languageConf } = useLanguageConf();
    const lang = languageConf["lang"];
    const html = document.querySelector('html');
    html.setAttribute('data-bs-language', lang);
    document.body.style.display = "block";

});


