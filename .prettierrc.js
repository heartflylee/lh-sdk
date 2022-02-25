module.exports = {
  printWidth: 120, //单行最大长度，超过该值会换行
  tabWidth: 2, //缩进空格数
  semi: true, //true在每行末尾添加分号
  bracketSpacing: true, //花括号前后空格
  singleQuote: true, //ts使用单引号
  trailingComma: 'none', //尾逗号，none:无尾逗号 all：有
  jsxBracketSameLine: false, //true jsx语法的>换行显示（不能应用于自关闭元素）
  arrowParens: 'avoid', //箭头函数唯一参数是否包括括号， avoid:不包括 always:包括
  // 使用默认的折行标准
  proseWrap: 'preserve',
  vueIndentScriptAndStyle: true,
  endOfLine: 'lf',
  // 根据显示样式决定 html 要不要折行
  //控制html超长换行方式,为 HTML 文件定义全局空格敏感度
  htmlWhitespaceSensitivity: 'ignore',
  useTabs: false, //使用tab（制表符）缩进而非空格
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 箭头函数参数始终加扩号
  arrowParens: 'always'
};
