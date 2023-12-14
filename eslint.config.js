import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat

export default [
  ...compat.config(
    {
      extends: [
        '@nuxtjs/eslint-config-typescript'
      ],
      rules: {
        camelcase: 0,
        'import/default': 0,
        'import/namespace': 0,
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
        'vue/multi-word-component-names': 0,
        'vue/no-v-html': 0
      },
      overrides: [
        {
          files: ['**/*.vue'],
          rules: {
            '@typescript-eslint/no-unused-vars': 0,
            'vue/valid-v-for': 0
          }
        }
      ]
    }
  )
]
