import { describe, test } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Index from '~/pages/index.vue'

describe('Index', () => {
  test('display', async () => {
    // Arrange
    //const { container } =
    await mountSuspended(Index)
  })
})
