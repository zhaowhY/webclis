import Taro from '@tarojs/taro';

import dev from 'root/config/dev.js'
import prod from 'root/config/prod.js'

const curEnv = 'dev';
const BaseUrl = {
  dev: dev.baseUrl,
  prod: prod.baseUrl
}


const getInstance = async (option) => {
  const { url, method, opts, data = {}, formData = {}, type = '' } = option;

  // 上传文件
  if (type === 'uploadFile') {
    return await Taro.uploadFile({
      url: `${BaseUrl[curEnv]}${url}`,
      filePath: opts.tempFilePaths[0],
      method: 'POST',
      name: 'file',
      formData: formData || {},
      header: {
        'content-type': 'multipart/form-data'
      }
    })
  }

  const instance = {
    url: `${BaseUrl[curEnv]}${url}`,
    timeout: 30000,
    method: method,
    data: data || {},
  }
  try {
    // 下载文件
    if (type === 'downloadFile') {
      return (await Taro.downloadFile(instance)).tempFilePath;
    }

    // 普通数据接口
    const res = await Taro.request(instance);
    const { statusCode, data: { code, data: resData } } = res;
    if (statusCode === 200) {
      if (code === 200) {
        return resData;
      }
    }
    return Promise.reject(res);
  } catch (error) {
    return Promise.reject(error);
  }

};

export default getInstance;

