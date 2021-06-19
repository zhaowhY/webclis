/**
 * rollup官方文档 {@link https://rollupjs.org/guide/zh/#%E6%A0%B8%E5%BF%83%E5%8A%9F%E8%83%BDcore-functionality}
 */
const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const json = require('@rollup/plugin-json');
const nodePolyfills = require('rollup-plugin-node-polyfills');
const fs = require('fs');


const resolvePath = function (...paths) {
  return path.join(__dirname, '../', ...paths);
};

// 从上至下运行，
const plugins = [
  json(),
  nodeResolve({ preferBuiltins: false }),
  commonjs(),
  babel({
    presets: ['@babel/preset-env'],
    plugins: [['@babel/plugin-transform-runtime']],
    babelHelpers: 'runtime',
    exclude: '**/node_modules/**'
  }),
  replace({ // 将某些变量或字符串转化为固定值
    exclude: 'node_modules/**',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  nodePolyfills(), // 浏览器使用时，需要激活，必须放在这里
];

// 打包esm模块，支持按需加载和全部引入
let esmBuild = [];
fs.readdirSync(resolvePath('src')).forEach(filename => {
  const stats = fs.statSync(resolvePath('src', filename));
  if (stats.isFile()) {
    esmBuild.push({
      input: resolvePath('src', filename),
      output: {
        file: resolvePath('es', filename),
        format: 'esm',
      },
      plugins
    });
  }
});

module.exports = [
  {
    input: resolvePath('src/index.js'),
    output: {
      file: resolvePath('dist/index.js'),
      format: 'umd',
      name: 'Demo'
    },
    plugins,
  },
  {
    input: resolvePath('src/index.js'),
    output: {
      file: resolvePath('lib/index.js'),
      format: 'cjs',
    },
    plugins
  },
  ...esmBuild
];