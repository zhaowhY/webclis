# Rollup脚手架
> 基本说明：rollup适合于适用于编译函数库、组件库. 在构建一些应用程序的时候，特别是代码拆分和运行时态的动态导入 `dynamic imports at runtime`，Webpack可能更适合

## 其他文档链接
- [package.json一些知识](./article/package.md)
- [从0到1发布一个npm包](./article/npm.md)

## 构建过程
```
npm i

# 开发
npm run dev

# 打包构建
npm run build
```

> 配置中会打包成三种类型包: 1. dist/ (umd) 2. lib/ (cjs) 3. es/ (esm)


## 按需加载
### 安装包
```
npm i babel-plugin-import -D
```

### babel中配置
```
  plugins: [
    ["import", {
      "libraryName": "npmName",
      "libraryDirectory": "",
      "camel2DashComponentName": false,  // default: true
    }]
  ],
```

### 使用方式
```
npm i npmName -S
import { upperCase } from "npmName";
```

[babel-plugin-import更多说明](https://www.npmjs.com/package/babel-plugin-import)