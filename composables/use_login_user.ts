import { useVuelidate } from '@vuelidate/core'
import { required ,email, minLength, maxLength } from '~~/utils/i18n-validators'
import {useLocale} from "~/composables/use_locale";

export interface User {
  name: string
  email: string
  token: string | null
  id: number | null
  image: Blob | null | undefined
  image_thumb_url: string | null
  image_one_url: string | null
  image_three_url: string | null
  preview_url: string | null | undefined
  password: string
  password_confirmation: string
  social_login: boolean | null | undefined
}

export const useLoginUser = () => {
  const login_params = reactive({
    email: '',
    password: ''
  })

  const login_user = useState<User>('login-user', () => {
    return {
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
  })

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

  const logged_in = useState<Boolean>('logged_in', ()=> {
    return false
  })

  const error_message = ref('')

  const { baseApiURL } = useConstants()

  const error_messages = reactive({
    image: [],
    name: [],
    email: [],
    password: [],
    password_confirmation: []
  })

  const rules = {
    name: { required, minLength: minLength(3), maxLength: maxLength(40) },
    email: { required, email },
    password: {},
    password_confirmation: {}
  }

  const v$ = useVuelidate(rules, user)

  const access_token = useCookie('access_token')

  const { locale } = useLocale()

  const authenticate = async () => {

    login_user.value.token = access_token.value
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

      const json_data: any = data.value
      //console.log(json_data)

      if(json_data && json_data.data){
        //console.log('test3')
        setJson2LoginUser(json_data)
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

    const json_data: any = data.value

    if(json_data.data){
      setJson2LoginUser(json_data)
      logged_in.value = true
      //console.log(login_user.value)

      access_token.value = login_user.value.token
      error_message.value = ''
    }else{
      error_message.value = json_data.message
      //console.log(error_message.value)
    }
  }

  const login_with_google = async (response: any) => {
    let postData = {
      provider: 'google',
      credential: response.credential
    }

    const { data } = await useAsyncData('login', () =>
      $fetch(`${baseApiURL}/oauth/sessions/`, {
        method: 'post',
        body: postData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const json_data: any = data.value

    if(json_data && json_data.data){
      setJson2LoginUser(json_data)
      logged_in.value = true
      //console.log(login_user.value)

      access_token.value = login_user.value.token
    }

    error_message.value = ''
  }

  const setJson2LoginUser = (json_data: any)  => {
    login_user.value.name = json_data.data.attributes.name
    login_user.value.email = json_data.data.attributes.email
    login_user.value.token = json_data.data.attributes.token
    login_user.value.id = json_data.data.id
    login_user.value.image_thumb_url = json_data.data.attributes.image_thumb_url
    login_user.value.image_one_url = json_data.data.attributes.image_one_url
    login_user.value.image_three_url = json_data.data.attributes.image_three_url
    login_user.value.social_login = json_data.data.attributes.social_login
  }

  const setUser = (login_user: Ref<User>) => {
    user.value.name = login_user.value.name
    user.value.email = login_user.value.email
    user.value.token = login_user.value.token
    user.value.id = login_user.value.id
    user.value.image_thumb_url = login_user.value.image_thumb_url
    user.value.image_one_url = login_user.value.image_one_url
    user.value.image_three_url = login_user.value.image_three_url
    user.value.social_login = login_user.value.social_login
  }

  const updateProfile = async () => {

    // @ts-ignore
    i18n.global.locale.value = locale.value
    const result = await v$.value.$validate();

    //console.log(signup_params.image)

    if(!v$.value.$invalid){
      let formData = new FormData();

      if(user.value.image){
        formData.append('user[image]', user.value.image)
      }
      formData.append('user[name]', user.value.name)
      formData.append('user[email]', user.value.email)
      formData.append('user[password]', user.value.password)
      formData.append('user[password_confirmation]', user.value.password_confirmation)

      const { data } = await useAsyncData('updateProfile', () =>
        $fetch('/api/profile/', {
          method: 'put',
          body: formData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language' : locale.value,
            'Authorization': `Bearer ${user.value.token}`
          }
        })
      )

      const json_data: any = data.value

      //console.log(json_data)

      if (json_data.data) {
        setJson2LoginUser(json_data)
      } else {
        const errors = json_data.errors
        setErrorMessages(errors)
      }
    }
  }

  const setErrorMessages = (errors: any) => {
    if (errors.image) {
      error_messages.image = errors.image
    } else {
      error_messages.image = []
    }
    if (errors.name) {
      error_messages.name = errors.name
    } else {
      error_messages.name = []
    }
    if (errors.email) {
      error_messages.email = errors.email
    } else {
      error_messages.email = []
    }
    if (errors.password) {
      error_messages.password = errors.password
    } else {
      error_messages.password = []
    }
    if (errors.password_confirmation) {
      error_messages.password_confirmation = errors.password_confirmation
    } else {
      error_messages.password_confirmation = []
    }
  }


  const isSuccess = () => {
    let result: boolean = true

    if(error_messages.image.length > 0 || error_messages.name.length > 0 ||
      error_messages.email.length> 0 || error_messages.password.length > 0 ||
      error_messages.password_confirmation.length > 0
    ){
      result = false
    }

    return result
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

    const json_data: any = data.value

    if(json_data.data) {
      clearLoginUser()

      access_token.value = null
    }
  }

  const clearLoginUser = () => {
    logged_in.value = false
    login_user.value.name = ''
    login_user.value.email = ''
    login_user.value.token = null
    login_user.value.id = null
    login_user.value.image_thumb_url = null
    login_user.value.image_one_url = null
    login_user.value.image_three_url = null
    login_user.value.social_login = false
  }

  return {
    login_user,
    user,
    logged_in,
    login_params,
    authenticate,
    setUser,
    updateProfile,
    isSuccess,
    login,
    login_with_google,
    logout,
    error_message,
    v$,
    error_messages
  }
}