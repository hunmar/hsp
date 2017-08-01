// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    "import/no-unresolved": 0,
    "import/no-unassigned-import": 0,
    "vue/html-no-self-closing": "error",
    "semi": ["error", "never"],
    "no-console": "off",
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  }
}
