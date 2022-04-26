const fs = require('fs');
const dirOutput = {};

// 自动化导入目录脚本
fs.readdirSync(__dirname).forEach((file) => {
  if (file === 'index.js') return;
  const route = require(`./${file}`);
  let path = file.slice(0, -3);
  if(Array.isArray(route)) {
    dirOutput[`/${path}`] = route;
  }
});

console.log('dirOutput',dirOutput)
module.exports = dirOutput;
