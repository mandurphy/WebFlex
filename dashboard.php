<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
 <head>
     <?php include ("./public/head.inc") ?>
 </head>
  <body>
  <?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content dashboard" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>系统状态</cn>
                                <en>System state</en>
                            </div>
                        </div>
                        <div class="card-body" >
                            <div class="row row-cols-3 text-center">
                                <div class="col-lg-4 ">
                                    <pie-chart :value="cpu" :color="theme_color"></pie-chart>
                                    <div>
                                        <cn>CPU使用率</cn>
                                        <en>CPU usage</en>
                                    </div>
                                </div>
                                <div class="col-lg-4 text-center">
                                    <pie-chart :value="mem" :color="theme_color"></pie-chart>
                                    <div>
                                        <cn>内存使用率</cn>
                                        <en>Memory usage</en>
                                    </div>
                                </div>
                                <div class="col-lg-4 text-center">
                                    <tmp-compt :value="tmp" :color="theme_color"></tmp-compt>
                                    <div>
                                        <cn>核心温度</cn>
                                        <en>Core temperature</en>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>网络状态</cn>
                                <en>Network state</en>
                            </div>
                        </div>
                        <div class="card-body">
                            <net-chart v-if="tx.length > 0" :color="theme_color" :maxy="maxy" :data1="tx" :data2="rx"></net-chart>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body iface py-3">
                            <div v-for="(item,index) in input" :key="index" :class="[{'hdmi':item.protocol==='HDMI'},{'sdi':item.protocol==='SDI'},{'disable':!item.avalible}]">
                                <span class="info">{{item.info}}</span>
                                <div class="icon my-1"></div>
                                <span class="name">{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="mb-0 text-uppercase"><cn>预览</cn><en>Preview</en><small style="margin-left: 5px;color: grey;font-size: 12px;"><cn>非实时视频，仅预览图片</cn><en>Not a realtime video, picture only</en></small></h6>
                            <div class="my-3 border-top"></div>
                            <div class="row row-cols-2 row-cols-lg-4 g-3">
                                <div v-for="(item,index) in preview" :key="index" class="col">
                                    <div class="card border-end">
                                        <img :src="makeImgUrl(item.id)" class="card-img-top" alt="...">
                                        <div class="chn-volume" :style="{'width':handleChnVolume(item.id,'L')}"></div>
                                        <div class="chn-volume" :style="{'width':handleChnVolume(item.id,'R')}"></div>
                                        <div class="card-body">
                                            <p class="card-text text-center">{{item.name}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  <?php include ("./public/foot.inc") ?>

  <script src="assets/plugins/easyPieChart/jquery.easypiechart.js"></script>
  <script src="assets/plugins/flotChart/jquery.flot.js"></script>
  <script src="assets/plugins/flotChart/jquery.flot.tooltip.js"></script>
  <script src="assets/plugins/flotChart/jquery.flot.resize.js"></script>
  <script src="assets/plugins/flotChart/jquery.flot.pie.resize.js"></script>
  <script src="assets/plugins/flotChart/jquery.flot.selection.js"></script>
  <script src="assets/plugins/flotChart/jquery.flot.stack.js"></script>
  <script src="assets/plugins/flotChart/jquery.flot.time.js"></script>

  <script type="module">
      import { rpc } from "./assets/js/helper.js";
      import { useDefaultConf,useHardwareConf } from "./assets/js/confHooks.js";
      import { bootstrapSwitchComponent,statusPieChartComponent,statusTemperatureComponent,netFlotChartComponent } from "./assets/js/vueHelper.js"

      const { createApp,ref,reactive,computed,onMounted,toRaw } = Vue;
      const { defaultConf } = useDefaultConf();
      const { hardwareConf } = useHardwareConf();
      
      const app  = createApp({
          components:{
              "bootstrap-switch":bootstrapSwitchComponent,
              "net-chart":netFlotChartComponent,
              "pie-chart":statusPieChartComponent,
              "tmp-compt":statusTemperatureComponent
          },
          setup(prop,context){

              const state = {
                  cpu: ref(0),
                  tmp: ref(0),
                  mem: ref(0),
                  maxy: ref(0),
                  tx : reactive([]),
                  rx : reactive([]),
                  data1:reactive([]),
                  data2:reactive([]),
                  theme_color:ref("#ffbb00"),
                  preview : reactive([]),
                  input : reactive([]),
                  volume: reactive([])
              }

              const getData1 = (d) => {
                  state.data1.shift();
                  state.data1.push( d );
                  state.tx.splice(0);
                  for (let i = 0; i < 100; i++)
                      state.tx.push([i,state.data1[i]]);
              }

              const getData2 = (d) => {
                  state.data2.shift();
                  state.data2.push( d );
                  state.rx.splice(0);
                  for (let i = 0; i < 100; i++)
                      state.rx.push([i,state.data2[i]]);
              }

              const updateNetState = () => {
                  if(state.data1.length === 0 && state.data2.length === 0) {
                      for ( let i = 0; i < 100; i++ ) {
                          state.data1.push( 0 );
                          state.data2.push( 0 );
                      }
                  }
                  rpc("enc.getNetState").then(data => {
                      getData1(data.tx);
                      getData2(data.rx);
                      if ( data.tx * 1.3 > state.maxy.value )
                          state.maxy.value = data.tx * 1.3;
                      if ( data.rx * 1.3 > state.maxy.value )
                          state.maxy.value = data.rx * 1.3;
                      if ( state.maxy.value < 1024 )
                          state.maxy.value = Math.ceil( state.maxy.value / 100 ) * 100;
                      else
                          state.maxy.value = Math.ceil( state.maxy.value / 1024 ) * 1024;
                      if ( state.maxy.value > 1024000 )
                          state.maxy.value = 1024000;
                      setTimeout(updateNetState, 500);
                  });
              }

              const updateSysState = () => {
                  rpc("enc.getSysState").then(data => {
                      state.cpu.value = data.cpu;
                      state.mem.value = data.mem;
                      state.tmp.value = data.temperature;
                      setTimeout(updateSysState, 2000);
                  });
              }

              const makeImgUrl = (id) => {
                  return "snap/snap" + id + ".jpg?rnd=" + Math.random();
              }

              const updatePreview = () => {
                  if(state.preview.length === 0) {
                      for(let i=0;i<defaultConf.length;i++) {
                          if (!defaultConf[i].enable  || ( defaultConf[i].type === "net" && !defaultConf[i].net.decodeV))
                              continue;
                          state.preview.push(defaultConf[i]);
                      }
                  }
                  setTimeout(() => rpc("enc.snap"),300);
                  setTimeout(updatePreview,800);
              }

              const handleChnVolume = (chnId,type) => {
                  let volume = state.volume.filter((item,index)=>{
                      return chnId === index;
                  })
                  let retVal = 0;
                  if(volume.length > 0)
                      retVal = volume[0][type] * 100/96;
                  return retVal + "%";
              }

              const updateVolume = () => {
                  rpc( "enc.getVolume").then(data => {
                      state.volume.splice(0,state.volume.length,...data);
                  });

                  if(window.location.host === "wx.linkpi.cn")
                      setTimeout(updateVolume,1000);
                  else
                      setTimeout(updateVolume,500);
              }

              const updateInputState = () => {
                  rpc("enc.getInputState").then(ret => {
                      state.input.splice(0, state.input.length, ...ret);
                      for(let i=0;i<state.input.length;i++) {
                          let ipt = state.input[i];
                          ipt.info = "- - -";
                          if(ipt.avalible)
                              ipt.info = "" + ipt.height + ( ipt.interlace ? "I" : "P" ) + ipt.framerate;
                          state.input[i] = ipt;
                      }
                  });
                  setTimeout(updateInputState,3000);
              }

              onMounted(()=>{
                  updateSysState();
                  updateNetState();
                  updatePreview();
                  updateInputState();
                  updateVolume();
                }
              )

              return {...state, makeImgUrl,handleChnVolume}
          }
      })
      app.mount('#app')
  </script>
  </body>
</html>