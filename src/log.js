const chalk = require('chalk')
const log = console.log

class Log {
  constructor() {

  }

  info(msg) {
    log(chalk.white(msg))
  }

  warning(msg) {
    log(chalk.yellow(msg))
  }

  success(msg) {
    log(chalk.green(msg))
  }

  error(msg) {
    log(chalk.red(msg))
  }
}

module.exports = new Log()