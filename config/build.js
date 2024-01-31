const pkg = require('../package.json');

const NAMESPACE_CONFIG = {
  base: {
    /** bad.js good.js 的后缀 */
    exampleExtension: 'js',
    /** Prism 语言设置 */
    prismLanguage: 'js',
    /** 插件前缀 */
    rulePrefix: '',
    /** 各插件的文档地址 */
    getDocsUrl: (rule) => `https://eslint.org/docs/rules/${rule}`,
  },
  // react: {
  //   exampleExtension: 'js',
  //   prismLanguage: 'jsx',
  //   rulePrefix: 'react/',
  //   ruleConfig: require('./rules/react.json'),
  //   getDocsUrl: (rule: string) =>
  //     `https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/${rule.replace(
  //       /.*\//,
  //       ''
  //     )}.md`
  // },
  // vue: {
  //   exampleExtension: 'vue',
  //   prismLanguage: 'html',
  //   rulePrefix: 'vue/',
  //   ruleConfig: require('./rules/vue.json'),
  //   getDocsUrl: (rule: string) => `https://eslint.vuejs.org/rules/${rule.replace(/.*\//, '')}.html`
  // },
  import: {
    exampleExtension: 'js',
    prismLanguage: 'js',
    rulePrefix: 'import/',
    getDocsUrl: (rule) => `https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/${rule.replace(
      /.*\//,
      '',
    )}.md`,
  },
  ts: {
    exampleExtension: 'ts',
    prismLanguage: 'ts',
    rulePrefix: '@typescript-eslint/',
    getDocsUrl: (rule) => `https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/${rule.replace(
      /.*\//,
      '',
    )}.md`,
  },
};

const NAMESPACES = Object.keys(NAMESPACE_CONFIG);

/** 写入 eslintrc 中的元信息 */
const buildEslintrcMeta = function buildEslintrcMeta() {
  return `
/**
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * 贡献者：
 *   ${pkg.contributors.join('\n *   ')}
 *
 * 依赖版本：
 *   ${[
    'eslint',
    '@babel/eslint-parser',
    //  'eslint-plugin-react',
    //  'vue-eslint-parser',
    //  'eslint-plugin-vue',
    '@typescript-eslint/parser',
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-import',
  ]
    .map(key => `${key} ${pkg.devDependencies[key] || pkg.dependencies[key]}`)
    .join('\n *   ')}
 *
 * 此文件是由脚本 scripts/build.ts 自动生成
 *
 * @reason 为什么要开启（关闭）此规则
 */
`;
};

module.exports = {
  NAMESPACES,
  NAMESPACE_CONFIG,
  buildEslintrcMeta,
}
