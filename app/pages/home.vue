<template>
  <div class="home">
    欢迎来到三体世界
  </div>
</template>
<script>
export default {
  name: "Home",
  created() {
    const userId = this.$route.query.userId;
    this.$store.dispatch('GetUserInfo', userId);
  }
};
</script>
<style lang="less">
.home {
  height: 100%;
  margin: 0 auto;
}
</style>
<style lang="less" scoped>
.home {
  height: 100%;
  margin: 0 auto;
}
</style>