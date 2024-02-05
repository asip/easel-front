import { describe, test } from 'vitest'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import Index from '~/pages/index.vue'

describe('Index', () => {
  const endpoint = `${import.meta.env.BACKEND_ORIGIN_URL}/frames`

  registerEndpoint(endpoint, {
    method: 'GET',
    handler: () => (
      {
        data: [
          {
            id: '49',
            type: 'frame',
            attributes: {
              id: 49,
              user_id: 4,
              name: 'Vue.js + TS',
              comment: null,
              shooted_at: '',
              shooted_at_html: '',
              created_at: '2024/02/03 (Sat) 13:55',
              updated_at: '2024/02/03 (Sat) 13:55',
              file_url: 'http://localhost:9000/easel-uploads/store/23c7f769af4b4b2aaa4ea32e283c85c2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=f81d86173f6d0bf6fc4f42d72c13ce789fe67c8f0991ffa293ccbda1fa3342ac',
              file_two_url: 'http://localhost:9000/easel-uploads/store/a64d7cef3dbdbedffea800822230a2d1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=e3b5cc9414d7602da40ae50236adc9e1b7c3cc8fe6650d48c4762aa828be79fe',
              file_three_url: 'http://localhost:9000/easel-uploads/store/28e8b6f0174fe13bed71ccdcfb8fc04b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=1e8df2d9849801eb2f3b99d58b2686de364408103982c86e991b70cfb30b6f6d'
            }
          },
          {
            id: '48',
            type: 'frame',
            attributes: {
              id: 48,
              user_id: 27,
              name: 'nuxt studio',
              comment: null,
              shooted_at: '',
              shooted_at_html: '',
              created_at: '2024/01/20 (Sat) 17:19',
              updated_at: '2024/01/20 (Sat) 17:19',
              file_url: 'http://localhost:9000/easel-uploads/store/af4c05908ed5a87f19efdb46f2eb1687.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=855af509e19047f7483fb60448b601dee43bdccf695f4fdd81e2b1bc4252d2cd',
              file_two_url: 'http://localhost:9000/easel-uploads/store/3ec4bf1fb2a8fcca3a3166e0f109d66d.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=95dbae1d363d01ae53ae988e4857c3542d995274124680fa21251504620d802d',
              file_three_url: 'http://localhost:9000/easel-uploads/store/27011a863cf11781b0c4c963201e52f7.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=1c6d0184131a0548c7c445eda4c26458541aa3ad41ddc09af6a2b4b925e92c5c'
            }
          },
          {
            id: '47',
            type: 'frame',
            attributes: {
              id: 47,
              user_id: 27,
              name: 'nuxt cheat sheet',
              comment: null,
              shooted_at: '',
              shooted_at_html: '',
              created_at: '2024/01/20 (Sat) 17:17',
              updated_at: '2024/01/20 (Sat) 17:17',
              file_url: 'http://localhost:9000/easel-uploads/store/e21e4cb17ed0d4350fc6ff7b8a547c67.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=7994e845aa7915a7cb7e94a6a4e6750319afd186af0d58db1714ae8d0aa6a0f1',
              file_two_url: 'http://localhost:9000/easel-uploads/store/01c70b3982ddfea515b9bb233ed05ba4.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b9869e6745f7eec8c312883e8e3432699f9a5277668d3c55b32adbef19df6334',
              file_three_url: 'http://localhost:9000/easel-uploads/store/76ceb4ebde68f18c72ff77e70afca590.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b6dfd037a36225e269949ad6c3b1fb73b8472db4db8504c721cd88fd25f8f009'
            }
          },
          {
            id: '46',
            type: 'frame',
            attributes: {
              id: 46,
              user_id: 4,
              name: 'vue3.4-4',
              comment: '',
              shooted_at: '',
              shooted_at_html: '',
              created_at: '2024/01/14 (Sun) 18:16',
              updated_at: '2024/02/03 (Sat) 17:20',
              file_url: 'http://localhost:9000/easel-uploads/store/ef60cb518743c81b897f63f275fdb878.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=410a7c6e5735b5885e9bf6ccbed5bdb4f1f010b55147ad2b91f825cf5b1409ff',
              file_two_url: 'http://localhost:9000/easel-uploads/store/11c504d09bd175dcd133fe3e1802dd0a.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=451eec642c506e898128e71d0e1e53a81aef9888728f7b8c861b829172e2dc35',
              file_three_url: 'http://localhost:9000/easel-uploads/store/9ce0e23e76e99558e65243893a1822d8.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=1fc6149e1e078d281bafec800cf3a3e27203d4dfa1b81d325c809ad43203356e'
            }
          },
          {
            id: '45',
            type: 'frame',
            attributes: {
              id: 45,
              user_id: 4,
              name: 'vue3.4-3',
              comment: '',
              shooted_at: '',
              shooted_at_html: '',
              created_at: '2024/01/14 (Sun) 18:14',
              updated_at: '2024/01/14 (Sun) 18:14',
              file_url: 'http://localhost:9000/easel-uploads/store/02c9eac7c7795e024cbb5ac291bf0499.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=66b516de686e1618045b203b7f9646594fdc314a6f80587046c140dbfcee1f54',
              file_two_url: 'http://localhost:9000/easel-uploads/store/c770090611b7bbb371431a84c4750948.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=138a734fa9090deca0abf0066d0dbf49e93643030afd907c4eefba840b62668d',
              file_three_url: 'http://localhost:9000/easel-uploads/store/c048d028f7abef8865dfb455e1f8cb2e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=39ed667554ddb31436ceb10490ca05d44f1789e07a901170c0b6bc257a690945'
            }
          },
          {
            id: '44',
            type: 'frame',
            attributes: {
              id: 44,
              user_id: 4,
              name: 'vue3.4-2',
              comment: '',
              shooted_at: '',
              shooted_at_html: '',
              created_at: '2024/01/14 (Sun) 18:14',
              updated_at: '2024/01/14 (Sun) 18:14',
              file_url: 'http://localhost:9000/easel-uploads/store/a8598c5cb004f97210bd597e512dbdc2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=baa5c4dccc478ec0f5614fba45a7a3588693afbf539cb43e7f723f63f16acdbe',
              file_two_url: 'http://localhost:9000/easel-uploads/store/724011de1c711bb9af3c211a46b3cdfd.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=aefd4f27437720dae37f8ff083bfef5e397e7c6d4602849f547eda330e1ee839',
              file_three_url: 'http://localhost:9000/easel-uploads/store/ed38fd4f59fa4ac7c60b8262f641692e.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=69f97e41dcaac72cd0c050b8619571f962e558f2e4c4ec631794982ae9f7b840'
            }
          },
          {
            id: '43',
            type: 'frame',
            attributes: {
              id: 43,
              user_id: 4,
              name: 'vue3.4-1',
              comment: '',
              shooted_at: '',
              shooted_at_html: '',
              created_at: '2024/01/14 (Sun) 18:13',
              updated_at: '2024/01/14 (Sun) 18:13',
              file_url: 'http://localhost:9000/easel-uploads/store/3db796c117cdaeff9c93744a4303fbda.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=96a93753358804f93cfa0952b4349889570fe1ec6ebc6e75e476b847fdc20400',
              file_two_url: 'http://localhost:9000/easel-uploads/store/392b8f4dac55c88d27a2fbea1587aad1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=56ea438d711b207709e9282fe1bc572c2a4d6a5527e239e46dac0a3887789ec3',
              file_three_url: 'http://localhost:9000/easel-uploads/store/fd1fd5d3bbcc6612acd566b6f7ed7e8c.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=e1f084a12e45141cab11f4ea4118d9e792a21437df7065be485533f9a95e4705'
            }
          },
          {
            id: '42',
            type: 'frame',
            attributes: {
              id: 42,
              user_id: 4,
              name: 'pinia cheatseat',
              comment: '',
              shooted_at: '',
              shooted_at_html: '',
              created_at: '2024/01/14 (Sun) 18:12',
              updated_at: '2024/01/14 (Sun) 18:12',
              file_url: 'http://localhost:9000/easel-uploads/store/d18802e0fa1071886fd379f5d795381f.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=e20167e62b366d8392d208ad8dad648f360681a1975cac7e27891340693ba694',
              file_two_url: 'http://localhost:9000/easel-uploads/store/cb53f6544a19133badb32756e55fd113.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=9ff9603134daeb5555f2ad095b37cbf68b7816ca4b5877e99699788a45a1df42',
              file_three_url: 'http://localhost:9000/easel-uploads/store/88d87139c083208965cecd556cec05b9.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20240205%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240205T081142Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=0c8b3341da634abeb7cf640af6d98ef33aa406a88d33944b019f24612d6d3ae0'
            }
          }
        ],
        meta: {
          pagination: {
            count: 10,
            pages: 2,
            page: 1,
            per: 8
          }
        }
      }
    )
  })

  test('display', async () => {
    // Arrange
    // const { container } =
    await mountSuspended(Index)
  })
})
