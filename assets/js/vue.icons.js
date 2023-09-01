import {onMounted, ref, toRefs, watchEffect} from "./vue.build.js";

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
    props:['icon','width','height','stroke','strokeWidth','color'],
    setup(props,context) {
        const { stroke,icon,color } = toRefs(props);

        const state = {
            icon: ref("wifi"),
            width: ref(20),
            height: ref(20),
            stroke: ref("#2c3e50"),
            strokeWidth: ref(2),
            color: ref("#cccccc")
        }

        watchEffect(()=>{
            if(stroke.value !== undefined)
                state.stroke.value = stroke.value;
            if(icon.value !== undefined)
                state.icon.value = icon.value;
            if(color.value !== undefined)
                state.color.value = color.value;
        })

        onMounted(()=>{
            if(props.width !== undefined)
                state.width.value = props.width;
            if(props.height !== undefined)
                state.height.value = props.height;
            if(props.strokeWidth !== undefined)
                state.strokeWidth.value = props.strokeWidth;
        })

        return { ...state }
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
    props:['icon','width','height','stroke','strokeWidth','color'],
    setup(props,context) {
        const { stroke,icon,color } = toRefs(props);

        const state = {
            icon: ref("antenan"),
            width: ref(20),
            height: ref(20),
            stroke: ref("#2c3e50"),
            strokeWidth: ref(2),
            color: ref("#cccccc")
        }

        watchEffect(()=>{
            if(stroke.value !== undefined)
                state.stroke.value = stroke.value;
            if(icon.value !== undefined)
                state.icon.value = icon.value;
            if(color.value !== undefined)
                state.color.value = color.value;
        })

        onMounted(()=>{
            if(props.width !== undefined)
                state.width.value = props.width;
            if(props.height !== undefined)
                state.height.value = props.height;
            if(props.strokeWidth !== undefined)
                state.strokeWidth.value = props.strokeWidth;
        })

        return { ...state }
    }
}