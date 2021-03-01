<template>
  <div class="layout">

    <div class="layout__dashboard">
      <el-header class="layout__header">
        <div class="layout__title">
          <img
            src="@/assets/logo.png"
            alt=""
            class="layout-logo"
          >
          <h2>VUE-DEMO</h2>
        </div>
        <div class="login__user-dashboard">
          <img
            src="@/assets/user.png"
            alt=""
            class="login__user-img"
          >

          <el-dropdown
            class="login__user"
            @command="logout"
          >

            <span class="login__user-name">
              {{$store.state.user.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-container class="layout__container">
        <keep-alive>
          <sider-bar></sider-bar>
        </keep-alive>
        <el-main class="layout__main">
          <h1>{{$store.state.subTitle}}</h1>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import SiderBar from './SiderBar.vue';

export default {
  data: () => ({
    inputData: ''
  }),
  components: { SiderBar },
  computed: {
    defaultActive() {
      return this.$route.path;
    }
  },
  created() {
    this.checkedLogin();
    this.$store.commit('SET_SUB_TITLE', '页面');
  },
  methods: {
    logout() {
      this.$router.push('/login');
    },
    checkedLogin() {
      if (!this.$store.state.user.name) {
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "variable";
$header-width: 54px;
.layout {
  height: 100%;
}

.layout__dashboard {
  height: calc(100% - #{$header-width});
}
.layout__container {
  height: 100% !important;
}
.layout__header {
  display: flex;
  justify-content: space-between;
  height: 50px !important;
  background: linear-gradient(
    190deg,
    rgba(59, 165, 221, 1) 0%,
    rgba(35, 141, 119, 1) 100%
  );
  color: $--color-text-white;

  .layout__title {
    display: flex;
    align-items: center;
    .layout-logo {
      height: 30px;
      width: 30px;
    }
    h2 {
      font-size: 20px;
      margin-left: 20px;
    }
  }
  .login__user-dashboard {
    display: flex;
    align-items: center;
  }
  .login__user {
    cursor: pointer;
    margin-right: 12px;
    color: $--color-text-white;
  }
  .login__user-img {
    width: 28px;
    height: 28px;
    margin-right: 10px;
  }
}

.layout__main {
  h1 {
    margin: 10px 0 20px;
    font-size: 20px;
    color: #293038;
    letter-spacing: 0;
  }
}
</style>
