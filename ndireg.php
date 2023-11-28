<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<?php include ("./public/menu.inc") ?>
    <div data-simplebar>
        <main class="page-content ndireg" id="app" v-cloak>
            <div class="row">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header bg-transparent">
                            <div class="p-2 mb-0 d-flex align-items-end">
                                <cn>NDI Vendor Setting</cn>
                                <en>NDI Vendor Setting</en>
                            </div>
                        </div>
                        <div class="card-body pb-4" v-if="Object.keys(ndi).length > 0">
                            <div class="row mt-3">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>Serial number</cn>
                                        <en>Serial number</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" v-model.trim.lazy="sn" disabled readonly>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>Vendor name</cn>
                                        <en>Vendor name</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" v-model.trim.lazy="ndi.ndi.vendor.name">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-3 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>Vendor id (Encrypted)</cn>
                                        <en>Vendor id (Encrypted)</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" v-model.trim.lazy="ndi.ndi.vendor.id">
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-lg-12 text-center">
                                    <button type="button" class="btn border-3 btn-primary px-4 me-3" @click="saveNdiConf">
                                        <cn>保存</cn>
                                        <en>Save</en>
                                    </button>
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
    import { useNdiConf,useSnConf } from "./assets/js/vue.hooks.js";
    import { ignoreCustomElementPlugin } from "./assets/js/vue.helper.js"
    import vue from "./assets/js/vue.build.js";

    const {createApp,ref,reactive,watch,watchEffect,computed,onMounted} = vue;
    const app = createApp({
        setup(props,context) {
            const { ndiConf,updateNdiConf } = useNdiConf();
            const { sn } = useSnConf();
            const ndi = reactive({});

            const unwatch = watch(ndiConf,()=>{
                Object.assign(ndi,JSON.parse(ndiConf.value));
                unwatch();
            })

            const saveNdiConf = () =>{
                ndiConf.value = JSON.stringify(ndi,null,2);
                updateNdiConf();
            }

            return {ndiConf,updateNdiConf,ndi,sn,saveNdiConf}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>