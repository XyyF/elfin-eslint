<h1 align="center">
<br>
  <a href="https://github.com/XyyF/XyyF"><img src="https://rengarxiao.com/XyyF/images/elfin.png" alt="elfin" width="100"></a>
  <br>
    <br>
  elfin 统一的eslint配置
  <br><br>
</h1>

### Usage

安装:

javascript

```shell
npm install eslint @elfiner/eslint-config-elfin --save-dev
```

_.eslintrc.js:_

```javascript
module.exports = {
  extends: ['@elfiner/eslint-config-elfin'],
}
```

typescript 还需要安装依赖

```shell
tnpm install @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev
```

_.eslintrc.js:_

```javascript
module.exports = {
  extends: ['@elfiner/eslint-config-elfin', '@elfiner/eslint-config-elfin/ts'],
}
```

## 参与研发
```js
npm link // npm链接本地项目

npm publish --access=public // 发布项目

// 因taobao镜像源导致发布失败，可以先切换为npmjs源
npm config set registry https://registry.npmjs.org/
// 切换回
npm config set http://registry.npm.taobao.org/
```