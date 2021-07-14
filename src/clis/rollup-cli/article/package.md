# package.json中相关知识

## package.json一些字段信息
```json
{
  "name": "rollup-cli", // npm 包名
  "version": "1.0.0", // 版本号
  "description": "rollup base cli", // npm包的简单介绍
  "main": "lib/index.js", // 定义了 npm 包的入口文件，browser 环境和 node 环境均可使用, 一般指向cjs包
  "module": "src/index.js", // 定义 npm 包的 ESM 规范的入口文件(.mjs)，browser 环境和 node 环境均可使用, 浏览器可以通过<script type="module"></script>直接饮用
  "browser": "", // 定义 npm 包在 browser 环境下的入口文件
  "unpkg": "", // cdn 形式引入的包路径 umd格式
  "typings": "lib/index.d.ts", // ts形式引入的路径
  // 自定义命令
  "scripts": {
     "dev": "node_modules/.bin/rollup -w -c ./build/rollup.config.dev.js",
    "build": "node_modules/.bin/rollup -c ./build/rollup.config.prod.js"
  },

  // 用来标记那些文件有副作用，就不会被tree-shaking删除
  "sideEffects": [

  ],
  // 发布前需要执行的命令
  "pre-push": [
    "lint",
    "coverage"
  ],
  "author": "kongkong", // 坐着
  "license": "MIT", // 协议

  // 指定npm发布文件的目录
  "files": [
    "dist",
    "lib",
    "es",
    "src"
  ],

  // 该npm包的关键字
  "keywords": [
    "rollup",
    "rollup cli",
    "cli"
  ],

  // 关联其他仓库的信息
  "repository": {
    "type": "git",
    "url": "https://github.com/kongkong99/rollup-cli"
  },

  // 开发依赖项
  "devDependencies": {
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.4",
    "@babel/preset-env": "^7.4.4",
    "@babel/register": "^7.4.4",
    "babel-eslint": "^10.1.0",
    "babel-loader": "^8.0.5",
    "babel-preset-minify": "^0.5.0",
    "babel-preset-power-assert": "^3.0.0",
    "esdoc": "^1.1.0",
    "esdoc-standard-plugin": "^1.0.0",
    "eslint": "^5.16.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-plugin-import": "^2.14.0",
    "intelli-espower-loader": "^1.0.1",
    "mocha": "^4.0.1",
    "nyc": "^13.1.0",
    "power-assert": "^1.6.1",
    "pre-push": "^0.1.1",
    "sinon": "^5.0.1",
    "webpack": "^4.30.0",
    "webpack-cli": "^3.3.2"
  },

  // 线上环境依赖项
  "dependencies": {
    "@babel/polyfill": "^7.4.4",
    "lodash": "^4.17.11"
  },

  // 依赖宿主环境的包
  // peerDependencies的目的是提示宿主环境去安装满足插件peerDependencies所指定依赖的包，然后在插件import或者require所依赖的包的时候，永远都是引用宿主环境统一安装的npm包，最终解决插件与所依赖包不一致的问题
  "peerDependencies": {
    "js-cookie": "^2.0.0"
  }
}
```

## 一些命令
- npm pack 查看npm publish会发布那些包
- git status 查看git push 会上传什么包

## 几种打包格式
- amd – 异步模块定义，用于像RequireJS这样的模块加载器
- cjs(.cjs) – CommonJS，适用于 Node 和 Browserify/Webpack
- esm(.mjs) – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
- iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
- umd – 通用模块定义，以amd，cjs 和 iife 为一体
- system - SystemJS 加载器格式
> .mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置 [阮一峰文章链接](http://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)

## 相关学习链接
- [利用 umi-library 做组件打包](https://www.bilibili.com/video/av47853431)
- [开发 npm 包：库](https://zhuanlan.zhihu.com/p/116870496)