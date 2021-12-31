<template>
  <div class="login">
    <div class="form-group">
      <label for="username">用户名</label>
      <input type="text" class="form-control" name="username" id="username" />
    </div>
    <div class="form-group">
      <label for="password">密码</label>
      <input
        type="password"
        class="form-control"
        name="password"
        id="password"
      />
    </div>
    <div class="form-group border-bottom">
      <div class="btn-group" role="group" style="width: 100%">
        <button
          class="btn btn-primary"
          role="button"
          @click="login"
        >
          确定登录
        </button>
        <a href="/register" class="btn btn-success" role="button">前往注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { Login, GetUser } from "../apis/index";
export default {
  name: "Login",
  methods: {
    async login() {
      const username = $("#username").val();
      const password = $("#password").val();
      const resp = await Login({
        username: username,
        password: password,
      });
      if (resp.successful) {
        window.localStorage.setItem("token", resp.data.token);
        this.$router.push({
          name: 'Home',
          query: {
            userId: resp.data.userInfo.id
          }
        });
      } else {
        window.alert(resp.errorMesg);
      }
    }
  },
};
</script>
<style lang="less" scoped>
</style>