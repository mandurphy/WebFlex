
export const wStatusPieChartDirective = {
    mounted: function (el,bindings,node,prenode){
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
            onStep: function ( from, to, percent ) {
                $(el).parent().find( '.percent' ).text( Math.round( percent ) + "%" );
            }
        });
    },
    updated: function (el,bindings,node,prenode) {
        $(el).data( 'easyPieChart' ).update( bindings.value.val);
    }
}

export const wStatusTemperatureDirective = {
    mounted: function (el,bindings,node,prenode){
        $(el).css( "background", bindings.value.color);
    },
    updated: function (el,bindings,node,prenode) {
        $(el).find(".mask").css("bottom", bindings.value.val + "%");
        $(el).find(".percent").text(bindings.value.val + "℃");
    }
}

export const wNetFlotChartComponent = {
    template: `<div class="col-lg-12 netState" ref="netState"> </div>`,
    props: ['color','maxy','data1','data2'],
    data(){
      return {
          plot: {}
      }
    },
    watch: {
        data1: {
            handler(newValue, oldValue) {
                this.initPlot();
                this.updatePlot();
            },
            deep: true
        }
    },
    methods: {
        initPlot() {
            if(Object.keys(this.plot).length === 0) {
                let color = this.color;
                let maxy = this.maxy;
                let data1 = this.data1;
                let data2 = this.data2;
                // if(data1.length===0 && data2.length===0) {
                //     let tx=[],rx = [];
                //     for ( let i = 0; i < 100; i++ ) {
                //         tx.push( 0 );
                //         rx.push( 0 );
                //     }
                //     for (let i = 0; i < 100; i++) {
                //         data1.push([i,tx[i]]);
                //         data2.push([i,rx[i]]);
                //     }
                // }
                this.plot = $.plot(this.$refs.netState, [
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
                            max: maxy,
                            tickSize: 160,
                            tickFormatter: function ( v, axis ) {
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

                let handle = this;
                $.fn.tooltip = function () {
                    let prePoint = null, preLabel = null;
                    $(this).bind("plothover", function (event, pos, item) {
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
                                    handle.showTooltip(item.pageX + 100, item.pageY - 10, color, "<cn>上行</cn><en>upward</en>: " + data);
                                if (item.seriesIndex === 1)
                                    handle.showTooltip(item.pageX + 100, item.pageY - 10, color, "<cn>下行</cn><en>downward</en>: " + data);
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
                $(this.$refs.netState).tooltip();
            }
        },
        updatePlot() {
            let maxy = this.maxy;
            let data1 = this.data1;
            let data2 = this.data2;
            this.plot.setData([data1, data2]);
            this.plot.draw();
            this.plot.getOptions().yaxes[ 0 ].max = maxy;
            this.plot.getOptions().yaxes[ 0 ].tickSize = Math.floor( maxy / 5 );
            this.plot.setupGrid();
        },
        //提示框
        showTooltip(x, y, color, contents) {
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
    },
    mounted() {
        //this.initPlot();
    }
}

export const pieChartDirective = {
    mounted(el,bindings,vnode) {
        console.log(el)
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

export const bootstrapSwitchComponent = {
    template: `<input type="checkbox" class="switch form-control" ref="switch">`,
    props: ['modelValue','size'],
    mounted() {
        let handle = this;
        let size = this.size === undefined ? "small" : this.size;
        $(this.$refs.switch).bootstrapSwitch({
            "state": handle.modelValue,
            "size": size,
            onInit(dom,event,state) {
                $(handle.$refs.switch).on('focus.bootstrapSwitch',() => {
                    this.$wrapper.removeClass("bootstrap-switch-focused")
                })
            },
            onSwitchChange(event,state) {
                handle.$emit('update:modelValue', state);
            }
        })
    },
    beforeUnmount() {
        $(this.$refs.switch).bootstrapSwitch('destroy');
    }
};

export const wOptionDirective = {
    mounted(el,bindings,vnode) {
        const html = document.querySelector('html');
        const lang = html.getAttribute("data-bs-language");
        el.textContent = el.getAttribute(lang);
    }
};

export const wSelectComponent = {
    template: `<select class="form-select" v-model="selectValue" @change="onSelectChange">
                    <slot></slot>
               </select>`,
    props: ['value1',"value2","split"],
    data(){
      return {
          selectValue:""
      }
    },
    methods: {
        onSelectChange() {
            let [value1,value2] = this.selectValue.split(this.split);
            value1 = isNaN(Number(value1)) ? value1 : Number(value1);
            value2 = isNaN(Number(value2)) ? value2 : Number(value2);
            this.$emit('update:value1', value1);
            this.$emit('update:value2', value2);
        }
    },
    mounted() {
        this.selectValue = this.value1 + this.split + this.value2;
    }
};

export const wInputComponent = {
    template: `<input type="text" class="form-control" v-model="selectValue" @change="onInputChange">`,
    props: ['value1',"value2","split"],
    data(){
        return {
            selectValue:""
        }
    },
    methods: {
        onInputChange() {
            let [value1,value2] = this.selectValue.split(this.split);

            value1 = isNaN(Number(value1)) ? value1 : Number(value1);
            value2 = isNaN(Number(value2)) ? value2 : Number(value2);

            this.$emit('update:value1', value1);
            this.$emit('update:value2', value2);
        }
    },
    mounted() {
        this.selectValue = this.value1 + this.split + this.value2;
    }
};

export const wSliderComponent = {
    template: `<div class="slider-wrap" ref="slider"></div>`,
    props: ['modelValue', 'min', 'max', 'step','fix'],
    data() {
      return {
          slider:{},
          handle:{}
      }
    },
    methods: {
        showTooltip() {
            let tooltip = this.handle.querySelector(".noUi-tooltip")
            tooltip.style.display = 'block';
        },
        hideTooltip() {
            let tooltip = this.handle.querySelector(".noUi-tooltip")
            tooltip.style.display = 'none';
        },
        formatTooltipValue(value) {
            if(Number(this.fix) === 0)
                value = parseInt(value);
            else
                value = parseFloat(value).toFixed(Number(this.fix));
            return value;
        }
    },
    mounted() {
        this.slider = this.$refs.slider;
        noUiSlider.create(this.slider, {
            start: Number(this.modelValue),
            connect: [true, false],
            tooltips: {
                to: this.formatTooltipValue,
            },
            range: {'min': Number(this.min), 'max': Number(this.max)},
            step: Number(this.step)
        });

        this.handle = this.slider.querySelector('.noUi-handle');
        this.hideTooltip();

        this.slider.addEventListener('mouseenter', () => {
           this.showTooltip();
        });

        this.slider.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });

        this.slider.noUiSlider.on('slide', (values, mark) => {
            this.$emit('update:modelValue', values[mark]);
        });
    }
};


export const wPlayerComponent = {
    template: `<div style="width:100%; padding-bottom: 56.25%;  position: relative;" ref="player">
                    <video autoplay controls muted style="width:100%;height: 100%; position: absolute; background: #555;" ref="video"></video>
                    <div style="position: absolute;width: 100%;height: 100%" ref="jess"></div>
                    <div class="force-video-cloud">
                        <div class="loading"></div>
                    </div>
              </div>`,
    props: ['url','codec','audio','buffer'],
    data() {
        return {
            player:{}
        }
    },
    watch: {
        url(newVal, lastVal) {
            this.destoryPlayer();
            this.initPlayer();
        },
        codec(newVal, lastVal) {
            this.destoryPlayer();
            this.initPlayer();
        },
        buffer(newVal, lastVal) {
            this.destoryPlayer();
            this.initPlayer();
        }
    },
    methods: {
        initPlayer() {

            if(this.url === "" || this.codec === "" || this.audio === "")
                return;

            if(this.codec === "h265") {
                this.$refs.video.style.display = 'none';
                this.$refs.jess.style.display = 'block';
                this.player =  new Jessibuca({
                    container: this.$refs.jess,
                    videoBuffer: this.buffer/1000,
                    decoder: "assets/plugins/jessibuca/decoder.js",
                    isResize: false,
                    audio: JSON.parse(this.audio),
                    operateBtns: {
                        fullscreen: true,
                        play: true,
                        audio: JSON.parse(this.audio),
                    },
                    forceNoOffscreen: true,
                    isNotMute: false,
                });
                this.player.play(this.url);
                this.player.on("play", (flag) => {
                    let cloud = this.$refs.player.querySelector(".force-video-cloud");
                    cloud.style.display = 'none'
                })
            } else {
                this.$refs.video.style.display = 'block';
                this.$refs.jess.style.display = 'none';
                this.player = flvjs.createPlayer({
                    type: 'flv',
                    audio: JSON.parse(this.audio),
                    url: this.url
                });
                this.player.attachMediaElement(this.$refs.video);
                this.player.load(); //加载
                this.player.play();
            }
        },
        destoryPlayer() {
            if(Object.keys(this.player).length > 0) {
                if(this.player.hasOwnProperty("unload")) {
                    this.player.unload();
                    this.player.detachMediaElement();
                }
                this.player.destroy();
                this.player = {};
            }
            let cloud = this.$refs.player.querySelector(".force-video-cloud");
            cloud.style.display = 'flex'
        },
        checkDelay() {
            if (Object.keys(this.player).length > 0 && this.player.hasOwnProperty("buffered") && this.player.buffered.length > 0) {
                if (this.player.buffered.end(0) - this.player.currentTime > 1.5) {
                    this.player.currentTime = this.player.buffered.end(0) - 0.2
                }
            }
        }

    },
    mounted() {
        this.destoryPlayer();
        this.initPlayer();
        this.checkDelay();
        this.$refs.video.addEventListener("canplay",() => {
            let cloud = this.$refs.player.querySelector(".force-video-cloud");
            cloud.style.display = 'none'
        });
    }
};

export const wTimepickerComponent = {
    template: `<div class="input-group bootstrap-timepicker">
                    <input type="text" class="form-control" ref="timepicker">
                    <span class="input-group-text input-group-addon"><i class="fa-regular fa-clock"></i></span>
               </div>`,
    props: ['modelValue'],
    mounted() {
        $(this.$refs.timepicker).timepicker({
            minuteStep: 1,
            defaultTime: this.modelValue,
            showMeridian: false,
            icons: {
                up: 'fa-solid fa-angle-up',
                down: 'fa-solid fa-angle-down'
            },
        });

        $(this.$refs.timepicker).on("changeTime.timepicker", event => {
            this.$emit('update:modelValue', event.time.value);
        });
    }
};
