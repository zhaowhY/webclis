import Vue from 'vue';
import Router from 'vue-router';
import Store from '@/store/index';
import Layout from '@/views/layout/Index.vue';
import { permission } from '@/config/permissions.js';
// router lazy load
Vue.use(Router);


export const commonRoutesMap = [
  {
    path: '/login',
    name: '登录页',
    component: () => import('../views/Login.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '导航页一', icon: 'el-icon-menu' },
    childRootShow: true,
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { title: '导航页一', icon: 'el-icon-location' }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/one',
    meta: { title: '导航页二', icon: 'el-icon-menu' },
    children: [
      {
        path: '/example/one',
        name: 'exampleOne',
        component: () => import('@/views/One.vue'),
        meta: { title: '选项一', icon: 'el-icon-menu' }
      },
      {
        path: '/example/two',
        name: 'exampleTwo',
        hidden: true,
        component: () => import('@/views/Two.vue'),
        meta: { title: '选项二', icon: 'el-icon-menu' }
      },
      {
        path: '/example/three',
        name: 'exampleThree',
        component: () => import('@/views/Three.vue'),
        meta: { title: '选项三', icon: 'el-icon-location' }
      }
    ]
  },
  // 404 页面必须放在最后!!!
  { path: '*', redirect: '/404', hidden: true }
];

export const asyncRoutesMap = [
  {
    path: '/',
    component: Layout,
    meta: { title: '权限页', icon: 'el-icon-menu' },
    children: [
      {
        path: '/permission/one',
        name: 'permissionOne',
        component: () => import('@/views/Permission.vue'),
        meta: {
          title: 'admin页面',
          icon: 'el-icon-menu',
          roles: ['admin']
        }
      },
      {
        path: '/permission/two',
        name: 'PermissionTwo',
        component: () => import('@/views/PermissionTwo.vue'),
        meta: {
          title: 'consumer页面',
          icon: 'el-icon-menu',
          roles: ['consumer']
        }
      }
    ]
  }
];


const route = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: commonRoutesMap
});

// 钩子的使用示例,可以做权限限制
route.beforeEach((to, from, next) => {
  // 当用户名为空时，进入login页面
  if (!Store.state.user.name) {
    if (to.path === '/login') {
      next();
    } else {
      next({ path: '/login' });
    }
  } else {
    if (to.path === '/login') {
      Store.commit('SET_USER', {});
      Store.commit('SET_ROLES', []);
    }
    if (from.path === '/login') {
      // 将该用户权限的router缓存起来，渲染siderBar
      Store.commit('SET_ROUTES', permission(false));
      // 清空默认展开的路由
      Store.commit('SET_EL_OPEN_MENU', []);
    }
    next();
  }
});

export default route;


/**
 *
 * hidden: false                  是否显示在左边导航栏,默认显示（hidden: false)
 * childRootShow: false           children是否是一级目录，默认不是
 * childRootShow: false && children.length ===0 则不在siderBar中显示
 * meta : {
    roles: ['admin','editor']     那些角色具有改路由，roles为falsy假值时，代表所有用户具有该路由
    title: 'title'                左边导航栏显示的名称
    icon: 'svg-name'              icon中使用的svg的名称
  }
 */

// TODO: 为什么addRouter会重新渲染siderBar
