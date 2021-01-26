const execa = require('execa');
const path = require('path');

// 删除clis下面项目中的.git文件
console.log('start', 111)
async function deleteGit() {
  const { stdout } = await execa('ls', { cwd: path.join(__dirname, '../clis') });
  const clisName = stdout.split('\n')

  new Promise((resolve) => {
    resolve()
  })

  clisName.forEach(dirName => {
    execa('rm', ['-rf', '.git'], { cwd: path.join(__dirname, '../clis', dirName) });
  })
}

deleteGit()

