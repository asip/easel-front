import type { User } from '~/interfaces/user'
import type { RefQuery } from '~/interfaces/ref-query'

export const useUser = () => {
  const user = ref<User>(
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

  const { flash, clearFlash } = useFlash()

  const getUser = async (id: string) => {
    const { data, error } = await useGetApi({
      url: `/users/${id}`
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        case 404:
          flash.value.alert = error.value.message
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: userAttrs } = data.value as any
      // console.log(userAttrs)

      if (userAttrs) {
      // console.log('test3')
        setJson2User(userAttrs.attributes)
      }
    }
  }

  const setJson2User = (resource: any) => {
    Object.assign(user.value, resource)
  }

  return { user, refQuery, getUser }
}
