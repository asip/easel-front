import { describe, test } from 'vitest'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import Index from '~/pages/index.vue'

describe('index', () => {
  const endpoint = `${import.meta.env.BACKEND_ORIGIN_URL}/frames`

  registerEndpoint(endpoint, {
    method: 'GET',
    handler: () => (
      {
        "frames": [
          {
            "id": 61,
            "user_id": 4,
            "user_name": "Yasumasa Ashida",
            "name": "hanabi",
            "comment": "<p>testtest</p>",
            "private": false,
            "tag_list": "fireworks",
            "tags": [
              "fireworks"
            ],
            "shooted_at": "",
            "shooted_at_html": "",
            "created_at": "2024/10/30 (Wed) 17:22",
            "updated_at": "2025/04/18 (Fri) 17:24",
            "file_url": "http://localhost:9000/easel-uploads/store/ef357ba8d45c5e1edda0a6bca22230c5.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=1689bc984f8372d27ed242d90e7ea0fe6cfad5b3df18db97c26bd09f33b0de85",
            "file_two_url": "http://localhost:9000/easel-uploads/store/613afc2e087a402e733db9fd12306188.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=e4df9356dbbdde3aeb64575d785221ab8021bb23241d99de22248f80252e08a8",
            "file_three_url": "http://localhost:9000/easel-uploads/store/574749ffb0fdf6ba1e40832af7142c2a.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=119e78cdd0ba5d2805f4461860259bb905b3317d577e5e77240a4fb5acca8305"
          },
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
            "file_url": "http://localhost:9000/easel-uploads/store/23c7f769af4b4b2aaa4ea32e283c85c2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=112749d849d82d366e3dc7ce654f84daa8c067a60c2104f7e9d8918ab4520ad3",
            "file_two_url": "http://localhost:9000/easel-uploads/store/5953b1b6015f48fb4462afb8f1a1d971.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=086568aa4b95acc701eef9d14573554499c269503f4698a480ddcfdcc2cad409",
            "file_three_url": "http://localhost:9000/easel-uploads/store/032c78949f29a3721b36786ce838ed57.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=c31b8595d36ee1301c0c6959bd08e0ccae7dd9c2f70216828f429a934b9fe3c7"
          },
          {
            "id": 48,
            "user_id": 27,
            "user_name": "Yasumasa Ashida",
            "name": "nuxt studio",
            "comment": "",
            "private": false,
            "tag_list": "nuxt",
            "tags": [
              "nuxt"
            ],
            "shooted_at": "",
            "shooted_at_html": "",
            "created_at": "2024/01/20 (Sat) 17:19",
            "updated_at": "2024/10/30 (Wed) 17:20",
            "file_url": "http://localhost:9000/easel-uploads/store/af4c05908ed5a87f19efdb46f2eb1687.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=97b527e50df58459c16be61bbd75d8754079f0def8f3779358f1b965ac51f733",
            "file_two_url": "http://localhost:9000/easel-uploads/store/d6e81eca3a4e6fc71736b0990a3638ff.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=72a5484327000efcdcc02bd6d663e6d56026d583cbb5f2265346aadf27d2b639",
            "file_three_url": "http://localhost:9000/easel-uploads/store/b7bcd68443c7b15df1bd7ce4c7cd8b0e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=9500aba54f883fd6b47032af385a53017844e1f4abccb7dd67602532d1de7363"
          },
          {
            "id": 47,
            "user_id": 27,
            "user_name": "Yasumasa Ashida",
            "name": "nuxt cheat sheet",
            "comment": "",
            "private": false,
            "tag_list": "nuxt",
            "tags": [
              "nuxt"
            ],
            "shooted_at": "",
            "shooted_at_html": "",
            "created_at": "2024/01/20 (Sat) 17:17",
            "updated_at": "2024/10/30 (Wed) 17:20",
            "file_url": "http://localhost:9000/easel-uploads/store/e21e4cb17ed0d4350fc6ff7b8a547c67.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=6b061cf078711fb5c007a103d384bead79967c40b430e790a5c7ac14890f89d4",
            "file_two_url": "http://localhost:9000/easel-uploads/store/28e212e4016ce72445b704d647d0938e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=554ae60a402e05265117106be5197b8ea1dbec3e16d2f86cf7b71cd167c0f702",
            "file_three_url": "http://localhost:9000/easel-uploads/store/29670538c5c90184c258ce6b108e4b2a.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=aceaddfbf0cf3f883d7828cf1621d882ac922f3a0b38e455fd10045949e4475c"
          },
          {
            "id": 46,
            "user_id": 4,
            "user_name": "Yasumasa Ashida",
            "name": "vue3.4-4",
            "comment": "",
            "private": false,
            "tag_list": "vue.js",
            "tags": [
              "vue.js"
            ],
            "shooted_at": "",
            "shooted_at_html": "",
            "created_at": "2024/01/14 (Sun) 18:16",
            "updated_at": "2024/10/30 (Wed) 17:18",
            "file_url": "http://localhost:9000/easel-uploads/store/ef60cb518743c81b897f63f275fdb878.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=e0fb49916cf3bbaa00c0600d593180d6240a63026f91fe42bab62b968bb00df1",
            "file_two_url": "http://localhost:9000/easel-uploads/store/eb3fb2e3fbafff37eb6c148749daff4b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=e2abbe0c8f14dacdff4fabf0d644895c64e1d8a7a24480e2c6e4d5e7764ff2d2",
            "file_three_url": "http://localhost:9000/easel-uploads/store/b4c27648d45bda356ea7e9a4d14e50ea.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=22e26a84c469ab40abaa65007d37d64466ba6f37001915e7514bbae14ea225eb"
          },
          {
            "id": 45,
            "user_id": 4,
            "user_name": "Yasumasa Ashida",
            "name": "vue3.4-3",
            "comment": "",
            "private": false,
            "tag_list": "vue.js",
            "tags": [
              "vue.js"
            ],
            "shooted_at": "",
            "shooted_at_html": "",
            "created_at": "2024/01/14 (Sun) 18:14",
            "updated_at": "2024/10/30 (Wed) 17:18",
            "file_url": "http://localhost:9000/easel-uploads/store/02c9eac7c7795e024cbb5ac291bf0499.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=54a933b4f49846684c7f91e495259c3d132552fc4aa7cedc9bf8db336873122a",
            "file_two_url": "http://localhost:9000/easel-uploads/store/38d9b334af9ed3ae996cacf615f8cf79.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=9f725754c15ec7fe6fa93568dd7bc7dd920abafa8bc3ede4f8c266177b1bb37c",
            "file_three_url": "http://localhost:9000/easel-uploads/store/2def077274b51736f50118f8d03dd564.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=0efc2e0be17d828d03c2dfa9de11e76629bfaf7358a7c0028a55e50571e89e4e"
          },
          {
            "id": 44,
            "user_id": 4,
            "user_name": "Yasumasa Ashida",
            "name": "vue3.4-2",
            "comment": "",
            "private": false,
            "tag_list": "vue.js",
            "tags": [
              "vue.js"
            ],
            "shooted_at": "",
            "shooted_at_html": "",
            "created_at": "2024/01/14 (Sun) 18:14",
            "updated_at": "2024/10/30 (Wed) 17:18",
            "file_url": "http://localhost:9000/easel-uploads/store/a8598c5cb004f97210bd597e512dbdc2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=370905eecf40b635619ea438db3b339300c2383cd3991ec8dc519e12b71b6c6e",
            "file_two_url": "http://localhost:9000/easel-uploads/store/d35e31bf700b41d82ee7f8fbb190b379.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=8d672aa584a4c7a2ac0dd7c8b6df4efe5209410178df8542cb418fb39a0167d0",
            "file_three_url": "http://localhost:9000/easel-uploads/store/7e29e5f2e294cb0a0f3f41bce44bf65e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=f9eb6610ce348132a610fc8f4696759b795cc2eb8b4122799487d00ff49b14b3"
          },
          {
            "id": 43,
            "user_id": 4,
            "user_name": "Yasumasa Ashida",
            "name": "vue3.4-1",
            "comment": "",
            "private": false,
            "tag_list": "vue.js",
            "tags": [
              "vue.js"
            ],
            "shooted_at": "",
            "shooted_at_html": "",
            "created_at": "2024/01/14 (Sun) 18:13",
            "updated_at": "2024/10/30 (Wed) 17:18",
            "file_url": "http://localhost:9000/easel-uploads/store/3db796c117cdaeff9c93744a4303fbda.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=fa8a665aaa8b0c6f747dbd4d66ce1ddde4eafa1e9e3f968c178cf892dd36c4d7",
            "file_two_url": "http://localhost:9000/easel-uploads/store/ae50ececce1403da19ad65f91e8c536b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=a8c902b822aa304eed36a1bfbac6937c84b4b926f0b870e7b7f5de0daebd8c80",
            "file_three_url": "http://localhost:9000/easel-uploads/store/1d841dcaa5586457b69f501f26f0ed7a.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=51777252bff9695be28214506e67526207003722624da118530c8e62274104b0"
          },
          {
            "id": 42,
            "user_id": 4,
            "user_name": "Yasumasa Ashida",
            "name": "pinia cheatseat",
            "comment": "",
            "private": false,
            "tag_list": "pinia",
            "tags": [
              "pinia"
            ],
            "shooted_at": "",
            "shooted_at_html": "",
            "created_at": "2024/01/14 (Sun) 18:12",
            "updated_at": "2024/10/30 (Wed) 17:18",
            "file_url": "http://localhost:9000/easel-uploads/store/d18802e0fa1071886fd379f5d795381f.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=857951f387af157d5751367128b3695205a3a32804d9c4ec35a96d2b5d069960",
            "file_two_url": "http://localhost:9000/easel-uploads/store/af82d938a93d19353e67b2f8f0fd0e7c.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=5f155063f08a1cd2bc085931d72a77c168372abd6b70552d5733e75a9ca86536",
            "file_three_url": "http://localhost:9000/easel-uploads/store/c552a5ac6281c109da607b7b1978c35a.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=3206724c776dbb89a96d97dc4c01b58c9de1641034d8ffe78b924cc1f6d4ae13"
          },
          {
            "id": 16,
            "user_id": 4,
            "user_name": "Yasumasa Ashida",
            "name": "solidjs signal",
            "comment": "",
            "private": false,
            "tag_list": "js,solid",
            "tags": [
              "js",
              "solid"
            ],
            "shooted_at": "",
            "shooted_at_html": "",
            "created_at": "2023/10/16 (Mon) 21:49",
            "updated_at": "2024/10/30 (Wed) 17:19",
            "file_url": "http://localhost:9000/easel-uploads/store/9dc93c1e42223aff05c52d932d372984.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=e1dfd21276ab6a10d6d8bb0d5858e423b9491dcbb76fc9160cb8ede43ac4aefa",
            "file_two_url": "http://localhost:9000/easel-uploads/store/822b8f7ed48d221d881155e7b288863e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=fa5bab8eda9ffc32600db11515b3fd732267a195b1b38cb8f38c08ffcb57c4f8",
            "file_three_url": "http://localhost:9000/easel-uploads/store/a119f4637012608cea4333578df492e1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20250420%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250420T113415Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b1009bf29d93bcbc7a9fffe7ae7f08cc906bb82d9dc07e4e604e45fe83115969"
          }
        ],
        "meta": {
          "pagination": {
            "count": 10,
            "pages": 1,
            "page": 1,
            "per": 12
          }
        }
      }
    )
  })

  test('display', async () => {
    // Arrange
    // const { container } =
    await mountSuspended(Index, { route: '/' })
  })
})
