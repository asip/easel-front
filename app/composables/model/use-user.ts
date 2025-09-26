import type { NuxtError } from '#app'
import type { User, RefQuery, UserResource } from '~/interfaces'

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
      time_zone: '',
      social_login: false
    }
  )

  const { flash, clearFlash } = useFlash()

  const getUser = async (id: string) => {
    const { data, error } = await useGetApi<UserResource>({
      url: `/users/${id}`
    })

    clearFlash()

    if (error.value) {
      setAlert(error.value)
    } else if (data.value) {
      const userAttrs = data.value
      // console.log(userAttrs)

      if (userAttrs) {
        setJson2User(userAttrs)
      }
    }
  }

  const setJson2User = (resource: UserResource) => {
    Object.assign(user.value, resource)
  }

  const setAlert = (error: NuxtError) => {
    switch (error.statusCode) {
      case 404:
        flash.value.alert = error.message
        break
      default:
        flash.value.alert = error.message
    }
  }

  return { user, getUser }
}
