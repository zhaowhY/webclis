#Vue-webcli

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

## sass安装慢，可以采用下面方法
```
npm i --registry=https://registry.npm.taobao.org
```

##　开发环境：　
- node: 10.8
- npm: 6.1
- vue: 2.5
- vue/cli: 3.0

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

### 命名规范， 见[vue风格指南](https://cn.vuejs.org/v2/style-guide/)
- 文件名：　
  - *.vue 结尾的文件及与其对应的 *.js *.styl 使用大驼峰　——　`HelloWorld.vue; HelloWorld.js; HelloWorld.styl`
  - 其他文件使用小驼峰 —— `main.js`
- 变量命名：小驼峰　——　`userName`