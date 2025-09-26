import type { User, UserResource } from '~/interfaces'

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

  const { setAlert } = useAlert({ flash: flash.value })

  const getUser = async (id: string) => {
    const { data, error } = await useGetApi<UserResource>({
      url: `/users/${id}`
    })

    clearFlash()

    if (error.value) {
      setAlert({ error: error.value })
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

  return { user, getUser }
}
