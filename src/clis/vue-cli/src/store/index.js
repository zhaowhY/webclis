import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  // 刷新页面，需要缓存的store
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      const {
        user, routes, roles, elOpenMenu
      } = val;
      return {
        user,
        roles,
        routes,
        elOpenMenu
      };
    }
  })],
  state: {
    user: {
      name: '',
      password: ''
    },
    elOpenMenu: [],
    roles: [],
    routes: {},
    subTitle: ''
  },
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
});
