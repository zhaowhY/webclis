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
], { raw: true });

export default adapter;
