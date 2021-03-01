/* eslint-disable no-console */
/** 接口测试页面 */
import React, { Component } from 'react';
import adapter from '@/api';
import rawAdapter from '@/api/rawDemo';

class DemoAPI extends Component {
  componentDidMount() {
    this.initData();
  }

  initData = () => {
    Promise.all([
      adapter.getMessage(),
      adapter.postData({ type: 'array' }),
      rawAdapter.getMessage(),
      rawAdapter.postMessage()
    ]).then(([getValue, postValue, getRawValue, postRawValue]) => {
      console.log('*****输出response data值*****');

      console.log('get', getValue);
      console.log('post', postValue);

      console.log(' ');

      console.log('*****输出response 原始值*****');
      console.log('get raw', getRawValue);
      console.log('post raw', postRawValue);
    }).catch(() => {
      console.error('接口获取失败');
    });
  }

  render() {
    return (
      <div>
        <h1>接口测试页面，请打开控制台(F12)，看输出结果</h1>
      </div>
    );
  }
}

export default DemoAPI;
