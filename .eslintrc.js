module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'eslint-config-airbnb-base',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },
  globals: {
    document: false,
    window: false,
    HTMLElement: false,
  },
  overrides: [
    {
      files: [
        '**/src/**/*.spec.js',
      ],
    },
  ],
};
