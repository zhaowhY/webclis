<template>
  <div
    class="layout__aside"
    @mouseover="menuMouseEnter"
    @mouseleave="menuMouseLeave"
  >
    <el-aside class="layout__aside">
      <el-menu
        :default-openeds="defaultOpeneds"
        :default-active="defaultActive"
        class="layout__el-menu el-menu-vertical-demo"
        :router="true"
        :collapse="isCollapse"
        @open="open"
        @close="close"
        background-color="rgba(229,239,238,1)"
        text-color="#00001D"
        active-text-color="#FFFFFF"
      >
        <template v-for="(route, index) of routes">
          <el-submenu
            :index="index + route.path"
            v-if="route.children && route.children.length > 0"
            :key="index + route.path"
          >
            <template slot="title">
              <svg-icon
                v-if="route.meta.icon"
                :icon-class="route.meta.icon"
              />
              <span>{{route.meta.title}}</span>
            </template>
            <template v-for="(child, idx) of route.children">
              <el-menu-item
                :key="idx + child.path"
                :index="child.path"
              >
                <svg-icon
                  v-if="child.meta.icon"
                  :icon-class="child.meta.icon"
                />

                {{child.meta.title}}
              </el-menu-item>
            </template>
          </el-submenu>

          <el-menu-item
            v-else
            :key="index + route.path"
            :index="route.path"
          >
            <svg-icon
              v-if="route.meta.icon"
              :icon-class="route.meta.icon"
            />
            <span slot="title">{{route.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    isCollapse: false,
    defaultOpeneds: [],
  }),
  computed: {
    ...mapState([
      'routes',
      'elOpenMenu'
    ]),
    defaultActive() {
      return this.$route.path;
    }
  },
  created() {
    this.defaultOpeneds = [...this.elOpenMenu];
  },
  watch: {
    isCollapse() {
      if (this.isCollapse) {
        this.$store.commit('SET_EL_OPEN_MENU', [this.elOpenMenu[0]]);
      }
    }
  },
  methods: {
    // open与close函数主要为了解决，addRoute的路由与common路由切换时,刷新siderBar的导致体验不好问题
    open(idx) {
      const menus = [idx, ...this.elOpenMenu];
      this.$store.commit('SET_EL_OPEN_MENU', [...new Set(menus)]);
    },
    close(idx) {
      const menus = [...this.elOpenMenu].filter(item => item !== idx);
      this.$store.commit('SET_EL_OPEN_MENU', [...new Set(menus)]);
    },
    menuMouseEnter() {
      this.isCollapse = false;
    },
    menuMouseLeave() {
      this.isCollapse = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.layout__aside {
  width: auto !important;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.layout__el-menu {
  padding: 2px;
  height: 100%;
}
</style>
