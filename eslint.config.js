import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {},
  },
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/no-v-html': 0,
      'vue/multi-word-component-names': 0,
    },
  },
)
