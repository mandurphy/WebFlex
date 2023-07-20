
import {func,updateSysLanguage} from "./helper.js";

await updateSysLanguage();

window.addEventListener("DOMContentLoaded", () => {
    func('/link/mgr/login/hadLogin')
        .then((ret) => {
            if (window.location.pathname !== "/") {
                if (ret.status === "success" && !ret.data) {
                    location.href = "/";
                }
            } else {
                if (ret.status === "success" && ret.data) {
                    location.href = "/dashboard.html";
                }
            }
        });
});

window.addEventListener("load", () => {
    func('/link/mgr/login/hadLogin')
        .then((ret) => {
            if(ret.status === "success") {
                if ((!ret.data && window.location.pathname === "/") || (ret.data && window.location.pathname !== "/")) {
                    document.body.style.display = "block";
                }
            }
        });
});


