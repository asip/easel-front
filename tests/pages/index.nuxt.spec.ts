import { describe, test } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import Index from '~/pages/index.vue'

describe('Index', () => {
  test('display', async () => {
    // Arrange
    //const { container } = 
    await renderSuspended(Index)
  })
})

