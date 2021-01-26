import request from './adapter';

export const getMethod = (opts) => request({
  method: 'GET',
  url: '',
  opts
});

export const postMethod = (opts) => request({
  name: 'postMethod',
  method: 'POST',
  url: '',
  opts
});

// 获取数据 
export const getDemoData = (opts) => request({
  method: 'GET',
  url: '/projects',
  opts
});

// 下载文件
export const downloadFile = (opts) => request({
  type: 'downloadFile',
  method: 'GET',
  url: '/file',
  opts
});

// 上传文件
export const uploadFile = (opts) => request({
  type: 'uploadFile',
  method: 'POST',
  url: '/file',
  opts
});