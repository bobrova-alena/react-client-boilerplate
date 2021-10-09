// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolveRelativeAppRoot } = require('./utils/resolvePath');

module.exports = {
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
  ],
  ignorePatterns: [resolveRelativeAppRoot('./dist'), resolveRelativeAppRoot('./node_modules')],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  plugins: ['import', 'react-hooks'],
  rules: {
    indent: ['warn', 2, { SwitchCase: 1 }],
    'no-multi-spaces': ['warn'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'prettier/prettier': ['warn'],
    'import/order': 1,
    'import/no-duplicates': 'error',
    curly: ['error', 'all'],
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-var-requires': 0,
  },
  settings: {
    react: { version: 'detect' },
  },
};
