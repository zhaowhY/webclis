/** 参考文档
 * 配置参考文档 {@link https://juejin.cn/post/6844904016581754888#heading-7} 
 * 配置参考文档 {@link https://github.com/ReliaMM/react-app-rewired} 
 * babel-plugin-import官方文档 {@link https://www.npmjs.com/package/babel-plugin-import} 
 * less配置参考 {@link https://segmentfault.com/a/1190000023552775} 
 */
const path = require('path');
const { override, addWebpackAlias, addBabelPlugins, addLessLoader, overrideDevServer } = require('customize-cra');
const CopyPlugin = require('copy-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 打包进度条
const CompressionPlugin = require('compression-webpack-plugin');


// 修改启动host和端口号
// process.env.HOST = 'www.test.com'
// process.env.PORT = 1024

const webpackPlugins = [
  // 加载static中的静态文件
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, './static'),
        to: './static'
      }
    ]
  }),
  new AntdDayjsWebpackPlugin(),
  new ProgressBarPlugin(), // 进度条
].filter(Boolean);

const producitonWebpackPlugins = [
  // gzip
  new CompressionPlugin({
    test: /\.js$|\.html$|.\css/, // 匹配文件名
    threshold: 10240, // 对超过10k的数据压缩
    deleteOriginalAssets: false // 不删除源文件
  })
]

const addCustomize = () => (config) => {

  config.plugins = [...config.plugins, ...webpackPlugins]

  if (process.env.NODE_ENV === 'production') {
    config.plugins = [...config.plugins, ...producitonWebpackPlugins]
  }

  if (process.env.NODE_ENV === 'production') {
    config.devtool = false;
  };
  // 修改、添加loader 配置 :
  // 所有的loaders规则是在config.module.rules(数组)的第二项
  // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
  // 修改 less 配置 ，规则 loader 在第7项(具体可以打印配置)
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  loaders[7].use.push({
    loader: 'style-resources-loader',
    options: {
      patterns: path.resolve(__dirname, 'src/styles/variable.less') //全局引入公共的less 文件
    }
  })

  // splitChunks代码分割
  config.optimization.splitChunks = {
    // 默认 webpack4 只会对按需加载的代码做分割
    chunks: 'all',
    // 表示在压缩前的最小模块大小,默认值是30kb
    minSize: 30000,
    // 告诉 webpack 尝试将大于 maxSize 个字节的 chunk 分割成较小的部分。 这些较小的部分在体积上至少为 minSize
    maxSize: 100000,
    // 分割一个模块之前必须共享的最小块数
    minChunks: 1,
    // 按需加载时的最大并行请求数
    maxAsyncRequests: 5,
    // 入口的最大并行请求数
    maxInitialRequests: 3,
    // 界定符
    automaticNameDelimiter: '~',
    // 块名最大字符数
    automaticNameMaxLength: 30,
    cacheGroups: { // 缓存组
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        chunks: 'initial',
        priority: 2,
        minChunks: 2,
        name: 'vendors',
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }

  return config;
}

// 修改打包后的文件目录
rewriteBuildPath = () => (config) => {
  if (!config.output.path) return config; // 判断是否为build操作(即config.output.path是否存在)，否，则不往下执行
  const paths = require("react-scripts/config/paths");
  paths.appBuild = path.join(path.dirname(paths.appBuild), "dist");
  config.output.path = path.join(path.dirname(config.output.path), "dist");
  config.output.publicPath = './'; // 修改相对路径
  return config;
}





module.exports = {
  webpack: override(
    addBabelPlugins(['@babel/plugin-proposal-decorators', { legacy: true }]),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      },
    }),
    addWebpackAlias({
      ["@"]: path.resolve(__dirname, "./src"),
      ["src"]: path.resolve(__dirname, "./src")
    }),
    addCustomize(),
    rewriteBuildPath()
  ),

  devServer: overrideDevServer((config) => {
    // 本地开发代理
    config.proxy = {
      '/api': {
        target: 'http://39.105.108.226:7002',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        }
      }
    }
    config.overlay = {
      warnings: false,
      errors: false
    }
    return config
  })
}
