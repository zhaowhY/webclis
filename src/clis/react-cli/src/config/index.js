const { NODE_ENV } = process.env;

const NODE_ENV_OBJ = {
  // 开发环境
  development: {
    baseURL: '/api'
  },

  // 测试环境
  test: {
    baseURL: '//test'
  },

  // 生产环境
  production: {
    baseURL: '//production'
  },
};

export const BASE_URL = NODE_ENV_OBJ[NODE_ENV].baseURL;
