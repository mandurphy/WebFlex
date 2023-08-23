
<!doctype html>
<html lang="en" data-bs-theme="dark">
<head>
    <?php include ("./public/head.inc") ?>
</head>
<body>
<div class="container-fluid login auth-cover force-align-center" id="app">
    <div class="card border-3" style="width: 460px">
        <div class="card-body p-5">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <img src="assets/images/logo-lg.png" class="mb-3" width="300">
                </div>
            </div>
            <div class="form-body mt-4">
                <form @submit.prevent="handleSubmit" class="row g-3" action="/link/action.php" method="post" ref="form" autocomplete="off">
                    <div class="col-12">
                        <label for="username" class="form-label"><cn>用户名</cn><en>Username</en></label>
                        <input v-model.trim.lazy="username" type="text" class="form-control border-3" name="username" placeholder="Enter Username">
                    </div>
                    <div class="col-12">
                        <label for="password" class="form-label"><cn>密码</cn><en>Password</en></label>
                        <div class="input-group">
                            <input v-model.trim.lazy="password" :type="!showPasswd ? 'password' : 'text'" class="form-control border-end-0  border-3" name="password" placeholder="Enter Password">
                            <div class="input-group-text bg-transparent  border-3 force-cursor-pointer" @click="showPasswd = !showPasswd"><i :class="['fa-regular',{'fa-eye-slash':showPasswd},{'fa-eye ':!showPasswd}]"></i></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check form-switch form-check-primary border-3">
                            <input class="form-check-input" type="checkbox" v-model="remember">
                            <label class="form-check-label"><cn>记住密码</cn><en>Remember Me</en></label>
                        </div>
                    </div>
                    <div class="col-12 text-center">
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

<?php include ("./public/foot.inc") ?>

<script type="module">

    import { alertMsg,getUrlParam } from "./assets/js/helper.js";
    import vue from "./assets/plugins/vue/vue.build.js";

    const { createApp,ref,onMounted } = vue;
    const app = createApp({
        setup(props,context) {

            const state = {
                form: ref(null),
                username: ref(""),
                password: ref(""),
                remember: ref(false),
                showPasswd:ref(false)
            }

            const removeUrlParam = () => {
                const urlWithoutParams = window.location.href.split('?')[0];
                history.replaceState({}, document.title, urlWithoutParams);
            }

            const handleSubmit = () => {

                if(state.username.value === "" || state.password.value === "") {
                    alertMsg("<cn>账号或密码不能为空</cn><en>Account or password cannot be empty</en>","error")
                    return;
                }

                if(state.remember.value) {
                    localStorage.setItem("username",state.username.value);
                    localStorage.setItem("password",state.password.value);
                } else {
                    localStorage.removeItem("username");
                    localStorage.removeItem("password");
                }
                state.form.value.submit();
            }

            onMounted(()=>{
                let uname = localStorage.getItem("username");
                let passwd = localStorage.getItem("password");
                if(uname !== null && passwd !== null) {
                    state.remember.value = true;
                    state.username.value = uname;
                    state.password.value = passwd;
                }

                let param = getUrlParam("u");
                if(param === "e") {
                    alertMsg("<cn>账号或密码错误</cn><en>The account or password is incorrect</en>","error")
                    removeUrlParam();
                }
            })
            return { ...state,handleSubmit }
        },
    });
    app.mount('#app');
</script>
</body>
</html>