import js from '@eslint/js';
import globals from 'globals';
import {
  defineConfig
} from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': ['error', {
        'argsIgnorePattern': '^_'
      }],
      'function-paren-newline': ['error', 'multiline'],
      'object-property-newline': ['error', {
        'allowAllPropertiesOnSameLine': false
      }],
      'object-curly-newline': ['error', {
        'multiline': true,
        'minProperties': 1
      }],
    },
  },
]);
