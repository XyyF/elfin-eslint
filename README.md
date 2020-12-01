# elfin-eslint

elfin 统一的eslint配置

## .eslintrc.js

```js
module.exports = {
  extends: ['../elfin-eslint/.eslintrc.js'],
};
```

#### package.json

```js
npm install eslint babel-eslint husky eslint-plugin-import --save-dev

{
  "scripts": {
		"lint": "eslint ./src --ext .js,.jsx,.ts,.tsx",
		"lint.fix": "eslint ./src --ext .js,.jsx,.ts,.tsx --fix"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  },
}
```

## .vue.eslintrc.js

```js
module.exports = {
  extends: ['../elfin-eslint/.vue.eslintrc.js'],
};
```

#### package.json

```js
npm install eslint babel-eslint husky eslint-plugin-import eslint-plugin-vue --save-dev

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