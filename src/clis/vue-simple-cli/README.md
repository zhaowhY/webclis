# vue-webcli

## build step

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

# build for integration with minification
npm run build:test

# build for production with minification
npm run build
```

## 常见问题
### node-sass安装失败 [项目版本匹配node@14.15.5]
原因node版本与node-sass不匹配  [二者版本匹配表格](https://github.com/sass/node-sass#node-version-support-policy)  [相关问题issue](https://github.com/sass/node-sass/issues/2549) 

### sass安装慢，可以采用下面方法
```
npm i --registry=https://registry.npm.taobao.org
```

# 项目结构

### 目录结构
  ```bash
  - public
    - favicon.ico
    - index.html  # 入口html
  - src   # 业务代码
    - assets  # 图片，字体等资源
    - api # 接口交互模块
    - components  # 公共组件
    - filters   # 过滤器
    - directives  # 指令集合
    - router   # vue router
    - store   # vuex
    - theme   # 主题模块
    - views   # 视图组件

    - App.vue
    - main.js   # 入口js
    - main.styl # 全局样式
  - .env.[mode] # 环境变量
  - .gitlab-ci.yml # cicd 配置文件
  - README.MD
  ```
