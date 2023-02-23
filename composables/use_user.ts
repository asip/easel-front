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

  const { baseApiURL } = useConstants()

  const getUser = async (id: string) => {
    const { data } = await useAsyncData('profile', () =>
      $fetch(`${baseApiURL}/users/${id}`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const json_data: any = data.value
    //console.log(json_data)

    if(json_data && json_data.data){
      //console.log('test3')
      setJson2User(json_data)
    }
  }

  const setJson2User = (json_data: any) => {
    user.name = json_data.data.attributes.name
    user.email = json_data.data.attributes.email
    user.token = json_data.data.attributes.token
    user.id = json_data.data.id
    user.image_thumb_url = json_data.data.attributes.image_thumb_url
    user.image_one_url = json_data.data.attributes.image_one_url
    user.image_three_url = json_data.data.attributes.image_three_url
  }

  return { user, getUser }
}