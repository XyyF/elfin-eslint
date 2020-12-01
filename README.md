# elfin-eslint

elfin 统一的eslint配置

## Usage

```js
module.exports = {
  extends: ['../elfin-eslint/.eslintrc.js'],
};

module.exports = {
  extends: ['../elfin-eslint/.vue.eslintrc.js'],
};
```

## Refs

- eslint
- babel-eslint
- husky
- eslint-plugin-import
- eslint-plugin-vue [可选] 针对.vue文件使用需要

```js
npm install eslint babel-eslint husky eslint-plugin-import --save-dev
```

## package.json

```js
{
  "scripts": {
		"lint": "eslint ./src --ext .js,.jsx,.ts,.tsx,.vue",
		"lint.fix": "eslint ./src --ext .js,.jsx,.ts,.tsx,.vue --fix"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  },
}
```