module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: 'standard',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: [2, 'always'],
    'comma-dangle': [2, 'always-multiline'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
  },
};
