module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint' //使得@typescript-eslint中的样式规范失效，遵循prettier中的样式规范，需要放在最后一项。
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser' //ESLint的解析器，用于解析TypeScript，从而检查和规范TypeScript代码。
  },
  overrides: [{ files: '.prettierrc.js' }],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    '@typescript-eslint/no-require-imports': 'off',
    // 箭头函数参数必须加上括号
    'arrow-parens': 'error',
    // 警告出现 == 运算符
    eqeqeq: 'warn',
    // 警告出现 空函数  //暂时关闭该规则
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'no-fallthrough': 'off',
    // 可以用双重!!判断
    'no-extra-boolean-cast': 'off',
    // 可以有显式的any类型
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    // 出现未使用的变量，报错
    '@typescript-eslint/no-unused-vars': 'error',
    //
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 取消优先使用const
    'prefer-const': 'off',
    // 接口前缀可以用I
    '@typescript-eslint/interface-name-prefix': ['off', { prefixWithI: 'never' }],
    // 可以使用\转义字符
    'no-useless-escape': 'off',
    // 取消优先使用展开操作符
    'prefer-rest-params': 'off',
    // 组件名称用短线分割
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    // template中自定义组件用短线分割
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false
      }
    ],
    // 可以使用变量require
    '@typescript-eslint/no-var-requires': 'off',
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ]
      }
    ],
    'vue/attribute-hyphenation': ['error', 'always']
  }
};
