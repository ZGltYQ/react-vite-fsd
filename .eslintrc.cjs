module.exports = {
  root: true,
  env: { browser: true, es2021: true, jest: true },
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended', 
    'plugin:react-hooks/recommended', 
    'plugin:i18next/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-hooks/exhaustive-deps' : 'off',
    'no-console': 'error',
    "i18next/no-literal-string": [ "error", { markupOnly: true } ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'off'
  },
}
