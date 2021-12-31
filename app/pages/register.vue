<template>
  <div>
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
    <div class="form-group">
      <div class="btn-group" role="group" style="width: 100%">
        <button @click="register" class="btn btn-primary">注册</button>
        <a href="/login" class="btn btn-success" role="button">前往登录</a>
      </div>
    </div>
  </div>
</template>
<script>
import { Register } from "../apis/index";
export default {
  name: "Register",
  methods: {
    async register() {
      const resp = await Register({
        username: $("#username").val(),
        password: $("#password").val(),
      });
      if (resp.successful) {
        this.$router.push({
          name: 'Login'
        });
      } else {
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>