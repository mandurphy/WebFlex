<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content group" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>群组列表</cn>
                                <en>Group list</en>
                            </div>
                        </div>
                        <div class="card-body">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th class="text-center">
                                            <cn>序号</cn>
                                            <en>Num</en>
                                        </th>
                                        <th class="text-center"> IP </th>
                                        <th class="text-center"> Mac </th>
                                        <th class="text-center">
                                            <cn>设备型号</cn>
                                            <en>Device</en>
                                        </th>
                                        <th class="text-center">
                                            <cn>软件版本</cn>
                                            <en>Version</en>
                                        </th>
                                        <th class="text-center">
                                            <cn>频道</cn>
                                            <en>Channels</en>
                                        </th>
                                        <th class="text-center">
                                            <cn>操作</cn>
                                            <en>Operation</en>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in groupList" :key="index">
                                        <td class="text-center">{{index+1}}</td>
                                        <td class="text-center">{{item.ip}}</td>
                                        <td class="text-center">{{item.mac}}</td>
                                        <td>{{item.type}}</td>
                                        <td>
                                            <div class="row" v-for="(it,idx) in Object.keys(item.version)" :key="idx+10000">
                                                <div class="col-lg-10 p-0">
                                                    <label class="text-truncate force-align-right">
                                                        {{it+'_'+item.version[it].split('_')[0]}}
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row" v-for="(it,idx) in splitArray(item.info,4)" :key="idx+20000">
                                                <div class="col-lg-12">
                                                    <label class="text-truncate">
                                                        {{it.join(' ,')}}
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col-lg-12 text-center">
                                                    <button class="btn btn-primary border-2 me-2">
                                                        <i class="fa-solid fa-network-wired"></i>
                                                    </button>
                                                    <button class="btn btn-primary border-2 me-2">
                                                        <i class="fa-brands fa-internet-explorer"></i>
                                                    </button>
                                                    <button class="btn btn-primary border-2">
                                                        <i class="fa-solid fa-power-off"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                </tbody>
                            </table>
                            <div class="row">
                                <div class="col-lg-5">
                                    <div class="row row-cols-3">
                                        <div class="col-lg-2 force-align-center">
                                            <strong>
                                                <cn>分组ID</cn>
                                                <en>Group ID</en>
                                            </strong>
                                        </div>
                                        <div class="col-5">
                                            <input class="form-control">
                                        </div>
                                        <div class="col-5 p-0">
                                            <button type="button" class="btn btn-primary border-3 me-2">
                                                <cn>保存</cn>
                                                <en>Save</en>
                                            </button>
                                            <button type="button" class="btn btn-primary border-3">
                                                <cn>重新搜索</cn>
                                                <en>Search again</en>
                                            </button>
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

<script type="module">
    import { rpc,alertMsg,splitArray } from "./assets/js/rps.helper.js";
    import { useDefaultConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin,bootstrapSwitchComponent } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watchEffect,onMounted,nextTick} = vue;
    const app = createApp({
        components:{
            "bs-switch" : bootstrapSwitchComponent
        },
        setup(props,context) {
            
            const { defaultConf,updateDefaultConf } = useDefaultConf();

            const state = {
                groupList: reactive([])
            }

            const refreshGroupList = () => {
                rpc("group.getList").then( data => {
                    state.groupList.splice(0);
                    state.groupList.push(...data);
                    console.log(data);
                } );
            }

            onMounted(()=>{
                refreshGroupList();
            })
            
            return {...state,defaultConf,updateDefaultConf,splitArray}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>