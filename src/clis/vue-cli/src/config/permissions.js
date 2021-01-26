// 用户权限设置
import Store from '@/store/index';
import Router, { commonRoutesMap, asyncRoutesMap } from '@/router/index';
import { cloneDeep } from 'lodash';


// 扁平化routes，为了可以在sider中正确展示，目前处理层次至两级，即只有一级children
function flatRouters(data) {
  let routers = [];
  data.forEach((item) => {
    const { children } = item;
    if ((children || []).length > 0) {
      routers = [...routers, ...flatRouters(children)];
    } else if (!item.hidden) {
      routers.push(item);
    }
  });
  return routers;
}

// 根据用户权限(roles）设置可以访问的特殊路由，此处的限制是登录账号(roles)为admin时，可以看到权限页面一
const setPerrsionRoute = () => {
  const perrsionRoute = cloneDeep(asyncRoutesMap) || [];
  // 只处理至两级，即一级children
  perrsionRoute.forEach((item) => {
    item.children = item.children.filter((child) => {
      child.meta.roles = child.meta.roles || [];
      if (child.meta.roles.length === 0) {
        return true;
      }
      return Store.state.roles.some(role => child.meta.roles.includes(role));
    });
  });
  Router.addRoutes(perrsionRoute);
  return perrsionRoute;
};


export const permission = (isPermission = true) => {
  let perrsionRoute = [];
  if (isPermission) {
    perrsionRoute = setPerrsionRoute();
  }
  const routersMap = [...cloneDeep(commonRoutesMap), ...cloneDeep(perrsionRoute)];

  let routers = [];
  routersMap.forEach((item) => {
    if (!item.hidden) {
      item.children = flatRouters(item.children || []);
      if (item.childRootShow) {
        routers = [...routers, ...item.children];
      } else if (item.children.length > 0) {
        const { component, ...others } = item;
        routers.push(others);
      }
    }
  });
  return routers;
};

export default () => {
  setPerrsionRoute();
  // 钩子的使用示例,可以做权限限制
  Router.beforeEach((to, from, next) => {
    // 当用户名为空时，进入login页面
    if (Store.state.user.name) {
      if (from.path === '/login') {
        // 将该用户权限的router缓存起来，渲染siderBar
        Store.commit('SET_ROUTES', permission());
      }
    }
    next();
  });
  /**
   * 判断当用户token 或者roles发生变化时，需要window.location.reload() 页面,
   * （因为vue-router暂时没有提供removeRouter的方法）,
   * 需要结合具体项目进行写，因为刷新会影响用户体验感,
   * 不做这个判断会出现的问题： admin用户登录 -> 退出->普通用户登录->可以访问admin用户的路由
   */
};
