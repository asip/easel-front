import typescriptESLintParser from '@typescript-eslint/parser'
import typescriptESLint from '@typescript-eslint/eslint-plugin'
import vueESLint from 'eslint-plugin-vue'
import vueESLintParser from 'vue-eslint-parser'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      camelcase: 0,
        'import/default': 0,
        'import/namespace': 0,
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
    }
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-unused-vars': 0
    }
  },
  {
    files: ['**/*.vue'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      'vue/no-v-html': 0,
      'vue/multi-word-component-names': 0,
      'vue/return-in-computed-property': 0
    }
  }
)
