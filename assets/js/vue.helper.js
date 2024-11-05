import vue from "./vue.build.js";
import $ from '../plugins/jquery/jquery.esm.js';
import '../plugins/switch/js/bootstrap-switch.min.js';
import "../plugins/timepicker/js/bootstrap-timepicker.js";
import * as noUiSlider from "../plugins/nouislider/js/nouislider.esm.js";
import mutationObserver from '../plugins/polyfill/mutationobserver.esm.js'
import {md5} from "../plugins/md5/js.md5.esm.js";
import {alertMsg, axios_post, clearReactiveArray, confirm, formatTime, func, getUrlParam, isEmpty, rebootConfirm} from './lp.utils.js'
import {useDiskConf, useLedConf, useThemeConf,useCaptureConf} from "./vue.hooks.js";
import {shirtFlagComponent} from "./vue.flags.js"

const {ref, reactive, toRefs, watch, watchEffect, computed, onMounted, nextTick, defineAsyncComponent} = vue;

export const ignoreCustomElementPlugin = {
    install: (app) => {
        app.config.compilerOptions.isCustomElement = (tag) => tag === 'cn' || tag === 'en';
    }
};

export const filterKeywordPlugin = {
    install(app) {
        const filter = getUrlParam("filter");
        if (!filter)
            return;
        const param = {"url": location.pathname, "filter": filter}
        func("/root/getFilterKeywords", param).then(result => {
            const keyword = result.data;
            if (keyword) {
                // nextTick(() => {
                setTimeout(() => {
                    const elements = document.querySelectorAll('main cn, main en');
                    elements.forEach((el) => {
                        const textContent = el.textContent;
                        const startIndex = textContent.indexOf(keyword);
                        if (startIndex !== -1) {
                            let currentElement = el.parentNode;
                            while (currentElement) {
                                currentElement = currentElement.parentNode;
                                if (currentElement) {
                                    let classList = currentElement.classList;
                                    if (classList && classList.contains("tab-pane")) {
                                        let tabId = currentElement.id;
                                        let navLinks = document.querySelectorAll(".nav.nav-tabs > .nav-item > .nav-link");
                                        navLinks.forEach(item => {
                                            if (item.getAttribute('href') === '#' + tabId) {
                                                if (item.classList)
                                                    item.classList.add("active");
                                            } else {
                                                if (item.classList)
                                                    item.classList.remove("active");
                                            }
                                        })
                                        const siblings = Array.from(currentElement.parentElement.children);
                                        siblings.forEach((sibling) => {
                                            sibling.classList.remove('active');
                                            sibling.classList.remove('show');
                                        });
                                        currentElement.classList.add('active');
                                        currentElement.classList.add('show');
                                    }
                                }
                            }
                            const endIndex = startIndex + keyword.length;
                            const beforeText = textContent.slice(0, startIndex);
                            const highlightedText = textContent.slice(startIndex, endIndex);
                            const afterText = textContent.slice(endIndex);
                            const highlightedElement = document.createElement('span');
                            highlightedElement.style.fontWeight = '700';
                            highlightedElement.style.color = 'red';
                            highlightedElement.textContent = highlightedText;
                            el.innerHTML = beforeText;
                            el.appendChild(highlightedElement);
                            el.innerHTML += afterText;
                        }
                    })
                }, 100);
                // })
            }
        })
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
        const observer = new mutationObserver(() => {
            update();
        });
        const config = {
            attributes: true,
            attributeFilter: ["data-bs-language"],
            subtree: false
        };
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
    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        activeColor: {
            type: String,
            default: "#fb0"
        }
    },
    setup(props, context) {

        const tmp_mask = ref(null);
        const tmp_text = ref(null);

        const {modelValue, activeColor} = toRefs(props);

        watch(modelValue, () => {
            tmp_mask.value.style.bottom = modelValue.value + '%';
            tmp_text.value.textContent = modelValue.value + '℃';
        })

        watch(activeColor,() => tmp_mask.value.parentElement.style.background = activeColor.value);

        onMounted(() => tmp_mask.value.parentElement.style.background = activeColor.value);

        return {tmp_mask, tmp_text}
    }
};

export const statusPieChartComponent = {
    template: `<div class="pie">
                    <div class="chart" ref="pie_chart"></div>
                    <span class="percent" ref="pie_text"></span>
               </div>`,
    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        activeColor: {
            type: String,
            default: "#fb0"
        },
        trackColor: {
            type: String,
            default: "#777"
        }
    },
    setup(props, context) {

        const pie_chart = ref(null);
        const pie_text = ref(null);

        const {modelValue,activeColor} = toRefs(props);

        watch(modelValue, newValue => {
            if ($(pie_chart.value).data('easyPieChart'))
                $(pie_chart.value).data('easyPieChart').update(newValue);
        })

        watch(activeColor,newValue => {
            if ($(pie_chart.value).data('easyPieChart')) {
                $(pie_chart.value).data('easyPieChart').update(pie_text.value.textContent).options.barColor = newValue;
            }
        })

        onMounted(() => {
            pie_text.value.textContent = "0%";
            $(pie_chart.value).easyPieChart({
                easing: 'easeOutElastic',
                delay: 2000,
                barColor: props.activeColor,
                trackColor: props.trackColor,
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

        return {pie_chart, pie_text}
    }
};

export const netFlotChartComponent = {
    template: `<div class="col-lg-12 netState" ref="net_chart"> </div>`,
    props: {
        line1Color: {
            type: String,
            default: "#FB0"
        },
        line2Color: {
            type: String,
            default: "#555"
        },
        maxy: {
            type: Number,
            maxy: 800
        },
        data1: {
            type: Array,
            default: [],
        },
        data2: {
            type: Array,
            default: []
        },
        tickColor: {
            type: String,
            default: "#eee"
        },
        borderColor: {
            type: String,
            default: "#ccc"
        },
        tipBorderColor: {
            type: String,
            default: "#fb0"
        },
        tipBgColor: {
            type: String,
            default: "#fff"
        },
        tipTxtColor: {
            type: String,
            default: "#555"
        }
    },
    setup(props, context) {
        const net_chart = ref(null);
        let plot = {};

        const showTooltip = (x, y, color, contents) => {
            $('<div id="tooltip">' + contents + '</div>').css({
                position: 'absolute',
                display: 'none',
                top: y - 40,
                left: x - 120,
                border: '2px solid ' + props.tipBorderColor,
                padding: '3px',
                'font-size': '9px',
                'border-radius': '5px',
                'color': props.tipTxtColor,
                'background-color': props.tipBgColor,
                'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                opacity: 0.9
            }).appendTo("body").fadeIn(200);
        }

        const initPlot = () => {
            if (Object.keys(plot).length === 0) {
                let color = props.color;
                let data1 = props.data1;
                let data2 = props.data2;
                plot = $.plot(net_chart.value, [
                        {
                            data: data1,
                            lines: {
                                fill: true,
                            }
                        },
                        {
                            data: data2,
                            lines: {
                                show: true,
                            }
                        }]
                    ,
                    {
                        series: {
                            lines: {
                                show: true,
                                fill: true,
                            },
                            shadowSize: 0
                        },
                        yaxis: {
                            min: 0,
                            max: 800,
                            tickSize: 160,
                            tickFormatter: (v, axis) => {
                                if (axis.max < 1024)
                                    return v + "Kb/s";
                                else {
                                    v /= 1024;

                                    if (axis.max < 10240)
                                        return v.toFixed(2) + "Mb/s";
                                    else
                                        return Math.floor(v) + "Mb/s";
                                }
                            }
                        },
                        xaxis: {
                            show: false
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: props.tickColor,
                            borderWidth: 1,
                            borderColor: props.borderColor,
                        },
                        colors: [props.line1Color, props.line2Color],
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
                                if (data > 1024)
                                    data = parseInt(data / 1024) + "Mb/s";
                                else
                                    data += "kb/s";

                                if (item.seriesIndex === 0)
                                    showTooltip(item.pageX + 100, item.pageY - 10, color, "<cn>上行</cn><en>upward</en>: " + data);
                                if (item.seriesIndex === 1)
                                    showTooltip(item.pageX + 100, item.pageY - 10, color, "<cn>下行</cn><en>downward</en>: " + data);
                            }
                        } else {
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
            if (Object.keys(plot).length !== 0) {
                let maxy = props.maxy;
                let data1 = props.data1;
                let data2 = props.data2;
                plot.setData([data1, data2]);
                plot.draw();
                plot.getOptions().yaxes[0].max = maxy;
                plot.getOptions().yaxes[0].tickSize = Math.floor(maxy / 5);
                plot.setupGrid();
            }
        }

        watch(props.data1, () => {
            updatePlot();
        }, {deep: true})

        onMounted(() => {
            setTimeout(initPlot, 100);
        })

        return {net_chart}
    }
}


export const bootstrapSwitchComponent = {
    template: `<input type="checkbox" class="switch form-control" ref="bs_switch">`,
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "small" //normal
        }
    },
    setup(props, context) {

        const {modelValue, size} = toRefs(props);
        const bs_switch = ref(null);

        watch(modelValue, () => {
            $(bs_switch.value).bootstrapSwitch('state', modelValue.value, true);
        })

        onMounted(() => {
            $(bs_switch.value).bootstrapSwitch({
                "state": props.modelValue,
                "size": size.value,
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
        return {bs_switch}
    }
};


export const multipleSelectComponent = {
    template: `<select class="form-select" v-model="selectValue" @change="onSelectChange" ref="selectEle">
                    <slot></slot>
               </select>`,
    props: {
        value1: {
            type: [Number, String, Boolean],
            default: 0
        },
        value2: {
            type: [Number, String, Boolean],
            default: 0
        },
        split: {
            type: String,
            default: 0
        }
    },
    setup(props, context) {

        let selectValue = ref("");
        let selectEle = ref(null);

        watchEffect(() => {
            selectValue.value = props.value1 + props.split + props.value2;
        })

        const parseValue = (value) => {
            if (value === "true" || value === "false") {
                return JSON.parse(value);
            }
            return isNaN(Number(value)) ? value : Number(value);
        };

        const onSelectChange = () => {
            let [value1, value2] = selectValue.value.split(props.split);
            context.emit('update:value1', parseValue(value1));
            context.emit('update:value2', parseValue(value2));
            context.emit('select-change', parseValue(value1), parseValue(value2));
        }

        onMounted(() => {
            selectValue.value = props.value1 + props.split + props.value2;
            if (selectEle.value) {
                let valueExists = false;
                for (let i = 0; i < selectEle.value.options.length; i++) {
                    if (selectValue.value === selectEle.value.options[i].value)
                        valueExists = true;
                }
                if (!valueExists) {
                    const opt = new Option(selectValue.value, selectValue.value);
                    opt.selected = true;
                    selectEle.value.add(opt);
                }
            }
        })

        return {selectValue, onSelectChange, selectEle}
    }
};


export const multipleInputComponent = {
    template: `<input type="text" class="form-control" v-model="selectValue" @change="onInputChange">`,
    props: {
        value1: {
            type: [Number, String],
            default: 0
        },
        value2: {
            type: [Number, String],
            default: 0
        },
        split: {
            type: String,
            default: 0
        }
    },
    setup(props, context) {

        let selectValue = ref("");
        const {value1, value2} = toRefs(props);
        watchEffect(() => {
            const val1 = (typeof value1.value === "string") ? value1.value.trim() : value1.value;
            const val2 = (typeof value2.value === "string") ? value2.value.trim() : value2.value;
            selectValue.value = val1 + props.split + val2;
        })

        const onInputChange = () => {
            let [val1, val2] = selectValue.value.split(props.split);
            val1 = isNaN(Number(val1)) ? val1 : Number(val1);
            val2 = isNaN(Number(val2)) ? val2 : Number(val2);

            if (typeof val1 === "string")
                val1 = val1.trim();
            if (typeof val2 === "string")
                val2 = val2.trim();

            context.emit('update:value1', val1);
            context.emit('update:value2', val2);

            selectValue.value = val1 + props.split + val2;
        }

        return {selectValue, onInputChange}
    }
};

export const nouiSliderComponent = {
    template: `<div class="slider-wrap lp-cursor-pointer" ref="slider"></div>`,
    props: {
        modelValue: {
            type: [Number, String],
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
        },
        funcValue: {
            type: Number,
        },
        format: {
            type: String,
            default: ""
        },
        disable: {
            type: Boolean,
            default: false
        },
        index: {
            type: Number,
            default: 0
        }
    },
    setup(props, context) {
        const slider = ref(null);
        let handle = ref(null);
        let hover = false;
        let isSlide = false;
        const showTooltip = () => {
            let tooltip = handle.value.querySelector(".noUi-tooltip")
            tooltip.style.display = 'block';
            hover = true;
        }

        const hideTooltip = () => {
            let tooltip = handle.value.querySelector(".noUi-tooltip")
            tooltip.style.display = 'none';
            hover = false;
        }

        const formatTooltipValue = value => {
            if (isEmpty(props.format)) {
                if (props.fix === 0)
                    value = parseInt(value);
                else
                    value = parseFloat(value).toFixed(props.fix);
            }

            if (props.format === "time")
                value = formatTime(value);

            return value;
        }

        watch(() => props.modelValue, (newValue, oldValue) => {
            if (slider.value && !isSlide) {
                slider.value.noUiSlider.updateOptions({
                    start: newValue,
                    range: {'min': props.min, 'max': props.max},
                });
                if (!hover)
                    hideTooltip();
            }
        });

        watch(() => props.funcValue, (newValue, oldValue) => {
            if (slider.value && !isSlide) {
                slider.value.noUiSlider.updateOptions({
                    start: newValue,
                    range: {'min': props.min, 'max': props.max},
                });
                if (!hover)
                    hideTooltip();
            }
        });

        watch(() => props.max, (newValue, oldValue) => {
            if (slider.value && !isSlide) {
                slider.value.noUiSlider.updateOptions({
                    range: {'min': props.min, 'max': newValue},
                });
                if (!hover)
                    hideTooltip();
            }
        });

        onMounted(async () => {
            noUiSlider.create(slider.value, {
                start: props.modelValue,
                connect: [true, false],
                tooltips: {
                    to: formatTooltipValue,
                },
                range: {'min': props.min, 'max': props.max},
                step: props.step,
            });

            if (props.disable)
                slider.value.noUiSlider.disable();

            handle.value = slider.value.querySelector('.noUi-handle');
            hideTooltip();

            slider.value.addEventListener('mouseenter', () => {
                showTooltip();
            });

            slider.value.addEventListener('mouseleave', () => {
                hideTooltip();
            });

            slider.value.noUiSlider.on('slide', (values, mark) => {
                isSlide = true;
            });

            // slider.value.noUiSlider.on('end', (values, mark) => {
            //     isSlide = false;
            //     context.emit('update:modelValue', formatTooltipValue(values[mark]));
            //     context.emit('slide-end', formatTooltipValue(values[mark]),props.index);
            // });

            slider.value.noUiSlider.on('change', (values, mark) => {
                isSlide = false;
                context.emit('update:modelValue', formatTooltipValue(values[mark]));
                context.emit('slide-end', formatTooltipValue(values[mark]), props.index);
            });
        })

        return {slider}
    }
};

export const h5PlayerComponent = {
    template: `<div style="width:100%; padding-bottom: 56.25%;  position: relative;">
                    <video autoplay controls muted style="width:100%;height: 100%; position: absolute; background: #555;" ref="videoHandler"></video>
                    <div style="position: absolute;width: 100%;height: 100%;z-index: 0" ref="jessHandler"></div>
                    <video autoplay controls muted style="width:100%;height: 100%; position: absolute; background: #555;" ref="rtcHandler"></video>
                    <div class="lp-video-cloud" ref="cloudHandler">
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
            default: false
        },
        protocol: {
            type: String,
            default: "rtmp"
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
    setup(props, context) {

        const {url, codec, audio, buffer, canplay, protocol} = toRefs(props);

        const state = {
            videoHandler: ref(null),
            jessHandler: ref(null),
            rtcHandler: ref(null),
            cloudHandler: ref(null),
            hadInitPlayer: false,
            flvJsModule: {},
            h5Player: {},
            xmlhttp: null,
            rtcConnection: null
        }

        watch([canplay, audio, url], () => {
            if (canplay.value) {
                if (url.value !== "") {
                    if (state.hadInitPlayer) {
                        destroyPlayer();
                    }
                    setTimeout(initPlayer, 300);
                }
            } else {
                if (state.hadInitPlayer) {
                    destroyPlayer();
                }
            }
        });


        const setupWebRTCConnection = offer => {
            if (state.rtcConnection !== null) {
                state.rtcConnection.close();
                state.rtcConnection = null;
            }
            state.rtcConnection = new RTCPeerConnection();
            state.rtcConnection.onicecandidate = event => {
                if (event.candidate) {
                    //console.log('Remote ICE candidate:', event.candidate.candidate);
                } else {
                    //console.log('All ICE candidates have been sent');
                }
            };

            state.rtcConnection.ontrack = event => {
                state.rtcHandler.value.srcObject = event.streams[0];
            };

            state.rtcConnection.setRemoteDescription({type: 'offer', sdp: offer})
                .then(() => {
                    return state.rtcConnection.createAnswer();
                })
                .then(answer => {
                    return state.rtcConnection.setLocalDescription(answer);
                })
                .catch(error => {
                    console.error('Error during WebRTC connection setup:', error);
                });
        }

        const initPlayer = async () => {
            if (isEmpty(url.value)) return;

            if (protocol.value === "rtmp") {
                if (codec.value === "h265") {
                    state.videoHandler.value.style.display = 'none';
                    state.rtcHandler.value.style.display = 'none';
                    state.jessHandler.value.style.display = 'block';
                    if (!window.Jessibuca)
                        await import('../plugins/jessibuca/jessibuca.js');
                    state.h5Player = new Jessibuca({
                        container: state.jessHandler.value,
                        videoBuffer: buffer.value / 1000,
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
                    state.rtcHandler.value.style.display = 'none';
                    state.jessHandler.value.style.display = 'none';
                    if (!window.flvjs)
                        await import('../plugins/flvjs/flv.js');
                    state.h5Player = flvjs.createPlayer({
                        type: 'flv',
                        url: url.value,
                        hasAudio: JSON.parse(audio.value)
                    });
                    state.h5Player.attachMediaElement(state.videoHandler.value);
                    state.h5Player.load();
                    state.h5Player.play();

                    state.videoHandler.value.addEventListener("canplay", () => {
                        state.cloudHandler.value.style.display = 'none'
                    });
                }
            } else {
                state.videoHandler.value.style.display = 'none';
                state.rtcHandler.value.style.display = 'block';
                state.jessHandler.value.style.display = 'none';

                state.rtcHandler.value.addEventListener("canplay", () => {
                    state.cloudHandler.value.style.display = 'none'
                });

                if (state.xmlhttp === null)
                    state.xmlhttp = new XMLHttpRequest();
                state.xmlhttp.onreadystatechange = function () {
                    if (state.xmlhttp.readyState === 4 && state.xmlhttp.status === 200) {
                        const offer = state.xmlhttp.response;
                        setupWebRTCConnection(offer);
                    } else if (state.xmlhttp.readyState === 4) {
                        console.error('Failed to retrieve the offer:', state.xmlhttp.status, state.xmlhttp.statusText);
                    }
                };
                state.xmlhttp.open("GET", url.value, true);
                state.xmlhttp.send();
            }

            state.hadInitPlayer = true;
        }
        const destroyPlayer = () => {
            if (Object.keys(state.h5Player).length > 0) {
                if (state.h5Player.hasOwnProperty("unload")) {
                    state.h5Player.unload();
                    state.h5Player.detachMediaElement();
                }
                state.h5Player.destroy();
                state.h5Player = {};
            }
            if (state.rtcConnection) {
                state.rtcConnection.close();
                state.rtcConnection = null;
            }
            state.cloudHandler.value.style.display = 'flex';
            state.videoHandler.value.removeEventListener("canplay", () => {
            });
            state.rtcHandler.value.removeEventListener("canplay", () => {
            });
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

        return {...state}
    }
};

export const videoPlayerComponent = {
    template: `<div style="width:100%; padding-bottom: 56.25%;  position: relative;">
                    <video autoplay controls muted style="width:100%;height: 100%; position: absolute; background: #555;" ref="videoHandler"></video>
                    <div class="lp-video-cloud" ref="cloudHandler">
                        <div class="loading"></div>
                    </div>
              </div>`,
    props: {
        url: {
            type: String,
            default: ""
        },
        canplay: {
            type: Boolean,
            default: true
        }
    },
    setup(props, context) {

        const {url, canplay} = toRefs(props);
        const state = {
            videoHandler: ref(null),
            cloudHandler: ref(null),
            hadInitPlayer: false,
        }

        watchEffect(() => {
            if (canplay.value) {
                if (url.value !== "") {
                    if (state.hadInitPlayer)
                        destroyPlayer();
                    setTimeout(initPlayer, 300);
                }
            } else {
                if (state.hadInitPlayer)
                    destroyPlayer();
            }
        })

        const initPlayer = () => {
            if (url.value === "")
                return;

            state.videoHandler.value.style.display = 'block';
            state.videoHandler.value.src = url.value;
            state.videoHandler.value.play();

            state.videoHandler.value.addEventListener("canplay", () => {
                state.cloudHandler.value.style.display = 'none'
            });
            state.hadInitPlayer = true;
        }

        const destroyPlayer = () => {
            state.cloudHandler.value.style.display = 'flex';
            state.videoHandler.value.removeEventListener("canplay", () => {
            });
            state.hadInitPlayer = false;
        }

        return {...state}
    }
};

export const timepickerComponent = {
    template: `<div class="input-group bootstrap-timepicker">
                    <input type="text" class="form-control" ref="timepicker">
                    <span class="input-group-text input-group-addon"><i class="fa-regular fa-clock"></i></span>
               </div>`,
    props: {
        modelValue: {
            type: String,
            default: "00:00"
        }
    },
    setup(props, context) {
        const timepicker = ref(null);
        const {modelValue} = toRefs(props);

        watch(modelValue, () => {
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
    props: {
        modelValue: {
            type: String,
            default: ""
        },
        direct: {
            type: String,
            default: "bottom"
        }
    },
    components: {
        "sketch-picker": defineAsyncComponent(() => {
            return import('../plugins/vueColor/vue3.color.esm.js').then(module => {
                const {Sketch} = module;
                return Sketch;
            })
        }),
    },
    directives: {
        "click-outside": clickOutsideDirective
    },
    setup(props, context) {

        const state = {
            picker: ref(null),
            popper: ref(null),
            pickerColor: ref(""),
            sketchColor: ref(""),
            partyPopper: {},
            popperOptions: reactive({}),
        }

        watch(state.sketchColor, () => {
            if (state.sketchColor.value.hasOwnProperty("hex")) {
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
                    {name: 'eventListeners', enabled: true},
                ],
            }));
            state.partyPopper.update();
        }

        const hidePopper = () => {
            if (Object.keys(state.partyPopper).length > 0) {
                state.popper.value.removeAttribute('data-show');
                state.partyPopper.setOptions((options) => ({
                    ...options,
                    modifiers: [
                        ...options.modifiers,
                        {name: 'eventListeners', enabled: false},
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

        onMounted(() => {
            // state.pickerColor.value = props.modelValue;
            state.sketchColor.value = {'hex': props.modelValue};
        });

        return {...state, clickOutside, pickerColorChange}
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
    props: {
        modalTitle: {
            type: String,
            default: ""
        },
        modalShow: {
            type: Boolean,
            default: false
        },
        modalFade: {
            type: Boolean,
            default: false
        },
        uploadTip: {
            type: String,
            default: ""
        },
        uploadAction: {
            type: String,
            default: ""
        },
        uploadAllow: {
            type: Array,
            default: ""
        },
        uploadCount: {
            type: [Number, String],
            default: 1
        }
    },
    setup(props, context) {

        const {modalShow, modalFade, uploadAllow} = toRefs(props);

        const state = {
            modal: ref(null),
            modalTitle: ref(""),
            uploadFile: ref(null),
            uploadTip: "",
            show: false,
            bsModal: {},
            uploadLang: "zh"
        }

        watch(modalShow, () => {
            if (Object.keys(state.bsModal).length === 0) {
                updateLangText();
                initBsModal();
                initUploadFile();
            }
            state.show = !state.show;
            if (state.show)
                state.bsModal.show();
            else
                state.bsModal.hide();
        })

        const initBsModal = () => {
            state.bsModal = new bootstrap.Modal(state.modal.value);
            if (modalShow.value) {
                state.bsModal.show();
                state.show = true;
            } else {
                state.bsModal.hide();
                state.show = false;
            }
            state.modal.value.addEventListener('hide.bs.modal', () => {
                state.show = false;
                context.emit('update:modelShow', false);
            });
        }

        const updateLangText = () => {
            const html = document.querySelector('html');
            let lang = html.getAttribute('data-bs-language');
            const [tip1, tip2] = props.uploadTip.split("&");
            if (lang === "cn" || tip2 === undefined)
                state.uploadTip = tip1;
            else
                state.uploadTip = tip2;

            const [title1, title2] = props.modalTitle.split("&");
            if (lang === "cn" || title2 === undefined)
                state.modalTitle.value = title1;
            else
                state.modalTitle.value = title2;

            state.uploadLang = lang;
            if (lang === "cn")
                state.uploadLang = "zh";
        }

        const initUploadFile = () => {
            $(state.uploadFile.value).fileinput({
                language: state.uploadLang,
                theme: "fa6",
                dropZoneTitle: state.uploadTip,
                showClose: false,
                browseClass: "btn btn-primary btn-df",
                allowedFileExtensions: uploadAllow.value,
                uploadUrl: props.uploadAction,
                maxFileCount: isNaN(Number(props.uploadCount)) ? 1 : Number(props.uploadCount)
            });

            $(state.uploadFile.value).on('fileuploaded', function (event, data) {
                state.bsModal.hide();
                state.show = false;
                $(state.uploadFile.value).fileinput('clear');
                context.emit("upload-success", data)
            });

            $(state.uploadFile.value).on('fileuploaderror', function (event, data, msg) {
                if (data.jqXHR.responseText) {
                    var errMsg = eval(data.jqXHR.responseText);
                    context.emit("upload-error", errMsg);
                }
            });
        }

        onMounted(() => {
            const html = document.querySelector('html');
            html.addEventListener("loaded", () => {
                updateLangText();
                initBsModal();
                initUploadFile();
            })
            const observer = new mutationObserver(() => {
                updateLangText();
            });
            const config = {
                attributes: true,
                attributeFilter: ["data-bs-language"],
                subtree: false
            };
            observer.observe(html, config);
        })

        return {...state, modalFade}
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
                                    <td v-if="item.impact === '1'" class="lp-color-red">
                                        <cn>重要</cn>
                                        <en>impact</en>
                                    </td>
                                    <td v-else>
                                        <cn>普通</cn>
                                        <en>normal</en>
                                    </td>
                                    <td>
                                        <a class="lp-cursor-pointer" @click="showPatchVersionLog(index)">
                                            <cn>更新日志</cn>
                                            <en>Show logs</en>
                                        </a>
                                    </td>
                                    <td>
                                        <a v-if="item.allow" class="lp-cursor-pointer" @click="handleUpdatePatch(index)">
                                            <div v-if="upgradePatch.id === item.id && hadUpdate">{{updatePercent}}%</div>
                                            <div v-else>
                                                <cn>更新</cn>
                                                <en>Update</en>
                                            </div>
                                        </a>
                                        <a v-else>/</a>
                                    </td>
                                    <td>
                                        <a v-if="item.allow" class="lp-cursor-pointer" @click="handleDownloadPatch(index)">
                                            <cn>下载</cn>
                                            <en>Download</en>
                                        </a>
                                        <a v-else>/</a>
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
    props: {
        modalShow: {
            type: Boolean,
            default: false
        },
        modalFade: {
            type: Boolean,
            default: true
        },
        checkUpgrade: {
            type: Boolean,
            default: false
        },
        patchSn: {
            type: String,
            default: ""
        }
    },
    setup(props, context) {

        const {modalFade, checkUpgrade, patchSn} = toRefs(props);

        const state = {
            modal: ref(null),
            checkUpgrade: ref(false),
            systemPatchs: reactive([]),
            showLog: ref(false),
            showLogPatch: ref({}),
            hadUpdate: ref(false),
            updatePercent: ref(0),
            upgradePatch: ref({}),
            facAliase: "",
            bsModal: {},
        }

        watchEffect(async () => {
            if (checkUpgrade.value) {
                let result = await func("/upgrade/checkHelpNet");
                if (result.status === "error") {
                    alertMsg(result.msg, "error");
                    return;
                }

                if (!patchSn.value) {
                    result = await func("/upgrade/getSystemAliase");
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

                    result = await func("/upgrade/getAllSystemPatch");
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
                    let hadImpact = false;
                    for (let i = 0; i < state.systemPatchs.length; i++) {
                        state.systemPatchs[i].allow = true;
                        if (!hadImpact) {
                            const impact = state.systemPatchs[i].impact;
                            hadImpact = impact === "1";
                        } else {
                            state.systemPatchs[i].allow = false;
                        }
                    }

                    result = await func("/upgrade/checkVersionMaster");
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
                                    action: () => {
                                        context.emit('update:checkUpgrade', false);
                                    }
                                }
                            }
                        });
                    } else {
                        state.bsModal.show();
                    }
                } else {
                    let result = await func("/upgrade/getSystemAliase");
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

                    result = await func("/upgrade/getSystemPatchBySn", {"sn": patchSn.value});
                    if (result.data.length === 0) {
                        alertMsg("<cn>无效固件编号</cn><en>Invalid upgrade sn</en>", "error");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    state.systemPatchs.splice(0);
                    state.systemPatchs.push(...result.data);
                    let hadImpact = false;
                    for (let i = 0; i < state.systemPatchs.length; i++) {
                        state.systemPatchs[i].allow = true;
                        if (!hadImpact) {
                            const impact = state.systemPatchs[i].impact;
                            hadImpact = impact === "1";
                        } else {
                            state.systemPatchs[i].allow = false;
                        }
                    }
                    state.bsModal.show();
                }
            }
        })

        const handleVersionLogs = computed(() => {
            const regex = /[\r\n\t]/g;
            state.showLogPatch.value.description = state.showLogPatch.value.description.replace(regex, "");
            return state.showLogPatch.value.description.split(";").filter((item) => {
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
            if (state.hadUpdate.value)
                return;

            state.upgradePatch.value = state.systemPatchs[idx];
            const patch = state.systemPatchs[idx];
            const chip = patch.chip;
            let name = patch.name;
            let type = "update";
            if (name.indexOf("_sn_") > 0) {
                name = name.replace("_sn_", "_" + state.facAliase + "_");
                type = "sn";
            } else {
                name = name.replace("_", "_" + state.facAliase + "_");
                type = "update";
            }

            const params = {
                action: "update", name: name,
                chip: chip, type: type
            }

            axios_post('/link/upgrade.php', params)
                .then(async data => {
                    const total = Number(data.size);
                    state.hadUpdate.value = true;
                    state.updatePercent.value = 0;
                    if (total > 0) {
                        const timerId = setInterval(async function () {
                            const size = await getUpdateFileSize(name);
                            state.updatePercent.value = parseInt(size / total * 100);
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
            if (name.indexOf("_sn_") > 0) {
                name = name.replace("_sn_", "_" + state.facAliase + "_");
                type = "sn";
            } else {
                name = name.replace("_", "_" + state.facAliase + "_");
                type = "update";
            }

            const url = "http://help.linkpi.cn:5735/upgrade/" + chip + "/" + type + "/" + name;
            const downName = "";
            const a = document.createElement('a');
            const e = document.createEvent('MouseEvents');
            e.initEvent('click', false, false);
            a.href = url;
            a.download = downName;
            a.dispatchEvent(e);
        }

        onMounted(() => {
            state.bsModal = new bootstrap.Modal(state.modal.value);
            state.modal.value.addEventListener('hide.bs.modal', () => {
                context.emit('update:modelShow', false);
                context.emit('update:checkUpgrade', false);
            });
        })
        return {
            ...state,
            modalFade,
            handleVersionLogs,
            showPatchVersionLog,
            hidePatchVersionLog,
            handleUpdatePatch,
            handleDownloadPatch
        }
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
                            <button v-if="cancelCloseModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{modalCancelBtnName}}</button>
                            <button v-else type="button" class="btn btn-secondary" @click="cancelBtnClick">{{modalCancelBtnName}}</button>
                            <button type="button" v-if="hadConfirmBtn" class="btn btn-primary" @click="confirmBtnClick">{{modalConfirmBtnName}}</button>
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
            type: String,
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
            default: "确定"
        },
        cancelBtnName: {
            type: String,
            default: "取消"
        },
        hadConfirmBtn: {
            type: Boolean,
            default: true
        },
        cancelCloseModal: {
            type: Boolean,
            default: true
        }
    },
    setup(props, context) {

        const {modalShow, modalFade, modalTitle} = toRefs(props);
        const state = {
            modal: ref(null),
            modalTitle: ref(""),
            modalConfirmBtnName: ref("确定"),
            modalCancelBtnName: ref("取消"),
            show: false,
            bsModal: {},
        }

        watch(modalShow, () => {
            if (Object.keys(state.bsModal).length === 0) {
                updateLangText();
                initBsModal();
            }
            state.show = modalShow.value;
            if (state.show)
                state.bsModal.show();
            else
                state.bsModal.hide();
            context.emit('modal-visible', state.show);
        })

        watch(modalTitle, () => {
            updateLangText();
        })

        const initBsModal = () => {
            state.bsModal = new bootstrap.Modal(state.modal.value);
            if (modalShow.value) {
                state.bsModal.show();
                state.show = true;
            } else {
                state.bsModal.hide();
                state.show = false;
            }
            context.emit('modal-visible', state.show);
            state.modal.value.addEventListener('hide.bs.modal', () => {
                state.show = false;
                context.emit('update:modelShow', state.show);
                context.emit('modal-visible', state.show);
            });
        }

        const confirmBtnClick = () => {
            context.emit("confirm-btn-click");
        }

        const cancelBtnClick = () => {
            context.emit("cancel-btn-click");
        }

        const updateLangText = () => {
            const html = document.querySelector('html');
            let lang = html.getAttribute('data-bs-language');
            if (props.modalTitle !== undefined) {
                const [title1, title2] = props.modalTitle.split("&");
                if (lang === "cn" || title2 === undefined)
                    state.modalTitle.value = title1;
                else
                    state.modalTitle.value = title2;
            }

            if (props.confirmBtnName !== undefined) {
                const [name1, name2] = props.confirmBtnName.split("&");
                if (lang === "cn" || name2 === undefined)
                    state.modalConfirmBtnName.value = name1;
                else
                    state.modalConfirmBtnName.value = name2;
            }

            if (props.cancelBtnName !== undefined) {
                const [name1, name2] = props.cancelBtnName.split("&");
                if (lang === "cn" || name2 === undefined)
                    state.modalCancelBtnName.value = name1;
                else
                    state.modalCancelBtnName.value = name2;
            }
        }

        onMounted(() => {
            const html = document.querySelector('html');
            html.addEventListener("loaded", () => {
                updateLangText();
                initBsModal();
            })

            const observer = new mutationObserver(() => {
                updateLangText();
            });
            const config = {
                attributes: true,
                attributeFilter: ["data-bs-language"],
                subtree: false
            };
            observer.observe(html, config);
        })

        return {...state, modalFade, confirmBtnClick, cancelBtnClick}
    }
}

export const loadingButtonComponent = {
    template: `<button type="button" :class="customClass" @click="onButtonClick">
                    <span v-if="hadLoading" class="spinner-border spinner-border-sm"></span>
                    <span v-else >
                        <slot></slot>
                    </span>
                </button>`,
    props: {
        customClass: {
            type: String,
            default: ""
        },
        hadLoading: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {

        const onButtonClick = () => {
            context.emit("button-click", "click")
        }

        return {onButtonClick}
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
                                        <button type="button" @mousedown="handlePtzMove('left-up')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'lp-visibility-hide':!sticks.includes('left-up')}]">
                                            <i class="fa-solid fa-circle-arrow-up" style="transform: rotate(-45deg);-o-transform: rotate(-45deg);-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);"></i>
                                        </button>
                                        <button type="button" @mousedown="handlePtzMove('up')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'lp-visibility-hide':!sticks.includes('up')}]" :style="{'margin':'0px '+gop+'px'}">
                                            <i class="fa-solid fa-circle-arrow-up"></i>
                                        </button>
                                        <button type="button" @mousedown="handlePtzMove('right-up')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'lp-visibility-hide':!sticks.includes('right-up')}]">
                                            <i class="fa-solid fa-circle-arrow-up" style="transform: rotate(45deg);-o-transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);"></i>
                                        </button>
                                    </div>
                                    <div class="col-lg-12 text-center" :style="{'marginTop':gop+'px'}">
                                        <button type="button" @mousedown="handlePtzMove('left')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'lp-visibility-hide':!sticks.includes('left')}]">
                                            <i class="fa-solid fa-circle-arrow-left"></i>
                                        </button>
                                        <button type="button" @mouseup="handlePtzMove('home')" :class="['btn btn-primary',homeClass,{'lp-visibility-hide':!sticks.includes('home')}]" :style="{'margin':'0px '+gop+'px'}">
                                            <i class="fa-solid fa-house"></i>
                                        </button>
                                        <button type="button" @mousedown="handlePtzMove('right')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'lp-visibility-hide':!sticks.includes('right')}]">
                                            <i class="fa-solid fa-circle-arrow-right"></i>
                                        </button>
                                    </div>
                                    <div class="col-lg-12 text-center" :style="{'marginTop':gop+'px'}">
                                        <button type="button" @mousedown="handlePtzMove('left-down')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'lp-visibility-hide':!sticks.includes('left-down')}]">
                                            <i class="fa-solid fa-circle-arrow-up" style="transform: rotate(-135deg);-o-transform: rotate(-135deg);-webkit-transform: rotate(-135deg);-moz-transform: rotate(-135deg);"></i>
                                        </button>
                                        <button type="button" @mousedown="handlePtzMove('down')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'lp-visibility-hide':!sticks.includes('down')}]" :style="{'margin':'0px '+gop+'px'}">
                                            <i class="fa-solid fa-circle-arrow-down"></i>
                                        </button>
                                        <button type="button" @mousedown="handlePtzMove('right-down')" @mouseup="handlePtzMove('move-stop')" :class="['btn btn-primary',arrowClass,{'lp-visibility-hide':!sticks.includes('right-down')}]">
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
            default: ['left', 'left-up', 'up', 'right-up', 'right', 'right-down', 'down', 'left-down', 'home']
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
    components: {
        "noui-slider": nouiSliderComponent
    },
    setup(props, context) {

        const state = {
            zoom: ref(0),
            presetVal: ref(0)
        }

        watch(() => props.zoomVal, (newValue, oldValue) => {
            state.zoom.value = newValue;
        })

        const handlePtzMove = type => {
            context.emit("ptz-move", type)
        }

        const updatePreset = val => {
            state.presetVal.value = val;
        }

        const onTouchSlideEnd = val => {
            context.emit('zoom-change', val);
        }

        const handleCallPreset = () => {
            context.emit('call-preset', state.presetVal.value);
        }

        const handleSetPreset = () => {
            context.emit('set-preset', state.presetVal.value);
        }

        return {...state, handlePtzMove, onTouchSlideEnd, updatePreset, handleCallPreset, handleSetPreset}
    }
}

export const usbOptionComponent = {
    template: `<a :class="['nav-link lp-usb-ctx',{'active':hadMountDisk}]" data-bs-toggle="dropdown">
                    <div class="lp-usb-drive">
                        <div class="lp-usb-body"></div>
                        <div class="lp-usb-metal"></div>
                        <div class="lp-usb-hole"></div>
                    </div>
                </a>
                <div class="dropdown">
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li v-if="hadMountDisk">
                            <a class="dropdown-item" href="javascript:;" @click="unInstallDisk">
                                <span class="material-symbols-outlined me-2">
                                    <i class="fa-solid fa-arrow-up-from-bracket me-2"></i>
                                    <cn>弹出设备</cn>
                                    <en>Uninstall</en>
                                </span>
                            </a>
                        </li>
                        <li v-if="hadMountDisk"><hr></li>
                        <li v-if="Object.keys(diskConf).length > 0 && diskConf.used==='local'">
                            <a class="dropdown-item" href="javascript:;" @click="formatDisk">
                                <span class="material-symbols-outlined me-2">
                                    <i class="fa-solid fa-circle-nodes me-2"></i>
                                    <cn>格式化</cn>
                                    <en>Format Disk</en>
                                </span>
                            </a>
                        </li>
                        <li v-if="Object.keys(diskConf).length > 0 && diskConf.used==='local'"><hr></li>
                        <li>
                            <a class="dropdown-item" href="javascript:;" @click="turnMountDisk">
                                <span class="material-symbols-outlined me-2">
                                    <i class="fa-solid fa-right-left me-2"></i>
                                    <cn>切换挂载</cn>
                                    <en>Change Disk</en>
                                </span>
                            </a>
                        </li>
                        <li v-if="hadMountDisk"><hr></li>
                        <li v-if="hadMountDisk">
                            <a class="dropdown-item text-center" href="javascript:;">
                                <span class="material-symbols-outlined me-2">
                                    <cn>已用</cn><en>Used</en>
                                    {{hadMountInfo.used + ' / ' + hadMountInfo.total}}
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>`,
    setup(props, context) {

        const hadMountInfo = reactive({});
        const hadMountDisk = ref(false);
        const {diskConf, handleDiskConf, updateDiskConf} = useDiskConf();

        const unInstallDisk = () => {
            confirm({
                title: '<cn>卸载磁盘</cn><en>UnInstall Disk</en>',
                content: '<cn>是否卸载磁盘，请确保没有处于录制状态</cn><en>Whether to uninstall the disk, please make sure it is not in the recording state</en>',
                buttons: {
                    ok: {
                        text: "<cn>卸载</cn><en>Confirm</en>",
                        btnClass: 'btn-primary',
                        action: () => {
                            func("/system/umountDisk").then(res => {
                                alertMsg(res.msg, res.status);
                            })
                        }
                    },
                    cancel: {
                        text: "<cn>取消</cn><en>Cancel</en>",
                        action: () => {
                        }
                    }
                }
            });
        }

        const formatDisk = () => {
            confirm({
                title: '<cn>格式化磁盘</cn><en>Formatted Disk</en>',
                content: `<div class="row">
                            <div class="col-lg-11">
                            <div class="row mt-2">
                                    <div class="col-lg-3 lp-align-center">
                                        <label>
                                            <cn>目标磁盘</cn>
                                            <en>Disk</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-9">
                                        <select class="form-select" id="targetDisk"></select>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-lg-3 lp-align-center">
                                        <label>
                                            <cn>磁盘格式</cn>
                                            <en>Format</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-9">
                                        <select class="form-select" id="diskFormat">
                                            <option value="ext4">EXT4</option>
                                            <option value="fat32">FAT32</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-lg-3 lp-align-center">
                                        <label>
                                            <cn>登录密码</cn>
                                            <en>Password</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-9">
                                        <input class="form-control" type="password" id="formatPasswd" autocomplete="off">
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-12 p-0">
                                        <label class="ms-3">
                                            <cn>Tip: 格式化将清空磁盘数据，且不可逆转，请谨慎操作。</cn>
                                            <en>Tip: Formatting will erase disk data and is irreversible.</en>
                                        </label>
                                    </div>
                                </div>
                            </div>
                          </div>`,
                buttons: {
                    ok: {
                        text: "<cn>格式化</cn><en>Format</en>",
                        btnClass: 'btn-primary',
                        action: () => {
                            const formatPasswd = document.querySelector("#formatPasswd").value;
                            func("/system/formatReady", {"psd": formatPasswd}).then(res => {
                                return new Promise((resolve, reject) => {
                                    if (res.status === "error") {
                                        alertMsg(res.msg, res.status);
                                        reject();
                                        return;
                                    }
                                    resolve();
                                })
                            }).then(() => {
                                const targetDisk = document.querySelector("#targetDisk").value;
                                const diskFormat = document.querySelector("#diskFormat").value;
                                const notify = alertMsg("<cn>正在格式化，请勿关闭此页面</cn><en>Do not close this page while formatting</en>", "success", 99999999);
                                func("/system/formatDisk", {"disk": targetDisk, "format": diskFormat});
                                let interval = setInterval(() => {
                                    func("/system/checkFormatProgress").then(res => {
                                        if (res.data === 0) {
                                            clearInterval(interval);
                                            notify.remove();
                                            setTimeout(() => alertMsg(res.msg, res.status), 600);
                                        }
                                    })
                                }, 5000);
                            })
                        }
                    },
                    cancel: {
                        text: "<cn>取消</cn><en>Cancel</en>",
                        action: () => {
                        }
                    }
                },
                onOpenBefore: () => {
                    func("/system/getLocalDisk").then(result => {
                        const html = document.querySelector("html");
                        const lang = html.getAttribute("data-bs-language");
                        result.data.forEach(item => {
                            const option = document.createElement('option');
                            option.value = item.name;
                            if (item.name === "/dev/mmcblk0p6") {
                                if (lang === "cn")
                                    item.name = "机身存储";
                                else
                                    item.name = "device storage";
                            }
                            option.text = item.name + "( " + item.size + " )";
                            document.querySelector('#targetDisk').add(option);
                        })
                    })
                }
            });
        }

        const checkMountDisk = () => {
            func("/system/getMountDiskSpace").then(res => {
                Object.assign(hadMountInfo, res.data);
                hadMountDisk.value = (res.status === "success");
            })
            setTimeout(checkMountDisk, 1000);
        }

        const turnMountDisk = () => {
            const html = document.querySelector("html");
            const lang = html.getAttribute("data-bs-language");
            const jc = confirm({
                title: '<cn>磁盘挂载</cn><en>Mount Disk</en>',
                content: `<div class="row">
                              <div class="col-lg-12">
                                    <div class="row mt-3">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>类型</cn>
                                                <en>Type</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <select class="form-select" id="mount_device">
                                                 <option value="shared">${lang === "cn" ? "网络磁盘" : "net disk"}</option>
                                                 <option value="local">${lang === "cn" ? "移动磁盘" : "usb disk"}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-3 local-device">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>设备</cn>
                                                <en>Device</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <select class="form-select" id="local_devices"></select>
                                        </div>
                                    </div>
                                    <div class="row mt-3 share-device">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>协议</cn>
                                                <en>Protocol</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <select class="form-select" id="shared_protocol">
                                                 <option value="cifs">${lang === "cn" ? "cifs (windows共享目录)" : "cifs (windows shared directory)"}</option>
                                                 <option value="nfs">nfs</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-3 share-device">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>IP地址</cn>
                                                <en>IP Address</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <input class="form-control" id="shared_ip">
                                        </div>
                                    </div>
                                    <div class="row mt-3 cifs-auth share-device">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>用户名<small style="color: gray;font-size: 11px;">(选填)</small></cn>
                                                <en>Username</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <input class="form-control" id="shared_uname">
                                        </div>
                                    </div>
                                    <div class="row mt-3 cifs-auth share-device">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>密码<small style="color: gray;font-size: 11px;">(选填)</small></cn>
                                                <en>Password</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <input class="form-control" id="shared_passwd" type="password">
                                        </div>
                                    </div>
                                    <div class="row mt-3 share-device">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>挂载路径</cn>
                                                <en>Mount Path</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <input class="form-control" id="shared_path">
                                        </div>
                                    </div>
                                    <div class="row" style="padding-top: 30px;padding-left: 30px;color: gray">
                                        <label class="col-lg-12">
                                            <cn>Tip: 更换挂载设备时，请确保没有处于录制状态</cn>
                                            <en>Tip: Make sure that you are not recording when you change the mounted device</en>
                                        </label>
                                    </div>
                              </div>  
                          </div>`,
                buttons: {
                    ok: {
                        text: "<cn>挂载</cn><en>Mount</en>",
                        btnClass: 'btn-primary',
                        action: () => {
                            updateDiskConf({
                                enable: true,
                                used: document.querySelector('#mount_device').value,
                                shared: {
                                    ip: document.querySelector('#shared_ip').value,
                                    type: document.querySelector('#shared_protocol').value,
                                    path: document.querySelector('#shared_path').value,
                                    auth: {
                                        uname: document.querySelector('#shared_uname').value,
                                        passwd: document.querySelector('#shared_passwd').value,
                                    }
                                },
                                local: {
                                    device: document.querySelector('#local_devices').value
                                }
                            }).then(async () => {
                                handleDiskConf();
                                alertMsg("<cn>磁盘检测中，请稍后...</cn><en>Disk checking, please wait...</en>", "success");
                                const result = await func("/system/mountDisk");
                                if (result.status === "success")
                                    jc.close();
                                setTimeout(() => alertMsg(result.msg, result.status), 600);
                            });
                            return false;
                        }
                    },
                    cancel: {
                        text: "<cn>取消</cn><en>Cancel</en>",
                        action: () => {
                        }
                    }
                },
                onOpenBefore: () => {
                    const display = (type, protocol) => {
                        const shareElements = document.querySelectorAll('.share-device');
                        const localElements = document.querySelectorAll('.local-device');
                        shareElements.forEach(element => element.style.display = 'none');
                        localElements.forEach(element => element.style.display = 'none');
                        if (type === "shared") {
                            shareElements.forEach(element => element.style.display = '');
                            const cifsAuthElements = document.querySelectorAll('.cifs-auth');
                            document.querySelector('#shared_protocol').value = protocol;
                            cifsAuthElements.forEach(element => element.style.display = 'none');
                            if (protocol === 'cifs')
                                cifsAuthElements.forEach(element => element.style.display = '');
                            return;
                        }
                        localElements.forEach(element => element.style.display = '');
                    }

                    func("/system/getLocalDisk").then(result => {
                        const html = document.querySelector("html");
                        const lang = html.getAttribute("data-bs-language");
                        result.data.forEach(item => {
                            const option = document.createElement('option');
                            option.value = item.name;
                            if (item.name === "/dev/mmcblk0p6") {
                                if (lang === "cn")
                                    item.name = "机身存储";
                                else
                                    item.name = "device storage";
                            }
                            option.text = item.name + "( " + item.size + " )";
                            document.querySelector('#local_devices').add(option);
                        })
                    })

                    document.querySelector('#mount_device').value = diskConf.used;
                    document.querySelector('#local_devices').value = diskConf.local.device;
                    document.querySelector('#shared_protocol').value = diskConf.shared.type;
                    document.querySelector('#shared_uname').value = diskConf.shared.auth.uname;
                    document.querySelector('#shared_passwd').value = diskConf.shared.auth.passwd;
                    document.querySelector('#shared_ip').value = diskConf.shared.ip;
                    document.querySelector('#shared_path').value = diskConf.shared.path;
                    display(diskConf.used, diskConf.shared.type);
                    document.querySelector('#mount_device').addEventListener('change', () => {
                        const type = document.querySelector('#mount_device').value;
                        display(type, "cifs");
                    });
                    document.querySelector('#shared_protocol').addEventListener('change', () => {
                        const protocol = document.querySelector('#shared_protocol').value;
                        display("shared", protocol);
                    });
                }
            });
        }

        onMounted(checkMountDisk);
        return {hadMountInfo, hadMountDisk, diskConf, unInstallDisk, formatDisk, turnMountDisk}
    }
}

export const searchSettingComponent = {
    template: `<div class="position-relative search-bar d-lg-block d-none" v-click-outside="onClickOutside">
                    <div>
                        <input class="form-control form-control-sm rounded-5 px-5 lp-cursor-pointer" type="text" :placeholder="placeholderVal" v-model.trim="searchVal" @focus="onFilterKeywordCtx">
                        <span class="position-absolute ms-3 translate-middle-y start-0 top-50">
                            <i class="fa fa-search"></i>
                        </span>
                    </div>
                    <ul :class="['dropdown-menu w-100 mt-2',{'show' : searchRes.length > 0}]">
                        <div data-simplebar style="max-height: 600px">
                            <div v-if="searchRes.length > 0" class="px-3 py-2">
                                <div class="mb-3" v-for="(item,index) in searchRes" :key="index">
                                    <div class="d-flex">
                                        <div class="search-item-icon"><i :class="['font-14',item.icon]"></i></div>
                                        <span class="mb-2 ms-2 font-16">{{item.name}}</span>
                                    </div>
                                    <div class="list-group">
                                        <a v-for="(itm,idx) in item.filter" :key="idx" @click="onRedirect(item.url,itm)" class="list-group-item list-group-item-action align-items-center d-flex gap-2 lp-cursor-pointer search-item-option">
                                            <span v-html="highlightSubstring(itm)"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>`,
    directives: {
        "click-outside": clickOutsideDirective
    },
    setup(props, context) {
        const state = {
            searchVal: ref(""),
            searchRes: reactive([]),
            placeholderVal: ref("")
        }

        watch(state.searchVal, () => onFilterKeywordCtx());

        const onRedirect = (url, data) => {
            location.href = url + "?filter=" + md5(data);
        }

        const onClickOutside = () => {
            clearReactiveArray(state.searchRes);
        }

        const highlightSubstring = str => {
            const regex = new RegExp('(' + state.searchVal.value + ')', 'gi');
            return str.replace(regex, '<span style="color: red;font-weight: 700;">$1</span>');
        }

        const onFilterKeywordCtx = () => {
            if (isEmpty(state.searchVal.value)) {
                clearReactiveArray(state.searchRes);
                return;
            }
            const html = document.querySelector("html");
            const lang = html.getAttribute('data-bs-language');
            const param = {"lang": lang, "filter": state.searchVal.value};
            func("/root/filterKeywords", param).then(result => {
                clearReactiveArray(state.searchRes);
                state.searchRes.push(...result.data);
            });
        }

        onMounted(() => {
            const update = () => {
                const lang = html.getAttribute('data-bs-language');
                if (lang === "cn")
                    state.placeholderVal.value = "标题";
                else
                    state.placeholderVal.value = "Search";
            }

            const html = document.querySelector('html');
            update();
            const observer = new mutationObserver(() => update());
            const config = {
                attributes: true,
                attributeFilter: ["data-bs-language"],
                subtree: false
            };
            observer.observe(html, config);
        })
        return {...state, onRedirect, onClickOutside, highlightSubstring, onFilterKeywordCtx}
    }
};

export const ledOptionComponent = {
    template: `<a class="nav-link" @click="onClickLedBtn">
                    <i class="fa-regular fa-futbol"></i>
                </a>`,
    setup(props, context) {

        const {ledConf, updateLedConf} = useLedConf();

        const modeTitle = {
            signal: {
                cn: '信号插入提示',
                en: 'signal'
            },
            record: {
                cn: '开始录制提示',
                en: 'record'
            },
            push: {
                cn: '开始推流提示',
                en: 'push'
            },
            tally: {
                cn: 'Tally(vMix)',
                en: 'tally'
            },
            tallyArbiter: {
                cn: 'TallyArbiter',
                en: 'TallyArbiter'
            }
        }

        const onClickLedBtn = () => {
            confirm({
                title: '<cn>状态灯设置</cn><en>LED Config</en>',
                boxWidth: '500px',
                useBootstrap: false,
                content: `<div class="row">
                            <div class="col-lg-11">
                                <div class="row mt-2">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>启用</cn>
                                                <en>Enable</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-9">
                                            <select class="form-select" id="targetEnable"></select>
                                        </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-lg-3 lp-align-center">
                                        <label>
                                            <cn>亮度</cn>
                                            <en>Bright</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-9">
                                        <select class="form-select" id="targetBright">
                                            <option value="0.1">0.1</option>
                                            <option value="0.2">0.2</option>
                                            <option value="0.3">0.3</option>
                                            <option value="0.4">0.4</option>
                                            <option value="0.5">0.5</option>
                                            <option value="0.6">0.6</option>
                                            <option value="0.7">0.7</option>
                                            <option value="0.8">0.8</option>
                                            <option value="0.9">0.9</option>
                                            <option value="1.0">1.0</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-2" style="height: 38px">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>模式</cn>
                                                <en>Mode</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-9">
                                            <select class="form-select" id="targetMode"></select>
                                        </div>
                                </div>
                                <div class="row mt-2" id="tallyArbiter">
                                    <div class="col-lg-12">
                                        <div class="row mt-2" id="arbiterIp">
                                            <div class="col-lg-3 lp-align-center">
                                                <label>
                                                    <cn>服务</cn>
                                                    <en>IP</en>
                                                </label>
                                            </div>
                                            <div class="col-lg-9">
                                                <input class="form-control" id="tallyArbiterIp">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="row mt-2" id="arbiterPort">
                                            <div class="col-lg-3 lp-align-center">
                                                <label>
                                                    <cn>端口</cn>
                                                    <en>Port</en>
                                                </label>
                                            </div>
                                            <div class="col-lg-9">
                                                <input class="form-control" id="tallyArbiterPort">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-12 tips" style="padding-left: 40px">
                                        <cn>1、该功能可以使用设备两侧的LED灯带提示设备的运行状态。</cn>
                                        <en>1. This function uses side LEDs to show device status.</en>
                                    </div>
                                    <div class="col-lg-12 tips" style="padding-left: 40px">
                                        <cn>2、选择不同的模式来匹配不同的应用场景。</cn>
                                        <en>2. Choose modes for different scenarios.</en>
                                    </div>
                                </div>
                            </div>
                          </div>`,
                buttons: {
                    ok: {
                        text: "<cn>保存</cn><en>Save</en>",
                        btnClass: 'btn-primary',
                        action: () => {
                            ledConf.enable = JSON.parse(document.querySelector('#targetEnable').value);
                            ledConf.func = document.querySelector('#targetMode').value;
                            ledConf.brightness = document.querySelector("#targetBright").value;
                            if(ledConf.func === 'tallyArbiter') {
                                const funcList = ledConf.funcList;
                                funcList['tallyArbiter'].ip = document.querySelector("#tallyArbiterIp").value;
                                funcList['tallyArbiter'].port = document.querySelector("#tallyArbiterPort").value;
                            }
                            updateLedConf().then(r => {
                            });
                        }
                    },
                    cancel: {
                        text: "<cn>取消</cn><en>Cancel</en>",
                        action: () => {
                        }
                    }
                },
                onOpenBefore: () => {
                    const html = document.querySelector("html");
                    const lang = html.getAttribute("data-bs-language");

                    if (lang === 'cn') {
                        document.querySelector('#targetEnable').add(new Option('开启', 'true'));
                        document.querySelector('#targetEnable').add(new Option('关闭', 'false'));
                    } else {
                        document.querySelector('#targetEnable').add(new Option('on', 'true'));
                        document.querySelector('#targetEnable').add(new Option('off', 'false'));
                    }

                    const funcList = ledConf.funcList;
                    Object.keys(funcList).forEach(key => {
                        if (modeTitle.hasOwnProperty(key)) {
                            const option = document.createElement('option');
                            option.value = key;
                            option.text = modeTitle[key][lang];
                            document.querySelector('#targetMode').add(option);
                        }
                    })
                    document.querySelector("#targetEnable").value = ledConf.enable;
                    document.querySelector("#targetMode").value = ledConf.func;
                    document.querySelector("#targetBright").value = ledConf.brightness;;
                    document.querySelector("#tallyArbiter").style.display = (ledConf.func === 'tallyArbiter') ? "flex" : "none";
                    if(ledConf.funcList.hasOwnProperty('tallyArbiter')) {
                        document.querySelector("#tallyArbiterIp").value = ledConf.funcList['tallyArbiter'].ip;
                        document.querySelector("#tallyArbiterPort").value = ledConf.funcList['tallyArbiter'].port;
                    }
                },
                onOpen: ()=>{
                    const targetModeEle = document.querySelector('#targetMode');
                    targetModeEle.addEventListener('change',event => {
                        const selectedValue = event.target.value;
                        document.querySelector("#tallyArbiter").style.display = (selectedValue === 'tallyArbiter') ? "flex" : "none";
                    })
                }
            });
        }
        return {onClickLedBtn}
    }
}

export const themeActiveColorComponent = {
    template: `<a class="nav-link" :style="{backgroundColor:themeColor}" data-bs-toggle="dropdown">
                    <shirt-flag :width="26" :height="26" :strokeWidth="1.8" :stroke="themeTxtColor" :style="'margin-top:-5px;'"></shirt-flag>
                </a>
                <div class="dropdown">
                    <div class="dropdown-menu dropdown-menu-end pt-0 pb-0" style="width: 180px;border-top-left-radius: 0;border-bottom-left-radius: 0">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-2 dropdown-border-right" style="width: 20%">
                                    <div v-if="themeConf.used === 'default'" class="row h-50 lp-align-center lp-cursor-pointer" @click="updateThemeConf('default')" :style="{background:themeColor,color: themeTxtColor}">
                                        <i class="fa-regular fa-sun font-20" style="margin-left: -7px"></i>
                                    </div>
                                    <div v-else class="row h-50 lp-align-center lp-cursor-pointer" @click="updateThemeConf('default')">
                                        <i class="fa-regular fa-sun font-20" style="margin-left: -7px"></i>
                                    </div>
                                    <div v-if="themeConf.used === 'dark'" class="row h-50 lp-align-center ps-1 lp-cursor-pointer" @click="updateThemeConf('dark')" :style="{background:themeColor,color: themeTxtColor}">
                                        <i class="fa-regular fa-moon font-20" style="margin-left: -4px"></i>
                                    </div>
                                    <div v-else class="row h-50 lp-align-center ps-1 lp-cursor-pointer" @click="updateThemeConf('dark')">
                                        <i class="fa-regular fa-moon font-20" style="margin-left: -4px"></i>
                                    </div>
                                </div>
                                <div class="col-lg-9 p-0 pt-2 pb-2">
                                    <div v-for="item in themeConf.themeActives">
                                        <a class="dropdown-item mt-1" href="javascript:;" @click="updateThemeActiveConf(themeConf.used,item.active)">
                                            <div class="row">
                                                <div style="width: 50%">
                                                    <span class="material-symbols-outlined me-2">
                                                        <cn>{{item.label_cn}}</cn>
                                                        <en>{{item.label_en}}</en>
                                                    </span>
                                                </div>
                                                <div style="width: 50%" :style="{height: '20px',background: item.colors['bs-active-bg-color']}"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
    components: {
      "shirt-flag": shirtFlagComponent
    },
    setup(props, context) {

        const themeColor = ref("#ffbb00");
        const themeTxtColor = ref("");
        const { themeConf,updateThemeActiveConf,updateThemeConf} = useThemeConf();

        watchEffect(()=>{
            if(!isEmpty(themeConf)) {
                const activeTheme = themeConf.themeActives.find(item => item.active === themeConf.active);
                themeColor.value = activeTheme.colors["bs-active-bg-color"];
                themeTxtColor.value = activeTheme.colors[themeConf.used + "-bs-default-txt-color"];
            }
        })

        const generateColors = baseColor => {
            const hexToRgb = hex => {
                let r = 0, g = 0, b = 0;
                if (hex.length === 7) {
                    r = parseInt(hex.substring(1, 3), 16);
                    g = parseInt(hex.substring(3, 5), 16);
                    b = parseInt(hex.substring(5, 7), 16);
                }
                return [r, g, b];
            }

            const rgbToHex = (r, g, b) => {
                return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
            }

            const adjustColorByOffset = (color, offset) => {
                const [r, g, b] = hexToRgb(color);
                const newR = Math.min(255, Math.max(0, r + offset[0]));
                const newG = Math.min(255, Math.max(0, g + offset[1]));
                const newB = Math.min(255, Math.max(0, b + offset[2]));
                return rgbToHex(newR, newG, newB);
            }

            const base = baseColor;
            const darkOffset = [-17, -17, -17];
            const lightOffset = [0, 34, 85];
            const dark = adjustColorByOffset(baseColor, darkOffset);
            const light = adjustColorByOffset(baseColor, lightOffset);
            const transparent = `rgba(${hexToRgb(baseColor).join(', ')}, 0.3)`; // Transparent version

            return {base, dark, light, transparent};
        }

        const makeThemeActiveConf = () => {
            const acitveColor = reactive([
                {
                    cn: "金沙黄",
                    en: "yellow",
                    cr: "#ffbb00",
                    th: "default"
                },
                {
                    cn: "海湾蓝",
                    en: "blue",
                    cr: "#0092ff",
                    th: "blue"
                },
                {
                    cn: "熔岩红",
                    en: "red",
                    cr: "#ff4d4d",
                    th: "red"
                },
                {
                    cn: "橄榄绿",
                    en: "green",
                    cr: "#8fa800",
                    th: "green"
                },
                {
                    cn: "雅川青",
                    en: "teal",
                    cr: "#00a8a1",
                    th: "teal"
                },
                {
                    cn: "霞光紫",
                    en: "purple",
                    cr: "#aa4eaa",
                    th: "purple"
                }
            ])

            const themeActiveAry = [];
            acitveColor.forEach(item => {
                const {base,dark,light,transparent} = generateColors(item.cr);
                const themeActiveObj = {
                    "label_cn":item.cn,
                    "label_en":item.en,
                    "active":item.th,
                    "colors":{
                        "bs-active-bg-color": base,
                        "bs-acitve-color": dark,
                        "bs-slider-color": base,
                        "default-bs-slider-bg-color": light,
                        "default-bs-form-border-color": "#dee2e6",
                        "default-bs-form-color": "#555555",
                        "default-bs-body-color": "#555555",
                        "default-bs-default-txt-color": "#ffffff",
                        "default-bs-default-focus": transparent,
                        "dark-bs-slider-bg-color": base,
                        "dark-bs-form-border-color": "#434343",
                        "dark-bs-form-color": "#adb5bd",
                        "dark-bs-body-color": "#555555",
                        "dark-bs-default-txt-color": "#333333",
                        "dark-bs-default-focus": transparent
                    }
                }

                if(base !== "#ffbb00")
                    themeActiveObj.colors["dark-bs-default-txt-color"] = "#ffffff";
                else
                    themeActiveObj.colors["dark-bs-default-txt-color"] = "#333333";
                themeActiveAry.push(themeActiveObj);
            })

            themeConf.themeActive = themeActiveAry;
            updateThemeConf().then(()=>{});
        }

        return {themeConf,themeColor,themeTxtColor,updateThemeActiveConf,updateThemeConf}
    }
}

export const captureOptionComponent = {
    template: `<a :class="['nav-link',{'active':captureConf.enable}]" style="font-size: 14px;font-weight: 600" @click="onClickCaptureBtn">
                    <cn>Cap</cn>
                    <en>Cap</en>
                </a>`,
    setup(props, context) {

        const { captureConf,updateCaptureConf } = useCaptureConf();
        const onClickCaptureBtn = () => {
            captureConf.enable = !captureConf.enable;
            updateCaptureConf("noTip").then(data => {
                if(data) {
                    if(captureConf.enable)
                        alertMsg("<cn>采集卡模式已启用</cn><en>Capture card mode is enabled</en>", "success");
                    else
                        alertMsg("<cn>采集卡模式已关闭</cn><en>Capture card mode is disabled</en>", "success");
                } else {
                    alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                }
            });
        }
        return {captureConf,onClickCaptureBtn}
    }
}
