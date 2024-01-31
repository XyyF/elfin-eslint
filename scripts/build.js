const fs = require('fs');
const path = require('path');
const doctrine = require('doctrine');
const insertTag = require('insert-tag');
const xmlEscape = require('xml-escape');
const { NAMESPACES, buildEslintrcMeta } = require('../config/build');

class Builder {
  namespace = NAMESPACES[0];
  /** 当前 namespace 的规则列表 */
  ruleList = [];
  /** 当前 namespace 的所有规则合并后的文本，包含注释 */
  rulesContent = '';
  /** 插件初始配置的内容，如 test/react/.eslintrc.js */
  initialEslintrcContent = '';

  build(namespace) {
    this.namespace = namespace;
    this.ruleList = this.getRuleList();
    this.rulesContent = this.getRulesContent();
    this.initialEslintrcContent = this.getInitialEslintrc();
    this.buildEslintrc();
  }

  /** 获取规则列表，根据字母排序 */
  getRuleList() {
    const ruleList = fs
      .readdirSync(path.resolve(__dirname, '../test', this.namespace))
      .filter(ruleName => (
        fs.lstatSync(path.resolve(__dirname, '../test', this.namespace, ruleName)).isDirectory()
      ))
      .map(ruleName => (
        this.getRule(path.resolve(__dirname, '../test', this.namespace, ruleName, '.eslintrc.js'))
      ));

    return ruleList;
  }

  /** 解析单条规则为一个规则对象 */
  getRule(filePath) {
    const fileModule = require(filePath);
    const [ruleName] = Object.keys(fileModule.rules);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const comments = /\/\*\*.*\*\//gms.exec(fileContent);
    const rule = {
      name: ruleName,
      value: fileModule.rules[ruleName],
      description: '',
      category: '',
      comments: '',
      badExample: '',
      goodExample: '',
    };
    if (comments !== null) {
      // 通过 doctrine 解析注释
      const commentsAST = doctrine.parse(comments[0], { unwrap: true });
      // 将注释体解析为 description
      rule.description = commentsAST.description;
      // 解析其他的注释内容，如 @reason
      commentsAST.tags.forEach(({ title, description }) => {
        rule[title] = description === null ? true : description;
      });
      // 保留整体注释文本
      [rule.comments] = comments;
    }

    return rule;
  }

  /** 获取插件初始配置的内容 */
  getInitialEslintrc() {
    const initialEslintrcPath = path.resolve(__dirname, `../test/${this.namespace}/.eslintrc.js`);
    if (!fs.existsSync(initialEslintrcPath)) {
      return '';
    }
    return fs.readFileSync(initialEslintrcPath, 'utf-8');
  }

  /** 获取当前 namespace 的所有规则合并后的文本，包含注释 */
  getRulesContent() {
    return this.ruleList
      .map(((rule) => (
        `\n${rule.comments}\n'${rule.name}': ${JSON.stringify(rule.value, null, 2)},`
      )))
      .join('');
  }

  /** 写入各插件的 eslintrc 文件 */
  buildEslintrc() {
    const eslintrcContent = buildEslintrcMeta()
      + this.initialEslintrcContent
        // 去掉 extends
        .replace(/extends:.*],/, '')
        // 将 rulesContent 写入 rules
        .replace(/(\s*rules: {([\s\S]*?)},)?\s*};/, (match, p1, p2) => {
          const rules = p2 ? `${p2},${this.rulesContent}` : this.rulesContent;
          return `rules:{${rules}},};`;
        });

    this.writeFile(path.resolve(__dirname, `../${this.namespace}.js`), eslintrcContent);
  }

  /** 经过 Prettier 格式化后写入文件 */
  writeFile(filePath, content) {
    fs.writeFileSync(
      filePath,
      content,
      'utf-8',
    );
  }

  /** 依据 ESLint 结果，给 badExample 添加 <mark> 标签 */
  insertMark(badExample, eslintMessages) {
    let insertedBadExample = badExample;
    eslintMessages.forEach(({ ruleId, message, line, column, endLine, endColumn }) => {
      const insertLine = line - 1;
      const insertColumn = column - 1;
      const insertLineEnd = (endLine || line) - 1;
      let insertColumnEnd = (endColumn || column + 1) - 1;
      if (insertLineEnd === insertLine && insertColumnEnd === insertColumn) {
        insertColumnEnd = insertColumnEnd + 1;
      }
      /* eslint-disable-next-line max-len */
      const dataTip = xmlEscape(`${message}<br/><span class='eslint-error-rule-id'>eslint(${ruleId})</span>`);
      insertedBadExample = insertTag(
        insertedBadExample,
        `<mark class="eslint-error" data-tip="${dataTip}">`,
        [insertLine, insertColumn, insertLineEnd, insertColumnEnd],
      );
    });
    return insertedBadExample;
  }
}

const builder = new Builder();
NAMESPACES.forEach(namespace => builder.build(namespace));
