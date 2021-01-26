<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss" scoped>
.example {
  /* prettier-ignore */
  padding: 0PX; // /* prettier-ignore */ 作用是使格式化工具不讲PX转化为px
}
</style>
