/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: false,
    node: true,
    es2020: true,
  },
  extends: ['airbnb-base'],
  rules: {
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'warn',
    'import/extensions': 'off',
    'semi': ['error', 'never', {
      'beforeStatementContinuationChars': 'always',
    }],
    'no-console': 'off',
    'max-len': 'warn',
    'no-underscore-dangle': 'off',
    'camelcase': 'off',
    'no-unused-vars': 'off',
  },
}
