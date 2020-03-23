Node.js文件系统被封装在fs模块中，它提供了文件的读取、写入、更名、删除、遍历目录、链接等POSIX文件系统操作。  
与其他模块不同的是，fs模块中所有的操作都提供了异步的和同步的两个版本，例如读取文件内容的函数有异步的fs.readFile()和同步的fs.readFileSync()。  
我们以几个函数为代表，介绍fs常用的功能，并列出fs所有函数的定义和功能。  

## fs.readFile()
fs.readFile(path[, options], callback)  
异步地读取文件的全部内容  
```js
fs.readFile('/etc/passwd','utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```