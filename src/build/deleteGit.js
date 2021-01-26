const execa = require('execa');
const path = require('path');

// 删除clis下面项目中的.git文件
async function deleteGit() {
  console.log('start clear clis .git!')
  const { stdout } = await execa('ls', { cwd: path.join(__dirname, '../clis') });
  const clisName = stdout.split('\n')

  new Promise((resolve) => {
    resolve()
  })

  clisName.forEach(dirName => {
    execa('rm', ['-rf', '.git'], { cwd: path.join(__dirname, '../clis', dirName) });
  })
  console.log('end!')

}


deleteGit()

