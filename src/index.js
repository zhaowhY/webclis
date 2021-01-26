const { program } = require('commander');
const package = require('../package.json')
const fs = require('fs-extra')
const path = require('path')
const log = require('./log')
const config = require('./config')

const inquirer = require('inquirer');

program
  .description('kinds of project cli')
  .version(package.version)
  .arguments('[projectName]')
  .action((projectName) => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'webcli type',
        choices: config.clis
      }
    ]).then((answers) => {
      copyProject(projectName || 'webcli-demo', answers['webcli type'])
    })
  });

program.parse()




/** 解析相对于当前文件目录的路径
 *  
 * @param  {arguments} paths
 */
function resolvePath(...paths) {
  return path.join(__dirname, ...paths)
}

/** 创建项目
 * 
 * @param {string} name 文件夹名
 */
async function copyProject(projectName, cliType) {
  console.log(3, projectName)
  const targetPath = path.join(process.cwd(), projectName);
  if (!fs.ensureDirSync(targetPath)) {
    log.warning('directory has exist, if continuing, new project will cover the directory!!!')
    const { continuing } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continuing',
        default: true
      }
    ]);

    if (continuing) {
      fs.emptyDirSync(targetPath); // 清空目录
    } else {
      log.success('stop success!')
      return
    }
  }

  fs.copySync(resolvePath(`./clis/${cliType}`), targetPath)
  log.success('create project success!')
  log.success(config.signature)
}

