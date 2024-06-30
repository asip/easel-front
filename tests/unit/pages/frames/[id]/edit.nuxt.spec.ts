/* work in progress */

import { vi, describe, test } from 'vitest'
import { renderSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import FramesIdEdit from '~/pages/frames/[id]/edit.vue'

// vi.mock('nuxt/app', () => ({
//  useRoute: vi.fn(() => ({
//    params: {
//      id: '49'
//    },
//    path: '/frames/49'
//  }))
// }))

const { useRouteMock } = vi.hoisted(() => {
  return {
    useRouteMock: vi.fn()
  }
})

vi.mock('#app', () => ({ // #app -> nuxt/app
  useRoute: useRouteMock
}))

describe('frames/:id/edit', () => {
  const frame_endpoint = `${import.meta.env.BACKEND_ORIGIN_URL}/frames/undefined`

  registerEndpoint(frame_endpoint, {
    method: 'GET',
    handler: () => (
      {
        data: {
          id: '49',
          type: 'frame',
          attributes: {
            id: 49,
            user_id: 4,
            name: 'Vue.js + TS',
            comment: '',
            shooted_at: '',
            shooted_at_html: '',
            created_at: '2024/02/03 (Sat) 13:55',
            updated_at: '2024/02/24 (Sat) 00:16',
            file_url: 'http://localhost:9000/easel-uploads/store/23c7f769af4b4b2aaa4ea32e283c85c2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240303%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240303T060850Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=a3de98eca9f24b97a223b97f689ca2ab36b9d65b663b8585fc204b3333fb5e19',
            file_two_url: 'http://localhost:9000/easel-uploads/store/5ff76918282c63129c8a8a9079c58aab.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240303%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240303T060850Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=8316e696d44c5540afbaea15f8d67864602e72c45900dfd594acd9f5992b126f',
            file_three_url: 'http://localhost:9000/easel-uploads/store/4b2f174822522bacb6cf1664e32f2061.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240303%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240303T060850Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=41c2ba834d068472c2672af0c3334326e025853a0856b533a5ae8a021bf9a85c',
            user_name: 'Yasumasa Ashida',
            tag_list: 'vue.js',
            tags: [
              'vue.js'
            ]
          },
          relationships: {
            comments: {
              data: [
                {
                  id: '93',
                  type: 'comment'
                }
              ]
            }
          }
        },
        included: [
          {
            id: '93',
            type: 'comment',
            attributes: {
              id: 93,
              user_id: 4,
              frame_id: 49,
              body: 'test',
              user_name: 'Yasumasa Ashida',
              user_image_url: 'http://localhost:3000/no-profile-image.png',
              updated_at: '2024/02/24 (Sat) 00:16',
              error_messages: []
            }
          }
        ]
      }
    )
  })

  test('display', async () => {
    useRouteMock.mockImplementation(() => {
      return {
        params: {
          id: '49'
        },
        path: '/frames/49/edit'
      }
    })

    // const { container } =
    await renderSuspended(FramesIdEdit)
  })
})
