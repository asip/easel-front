export interface User {
  name: string
  email: string
  token: string | null
  id: number | null
}

export const useLoginUser = () => {
  const login_params = reactive({
    email: '',
    password: ''
  })

  const login_user = useState<User>('login-user', () => {
    return{
      name: '',
      email: '',
      token: null,
      id: null
    }
  })

  const logged_in = useState<Boolean>('logged_in', ()=> {
    return false
  })

  const error_message = ref('')

  const { baseApiURL } = useConstants()

  const cookie = useCookie('access_token')

  const authenticate = async () => {

    login_user.value.token = cookie.value
    //console.log(login_user.value.token)

    if(login_user.value.token) {
      const { data } = await useAsyncData('profile', () =>
        $fetch(`${baseApiURL}/profile`, {
          method: 'get',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${login_user.value.token}`
          }
        })
      )

      const json_data = data.value
      //console.log(json_data)

      if(json_data && json_data.data){
        //console.log('test3')
        login_user.value.name = json_data.data.attributes.name
        login_user.value.email = json_data.data.attributes.email
        login_user.value.token = json_data.data.attributes.token
        login_user.value.id = json_data.data.id
        logged_in.value = true
      }
    }
  }

  const login = async () => {
    const postData = {
      user: {
        email: login_params.email,
        password: login_params.password
      }
    }

    const { data } = await useAsyncData('login', () =>
      $fetch('/api/sessions/', {
        method: 'post',
        body: postData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const json_data = data.value

    if(json_data.data){
      login_user.value.name = json_data.data.attributes.name
      login_user.value.email = json_data.data.attributes.email
      login_user.value.token = json_data.data.attributes.token
      login_user.value.id = json_data.data.id
      logged_in.value = true
      //console.log(login_user.value)

      cookie.value = login_user.value.token
      return navigateTo('/')
    }else{
      error_message.value = json_data.message
      //console.log(error_message.value)
    }
  }

  const logout = async () => {
    const { data } = await useAsyncData('logout', () =>
      $fetch('/api/sessions/logout', {
        method: 'delete',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${login_user.value.token}`
        }
      })
    )

    const json_data = data.value

    if(json_data.data) {
      logged_in.value = false
      login_user.value.name = ''
      login_user.value.email = ''
      login_user.value.token = null
      login_user.value.id = null

      cookie.value = null
      return navigateTo('/')
    }
  }

  return {
    login_user,
    logged_in,
    login_params,
    authenticate,
    login,
    logout,
    error_message
  }
}