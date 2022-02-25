// 保存vscode setting.json配置文件
module.exports = `{
  "editor.tabSize": 2,
  "editor.fontSize": 16,
  // 制表符符号eslint
  "editor.formatOnSave": true, // 每次保存自动格式化
  "editor.wordWrap": "wordWrapColumn",
  "editor.wordWrapColumn": 120, //超过120会折叠行
  "editor.codeActionsOnSave": {
    // 每次保存的时候将代码按eslint格式进行修复
    "source.fixAll.eslint": true
  },
  "editor.minimap.enabled": false, // 关闭快速预览
  "editor.lineNumbers": "on", // 开启行数提示
  "editor.quickSuggestions": {
    // 开启自动显示建议
    other: true,
    comments: true,
    strings: true
  },
  "files.autoSave": "afterDelay", // 打开自动保存
  // 默认换行符LF
  "files.eol": "\n",
  "workbench.editor.enablePreview": false, // 打开文件不覆盖
  "workbench.iconTheme": "material-icon-theme",
  "search.followSymlinks": false, // 关闭rg.exe进程
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true, // 让函数(名)和后面的括号之间加个空格
  "vetur.format.defaultFormatter.html": "js-beautify-html", // 格式化.vue中html
  "vetur.format.defaultFormatter.js": "vscode-typescript", // 让vue中的js按编辑器自带的ts格式进行格式化
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned" // 属性强制折行对齐
    }
  },
  //	eslint 代码自动检查相关配置
  "eslint.enable": true,
  "eslint.run": "onSave",

  "eslint.validate": ["javascript", "javascriptreact", "vue-html", "vue", "html", "typescript", "typescriptreact"],
  "eslint.options": {
    extensions: [".js", ".vue", ".ts", ".tsx"]
  },
  "eslint.format.enable": true,
  "path-intellisense.extensionOnImport": true,
  // perttier的配置项单独放置在prettierrc.js文件
  "prettier.requireConfig": true /* 每种语言默认的格式化规则 */,
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "window.zoomLevel": 1, // 调整窗口的缩放级别
  "editor.rulers": [100] //一根竖线 帮助显示行数
}`;
