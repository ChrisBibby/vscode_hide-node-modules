import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: tsParser,
      globals: {
        window: 'readonly',
        document: 'readonly',
        Node: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-console': 'warn',
      'eqeqeq': 'error',
      'curly': 'error',
      'semi': ['error', 'always'],
      'no-unused-vars': 'warn',
    },
  },
]; 
