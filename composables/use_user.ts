import type { User } from '~/interfaces/user'
import type { RefQuery } from '~/interfaces/ref_query'

export const useUser = () => {
  const user = reactive<User>(
    {
      name: '',
      email: '',
      token: null,
      id: null,
      image: null,
      image_thumb_url: '',
      image_one_url: '',
      image_three_url: '',
      preview_url: null,
      password: '',
      password_confirmation: '',
      social_login: false
    }
  )

  const refQuery = useState<RefQuery>('user.ref_query', () => {
    return {
      page: null,
      id: null
    }
  })

  const { backendApiURL } = useConstants()

  const { flash, clearFlash } = useFlash()

  const getUser = async (id: string) => {
    let statusCode!: number

    const { data, error } = await useAsyncData('get_user', () =>
      $fetch(`${backendApiURL.value}/users/${id}`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    clearFlash()

    if (error.value) {
      switch (statusCode) {
        case 404:
          flash.value.alert = error.value.message
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: userJson } = data.value as any
      // console.log(userJson)

      if (userJson) {
      // console.log('test3')
        setJson2User(userJson)
      }
    }
  }

  const setJson2User = (userJson: any) => {
    user.id = userJson.id
    Object.assign(user, userJson.attributes)
  }

  return { user, refQuery, getUser }
}
