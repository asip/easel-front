import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    environment: 'nuxt',
    dir: 'tests',
    env: {
      BACKEND_ORIGIN_URL: 'http://localhost:3000/api/v1'
    }
  }
})
