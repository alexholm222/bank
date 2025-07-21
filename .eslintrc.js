module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    // 'plugin:jsx-a11y/recommended',
    'eslint:recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'simple-import-sort'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^react', '^next', '^dayjs', '^classnames'],

          ['^@?\\w'],

          ['^components/'],

          ['^assets/icons/'],

          ['^.+\\.module\\.(scss|css)$'],

          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn',
  },
};
