const path = require('path');
const { babel } = require('@rollup/plugin-babel');
// const less = require('rollup-plugin-less');
const nodeResolve = require('@rollup/plugin-node-resolve');
const fs = require('fs')
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const json = require('@rollup/plugin-json');

const resolvePath = function (...paths) {
  return path.join(__dirname, '../', ...paths)
}

const babelOptions = {
  "presets": [
    '@babel/preset-env',
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    ["import", { // lodash按需加载
      "libraryName": "lodash",
      "libraryDirectory": "",
      "camel2DashComponentName": false,  // default: true
    }]
  ],
  babelHelpers: 'runtime',
  exclude: '**/node_modules/**',
}

const plugins = [
  // less(),
  nodeResolve(),
  commonjs(),
  json(),
  babel(babelOptions),
  replace({ // 将某些变量或字符串转化为固定值
    exclude: 'node_modules/**',
    ENV: JSON.stringify(process.env.NODE_ENV)
  }),
]

// 打包esm模块，支持按需加载和全部引入
let esmBuild = [];
fs.readdirSync(resolvePath('src')).forEach(filename => {
  const stats = fs.statSync(resolvePath('src', filename))
  if (stats.isFile()) {
    esmBuild.push({
      input: resolvePath('src', filename),
      output: {
        file: resolvePath('es', filename),
        format: 'esm',
      },
      plugins
    })
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
    plugins
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
]