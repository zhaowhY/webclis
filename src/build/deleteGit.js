const execa = require('execa');
const path = require('path');
const log = require('../log')


// 删除clis下面项目中的.git文件
async function deleteGit() {
  log.warning('start clear clis .git!')
  const { stdout } = await execa('ls', { cwd: path.join(__dirname, '../clis') });
  const clisName = stdout.split('\n')

  new Promise((resolve) => {
    resolve()
  })

  clisName.forEach(dirName => {
    const deleteDir = path.join(__dirname, '../clis', dirName);
    execa('rm', ['-rf', '.git'], { cwd: deleteDir });
    execa('rm', ['-rf', 'package-lock.json'], { cwd: deleteDir });
  })
  log.success('clear success!')
}


deleteGit()

