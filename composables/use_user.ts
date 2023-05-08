import { User } from '~/composables/use_login_user'

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

  const { backendApiURL } = useConstants()

  const getUser = async (id: string) => {
    const { data } = await useAsyncData('profile', () =>
      $fetch(`${backendApiURL}/users/${id}`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const { data: userJson } = data.value as any
    //console.log(json_data)

    if(userJson){
      //console.log('test3')
      setJson2User(userJson)
    }
  }

  const setJson2User = (userJson: any) => {
    user.name = userJson.attributes.name
    user.email = userJson.attributes.email
    user.token = userJson.attributes.token
    user.id = userJson.id
    user.image_thumb_url = userJson.attributes.image_thumb_url
    user.image_one_url = userJson.attributes.image_one_url
    user.image_three_url = userJson.attributes.image_three_url
  }

  return { user, getUser }
}