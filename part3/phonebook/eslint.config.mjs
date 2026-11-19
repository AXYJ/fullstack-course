import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  { ignores: ['dist/**'] },
  {
    files: ['**/*.js'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 'latest',
      globals: globals.node,
    },
    rules: {
      indent: ['error', 4],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
    },
  },
])
