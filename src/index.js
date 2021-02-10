#!/usr/bin/env node

const { program } = require('commander');
const package = require('../package.json')
const fs = require('fs-extra')
const path = require('path')
const log = require('./log')
const config = require('./config')
const inquirer = require('inquirer');
const execa = require('execa');

program
  .description('kinds of project cli')
  .version(package.version)
  .arguments('[projectName]')
  .action(async (projectName) => {
    // 初始化config.clis的脚手架名称
    const { stdout } = await execa('ls', { cwd: resolvePath('./clis') });
    const clisName = stdout.split('\n')

    inquirer.prompt([
      {
        type: 'list',
        name: 'webcli type',
        choices: clisName
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
  await initGit(targetPath)
  log.success('create project success!')
  log.success(config.signature)
}

async function initGit(path) {
  await execa('mv', ['gitignore', '.gitignore'], { cwd: path });
  await execa('git', ['init',], { cwd: path });
  await execa('git', ['add', '.'], { cwd: path });
  await execa('git', ['commit', '-m', 'init'], { cwd: path });
}

