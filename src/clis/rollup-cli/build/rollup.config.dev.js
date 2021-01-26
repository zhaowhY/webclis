process.env.NODE_ENV = 'development';

const path = require('path');
const serve = require('rollup-plugin-serve');
const configList = require('./rollup.config');

const resolvePath = function (...paths) {
  return path.join(__dirname, '../', ...paths)
}

const PORT = 3003;

const config = configList[0]
config.output.sourcemap = true;

config.plugins = [
  ...config.plugins,
  ...[
    serve({
      port: PORT,
      contentBase: [resolvePath('example'), resolvePath('dist')]
    })
  ],
]

module.exports = config;