/**
 * rollup官方文档 {@link https://rollupjs.org/guide/zh/#%E6%A0%B8%E5%BF%83%E5%8A%9F%E8%83%BDcore-functionality}
 */
const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const json = require('@rollup/plugin-json');
const fs = require('fs');


const resolvePath = function (...paths) {
  return path.join(__dirname, '../', ...paths);
};

const plugins = [
  nodeResolve({ browser: true }),
  commonjs(),
  json(),
  babel({
    babelHelpers: 'bundled'
  }),
  replace({ // 将某些变量或字符串转化为固定值
    exclude: 'node_modules/**',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
]

// 一般仅打包cjs时使用
const nodePlugins = [
  nodeResolve({ preferBuiltins: true }),
  commonjs({
    dynamicRequireTargets: '**/package.json' // 代码中有动态加载了package.json
  }),
  json(),
  babel({
    babelHelpers: 'bundled'
  }),
  replace({ // 将某些变量或字符串转化为固定值
    exclude: 'node_modules/**',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
]


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