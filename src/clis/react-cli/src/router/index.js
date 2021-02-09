/* eslint-disable no-param-reassign */
// 格式化路由
import { cloneDeep } from 'lodash';
import pathResolve from 'path';
import modulesRoute from './modules';

function formatPath(routes, fatherPath = '') {
  routes.forEach(route => {
    const { path } = route;
    const { children } = route;
    if (path) {
      route.path = pathResolve.resolve(fatherPath, path);
    }
    if ((children || []).length > 0) {
      // eslint-disable-next-line no-unused-vars
      formatPath(route.children, path);
    }
  });
  return routes;
}

function layoutRoute(routes) {
  routes.forEach(route => {
    const { children } = route;
    if ((children || []).length > 0) {
      route.children = layoutRoute(children);
    }
  });
  routes = routes.filter(route =>
    route.path && route.name
    && (route.children || (route.component && !route.hidden)));
  return routes;
}

// 扁平化路由：在react中注册路由需要利用扁平化路由
function flatRoute(routes) {
  let result = [];
  routes.forEach(route => {
    const { children, ...others } = route;
    if ((children || []).length > 0) {
      result = [...result, ...flatRoute(children)];
    }
    result.push(others);
  });

  // 筛选出路由和（组件或重定向）同时存在
  result = result.filter(route =>
    route.path && (route.component || route.redirect));
  return result;
}

const routes = formatPath(modulesRoute);

export const flatRoutes = flatRoute(routes);

export const layoutRoutes = layoutRoute(cloneDeep(routes));
