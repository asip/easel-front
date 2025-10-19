import type { User, UserResource } from '~/interfaces'

export const useUser = () => {
  const { copy } = useEntity<User, UserResource>()

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

  const { setAlert } = useAlert({ flash })

  const getUser = async (id: string) => {
    const { data, error } = await useGetApi<UserResource>({
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

  const setUser = ({ from }: { from: UserResource }) => {
    copy({ from, to: user.value })
  }

  return { user, getUser }
}
