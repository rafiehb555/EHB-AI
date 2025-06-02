import js from '@eslint/js';
import next from 'eslint-config-next';

export default [
  js.config({
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // Add or override rules here
    },
  }),
  ...next,
]; 