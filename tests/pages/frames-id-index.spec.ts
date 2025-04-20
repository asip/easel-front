import { describe, test } from 'vitest'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import FramesIdIndex from '~/pages/frames/[id]/index.vue'

/*
vi.mock('nuxt/app', () => ({
  useRoute: vi.fn(() => ({
    params: {
      id: '49'
    },
    path: '/frames/49'
  }))
}))
*/

/*
const { useRouteMock } = vi.hoisted(() => {
  return {
    useRouteMock: vi.fn()
  }
})

vi.mock('#app', () => ({ // #app -> nuxt/app
  useRoute: useRouteMock
}))
*/

/*
mockNuxtImport('useRoute', () => () => ({
  params: {
    id: '49'
  },
  path: '/frames/49'
}));
*/

describe('frames/:id/index', async () => {
  const frame_endpoint = `${import.meta.env.BACKEND_ORIGIN_URL}/frames/49`
  const comments_endpoint = `${import.meta.env.BACKEND_ORIGIN_URL}/frames/49/comments`

  registerEndpoint(frame_endpoint, {
    method: 'GET',
    handler: () => (
      {
        "id": 49,
        "user_id": 4,
        "user_name": "Yasumasa Ashida",
        "name": "Vue.js + TS",
        "comment": "",
        "private": false,
        "tag_list": "vue.js,ts",
        "tags": [
          "vue.js",
          "ts"
        ],
        "shooted_at": "",
        "shooted_at_html": "",
        "created_at": "2024/02/03 (Sat) 13:55",
        "updated_at": "2024/10/30 (Wed) 16:55",
        "file_url": "http://localhost:9000/easel-uploads/store/23c7f769af4b4b2aaa4ea32e283c85c2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T112501Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=a57490d35b3b94ee27e1c26e4506bcdb1a5c356c43217fa701f4fab1d799e82d",
        "file_two_url": "http://localhost:9000/easel-uploads/store/5953b1b6015f48fb4462afb8f1a1d971.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T112501Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=22de174f3d3ab702c68604442a21b9ebc4a8c01f6b0cb535a323c0d06539e0d9",
        "file_three_url": "http://localhost:9000/easel-uploads/store/032c78949f29a3721b36786ce838ed57.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T112501Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b15dae8196905a8154df383d8bde440fd72e5e556a7f2ca2fbf7347f32470b97",
        "comments": [
          {
            "id": 170,
            "user_id": 4,
            "frame_id": 49,
            "body": "test",
            "user_name": "Yasumasa Ashida",
            "user_image_url": "http://localhost:3000/no-profile-image.png",
            "updated_at": "2024/10/09 (Wed) 12:28",
            "error_messages": []
          }
        ]
      }
    )
  })

  registerEndpoint(comments_endpoint, {
    method: 'GET',
    handler: () => (
      {
        "comments": [
          {
            "id": 170,
            "user_id": 4,
            "frame_id": 49,
            "body": "test",
            "user_name": "Yasumasa Ashida",
            "user_image_url": "http://localhost:3000/no-profile-image.png",
            "updated_at": "2024/10/09 (Wed) 12:28",
            "error_messages": []
          }
        ]
      })
  })

  test('display', async () => {
    /*
    useRouteMock.mockImplementation(() => {
      return {
        params: {
          id: '49'
        },
        path: '/frames/49'
      }
    })
    */

    // const { container } =
    await mountSuspended(FramesIdIndex, { route: '/frames/49' })
  })
})
