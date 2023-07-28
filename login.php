<!doctype html>
<html lang="en" data-bs-theme="dark">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<div class="section-authentication-cover login" id="app">
    <div class="">
        <div class="row g-0">

            <div class="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex bg-primary">

                <div class="card rounded-0 mb-0 border-0 bg-transparent">
                    <div class="card-body">
                        <img src="assets/images/boxed-login.png" class="img-fluid auth-img-cover-login" width="650" alt="">
                    </div>
                </div>

            </div>

            <div class="col-12 col-xl-5 col-xxl-4 auth-cover-right align-items-center justify-content-center">
                <div class="card rounded-0 m-3 mb-0 border-0">
                    <div class="card-body p-sm-5">
                        <img src="assets/images/logo.png" class="mb-4" width="126" alt="" style="margin-left: -20px">
                        <h6 class="fw-bold" style="white-space:pre-wrap"><cn>灵派  让科技更简单</cn></h6>
                        <div class="separator section-padding mt-3">
                            <div class="line"></div>
                            <p class="mb-0 fw-bold">AND</p>
                            <div class="line"></div>
                        </div>

                        <div class="form-body mt-4">
                            <form class="row g-3" action="/link/action.php" method="post">
                                <div class="col-12">
                                    <label for="username" class="form-label"><cn>用户名</cn><en>Username</en></label>
                                    <input type="text" class="form-control  border-3" name="username" placeholder="Enter Username">
                                </div>
                                <div class="col-12">
                                    <label for="password" class="form-label"><cn>密码</cn><en>Password</en></label>
                                    <div class="input-group" id="show_hide_password">
                                        <input :type="!showPasswd ? 'password' : 'text'" class="form-control border-end-0  border-3" name="password" placeholder="Enter Password">
                                        <div class="input-group-text bg-transparent  border-3 force-cursor-pointer" @click="showPasswd = !showPasswd"><i :class="['fa-regular',{'fa-eye-slash':showPasswd},{'fa-eye ':!showPasswd}]"></i></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-check form-switch  border-3">
                                        <input class="form-check-input" type="checkbox">
                                        <label class="form-check-label"><cn>记住密码</cn><en>Remember Me</en></label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="d-grid">
                                        <button type="submit" class="btn  border-3 btn-primary"><cn>登录</cn><en>Login</en></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include ("./public/foot.inc") ?>

<script type="module">

    import { alertMsg,getUrlParam } from "./assets/js/helper.js";
    const { createApp,ref,onMounted} = Vue;

    const app = createApp({
        setup() {
            let showPasswd = ref(false);

            const removeURLParameter = () => {
                const urlWithoutParams = window.location.href.split('?')[0];
                history.replaceState({}, document.title, urlWithoutParams);
            }

            onMounted(()=>{
                let param = getUrlParam("u");
                if(param === "e") {
                    alertMsg("<cn>账号或密码错误</cn><en>The account or password is incorrect</en>","error")
                    removeURLParameter();
                }

            })
            return {showPasswd}
        },
    });
    app.mount('#app');
</script>

</body>

</html>