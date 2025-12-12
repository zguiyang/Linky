/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  // 基本格式设置
  trailingComma: 'es5', // 在 ES5 中有效的尾随逗号（对象、数组等）
  tabWidth: 2, // 缩进级别
  semi: true, // 在语句末尾添加分号
  singleQuote: true, // 使用单引号而不是双引号

  // Vue/Nuxt 特定设置
  vueIndentScriptAndStyle: true, // 在 Vue 文件中缩进脚本和样式标签

  // JSX/TSX 设置
  jsxSingleQuote: true, // 在 JSX 中使用单引号
  bracketSameLine: true, // 将 HTML 标签的 > 放在最后一行的末尾，而不是单独放在下一行

  // 其他格式设置
  printWidth: 120, // 每行最大字符数
  useTabs: false, // 使用空格而不是制表符进行缩进
  bracketSpacing: true, // 在对象字面量中的括号之间打印空格：{ foo: bar }
  arrowParens: 'avoid', // 在箭头函数参数周围包含括号 (x) => x
};

export default config;
