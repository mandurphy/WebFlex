import vue from "./vue.build.js";
import mutationObserver from "../plugins/polyfill/mutationobserver.esm.js";
const { ref,onMounted } = vue;

export const wifiFlagComponent = {
    template: `<div>
                    <div v-if="icon === 'wifi'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18l.01 0" />
                            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
                            <path d="M6.343 12.343a8 8 0 0 1 11.314 0" />
                            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
                        </svg>
                    </div>
                    <div v-if="icon === 'wifi-1'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18l.01 0" :stroke="color"/>
                            <path d="M9.172 15.172a4 4 0 0 1 5.656 0"/>
                            <path d="M6.343 12.343a8 8 0 0 1 11.314 0"/>
                            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
                        </svg>
                    </div>
                    <div v-if="icon === 'wifi-2'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18l.01 0" :stroke="color"/>
                            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" :stroke="color"/>
                            <path d="M6.343 12.343a8 8 0 0 1 11.314 0"/>
                            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
                        </svg>
                    </div>
                    <div v-if="icon === 'wifi-3'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18l.01 0" :stroke="color"/>
                            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" :stroke="color"/>
                            <path d="M6.343 12.343a8 8 0 0 1 11.314 0" :stroke="color"/>
                            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
                        </svg>
                    </div>
                    <div v-if="icon === 'wifi-4'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18l.01 0" :stroke="color"/>
                            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" :stroke="color"/>
                            <path d="M6.343 12.343a8 8 0 0 1 11.314 0" :stroke="color"/>
                            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" :stroke="color"/>
                        </svg>
                    </div>
                    <div v-if="icon === 'wifi-off'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi-off" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18l.01 0" />
                            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
                            <path d="M6.343 12.343a7.963 7.963 0 0 1 3.864 -2.14m4.163 .155a7.965 7.965 0 0 1 3.287 2" />
                            <path d="M3.515 9.515a12 12 0 0 1 3.544 -2.455m3.101 -.92a12 12 0 0 1 10.325 3.374" />
                            <path d="M3 3l18 18" />
                        </svg>
                    </div>  
               </div>`,
    props: {
        icon: {
            type: String,
            default: "wifi"
        },
        width: {
            type: Number,
            default: 20
        },
        height: {
            type: Number,
            default: 20
        },
        stroke: {
            type: String,
            default: "#2c3e50"
        },
        strokeWidth: {
            type: Number,
            default: 2
        },
        color: {
            type: String,
            default: "#cccccc"
        }
    }
}


export const antenanFlagComponent = {
    template: `<div>
                    <div v-if="icon === 'antenan'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-5" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18l0 -3" />
                          <path d="M10 18l0 -6" />
                          <path d="M14 18l0 -9" />
                          <path d="M18 18l0 -12" />
                        </svg>
                    </div>
                    <div v-if="icon === 'antenan-0'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-5" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18l0 -3" />
                          <path d="M10 18l0 -6" />
                          <path d="M14 18l0 -9" />
                          <path d="M18 18l0 -12" />
                        </svg>
                    </div>
                    <div v-if="icon === 'antenan-1'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-5" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18l0 -3" :stroke="color"/>
                          <path d="M10 18l0 -6"/>
                          <path d="M14 18l0 -9"/>
                          <path d="M18 18l0 -12" />
                        </svg>
                    </div>
                    <div v-if="icon === 'antenan-2'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-5" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18l0 -3" :stroke="color"/>
                          <path d="M10 18l0 -6" :stroke="color"/>
                          <path d="M14 18l0 -9" />
                          <path d="M18 18l0 -12" />
                        </svg>
                    </div>
                    <div v-if="icon === 'antenan-3'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-5" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18l0 -3" :stroke="color"/>
                          <path d="M10 18l0 -6" :stroke="color"/>
                          <path d="M14 18l0 -9" :stroke="color"/>
                          <path d="M18 18l0 -12" />
                        </svg>
                    </div>
                    <div v-if="icon === 'antenan-4'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-5" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18l0 -3" :stroke="color"/>
                          <path d="M10 18l0 -6" :stroke="color"/>
                          <path d="M14 18l0 -9" :stroke="color"/>
                          <path d="M18 18l0 -12" :stroke="color"/>
                        </svg>
                    </div>
                    <div v-if="icon === 'antenan-off'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-off" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18v-3" />
                          <path d="M10 18v-6" />
                          <path d="M14 18v-4" />
                          <path d="M14 10v-1" />
                          <path d="M18 14v-8" />
                          <path d="M3 3l18 18" />
                        </svg>
                    </div>  
               </div>`,
    props: {
        icon: {
            type: String,
            default: "antenan"
        },
        width: {
            type: Number,
            default: 20
        },
        height: {
            type: Number,
            default: 20
        },
        stroke: {
            type: String,
            default: "#2c3e50"
        },
        strokeWidth: {
            type: Number,
            default: 2
        },
        color: {
            type: String,
            default: "#cccccc"
        }
    }
}


export const emptyBoxFlagComponent = {
    template: `<div class="text-center">
                    <svg v-if="defTheme === 'default'" width="100" height="64" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                            <ellipse style="fill: #f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                            <g style="stroke: #d9d9d9;" fill-rule="nonzero">
                                <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                                <path style="fill: #fafafa" d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"></path>
                            </g>
                        </g>
                    </svg>
                    <svg v-if="defTheme === 'dark'" width="100" height="64" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                            <ellipse style="fill: #444" cx="32" cy="33" rx="32" ry="7"></ellipse>
                            <g style="stroke: #555;" fill-rule="nonzero">
                                <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                                <path style="fill: #555" d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"></path>
                            </g>
                        </g>
                    </svg>
               </div>`,
    setup(props,context) {
        const defTheme = ref("");
        onMounted(()=>{
            const update = () => {
                const theme = html.getAttribute('data-bs-theme');
                defTheme.value = theme;
            }
            const html = document.querySelector('html');
            update();
            const observer = new mutationObserver(() => {
                update();
            });
            const config = {
                attributes: true,
                attributeFilter: ["data-bs-theme"],
                subtree: false
            };
            observer.observe(html, config);
        })

        return { defTheme }
    }
}


export const shirtFlagComponent = {
    template: `<div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shirt" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round" :style="style">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M15 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0" :fill="color"/>
                    </svg>
               </div>`,
    props: {
        width: {
            type: Number,
            default: 20
        },
        height: {
            type: Number,
            default: 20
        },
        stroke: {
            type: String,
            default: "#2c3e50"
        },
        strokeWidth: {
            type: Number,
            default: 2
        },
        color: {
            type: String,
            default: ""
        },
        style: {
            type: String,
            default: ""
        }
    },
    setup(props,context) {
        const defTheme = ref("");
        onMounted(()=>{
            const update = () => {
                const theme = html.getAttribute('data-bs-theme');
                defTheme.value = theme;
            }
            const html = document.querySelector('html');
            update();
            const observer = new mutationObserver(() => {
                update();
            });
            const config = {
                attributes: true,
                attributeFilter: ["data-bs-theme"],
                subtree: false
            };
            observer.observe(html, config);
        })

        return { defTheme }
    }
}