module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'linebreak-style': 0,
    'no-return-await': 'off',
    'no-plusplus': 'off',
    'no-unused-expressions': 'off',
    'comma-dangle': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    'no-console': 'warn',
    'no-debugger': 'warn',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': [
      1,
      {
        code: 80,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    'global-require': [0],
    'func-names': [0],
    'import/no-dynamic-require': [0],
    'import/no-unresolved': [0, { caseSensitive: false }],
    'no-undef': [0],
    'class-methods-use-this': [0],
    'implicit-arrow-linebreak': [0, 'brace-style'],
    'import/prefer-default-export': [0],
    'arrow-parens': 0,
    'no-nested-ternary': 0,
    'consistent-return': [0],
    'no-throw-literal': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
