import { required, email, minLength, maxLength, sameAs } from '~~/utils/i18n-validators'
import { useLocale } from '~/composables/use_locale'
import type { User } from '~/interfaces/user'

export interface SignupParams {
  image: Blob | null | undefined
  preview_url: string | null | undefined
  name: string
  email: string
  password: string
  password_confirmation: string
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

  const signup_params = reactive<SignupParams>({
    image: null,
    preview_url: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const logged_in = useState<Boolean>('logged_in', () => {
    return false
  })

  const login_messages = ref<String[]>([])

  const { backendApiURL } = useConstants()

  interface ErrorMessages {
    image: string[]
    name: string[]
    email: string[]
    password: string[]
    password_confirmation: string[]
    base: string[]
  }

  const error_messages = reactive<ErrorMessages>({
    image: [],
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
    base: []
  })

  const access_token = useCookie('access_token')

  const { locale } = useLocale()

  const su_rules = computed(() => {
    return {
      name: { required, minLength: minLength(3), maxLength: maxLength(40) },
      email: { required, email },
      password: { required, minLength: minLength(3) },
      password_confirmation: { required, sameAs: sameAs(signup_params.password) }
    }
  })

  const usr_rules = computed(() => {
    return {
      name: { required, minLength: minLength(3), maxLength: maxLength(40) },
      email: { required, email },
      password: {},
      password_confirmation: { sameAs: sameAs(user.value.password) }
    }
  })

  const signup = async () => {
    // console.log(signup_params.image)

    const formData = new FormData()

    if (signup_params.image) {
      formData.append('user[image]', signup_params.image)
    }
    formData.append('user[name]', signup_params.name)
    formData.append('user[email]', signup_params.email)
    formData.append('user[password]', signup_params.password)
    formData.append('user[password_confirmation]', signup_params.password_confirmation)

    const { data } = await useAsyncData('signup', () =>
      $fetch(`${backendApiURL.value}/users/`, {
        method: 'post',
        body: formData,
        headers: {
          'Accept-Language': locale.value
        }
      })
    )

    clearErrorMessages()

    const { data: userJson, errors } = data.value as any

    // console.log(userJson)

    if (!userJson) {
      setErrorMessages(errors)
    }
  }

  const authenticate = async () => {
    login_user.value.token = access_token.value
    // console.log(login_user.value.token)

    if (login_user.value.token) {
      const { data } = await useAsyncData('authenticate', () =>
        $fetch(`${backendApiURL.value}/profile`, {
          method: 'get',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${login_user.value.token}`
          }
        })
      )

      const json_data = data.value as any

      if (json_data) {
        const { data: userJson } = json_data
        // console.log(userJson)

        if (userJson) {
          // console.log('test3')
          setJson2LoginUser(userJson)
          logged_in.value = true
        }
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
      $fetch(`${backendApiURL.value}/sessions/`, {
        method: 'post',
        body: postData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const { data: userJson, messages } = data.value as any

    if (userJson) {
      setJson2LoginUser(userJson)
      logged_in.value = true
      // console.log(login_user.value)

      access_token.value = login_user.value.token
      login_messages.value = []
    } else {
      login_messages.value = messages
      // console.log(login_messages.value)
    }
  }

  const login_with_google = async (response: any) => {
    const postData = {
      provider: 'google',
      credential: response.credential
    }

    const { data } = await useAsyncData('login_with_google', () =>
      $fetch(`${backendApiURL.value}/oauth/sessions/`, {
        method: 'post',
        body: postData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const { data: userJson } = data.value as any

    if (userJson) {
      setJson2LoginUser(userJson)
      logged_in.value = true
      // console.log(login_user.value)

      access_token.value = login_user.value.token
    }

    login_messages.value = []
  }

  const setJson2LoginUser = (userJson: any) => {
    login_user.value.name = userJson.attributes.name
    login_user.value.email = userJson.attributes.email
    login_user.value.token = userJson.attributes.token
    login_user.value.id = userJson.id
    login_user.value.image_thumb_url = userJson.attributes.image_thumb_url
    login_user.value.image_one_url = userJson.attributes.image_one_url
    login_user.value.image_three_url = userJson.attributes.image_three_url
    login_user.value.social_login = userJson.attributes.social_login
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
    // console.log(signup_params.image)

    const formData = new FormData()

    if (user.value.image) {
      formData.append('user[image]', user.value.image)
    }
    formData.append('user[name]', user.value.name)
    formData.append('user[email]', user.value.email)
    formData.append('user[password]', user.value.password)
    formData.append('user[password_confirmation]', user.value.password_confirmation)

    let statusCode!: number

    const { data, error } = await useAsyncData('update_profile', () =>
      $fetch(`${backendApiURL.value}/profile/`, {
        method: 'put',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept-Language': locale.value,
          Authorization: `Bearer ${user.value.token}`
        },
        async onResponse ({ response }) {
          statusCode = response.status
        }
      })
    )

    clearErrorMessages()

    // console.log(userJson)
    // console.log(errors)

    if (error.value) {
      setErrorMessage(error.value)
      if (statusCode === 401) {
        navigateLogoutTo('/')
      }
    } else if (data.value) {
      const { data: userJson, errors } = data.value as any
      if (userJson) {
        setJson2LoginUser(userJson)
      } else if (errors) {
        setErrorMessages(errors)
      }
    }
  }

  const setErrorMessage = (error: any) => {
    error_messages.base.push(error)
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

  const clearErrorMessages = () => {
    error_messages.image = []
    error_messages.name = []
    error_messages.email = []
    error_messages.password = []
    error_messages.password_confirmation = []
    error_messages.base = []
  }

  const isSuccess = () => {
    let result = true

    if (error_messages.image.length > 0 || error_messages.name.length > 0 ||
      error_messages.email.length > 0 || error_messages.password.length > 0 ||
      error_messages.password_confirmation.length > 0 ||
      error_messages.base.length > 0
    ) {
      result = false
    }

    return result
  }

  const logout = async () => {
    let statusCode!: number

    const { data, error } = await useAsyncData('logout', () =>
      $fetch(`${backendApiURL.value}/sessions/logout`, {
        method: 'delete',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        },
        async onResponse ({ response }) {
          statusCode = response.status
        }
      })
    )

    if (error.value) {
      setErrorMessage(error.value)
      if (statusCode === 401) {
        navigateLogoutTo('/')
      }
    } else if (data.value) {
      const { data: userJson } = data.value as any
      if (userJson) {
        navigateLogoutTo('/')
      }
    }
  }

  const deleteAccount = async () => {
    let statusCode!: number

    const { data, error } = await useAsyncData('logout', () =>
      $fetch(`${backendApiURL.value}/profile`, {
        method: 'delete',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        },
        async onResponse ({ response }) {
          statusCode = response.status
        }
      })
    )

    if (error.value) {
      setErrorMessage(error.value)
      if (statusCode === 401) {
        navigateLogoutTo('/')
      }
    } else if (data.value) {
      const { data: userJson } = data.value as any
      if (userJson) {
        navigateLogoutTo('/')
      }
    }
  }

  const navigateLogoutTo = (path: string) => {
    clearLoginUser()

    navigateTo(path)
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

    access_token.value = null
  }

  return {
    login_user,
    user,
    signup_params,
    logged_in,
    login_params,
    signup,
    authenticate,
    setUser,
    updateProfile,
    isSuccess,
    login,
    login_with_google,
    logout,
    deleteAccount,
    navigateLogoutTo,
    login_messages,
    usr_rules,
    su_rules,
    error_messages,
    locale
  }
}
