
import vue from "./vue.build.js";
import $ from '../plugins/jquery/jquery.esm.js';
import '../plugins/switch/js/bootstrap-switch.min.js';
import { func,confirm,rebootConfirm,alertMsg,axios_post } from './lp.utils.js'

const {ref,reactive,toRefs,watch,watchEffect,
    computed,onMounted,nextTick,defineAsyncComponent} = vue;

export const ignoreCustomElementPlugin =  {
    install: (app) => {
        app.config.compilerOptions.isCustomElement = (tag) => tag === 'cn' || tag === 'en';
    }
};

export const languageOptionDirective = {
    async mounted(el, binding, vnode) {
        await import('../plugins/polyfill/mutationobserver-shim.min.js');
        const update = () => {
            const lang = html.getAttribute('data-bs-language');
            el.textContent = el.getAttribute(lang);
        }

        const html = document.querySelector('html');
        update();
        const observer = new MutationObserver(() => {
            update();
        });

        const config = {attributes: true};
        observer.observe(html, config);
    }
};

export const clickOutsideDirective = {
    mounted(el, binding) {
        const eventHandler = (e) => {
            if (el.contains(e.target)) {
                return false
            }
            if (binding.value && typeof binding.value === 'function') {
                binding.value(e)
            }
        }
        el.__click_outside__ = eventHandler
        document.addEventListener('click', eventHandler)
    },
    beforeUnmount(el) {
        document.removeEventListener('click', el.__click_outside__)
        delete el.__click_outside__
    }
}

export const statusTemperatureComponent = {
    template: `<div class="pie">
                    <div class="temperature">
                        <div class="bar">
                            <div class="mask" ref="tmp_mask"></div>
                            <span class="percent" ref="tmp_text">0℃</span>
                        </div>
                    </div>
                </div>`,
    props: ['value','color'],
    setup(props, context) {

        const tmp_mask = ref(null);
        const tmp_text = ref(null);

        const { value } = toRefs(props);

        watch(value,()=>{
            tmp_mask.value.style.bottom = props.value + '%';
            tmp_text.value.textContent = props.value + '℃';
        })

        onMounted(()=>{
            tmp_mask.value.parentElement.style.background = props.color;
        })

        return { tmp_mask,tmp_text }
    }
};


export const statusPieChartComponent = {
    template: `<div class="pie">
                    <div class="chart" ref="pie_chart"></div>
                    <span class="percent" ref="pie_text"></span>
               </div>`,
    props: ['value','color'],
    setup(props, context) {

        const pie_chart = ref(null);
        const pie_text = ref(null);

        const { value } = toRefs(props);

        watch(value,()=>{
            $(pie_chart.value).data( 'easyPieChart' ).update( props.value);
        })

        onMounted(()=>{
            $(pie_chart.value).easyPieChart({
                easing: 'easeOutElastic',
                delay: 2000,
                barColor: props.color,
                trackColor: '#CCC',
                scaleColor: false,
                lineWidth: 20,
                trackWidth: 16,
                lineCap: 'butt',
                width: 50,
                onStep: (from, to, percent) => {
                    pie_text.value.textContent = Math.round(percent) + "%";
                }
            });
        })

        return { pie_chart,pie_text }
    }
};

export const netFlotChartComponent = {
    template: `<div class="col-lg-12 netState" ref="net_chart"> </div>`,
    props: ['color','maxy','data1','data2'],
    setup(props,context) {
        const net_chart = ref(null);
        let plot = {};

        const showTooltip = (x, y, color, contents) => {
            $('<div id="tooltip">' + contents + '</div>').css({
                position: 'absolute',
                display: 'none',
                top: y - 40,
                left: x - 120,
                border: '2px solid ' + color,
                padding: '3px',
                'font-size': '9px',
                'border-radius': '5px',
                'background-color': '#fff',
                'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                opacity: 0.9
            }).appendTo("body").fadeIn(200);
        }

        const initPlot = () => {
            if(Object.keys(plot).length === 0) {
                let color = props.color;
                let data1 = props.data1;
                let data2 = props.data2;
                plot = $.plot(net_chart.value, [
                        {
                            data: data1,
                            lines: {
                                fill: true
                            }
                        },
                        {
                            data: data2,
                            lines: {
                                show: true
                            }
                        }]
                    ,
                    {
                        series: {
                            lines: {
                                show: true,
                                fill: true
                            },
                            shadowSize: 0
                        },
                        yaxis: {
                            min: 0,
                            max: 800,
                            tickSize: 160,
                            tickFormatter: ( v, axis ) => {
                                if ( axis.max < 1024 )
                                    return v + "Kb/s";
                                else {
                                    v /= 1024;

                                    if ( axis.max < 10240 )
                                        return v.toFixed( 2 ) + "Mb/s";
                                    else
                                        return Math.floor( v ) + "Mb/s";
                                }
                            }
                        },
                        xaxis: {
                            show: false
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eeeeee",
                            borderWidth: 1,
                            borderColor: "#cccccc"
                        },
                        colors: [ color, "#555" ],
                        tooltip: false
                    });

                $.fn.tooltip = () => {
                    let prePoint = null, preLabel = null;
                    $(net_chart.value).bind("plothover", (event, pos, item) => {
                        if (item) {
                            if ((preLabel !== item.series.label) || (prePoint !== item.dataIndex)) {
                                prePoint = item.dataIndex;
                                preLabel = item.series.label;
                                $("#tooltip").remove();

                                $(this).css({
                                    "cursor": "pointer"
                                })

                                let data = item.series.data[item.dataIndex][1];
                                if(data > 1024)
                                    data = parseInt(data/1024)+"Mb/s";
                                else
                                    data += "kb/s";

                                if (item.seriesIndex === 0)
                                    showTooltip(item.pageX + 100, item.pageY - 10, color, "<cn>上行</cn><en>upward</en>: " + data);
                                if (item.seriesIndex === 1)
                                    showTooltip(item.pageX + 100, item.pageY - 10, color, "<cn>下行</cn><en>downward</en>: " + data);
                            }
                        }
                        else {
                            prePoint = null;
                            preLabel = null;
                            $(this).css({
                                "cursor": "auto"
                            });
                            $("#tooltip").remove();
                        }
                    });
                }
                $(net_chart.value).tooltip();
            }
        }

        const updatePlot = () => {
            if(Object.keys(plot).length !== 0) {
                let maxy = props.maxy;
                let data1 = props.data1;
                let data2 = props.data2;
                plot.setData([data1, data2]);
                plot.draw();
                plot.getOptions().yaxes[ 0 ].max = maxy;
                plot.getOptions().yaxes[ 0 ].tickSize = Math.floor( maxy / 5 );
                plot.setupGrid();
            }
        }

        watch(props.data1,()=>{
            updatePlot();
        },{deep: true})

        onMounted(()=>{
            setTimeout(initPlot,100);
        })

        return {net_chart}
    }
}


export const bootstrapSwitchComponent = {
    template: `<input type="checkbox" class="switch form-control" ref="bs_switch">`,
    props: ['modelValue','size'],
    setup(props, context) {

        const size = props.size === undefined ? "small" : props.size;
        const bs_switch = ref(null);

        const { modelValue } = toRefs(props);

        watch(modelValue,()=>{
            $(bs_switch.value).bootstrapSwitch('state', modelValue.value, true);
        })

        onMounted(async () => {
            $(bs_switch.value).bootstrapSwitch({
                "state": props.modelValue,
                "size": size,
                onInit(dom, event, state) {
                    $(bs_switch.value).on('focus.bootstrapSwitch', () => {
                        this.$wrapper.removeClass("bootstrap-switch-focused")
                    })
                },
                onSwitchChange(event, state) {
                    context.emit('update:modelValue', state);
                    context.emit('switch-change', state);
                }
            })
        })

        return { bs_switch }
    }
};


export const multipleSelectComponent = {
    template: `<select class="form-select" v-model="selectValue" @change="onSelectChange">
                    <slot></slot>
               </select>`,
    props: ['value1',"value2","split"],
    setup(props,context){

        let selectValue = ref("");
        const onSelectChange = () =>{
            let [value1,value2] = selectValue.value.split(props.split);
            value1 = isNaN(Number(value1)) ? value1 : Number(value1);
            value2 = isNaN(Number(value2)) ? value2 : Number(value2);
            context.emit('update:value1', value1);
            context.emit('update:value2', value2);
        }

        onMounted(()=>{
            selectValue.value = props.value1 + props.split + props.value2;
        })

        return {selectValue,onSelectChange}
    }
};


export const multipleInputComponent = {
    template: `<input type="text" class="form-control" v-model="selectValue" @change="onInputChange">`,
    props: ['value1',"value2","split"],
    setup(props,context) {

        let selectValue = ref("");

        const { value1,value2 } = toRefs(props);

        watchEffect(()=>{
            if(typeof value1.value === "string")
                value1.value = value1.value.trim();
            if(typeof value2.value === "string")
                value2.value = value2.value.trim();
            selectValue.value = value1.value + props.split + value2.value;
        })

        const onInputChange = () =>{
            let [val1,val2] = selectValue.value.split(props.split);
            val1 = isNaN(Number(val1)) ? val1 : Number(val1);
            val2 = isNaN(Number(val2)) ? val2 : Number(val2);

            if(typeof val1 === "string")
                val1 = val1.trim();
            if(typeof val2 === "string")
                val2 = val2.trim();

            context.emit('update:value1', val1);
            context.emit('update:value2', val2);

            selectValue.value = val1 + props.split + val2;
        }

        return {selectValue,onInputChange}
    }
};

export const nouiSliderComponent = {
    template: `<div class="slider-wrap" ref="slider"></div>`,
    props: {
        modelValue: {
          type: [Number,String],
          default: 0
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        fix: {
            type: Number,
            default: 0
        }
    },
    setup(props,context) {
        const slider = ref(null);
        let handle = ref(null);

        const showTooltip = () => {
            let tooltip = handle.value.querySelector(".noUi-tooltip")
            tooltip.style.display = 'block';
        }

        const hideTooltip = () => {
            let tooltip = handle.value.querySelector(".noUi-tooltip")
            tooltip.style.display = 'none';
        }

        const formatTooltipValue = value => {
            if(Number(props.fix) === 0)
                value = parseInt(value);
            else
                value = parseFloat(value).toFixed(Number(props.fix));
            return value;
        }

        watch(() => props.modelValue, (newValue, oldValue) => {
            if (slider.value) {
                slider.value.noUiSlider.updateOptions({
                    start: newValue,
                });
                hideTooltip();
            }
        });

        onMounted(async () => {
            const noUiSlider = await import("../plugins/nouislider/js/nouislider.esm.js");
            noUiSlider.create(slider.value, {
                start: props.modelValue,
                connect: [true, false],
                tooltips: {
                    to: formatTooltipValue,
                },
                range: {'min': props.min, 'max': props.max},
                step: props.step
            });

            handle.value = slider.value.querySelector('.noUi-handle');
            hideTooltip();

            slider.value.addEventListener('mouseenter', () => {
                showTooltip();
            });

            slider.value.addEventListener('mouseleave', () => {
                hideTooltip();
            });

            // slider.value.noUiSlider.on('slide', (values, mark) => {
            //     context.emit('update:modelValue', values[mark]);
            // });

            slider.value.noUiSlider.on('end', (values, mark) => {
                context.emit('update:modelValue', values[mark]);
                context.emit('slide-end', values[mark]);
            });
        })

        return { slider }
    }
};

export const h5PlayerComponent = {
    template: `<div style="width:100%; padding-bottom: 56.25%;  position: relative;">
                    <video autoplay controls muted style="width:100%;height: 100%; position: absolute; background: #555;" ref="videoHandler"></video>
                    <div style="position: absolute;width: 100%;height: 100%" ref="jessHandler"></div>
                    <div class="force-video-cloud" ref="cloudHandler">
                        <div class="loading"></div>
                    </div>
              </div>`,
    props: {
        url: {
            type: String,
            default: ""
        },
        codec: {
            type: String,
            default: "h264"
        },
        audio: {
            type: Boolean,
            default: true
        },
        buffer: {
            type: Number,
            default: 200
        },
        canplay: {
            type: Boolean,
            default: true
        }
    },
    setup(props,context) {

        const { url,codec,audio,buffer,canplay } = toRefs(props);
        const state = {
            videoHandler: ref(null),
            jessHandler: ref(null),
            cloudHandler: ref(null),
            hadInitPlayer: false,
            flvJsModule: {},
            h5Player: {},
        }

        watchEffect(()=>{
            if(canplay.value) {
                if(url.value !== "") {
                    if(state.hadInitPlayer)
                        destoryPlayer();
                    setTimeout(initPlayer,300);
                }
            } else {
                if(state.hadInitPlayer)
                    destoryPlayer();
            }
        })

        const initPlayer = async () => {
            if(props.url === "")
                return;

            if(props.codec === "h265") {
                state.videoHandler.value.style.display = 'none';
                state.jessHandler.value.style.display = 'block';
                if(!window.Jessibuca)
                    await import('../plugins/jessibuca/jessibuca.js');
                state.h5Player =  new Jessibuca({
                    container: state.jessHandler.value,
                    videoBuffer: buffer.value/1000,
                    decoder: "assets/plugins/jessibuca/decoder.js",
                    isResize: false,
                    audio: JSON.parse(audio.value),
                    operateBtns: {
                        fullscreen: true,
                        play: true,
                        audio: JSON.parse(audio.value),
                    },
                    forceNoOffscreen: true,
                    isNotMute: false,
                });
                state.h5Player.play(url.value);
                state.h5Player.on("play", (flag) => {
                    state.cloudHandler.value.style.display = 'none'
                })
            } else {
                state.videoHandler.value.style.display = 'block';
                state.jessHandler.value.style.display = 'none';
                if(!window.flvjs)
                    await import('../plugins/flvjs/flv.js');
                state.h5Player = flvjs.createPlayer({
                    type: 'flv',
                    url: url.value,
                    audio: JSON.parse(audio.value),
                });
                state.h5Player.attachMediaElement(state.videoHandler.value);
                state.h5Player.load();
                state.h5Player.play();

                state.videoHandler.value.addEventListener("canplay",() => {
                    state.cloudHandler.value.style.display = 'none'
                });
            }
            state.hadInitPlayer = true;
        }
        const destoryPlayer = () => {
            if(Object.keys(state.h5Player).length > 0) {
                if(state.h5Player.hasOwnProperty("unload")) {
                    state.h5Player.unload();
                    state.h5Player.detachMediaElement();
                }
                state.h5Player.destroy();
                state.h5Player = {};
            }
            state.cloudHandler.value.style.display = 'flex';
            state.videoHandler.value.removeEventListener("canplay",()=>{});
            state.hadInitPlayer = false;
        }
        const checkDelay = () => {
            // if (Object.keys(state.h5Player).length > 0 && state.h5Player.hasOwnProperty("buffered") && state.h5Player.buffered.length > 0) {
            //     if (state.h5Player.buffered.end(0) - state.h5Player.currentTime > 1.5) {
            //         state.h5Player.currentTime = state.h5Player.buffered.end(0) - 0.2;
            //     }
            // }
            // setTimeout(checkDelay,1000);
        }

        onMounted(checkDelay);

        return { ...state }
    }
};

export const timepickerComponent = {
    template: `<div class="input-group bootstrap-timepicker">
                    <input type="text" class="form-control" ref="timepicker">
                    <span class="input-group-text input-group-addon"><i class="fa-regular fa-clock"></i></span>
               </div>`,
    props: ['modelValue'],
    setup(props,context){
        const timepicker = ref(null);
        const { modelValue } = toRefs(props);

        import("../plugins/timepicker/js/bootstrap-timepicker.js").then(() => {
            watch(modelValue,()=>{
                $(timepicker.value).timepicker('setTime', modelValue.value);
            })

            onMounted(() => {
                $(timepicker.value).timepicker({
                    minuteStep: 1,
                    defaultTime: props.modelValue,
                    showMeridian: false,
                    icons: {
                        up: 'fa-solid fa-angle-up',
                        down: 'fa-solid fa-angle-down'
                    },
                });

                $(timepicker.value).on("changeTime.timepicker", event => {
                    context.emit('update:modelValue', event.time.value);
                });
            })
        });

        return {timepicker}
    }
};

export const vueColorPickerComponent = {
    template: `<div class="color-picker" v-click-outside="clickOutside">
                  <input class="form-control" type="text" v-model.trim.lazy="pickerColor" ref="picker" @change="pickerColorChange">
                  <div ref="popper" class="popper">
                      <sketch-picker v-model="sketchColor"></sketch-picker>
                  <div class="arrow" data-popper-arrow></div>
                </div>
              </div>`,
    props: ['modelValue','direct'],
    components: {
        "sketch-picker": defineAsyncComponent(() => {
            return import('../plugins/vueColor/vue3.color.esm.js').then(module => {
                const { Sketch } = module;
                return Sketch;
            })
        }),
    },
    directives: {
        "click-outside": clickOutsideDirective
    },
    setup(props,context){

        const state = {
            picker: ref(null),
            popper: ref(null),
            pickerColor: ref(""),
            sketchColor: ref(""),
            partyPopper: {},
            popperOptions: reactive({}),
        }

        watch(state.sketchColor,()=>{
            if(state.sketchColor.value.hasOwnProperty("hex")) {
                state.pickerColor.value = state.sketchColor.value.hex;
                context.emit('update:modelValue', state.pickerColor.value);
            }
        });

        const pickerColorChange = () => {
            state.sketchColor.value = state.pickerColor.value;
            context.emit('update:modelValue', state.pickerColor.value);
        }

        const showPopper = () => {
            state.popper.value.setAttribute('data-show', '');
            state.partyPopper.setOptions((options) => ({
                ...options,
                modifiers: [
                    ...options.modifiers,
                    { name: 'eventListeners', enabled: true },
                ],
            }));
            state.partyPopper.update();
        }

        const hidePopper = () => {
            if(Object.keys(state.partyPopper).length > 0) {
                state.popper.value.removeAttribute('data-show');
                state.partyPopper.setOptions((options) => ({
                    ...options,
                    modifiers: [
                        ...options.modifiers,
                        { name: 'eventListeners', enabled: false },
                    ],
                }));
            }
        }

        const clickOutside = (event) => {
            hidePopper();
        }

        nextTick(async () => {
            const Popper = await import('../plugins/popper/popper.esm.js');
            state.partyPopper = Popper.createPopper(state.picker.value, state.popper.value, {
                placement: props.direct,
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8],
                        },
                    },
                    {
                        name: 'computeStyles',
                        options: {
                            gpuAcceleration: false,
                            adaptive: false
                        }
                    }
                ],
            });
            state.picker.value.addEventListener("focus", showPopper);
        })

        onMounted(()=>{
            // state.pickerColor.value = props.modelValue;
            state.sketchColor.value = {'hex':props.modelValue};
        });

        return {...state,clickOutside,pickerColorChange}
    }
};

export const uploadModalComponent = {
    template: `<div :class="['modal',{'fade':modalFade===undefined ? false : JSON.parse(modalFade)}]"  tabindex="-1" aria-hidden="true" ref="modal">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">{{modalTitle}}</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <input type="file" ref="uploadFile" name="uploadFile" multiple />
                        </div>
                      </div>
                    </div>
               </div>`,
    props:['modalTitle','modalShow','modalFade','uploadTip',"uploadAction",'uploadAllow','uploadCount'],
    setup(props,context) {

        const { modalShow,modalFade } = toRefs(props);

        const state = {
            modal : ref(null),
            modalTitle : ref(""),
            uploadFile: ref(null),
            uploadTip: "",
            show : false,
            bsModal : {},
            uploadLang: "zh"
        }

        watch(modalShow,()=>{
            state.show = !state.show;
            if(state.show)
                state.bsModal.show();
            else
                state.bsModal.hide();
        })

        const initBsModal = () => {
            state.bsModal = new bootstrap.Modal(state.modal.value);
            if(modalShow.value) {
                state.bsModal.show();
                state.show = true;
            } else {
                state.bsModal.hide();
                state.show = false;
            }
            state.modal.value.addEventListener('hide.bs.modal',() => {
                state.show = false;
            });
        }

        const updateLangText = () => {
            const html = document.querySelector('html');
            let lang = html.getAttribute('data-bs-language');
            const [tip1,tip2] = props.uploadTip.split("&");
            if(lang === "cn" || tip2 === undefined)
                state.uploadTip = tip1;
            else
                state.uploadTip = tip2;

            const [title1,title2] = props.modalTitle.split("&");
            if(lang === "cn" || title2 === undefined)
                state.modalTitle.value = title1;
            else
                state.modalTitle.value = title2;

            state.uploadLang = lang;
            if(lang === "cn")
                state.uploadLang = "zh";
        }

        const initUploadFile = () => {
            $(state.uploadFile.value).fileinput({
                language: state.uploadLang,
                theme: "fa6",
                dropZoneTitle: state.uploadTip,
                showClose: false,
                browseClass:"btn btn-primary btn-df",
                allowedFileExtensions: eval('('+props.uploadAllow+')'),
                uploadUrl: props.uploadAction,
                maxFileCount: isNaN(Number(props.uploadCount)) ? 1 : Number(props.uploadCount)
            });

            $(state.uploadFile.value).on('fileuploaded', function(event, data) {
                state.bsModal.hide();
                state.show = false;
                $(state.uploadFile.value).fileinput('clear');
                context.emit("upload-success",data)
            });

            $(state.uploadFile.value).on('fileuploaderror', function(event, data, msg) {
                if(data.jqXHR.responseText) {
                    var errMsg = eval(data.jqXHR.responseText);
                    context.emit("upload-error",errMsg);
                }
            });
        }

        onMounted(()=>{
            const html = document.querySelector('html');
            html.addEventListener("loaded",()=>{
                updateLangText();
                initBsModal();
                initUploadFile();
            })
        })

        return { ...state,modalFade }
    }
}

export const upgradeModalComponent = {
    template: `<div :class="['modal',{'fade':modalFade===undefined ? false : JSON.parse(modalFade)}]" data-bs-backdrop="static" tabindex="-1" aria-hidden="true" ref="modal">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div :class="['modal-content front',{'front0':!showLog},{'front180':showLog}]">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <cn>升级包</cn>
                                <en>Upgrade</en>
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body px-3">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th>
                                        <cn>序号</cn>
                                        <en>Num</en>
                                    </th>
                                    <th>
                                        <cn>名称</cn>
                                        <en>Name</en>
                                    </th>
                                    <th>
                                        <cn>版本</cn>
                                        <en>Build</en>
                                    </th>
                                    <th>
                                        <cn>日期</cn>
                                        <en>Date</en>
                                    </th>
                                    <th>
                                        <cn>级别</cn>
                                        <en>Impact</en>
                                    </th>
                                    <th>
                                        <cn>日志</cn>
                                        <en>Log</en>
                                    </th>
                                    <th>
                                        <cn>操作</cn>
                                        <en>Option</en>
                                    </th>
                                    <th>
                                        <cn>下载</cn>
                                        <en>Download</en>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,index) in systemPatchs" :key="item.id">
                                    <td>{{index+1}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.build}}</td>
                                    <td>{{item.sys_ver}}</td>
                                    <td v-if="item.impact === '1'" class="force-color-red">
                                        <cn>重要</cn>
                                        <en>impact</en>
                                    </td>
                                    <td v-else>
                                        <cn>普通</cn>
                                        <en>normal</en>
                                    </td>
                                    <td>
                                        <a class="force-cursor-pointer" @click="showPatchVersionLog(index)">
                                            <cn>更新日志</cn>
                                            <en>Show logs</en>
                                        </a>
                                    </td>
                                    <td>
                                        <a class="force-cursor-pointer" @click="handleUpdatePatch(index)">
                                            <div v-if="upgradePatch.id === item.id && hadUpdate">{{updatePercent}}%</div>
                                            <div v-else>
                                                <cn>更新</cn>
                                                <en>Update</en>
                                            </div>
                                        </a>
                                    </td>
                                    <td>
                                        <a class="force-cursor-pointer" @click="handleDownloadPatch(index)">
                                            <cn>下载</cn>
                                            <en>Download</en>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="row mt-4 mb-2">
                                <div class="col-lg-12">
                                    <cn>Tip：级别标记为<cn style="color: red">重要</cn>的升级包不能跳过，更新之后才能继续更新。</cn>
                                    <en>Tip：Upgrade packages marked as <en style="color: red">impact</en> cannot be skipped and can only be updated after they have been updated</en>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="['modal-content rear',{'rear180':!showLog},{'rear0':showLog}]">
                        <div v-if="Object.keys(showLogPatch).length > 0">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    Build {{showLogPatch.sys_ver}}
                                </h5>
                                <button type="button" class="btn-close" @click="hidePatchVersionLog"></button>
                            </div>
                            <div class="modal-body">
                                <ul>
                                    <li class="mt-2" v-for="(it,idx) in handleVersionLogs" :key="idx" style="font-size: 15px;white-space:pre-wrap;">{{it}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
    props:['modalShow','modalFade','checkUpgrade','patchSn'],
    setup(props,context) {

        const { modalFade,checkUpgrade,patchSn } = toRefs(props);

        const state = {
            modal: ref(null),
            checkUpgrade: ref(false),
            systemPatchs:reactive([]),
            showLog:ref(false),
            showLogPatch:ref({}),
            hadUpdate:ref(false),
            updatePercent:ref(0),
            upgradePatch:ref({}),
            facAliase:"",
            bsModal: {},
        }

        watchEffect(async ()=>{
            if(checkUpgrade.value) {
                let result = await func("/link/mgr/upgrade/checkHelpNet");
                if (result.status === "error") {
                    alertMsg(result.msg, "error");
                    return;
                }

                if(!patchSn.value) {
                    result = await func("/link/mgr/upgrade/getSystemAliase");
                    if (result.status === "error") {
                        alertMsg(result.msg, "error");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    if (result.data.length === 0) {
                        alertMsg("<cn>已经是最新版本</cn><en>It is the latest version</en>", "success");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    state.facAliase = result.data[0].aliase;

                    result = await func("/link/mgr/upgrade/getAllSystemPatch");
                    if (result.status === "error") {
                        alertMsg(result.msg, "error");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    if (result.data.length === 0) {
                        alertMsg("<cn>已经是最新版本</cn><en>It is the latest version</en>", "success");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    state.systemPatchs.splice(0);
                    state.systemPatchs.push(...result.data);

                    result = await func("/link/mgr/upgrade/checkVersionMaster");
                    if (result.status === "error") {
                        alertMsg(result.msg, "error");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    if (result.data === 0) {
                        confirm({
                            title: '<cn>注意</cn><en>Tip</en>',
                            content: '<cn>设备可能升级过其他固件，如果继续升级，功能可能会被覆盖，是否继续?</cn><en>The device may have been upgraded with custom firmware, and the upgrade function may be overwritten. Do you want to continue?</en>',
                            buttons: {
                                ok: {
                                    text: "<cn>继续</cn><en>Continue</en>",
                                    btnClass: 'btn-primary',
                                    keys: ['enter'],
                                    action: () => {
                                        state.bsModal.show();
                                    }
                                },
                                cancel: {
                                    text: "<cn>取消</cn><en>Cancel</en>",
                                    action: ()=>{
                                        context.emit('update:checkUpgrade', false);
                                    }
                                }
                            }
                        });
                    } else {
                        state.bsModal.show();
                    }
                } else {
                    let result = await func("/link/mgr/upgrade/getSystemAliase");
                    if (result.status === "error") {
                        alertMsg(result.msg, "error");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    if (result.data.length === 0) {
                        alertMsg("<cn>无效固件编号</cn><en>Invalid upgrade sn</en>", "error");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    state.facAliase = result.data[0].aliase;

                    result = await func("/link/mgr/upgrade/getSystemPatchBySn",{"sn": patchSn.value});
                    if (result.data.length === 0) {
                        alertMsg("<cn>无效固件编号</cn><en>Invalid upgrade sn</en>", "error");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    state.systemPatchs.splice(0);
                    state.systemPatchs.push(...result.data);
                    state.bsModal.show();
                }
            }
        })

        const handleVersionLogs = computed(()=>{
            const regex = /[\r\n\t]/g;
            state.showLogPatch.value.description = state.showLogPatch.value.description.replace(regex,"");
            return state.showLogPatch.value.description.split(";").filter((item)=>{
                return item !== "";
            })
        })

        const showPatchVersionLog = idx => {
            state.showLogPatch.value = state.systemPatchs[idx];
            state.showLog.value = true;
        }

        const hidePatchVersionLog = () => {
            state.showLog.value = false;
        }

        const getUpdateFileSize = async name => {
            const params = {
                "action": "get_file_size",
                "name": name
            };
            const data = await axios_post("/link/upgrade.php", params);
            return data.size;
        };

        const handleUpdatePatch = idx => {
            if(state.hadUpdate.value)
                return;

            state.upgradePatch.value = state.systemPatchs[idx];
            const patch = state.systemPatchs[idx];
            const chip = patch.chip;
            let name = patch.name;
            let type = "update";
            if(name.indexOf("_sn_") > 0) {
                name = name.replace("_sn_","_"+state.facAliase+"_");
                type = "sn";
            } else {
                name = name.replace("_","_"+state.facAliase+"_");
                type = "update";
            }

            const params = {
                action:"update", name:name,
                chip:chip, type:type
            }

            axios_post('/link/upgrade.php', params)
                .then(async data => {
                    const total = Number(data.size);
                    state.hadUpdate.value = true;
                    state.updatePercent.value = 0;
                    if(total > 0) {
                        const timerId = setInterval(async function () {
                            const size = await getUpdateFileSize(name);
                            state.updatePercent.value = parseInt(size/total * 100);
                            if (size >= total) {
                                clearInterval(timerId);
                                state.bsModal.hide();
                                context.emit('update:checkUpgrade', false);
                                state.hadUpdate.value = false;
                                state.upgradePatch.value = {};
                                rebootConfirm('下载完成，是否立即重启系统完成更新？');
                            }
                        }, 1000);
                    }
                })
        }

        const handleDownloadPatch = idx => {
            state.upgradePatch.value = state.systemPatchs[idx];
            const patch = state.systemPatchs[idx];
            const chip = patch.chip;
            let name = patch.name;
            let type = "update";
            if(name.indexOf("_sn_") > 0) {
                name = name.replace("_sn_","_"+state.facAliase+"_");
                type = "sn";
            } else {
                name = name.replace("_","_"+state.facAliase+"_");
                type = "update";
            }

            const params = {
                action:"download", name:name,
                chip:chip, type:type
            }

            const fileName = name;
            axios_post('/link/upgrade.php',params, { responseType: 'arraybuffer' })
                .then(data => {
                    const blob = new Blob([data], { type: 'application/octet-stream' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                })
        }

        onMounted(()=>{
            state.bsModal = new bootstrap.Modal(state.modal.value);
            state.modal.value.addEventListener('hide.bs.modal',() => {
                context.emit('update:checkUpgrade', false);
            });
        })
        return { ...state,modalFade,handleVersionLogs,showPatchVersionLog,hidePatchVersionLog,handleUpdatePatch,handleDownloadPatch }
    }
}

export const customModalComponent = {
    template: `<div :class="['modal',{'fade':modalFade}]"  tabindex="-1" aria-hidden="true" ref="modal">
                    <div :class="['modal-dialog modal-dialog-centered',modalSize]">
                      <div :class="['modal-content',contentClass]">
                        <div class="modal-header" v-if="hadHeader">
                          <h5 class="modal-title">{{modalTitle}}</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div :class="['modal-body',bodyClass]">
                            <slot></slot>
                        </div>
                        <div class="modal-footer" v-if="hadFooter">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{modalCancelBtnName}}</button>
                            <button type="button" :class="['btn btn-primary',arrowClass]" @click="confirmBtnClick">{{modalConfirmBtnName}}</button>
                          </div>
                      </div>
                    </div>
               </div>`,
    props: {
        modalSize: {
          type: String,
          default: ""
        },
        hadHeader: {
            type: Boolean,
            default: true
        },
        hadFooter: {
            type: Boolean,
            default: true
        },
        modalTitle: {
            type:String,
            default: "标题"
        },
        modalShow: {
            type: Boolean,
            default: false
        },
        modalFade: {
            type: Boolean,
            default: true
        },
        bodyClass: {
            type: String,
            default: ""
        },
        contentClass: {
            type: String,
            default: ""
        },
        confirmBtnName: {
            type: String,
            default:"确定"
        },
        cancelBtnName: {
            type: String,
            default:"取消"
        }
    },
    setup(props,context) {

        const { modalShow,modalFade } = toRefs(props);
        const state = {
            modal: ref(null),
            modalTitle: ref(""),
            modalConfirmBtnName:ref("确定"),
            modalCancelBtnName:ref("取消"),
            show: false,
            bsModal: {},
        }

        watch(modalShow,()=>{
            state.show = !state.show;
            if(state.show)
                state.bsModal.show();
            else
                state.bsModal.hide();
        })

        const initBsModal = () => {
            state.bsModal = new bootstrap.Modal(state.modal.value);
            if(modalShow.value) {
                state.bsModal.show();
                state.show = true;
            } else {
                state.bsModal.hide();
                state.show = false;
            }
            state.modal.value.addEventListener('hide.bs.modal',() => {
                state.show = false;
            });
        }

        const confirmBtnClick = () => {
            context.emit("confirm-btn-click");
        }

        const updateLangText = () => {
            const html = document.querySelector('html');
            let lang = html.getAttribute('data-bs-language');
            if(props.modalTitle !== undefined) {
                const [title1,title2] = props.modalTitle.split("&");
                if(lang === "cn" || title2 === undefined)
                    state.modalTitle.value = title1;
                else
                    state.modalTitle.value = title2;
            }

            if(props.confirmBtnName !== undefined) {
                const [name1,name2] = props.confirmBtnName.split("&");
                if(lang === "cn" || name2 === undefined)
                    state.modalConfirmBtnName.value = name1;
                else
                    state.modalConfirmBtnName.value = name2;
            }

            if(props.cancelBtnName !== undefined) {
                const [name1,name2] = props.cancelBtnName.split("&");
                if(lang === "cn" || name2 === undefined)
                    state.modalCancelBtnName.value = name1;
                else
                    state.modalCancelBtnName.value = name2;
            }
        }

        onMounted(()=>{
            const html = document.querySelector('html');
            html.addEventListener("loaded",()=>{
                updateLangText();
                initBsModal();
            })
        })

        return { ...state,modalFade,confirmBtnClick }
    }
}

export const loadingButtonComponent = {
    template: `<button type="button" :class="customClass" @click="onButtonClick">
                    <span v-if="hadLoading" class="spinner-border spinner-border-sm"></span>
                    <span v-else >
                        <slot></slot>
                    </span>
                </button>`,
    props:['customClass','hadLoading'],
    setup(props,context) {

        const { hadLoading } = toRefs(props);

        const onButtonClick = () => {
            context.emit("button-click","click")
        }

        return { hadLoading,onButtonClick }
    }
}

export const ptzDirectComponent = {
    template: `<div class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-lg-6 text-center">
                                <cn>云台控制</cn>
                                <en>PTZ</en>
                            </div>
                            <div class="col-lg-6 text-center">
                                <cn>预置位</cn>
                                <en>Preset</en>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 mt-3">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="row">
                                    <div class="col-lg-12 text-center">
                                        <button type="button" @mousedown="handlePtzMove('left-up')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'force-visibility-hide':!sticks.includes('left-up')}]">
                                            <i class="fa-solid fa-circle-arrow-up" style="transform: rotate(-45deg);-o-transform: rotate(-45deg);-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);"></i>
                                        </button>
                                        <button type="button" @mousedown="handlePtzMove('up')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'force-visibility-hide':!sticks.includes('up')}]" :style="{'margin':'0px '+gop+'px'}">
                                            <i class="fa-solid fa-circle-arrow-up"></i>
                                        </button>
                                        <button type="button" @mousedown="handlePtzMove('right-up')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'force-visibility-hide':!sticks.includes('right-up')}]">
                                            <i class="fa-solid fa-circle-arrow-up" style="transform: rotate(45deg);-o-transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);"></i>
                                        </button>
                                    </div>
                                    <div class="col-lg-12 text-center" :style="{'marginTop':gop+'px'}">
                                        <button type="button" @mousedown="handlePtzMove('left')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'force-visibility-hide':!sticks.includes('left')}]">
                                            <i class="fa-solid fa-circle-arrow-left"></i>
                                        </button>
                                        <button type="button" @mouseup="handlePtzMove('home')" :class="['btn btn-primary',homeClass,{'force-visibility-hide':!sticks.includes('home')}]" :style="{'margin':'0px '+gop+'px'}">
                                            <i class="fa-solid fa-house"></i>
                                        </button>
                                        <button type="button" @mousedown="handlePtzMove('right')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'force-visibility-hide':!sticks.includes('right')}]">
                                            <i class="fa-solid fa-circle-arrow-right"></i>
                                        </button>
                                    </div>
                                    <div class="col-lg-12 text-center" :style="{'marginTop':gop+'px'}">
                                        <button type="button" @mousedown="handlePtzMove('left-down')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'force-visibility-hide':!sticks.includes('left-down')}]">
                                            <i class="fa-solid fa-circle-arrow-up" style="transform: rotate(-135deg);-o-transform: rotate(-135deg);-webkit-transform: rotate(-135deg);-moz-transform: rotate(-135deg);"></i>
                                        </button>
                                        <button type="button" @mousedown="handlePtzMove('down')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'force-visibility-hide':!sticks.includes('down')}]" :style="{'margin':'0px '+gop+'px'}">
                                            <i class="fa-solid fa-circle-arrow-down"></i>
                                        </button>
                                        <button type="button" @mousedown="handlePtzMove('right-down')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'force-visibility-hide':!sticks.includes('right-down')}]">
                                            <i class="fa-solid fa-circle-arrow-up" style="transform: rotate(135deg);-o-transform: rotate(135deg);-webkit-transform: rotate(135deg);-moz-transform: rotate(130deg);"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-3 text-center">
                                        <cn>焦距</cn>
                                        <en>Zoom</en>
                                    </div>
                                    <div class="col-lg-7 pt-2">
                                        <noui-slider v-model="zoom" :min="zoomMin" :max="zoomMax" :step="zoomStep" :fix="zoomFix" @slide-end="onTouchSlideEnd"></noui-slider>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="row">
                                    <div class="col-lg-12 text-center">
                                        <button type="button" @click="updatePreset(1)" :class="['btn',{'btn-primary':presetVal===1},{'btn-default':presetVal!==1},arrowClass]">
                                            1
                                        </button>
                                        <button type="button" @click="updatePreset(2)" :class="['btn',{'btn-primary':presetVal===2},{'btn-default':presetVal!==2},arrowClass]" :style="{'margin':'0px '+gop+'px'}">
                                            2
                                        </button>
                                        <button type="button" @click="updatePreset(3)" :class="['btn',{'btn-primary':presetVal===3},{'btn-default':presetVal!==3},arrowClass]">
                                            3
                                        </button>
                                    </div>
                                    <div class="col-lg-12 text-center" :style="{'marginTop':gop+'px'}">
                                        <button type="button" @click="updatePreset(4)" :class="['btn',{'btn-primary':presetVal===4},{'btn-default':presetVal!==4},arrowClass]">
                                            4
                                        </button>
                                        <button type="button" @click="updatePreset(5)" :class="['btn',{'btn-primary':presetVal===5},{'btn-default':presetVal!==5},arrowClass]" :style="{'margin':'0px '+gop+'px'}">
                                            5
                                        </button>
                                        <button type="button" @click="updatePreset(6)" :class="['btn',{'btn-primary':presetVal===6},{'btn-default':presetVal!==6},arrowClass]">
                                            6
                                        </button>
                                    </div>
                                    <div class="col-lg-12 text-center" :style="{'marginTop':gop+'px'}">
                                        <button type="button" @click="updatePreset(7)" :class="['btn',{'btn-primary':presetVal===7},{'btn-default':presetVal!==7},arrowClass]">
                                            7
                                        </button>
                                        <button type="button" @click="updatePreset(8)" :class="['btn',{'btn-primary':presetVal===8},{'btn-default':presetVal!==8},arrowClass]" :style="{'margin':'0px '+gop+'px'}">
                                            8
                                        </button>
                                        <button type="button" @click="updatePreset(9)" :class="['btn',{'btn-primary':presetVal===9},{'btn-default':presetVal!==9},arrowClass]">
                                            9
                                        </button>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="row-lg-12 text-center">
                                        <button type="button" class="btn btn-primary border-3 px-3 me-1" @click="handleCallPreset">
                                            <cn>调用</cn>
                                            <en>Get</en>
                                        </button>
                                        <button type="button" class="btn btn-primary border-3 px-3" @click="handleSetPreset">
                                            <cn>设置</cn>
                                            <en>Set</en>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
    props: {
        arrowClass: {
            type: String,
            default: "",
        },
        homeClass: {
            type: String,
            default: "",
        },
        gop: {
            type: Number,
            default: 5
        },
        sticks: {
            type: Array,
            default: ['left', 'left-up', 'up', 'right-up', 'right', 'right-down', 'down', 'left-down','home']
        },
        zoomVal: {
            type: Number,
            default: 0
        },
        zoomMin: {
            type: Number,
            default: 0
        },
        zoomMax: {
            type: Number,
            default: 10
        },
        zoomStep: {
            type: Number,
            default: 1
        },
        zoomFix: {
            type: Number,
            default: 0
        }
    },
    components:{
        "noui-slider": nouiSliderComponent
    },
    setup(props,context) {

        const state = {
            zoom: ref(0),
            presetVal: ref(0)
        }

        watch(()=>props.zoomVal,(newValue,oldValue) => {
            console.log(newValue);
            state.zoom.value = newValue;
        })

        const handlePtzMove = type => {
            context.emit("ptz-move",type)
        }

        const updatePreset = val => {
            state.presetVal.value = val;
        }

        const onTouchSlideEnd = val => {
            context.emit('zoom-change', val);
        }

        const handleCallPreset = () => {
            context.emit('call-preset',state.presetVal.value);
        }

        const handleSetPreset = () => {
            context.emit('set-preset',state.presetVal.value);
        }

        return { ...state,handlePtzMove,onTouchSlideEnd,updatePreset,handleCallPreset,handleSetPreset }
    }
}

