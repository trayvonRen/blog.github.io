## settings.json

command + shift + p 搜索 open settings 打开 settings.json 配置文件

```json
{
  "workbench.colorTheme": "Dracula Soft", // vscode 主题
  "workbench.iconTheme": "vscode-icons", // 文件图标主题

  /*使用 prettier 格式化代码*/
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "files.autoSave": "onFocusChange", //鼠标移动焦点自动保存
  "editor.formatOnSave": true, //保存时候自动格式化
  "editor.detectIndentation": false, //自动检测文件缩进
  "editor.tabSize": 2, // tab 键的缩进长度，一般为2个空格

  /*prettier的配置 */
  "prettier.printWidth": 100, // 超过最大值换行
  "prettier.tabWidth": 2, // 缩进字节数
  "prettier.useTabs": false, // 缩进使用 tab (true)，空格（false）
  "prettier.semi": false, // 句尾添加分号
  "prettier.singleQuote": true, // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  "prettier.arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  "prettier.disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
  "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
  "prettier.htmlWhitespaceSensitivity": "ignore", // html 空格不敏感
  "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  "prettier.jsxBracketSameLine": true, // 在jsx中把'>' 是否单独放一行
  "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
  "prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
  "prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  "html.format.endWithNewline": true //html 文件末尾加空行
}
```
