module.exports = {
  extends: 'universe/web',
  rules: {
    'no-empty-pattern': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['builtin', 'external', 'type', 'internal', 'sibling', 'parent', 'index', 'object'],
      },
    ],
  },
}
