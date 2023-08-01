
const { ref,watch,watchEffect,computed,onMounted } = Vue;

export const wStatusPieChartDirective = {
    mounted(el,bindings,node,prenode){
        let color = bindings.value.color;
        $(el).easyPieChart({
            easing: 'easeOutElastic',
            delay: 2000,
            barColor: color,
            trackColor: '#CCC',
            scaleColor: false,
            lineWidth: 20,
            trackWidth: 16,
            lineCap: 'butt',
            width: 50,
            onStep:( from, to, percent ) => {
                $(el).parent().find( '.percent' ).text( Math.round( percent ) + "%" );
            }
        });
    },
    updated(el,bindings,node,prenode) {
        $(el).data( 'easyPieChart' ).update( bindings.value.val);
    }
}

export const wStatusTemperatureDirective = {
    mounted(el,bindings,node,prenode){
        $(el).css( "background", bindings.value.color);
    },
    updated(el,bindings,node,prenode) {
        $(el).find(".mask").css("bottom", bindings.value.val + "%");
        $(el).find(".percent").text(bindings.value.val + "℃");
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


export const languageOptionDirective = {
    mounted(el, binding, vnode) {
        const html = document.querySelector('html');
        const lang = html.getAttribute('data-bs-language');
        el.textContent = el.getAttribute(lang);
        const observer = new MutationObserver(() => {
            const lang = html.getAttribute('data-bs-language');
            el.textContent = el.getAttribute(lang);
        });
        const config = { attributes: true };
        observer.observe(html, config);
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
                    <div class="force-video-cloud">
                        <div class="loading"></div>
                    </div>
              </div>`,
    props: ['url','codec','audio','buffer'],
    setup(props,context) {

        const flv = ref(null);
        const video = ref(null);
        const jess = ref(null);
        let player = {};

        watchEffect(()=>{
            if(props.url !== "" && props.codec !== "" && props.audio !== "" && props.buffer !== "") {
                destoryPlayer();
                initPlayer();
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
                    videoBuffer: props.buffer/1000,
                    decoder: "assets/plugins/jessibuca/decoder.js",
                    isResize: false,
                    audio: JSON.parse(props.audio),
                    operateBtns: {
                        fullscreen: true,
                        play: true,
                        audio: JSON.parse(props.audio),
                    },
                    forceNoOffscreen: true,
                    isNotMute: false,
                });
                player.play(props.url);
                player.on("play", (flag) => {
                    let cloud = flv.value.querySelector(".force-video-cloud");
                    cloud.style.display = 'none'
                })
            } else {
                video.value.style.display = 'block';
                jess.value.style.display = 'none';
                player = flvjs.createPlayer({
                    type: 'flv',
                    audio: JSON.parse(props.audio),
                    url: props.url
                });
                player.attachMediaElement(video.value);
                player.load();
                player.play();

                video.value.addEventListener("canplay",() => {
                    let cloud = flv.value.querySelector(".force-video-cloud");
                    cloud.style.display = 'none'
                });
            }
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
            let cloud = flv.value.querySelector(".force-video-cloud");
            cloud.style.display = 'flex';
            video.value.removeEventListener("canplay",()=>{});
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
            initPlayer();
            checkDelay();
        })

        return {flv,video,jess}
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

