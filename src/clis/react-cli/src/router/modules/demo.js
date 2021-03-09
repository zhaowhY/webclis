export default [{
  path: '/demo',
  name: '各类demo',
  icon: { name: 'PieChartOutlined', type: 'component' },
  children: [
    {
      path: 'api',
      name: '接口页面',
      component: () => import('@/views/demo/Api'),
    },
    {
      path: '/demo/antd',
      name: 'Antd页面',
      component: () => import('@/views/demo/Antd'),
    },
    {
      path: '/demo/mobx',
      name: 'Mobx页面',
      component: () => import('@/views/demo/Mobx'),
      hidden: true
    },
    {
      path: '/demo/class',
      name: '样式页面',
      component: () => import('@/views/demo/Classnames'),
    },
    {
      path: '/demo/hook',
      name: 'Hook页面',
      component: () => import('@/views/demo/Hook'),
    },
  ]
}];

/**
 * path // 路由
 * name // 路由名
 * component // 路由组件
 * hidden: false // 是否隐藏组件
 * meta: {icon: ''} // 路由附带信息
 */
