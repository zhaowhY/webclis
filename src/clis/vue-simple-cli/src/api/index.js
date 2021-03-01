/** 使用示例
 * import adapter from '@/api';
 * adapter.getMessage();
 * adapter.postData({ type: 'array' });
 */

import { BASE_URL } from '@/config';

import { apiDecorator } from './adapter';

const adapter = apiDecorator(BASE_URL, [
  /** get请求数据 */
  {
    name: 'getMessage',
    method: 'get',
    url: 'array'
  },

  /** post请求数据 */
  {
    name: 'postMessage',
    method: 'post',
    url: 'array'
  },

  /** url含有参数类型接口 */
  {
    name: 'postData',
    method: 'post',
    url: '/{type}'
  },
]);

export default adapter;
