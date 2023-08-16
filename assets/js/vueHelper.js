
import {ref,reactive,toRefs,watch,watchEffect,computed,onMounted,nextTick} from '../plugins/vue/vue.esm.prod.js';
import * as vueColor from '../plugins/vueColor/vue.color.esm.js'
import * as Popper from '../plugins/popper/popper.esm.js'
import $ from '../plugins/jquery/jquery.esm.js'

export const apexChartsDirective = {
    mounted(el,bindings,node) {
        let tx = bindings.value.data1;
        let rx = bindings.value.data2;

        let data = [];
        for(let i=0;i<50;i++)
            data.push(0);

        let options = {
            series: [{
                name: 'tx',
                data: data
            }, {
                name: 'rx',
                data: data
            }],
            chart: {
                foreColor: '#9ba7b2',
                height: 360,
                type: 'area',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: true
                },
            },
            colors: ["#0d6efd", '#20c997'],
            title: {
                align: 'left',
                style: {
                    fontSize: "16px",
                    color: '#666'
                }
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                borderColor: 'rgba(255, 255, 255, 0.15)',
                strokeDashArray: 4,
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            xaxis: {
                labels: {
                    show: false // 隐藏 x 轴的标签文本
                },
                axisTicks: {
                    show: false // 隐藏 x 轴的刻度线
                },
                gridLines: {
                    show: false // 隐藏 x 轴的网格线
                }
            }
        };
        app.chart = new ApexCharts(el, options);
        app.chart.render();
    },
    updated(el,bindings,vnode) {

        // 获取当前的 Series 数据数组
        let data1 = app.chart.w.globals.series[0];
        let data2 = app.chart.w.globals.series[1];

        if(data1 !== undefined && data2 != undefined) {
            if(data1.length > 100) {
                data1.shift();
                data2.shift();
            }
            data1.push(bindings.value.data1);
            data2.push(bindings.value.data2);
        }
        app.chart.updateSeries([{data: data1}, {data: data2}], false);

    }
}

export const pieChartDirective = {
    mounted(el,bindings,vnode) {
        let bgColor = bindings.value.bgColor;
        let color = bindings.value.color;
        $(el).easyPieChart({
            easing: 'easeOutBounce',
            barColor : bgColor,
            lineWidth: 7,
            trackColor : color,
            scaleColor: false,
            onStep: (from, to, percent) => {
                $(el).find('.w_percent').text(Math.round(percent));
            }

        });
    },
    updated(el,bindings,node) {
        $(el).data( 'easyPieChart' ).update( bindings.value.val);
    }
};



export const languageOptionDirective = {
    mounted(el, binding, vnode) {

        const update = () => {
            const lang = html.getAttribute('data-bs-language');
            el.textContent = el.getAttribute(lang);
        }

        const html = document.querySelector('html');
        update();
        const observer = new MutationObserver(() => {
            update();
        });

        const config = { attributes: true };
        observer.observe(html, config);
    }
};

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
                    $(this).bind("plothover", (event, pos, item) => {
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

        onMounted(()=>{
            $(bs_switch.value).bootstrapSwitch({
                "state": props.modelValue,
                "size": size,
                onInit(dom,event,state) {
                    $(bs_switch.value).on('focus.bootstrapSwitch',() => {
                        this.$wrapper.removeClass("bootstrap-switch-focused")
                    })
                },
                onSwitchChange(event,state) {
                    context.emit('update:modelValue', state);
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
            let [value1,value2] = selectValue.value.split(this.split);
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
    props: ['modelValue', 'min', 'max', 'step','fix'],
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

        onMounted(()=>{
            noUiSlider.create(slider.value, {
                start: Number(props.modelValue),
                connect: [true, false],
                tooltips: {
                    to: formatTooltipValue,
                },
                range: {'min': Number(props.min), 'max': Number(props.max)},
                step: Number(props.step)
            });

            handle.value = slider.value.querySelector('.noUi-handle');
            hideTooltip();

            slider.value.addEventListener('mouseenter', () => {
                showTooltip();
            });

            slider.value.addEventListener('mouseleave', () => {
                hideTooltip();
            });

            slider.value.noUiSlider.on('slide', (values, mark) => {
                context.emit('update:modelValue', values[mark]);
            });
        })

        return { slider }
    }
};


export const flvPlayerComponent = {
    template: `<div style="width:100%; padding-bottom: 56.25%;  position: relative;" ref="flv">
                    <video autoplay controls muted style="width:100%;height: 100%; position: absolute; background: #555;" ref="video"></video>
                    <div style="position: absolute;width: 100%;height: 100%" ref="jess"></div>
                    <div class="force-video-cloud" ref="cloud">
                        <div class="loading"></div>
                    </div>
              </div>`,
    props: ['url','codec','audio','buffer','canplay'],
    setup(props,context) {

        const { url,codec,audio,buffer,canplay } = toRefs(props);
        const flv = ref(null);
        const video = ref(null);
        const jess = ref(null);
        const cloud = ref(null);

        let player = {};
        let hadInitPlayer = false;

        watchEffect(()=>{
            let hadPlay = canplay.value;
            if(hadPlay === undefined)
                hadPlay = true;

            if(hadPlay) {
                if(url.value !== "" && codec.value !== "" && audio.value !== "" && buffer.value !== "") {
                    if(hadInitPlayer)
                        destoryPlayer();
                    setTimeout(initPlayer,300);
                }
            } else {
                if(hadInitPlayer)
                    destoryPlayer();
            }
        })

        const initPlayer = () => {
            if(props.url === "" || props.codec === "" || props.audio === "")
                return;

            if(props.codec === "h265") {
                video.value.style.display = 'none';
                jess.value.style.display = 'block';
                player =  new Jessibuca({
                    container: jess.value,
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
                player.play(url.value);
                player.on("play", (flag) => {
                    cloud.value.style.display = 'none'
                })
            } else {
                video.value.style.display = 'block';
                jess.value.style.display = 'none';
                player = flvjs.createPlayer({
                    type: 'flv',
                    audio: JSON.parse(audio.value),
                    url: url.value
                });
                player.attachMediaElement(video.value);
                player.load();
                player.play();

                video.value.addEventListener("canplay",() => {
                    cloud.value.style.display = 'none'
                });
            }
            hadInitPlayer = true;
        }
        const destoryPlayer = () => {
            if(Object.keys(player).length > 0) {
                if(player.hasOwnProperty("unload")) {
                    player.unload();
                    player.detachMediaElement();
                }
                player.destroy();
                player = {};
            }
            cloud.value.style.display = 'flex';
            video.value.removeEventListener("canplay",()=>{});
            hadInitPlayer = false;
        }
        const checkDelay = () => {
            if (Object.keys(player).length > 0 && player.hasOwnProperty("buffered") && player.buffered.length > 0) {
                if (player.buffered.end(0) - player.currentTime > 1.5) {
                    player.currentTime = player.buffered.end(0) - 0.2
                }
            }
            setTimeout(checkDelay,1000);
        }

        onMounted(()=>{
            checkDelay();
        })

        return {flv,video,jess,cloud}
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

        watch(modelValue,()=>{
            $(timepicker.value).timepicker('setTime', modelValue.value);
        })

        onMounted(()=>{
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
        "sketch-picker": vueColor.Sketch
    },
    directives: {
        "click-outside": {
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
    },
    setup(props,context){

        const state = {
            picker: ref(null),
            popper: ref(null),
            pickerColor: ref(""),
            sketchColor: ref(""),
            partyPopper: {},
            popperOptions: reactive({})
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

        nextTick(()=>{
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
            state.pickerColor.value = props.modelValue;
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


export const customModalComponent = {
    template: `<div :class="['modal',{'fade':modalFade===undefined ? false : JSON.parse(modalFade)}]"  tabindex="-1" aria-hidden="true" ref="modal">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                      <div class="modal-content" style="position: absolute;width: 100%;height: 100%;">
                        <div class="modal-header" v-if="hadHeader === undefined || JSON.parse(hadHeader)">
                          <h5 class="modal-title">{{modalTitle}}</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div :class="['modal-body',bodyClass]">
<!--                            <div ref="simplebar" style="width: 100%;height: 100%;">-->
                                <slot></slot>
<!--                            </div>-->
                        </div>
                        <div class="modal-footer" v-if="hadFooter === undefined || JSON.parse(hadFooter)">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                      </div>
                    </div>
               </div>`,
    props:['hadHeader','hadFooter','modalTitle','modalShow','modalFade','bodyClass'],
    setup(props,context) {

        const { modalShow,modalFade } = toRefs(props);

        const state = {
            modal: ref(null),
            simplebar: ref(null),
            modalTitle: ref(""),
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
        }

        onMounted(()=>{
            //new SimpleBar(state.simplebar.value);
            const html = document.querySelector('html');
            html.addEventListener("loaded",()=>{
                updateLangText();
                initBsModal();
            })
        })

        return { ...state,modalFade }
    }
}

export const wifiViewComponent = {
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


export const antenanViewComponent = {
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

