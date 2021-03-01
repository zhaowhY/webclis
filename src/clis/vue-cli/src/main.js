import Vue from 'vue';
import '@/plugins/logger';
import { DEBUG } from '@/config';
import '@/theme/index.scss';
// 以下不需要的时候可以注释掉
import '@/assets/icons';
import '@/plugins/element';
import router from '@/router';
import store from '@/store';
import permissions from '@/config/permissions';

import App from './App.vue';

permissions();
// eslint-disable-next-line
if (DEBUG) import('./mock');

Vue.config.productionTip = false;

Vue.$log.info('vue-eslint launch...');
new Vue({
  router,
  store,
  render(h) { return h(App); },
  mounted() {
  }
}).$mount('#app');
