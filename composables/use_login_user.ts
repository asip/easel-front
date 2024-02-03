import { useGetApi } from './api/use_get_api'
import { usePostApi } from './api/use_post_api'
import { usePutApi } from './api/use_put_api'
import { useDeleteApi } from './api/use_delete_api'
import { required, email, minLength, maxLength, sameAs } from '~~/utils/i18n-validators'
import { useLocale } from '~/composables/use_locale'
import type { User } from '~/interfaces/user'
import type { CredentialResponse } from '~/interfaces/credential_response'

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

  const login_messages = ref<string[]>([])

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

  const processing = ref<boolean>(false)

  const { $i18n } = useNuxtApp()

  const access_token = useCookie('access_token', { sameSite: 'lax' })

  const { locale } = useLocale()
  const { flash, clearFlash } = useFlash()

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
    processing.value = true
    // console.log(signup_params.image)

    const formData = new FormData()

    if (signup_params.image) {
      formData.append('user[image]', signup_params.image)
    }
    formData.append('user[name]', signup_params.name)
    formData.append('user[email]', signup_params.email)
    formData.append('user[password]', signup_params.password)
    formData.append('user[password_confirmation]', signup_params.password_confirmation)

    const { data, error, pending } = await usePostApi({
      url: '/users/',
      body: formData,
      locale: locale.value
    })

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (error.value.statusCode) {
        case 500:
          flash.value.alert = error.value.message
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: userAttrs, errors } = data.value as any

      // console.log(userAttrs)

      if (!userAttrs) {
        setErrorMessages(errors)
      }
    }

    processing.value = pending.value
  }

  const authenticate = async () => {
    login_user.value.token = access_token.value
    // console.log(login_user.value.token)

    if (login_user.value.token) {
      const { data, error } = await useGetApi({
        url: '/profile',
        token: login_user.value.token
      })

      clearFlash()

      if (error.value) {
        switch (error.value.statusCode) {
          case 401:
            flash.value.alert = $i18n.t('action.error.login')
            clearLoginUser()
            break
          default:
            flash.value.alert = error.value.message
        }
      } else if (data.value) {
        const { data: userAttrs } = data.value as any
        // console.log(userAttrs)

        if (userAttrs) {
          // console.log('test3')
          setJson2LoginUser(userAttrs.attributes)
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

    const { data, error } = await usePostApi({
      url: '/sessions/',
      body: postData,
      locale: locale.value
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        case 500:
          flash.value.alert = error.value.message
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: userAttrs, messages } = data.value as any

      if (userAttrs) {
        setJson2LoginUser(userAttrs.attributes)
        logged_in.value = true
        // console.log(login_user.value)

        access_token.value = login_user.value.token
        login_messages.value = []
      } else {
        login_messages.value = messages
      // console.log(login_messages.value)
      }
    }
  }

  const login_with_google = async (response: CredentialResponse) => {
    const postData = {
      provider: 'google',
      credential: response.credential
    }

    const { data, error } = await usePostApi({
      url: '/oauth/sessions/',
      body: postData
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        // case 500:
        //  flash.value.alert = error.value.message
        //  break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: userAttrs } = data.value as any
      setJson2LoginUser(userAttrs.attributes)
      logged_in.value = true
      // console.log(login_user.value)

      access_token.value = login_user.value.token
    }

    login_messages.value = []
  }

  const setJson2LoginUser = (resource: any) => {
    Object.assign(login_user.value, resource)
  }

  const setUser = (login_user: Ref<User>) => {
    Object.assign(user.value, login_user.value)
  }

  const setToken2Cookie = () => {
    if (login_user.value.token !== access_token.value) {
      access_token.value = login_user.value.token
    }
  }

  const updateProfile = async () => {
    processing.value = true
    // console.log(signup_params.image)

    const formData = new FormData()

    if (user.value.image) {
      formData.append('user[image]', user.value.image)
    }
    formData.append('user[name]', user.value.name)
    formData.append('user[email]', user.value.email)
    formData.append('user[password]', user.value.password)
    formData.append('user[password_confirmation]', user.value.password_confirmation)

    const { data, error, pending } = await usePutApi({
      url: '/profile/',
      body: formData,
      token: user.value.token,
      locale: locale.value
    })

    // console.log(data)
    // console.log(errors)

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (error.value.statusCode) {
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: userAttrs, errors } = data.value as any
      if (userAttrs) {
        setJson2LoginUser(userAttrs.attributes)
        setToken2Cookie()
      } else if (errors) {
        setErrorMessages(errors)
      }
    }

    processing.value = pending.value
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

    if (flash.value.alert) {
      result = false
    }

    return result
  }

  const logout = async () => {
    const { data, error } = await useDeleteApi({
      url: '/sessions/logout',
      token: login_user.value.token
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: userAttrs } = data.value as any
      if (userAttrs) {
        clearLoginUser()
      }
    }
  }

  const deleteAccount = async () => {
    const { data, error } = await useDeleteApi({
      url: '/profile',
      token: login_user.value.token
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        case 404:
          flash.value.alert = error.value.message
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: userAttrs } = data.value as any
      if (userAttrs) {
        clearLoginUser()
      }
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
    processing,
    isSuccess,
    flash,
    login,
    login_with_google,
    logout,
    deleteAccount,
    clearLoginUser,
    login_messages,
    usr_rules,
    su_rules,
    error_messages,
    locale
  }
}
