/**
 * path // 路由
 * name // 路由名
 * component // 路由组件
 * hidden: false // 是否隐藏组件
 * meta: {icon: ''} // 路由附带信息
 */

import demo from './demo';

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '首页',
    icon: { name: 'icon-logo.png', type: 'img' },
    component: () => import('@/views/Home'),
  },
  ...demo,
  {
    path: '*',
    component: () => import('@/views/404'),
    hidden: true
  }
];
