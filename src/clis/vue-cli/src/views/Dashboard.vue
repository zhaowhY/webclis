<template>
  <div>
    <p>login.vue将用户名设置为角色名</p>
    <p>角色为admin时，可以看到及访问admin权限页面</p>
    <p>角色为consumer时，可以看到及访问consumer权限页面</p>
    <p>设置权限在src/config/permissions中</p>
    <svg-icon
      icon-class="dashboard"
      class-name="dashboard-svg"
    ></svg-icon>
  </div>

</template>

<script>
export default {
  data: () => ({})
};
</script>

<style lang="scss" scoped>
@import "variable";

.dashboard-svg {
  color: $--color-primary;
  width: 30px;
  height: 30px;
  vertical-align: bottom;
}
</style>
