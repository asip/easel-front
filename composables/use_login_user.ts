export interface User {
  name: string
  email: string
  token: string | null
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
      token: null
    }
  })

  const logged_in = useState<Boolean>('logged_in', ()=> {
    return false
  })

  const error_message = ref('')

  const login = async () => {
    const { data } = await useAsyncData('login', () =>
      $fetch('/api/sessions/', {
        method: 'post',
        body: {
          user: {
            email: login_params.email,
            password: login_params.password
          }
        },
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
      logged_in.value = true
      //console.log(login_user.value)
      return navigateTo('/')
    }else{
      error_message.value = json_data.message
      //console.log(error_message.value)
    }
  }

  const logout = async () => {
    const { data } = useAsyncData('logout', () =>
      $fetch('/api/sessions/logout', {
        method: 'delete',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${login_user.value.token}`
        }
      })
    )

    //const json_data = data.value

    logged_in.value = false
    login_user.value.name = ''
    login_user.value.email = ''
    login_user.value.token = null
    return navigateTo('/')
  }

  return {
    login_user,
    logged_in,
    login_params,
    login,
    logout,
    error_message
  }
}