<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
 <head>
     <?php include ("./public/head.inc") ?>
 </head>
  <body>
  <?php include ("./public/menu.inc") ?>
     <main class="page-content dashboard" id="app" v-cloak>
         <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xxl-4 mt-3">
             <div class="col">
                 <div class="card radius-10">
                     <div class="card-body">
                         <div class="d-flex align-items-center">
                             <div class="">
                                 <p class="mb-1"><cn>CPU使用率</cn><en>CPU usage</en></p>
                                 <h4 class="mb-0 text-pink">542</h4>
                             </div>
                             <div class="ms-auto">
                                 <div class="w_chart" v-pie="{'bgColor':'#dc3545','color':'rgb(231 46 122 / 15%)','val':cpu}">
                                     <span class="w_percent"></span>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             <div class="col">
                 <div class="card radius-10">
                     <div class="card-body">
                         <div class="d-flex align-items-center">
                             <div class="">
                                 <p class="mb-1"><cn>内存使用率</cn><en>Memory usage</en></p>
                                 <h4 class="mb-0 text-primary">15K</h4>
                             </div>
                             <div class="ms-auto">
                                 <div class="w_chart" v-pie="{'bgColor':'#0d6efd','color':'rgb(52 97 255 / 15%)','val':mem}">
                                     <span class="w_percent"></span>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             <div class="col">
                 <div class="card radius-10">
                     <div class="card-body">
                         <div class="d-flex align-items-center">
                             <div class="">
                                 <p class="mb-1"><cn>核心温度</cn><en>Core temperature</en></p>
                                 <h4 class="mb-0 text-success">59</h4>
                             </div>
                             <div class="ms-auto">
                                 <div class="w_chart" v-pie="{'bgColor':'#198754','color':'rgb(18 191 36 / 15%)','val':tmp}">
                                     <span class="w_percent"></span>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             <div class="col">
                 <div class="card radius-10">
                     <div class="card-body">
                         <div class="d-flex align-items-center">
                             <div class="">
                                 <p class="mb-1">New Tickets</p>
                                 <h4 class="mb-0 text-orange">214</h4>
                             </div>
                             <div class="ms-auto">
                                 <div class="w_chart" v-pie="{'bgColor':'#ff6632','color':'rgb(255 102 50 / 15%)','val':tmp}">
                                     <span class="w_percent"></span>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div><!--end row-->


         <div class="row">
             <div :class="[{'col-lg-6':input.length > 5},{'col-lg-8':input.length <= 5}]">
                 <div class="card">
                     <div class="card-header bg-transparent">
                         <div class="d-flex align-items-center">
                             <div class="p-2">
                                 <h6 class="mb-0 fw-bold"><cn>网络状态</cn><en>Network state</en></h6>
                             </div>
                         </div>
                     </div>
                     <div class="card-body">
                         <div v-apex="{'data1':tx,'data2':rx}"></div>
                     </div>
                 </div>
             </div>
             <div :class="[{'col-lg-6':input.length > 5},{'col-lg-4':input.length <= 5}]">
                 <div class="card w-100">
                     <div class="card-header bg-transparent">
                         <div class="d-flex align-items-center">
                             <div class="p-2">
                                 <h6 class="mb-0 fw-bold"><cn>端口状态</cn><en>Interface state</en></h6>
                             </div>
                         </div>
                     </div>
                     <div class="card-body" style="min-height: 406px">
                         <div class="row">
                             <div :class="[{'col-lg-6':input.length > 5},{'col-lg-12':input.length <= 5}]">
                                 <div class="team-list" v-for="(item,index) in getInputs1">
                                     <div class="d-flex align-items-center gap-3" style="height: 54px">
                                         <div :class="[{'hdmi':item.protocol==='HDMI'},{'sdi':item.protocol==='SDI'},{'disable':!item.avalible},'text-center']">
                                             <div class="icon"></div>
                                         </div>
                                         <div class="flex-grow-1">
                                             <h6 :class="['mb-1','fw-bold',{'disable':!item.avalible}]">{{item.name}}</h6>
                                             <span v-if="item.avalible" class="badge bg-success bg-success-subtle text-success border border-opacity-25 border-success">{{item.info}}</span>
                                             <span v-else class="badge bg-warning bg-warning-subtle text-warning border border-opacity-25 border-warning">{{item.info}}</span>
                                         </div>
                                         <bs-switch v-model="test_switch"></bs-switch>
                                     </div>
                                     <hr style="margin: 0.55rem 0">
                                 </div>
                             </div>
                             <div class="col-lg-6" v-show="input.length > 5">
                                 <div class="team-list" v-for="(item,index) in getInputs2">
                                     <div class="d-flex align-items-center gap-3" style="height: 54px">
                                         <div :class="[{'hdmi':item.protocol==='HDMI'},{'sdi':item.protocol==='SDI'},'text-center']">
                                             <div class="icon"></div>
                                         </div>
                                         <div class="flex-grow-1">
                                             <h6 class="mb-1 fw-bold">{{item.name}}</h6>
                                             <span v-if="item.avalible" class="badge bg-success bg-success-subtle text-success border border-opacity-25 border-success">{{item.info}}</span>
                                             <span v-else class="badge bg-warning bg-warning-subtle text-warning border border-opacity-25 border-warning">{{item.info}}</span>
                                         </div>
                                         <div class="form-check form-switch form-check-success border-0">
                                             <input class="form-check-input border-1"  type="checkbox" role="switch" checked="">
                                         </div>
                                     </div>
                                     <hr style="margin: 0.55rem 0">
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
         
         <div class="card">
             <div class="card-body">
                 <h6 class="mb-0 text-uppercase"><cn>预览</cn><en>Preview</en><small style="margin-left: 5px;color: grey;font-size: 12px;"><cn>非实时视频，仅预览图片</cn><en>Not a realtime video, picture only</en></small></h6>
                 <div class="my-3 border-top"></div>
                 <div class="row row-cols-2 row-cols-lg-5 g-3">
                     <div v-for="(item,index) in preview" class="col">
                         <div class="card border-end">
                             <img :src="makeImgUrl(item.id)" class="card-img-top" alt="...">
                             <div class="card-body">
                                 <p class="card-text text-center">{{item.name}}</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </main>
  <?php include ("./public/foot.inc") ?>

  <script src="assets/plugins/easyPieChart/jquery.easypiechart.js"></script>
  <script src="assets/plugins/apex/apexcharts.min.js"></script>
  <script type="module">

      import { rpc} from "./assets/js/cul.helper.js";
      import { useDefaultConf,useHardwareConf } from "./assets/js/vue.hooks.js";
      import { ignoreCustomElementPlugin,pieChartDirective,apexChartsDirective,bootstrapSwitchComponent } from "./assets/js/vue.helper.js"
      import vue from "./assets/js/vue.build.js";

      const { createApp,ref,reactive,onMounted } = vue;
      const app  = createApp({
          directives:{
              "pie":pieChartDirective,
              "apex":apexChartsDirective
          },
          components:{
            "bs-switch":bootstrapSwitchComponent
          },
          setup(prop,context){
              
              const state = {
                  tx : ref(0),
                  rx : ref(0),
                  cpu: ref(0),
                  tmp: ref(0),
                  mem: ref(0),
                  preview : reactive([]),
                  input : reactive([]),
                  test_switch : ref(true)
              }

              const { defaultConf } = useDefaultConf();
              const { hardwareConf } = useHardwareConf();
              
              const updateNetState = () => {
                  rpc("enc.getNetState").then(data => {
                      state.rx.value = data.rx;
                      state.tx.value = data.tx;
                      setTimeout(updateNetState, 1000);
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
              
              const updatePreview = async () => {
                  rpc("enc.snap").then(()=>{
                      if(state.preview.length === 0) {
                          for(let i=0;i<defaultConf.length;i++) {
                              if (!defaultConf[i].enable  || ( defaultConf[i].type === "net" && !defaultConf[i].net.decodeV))
                                  continue;
                              state.preview.push(defaultConf[i]);
                          }
                      }
                  });
                  setTimeout(updatePreview,500);
              }
              
              const updateInputState = () => {
                  rpc("enc.getInputState").then(ret => {
                      state.input.splice(0, state.input.length, ...ret);
                      for(let i=0;i<state.input.length;i++) {
                          let ipt = state.input[i];
                          ipt.info = "no signal";
                          if(ipt.avalible)
                              ipt.info = "" + ipt.height + ( ipt.interlace ? "I" : "P" ) + ipt.framerate;
                          state.input[i] = ipt;
                      }
                  });
                  setTimeout(updateInputState,3000);
              }
    
              const getInputs1 = computed(()=>{
                  return state.input.filter((item,index)=>{
                      if(index > 4)
                          return false;
                      return true;
                  })
              })
    
              const getInputs2 = computed(()=>{
                  return state.input.filter((item,index)=>{
                      if(index <= 4)
                          return false;
                      return true;
                  })
              })
              
              onMounted(()=>{
                  updateSysState();
                  updateNetState();
                  updatePreview();
                  updateInputState();
                }
              )
              
              return {
                  ...state, makeImgUrl,getInputs1,getInputs2
              }
          }
      })
      app.use(ignoreCustomElementPlugin);
      app.mount('#app')
  </script>
  </body>
</html>