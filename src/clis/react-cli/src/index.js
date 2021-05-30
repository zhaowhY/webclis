import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import '@/config/global';
import '@/styles/index.less';
import 'src/assets/svgs/index';

import App from './App';

dayjs.locale('zh-cn');
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
