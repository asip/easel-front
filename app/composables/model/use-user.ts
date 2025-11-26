import type { User, UserResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

export const useUser = () => {
  const { copy } = useEntity<User, UserResource>()

  const { flash, clearFlash } = useFlash()

  const { setAlert } = useAlert({ flash })

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
      profile: '',
      time_zone: '',
      social_login: false
    }
  )

  const getUser = async (id: string): Promise<void> => {
    const { data, error } = await useGetApi<UserResource, ErrorsResource<ErrorMessages<string>>>({
      url: `/users/${id}`
    })

    clearFlash()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const userAttrs = data
      // console.log(userAttrs)

      if (userAttrs) {
        setUser({ from: userAttrs })
      }
    }
  }

  const setUser = ({ from }: { from: UserResource }): void => {
    copy({ from, to: user.value })
  }

  return { user, getUser }
}
