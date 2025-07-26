import { useLocale } from '~/composables/use-locale'
import type { User } from '~/interfaces/user'
import type { ErrorMessages } from '~/types/error-messages'
import type { CredentialResponse } from 'vue3-google-signin'
import type { ErrorsResource, UserResource } from '~/interfaces'

type ErrorProperty = 'image' | 'name' | 'email' | 'current_password' | 'password' | 'password_confirmation' | 'base'
type ExternalErrorProperty = 'image' | 'name' | 'email' | 'current_password' | 'password' | 'password_confirmation'

export const useAccount = () => {
  const loginParams = ref({
    email: '',
    password: ''
  })

  const loginUser = useState<User>('loginUser', () => {
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

  const loggedIn = useState<boolean>('loggedIn', () => {
    return false
  })

  const loginMessages = ref<string[]>([])

  const errorMessages = ref<ErrorMessages<ErrorProperty>>({
    image: [],
    name: [],
    email: [],
    current_password: [],
    password: [],
    password_confirmation: [],
    base: []
  })

  const processing = ref<boolean>(false)

  const { $i18n } = useNuxtApp()

  const accessToken = useCookie('access_token', { sameSite: 'lax' })

  const { locale } = useLocale()
  const { flash, clearFlash } = useFlash()

  const signup = async () => {
    processing.value = true
    // console.log(user.image)

    const formData = new FormData()

    if (user.value.image) {
      formData.append('user[image]', user.value.image)
    }
    formData.append('user[name]', user.value.name)
    formData.append('user[email]', user.value.email)
    formData.append('user[password]', user.value.password)
    formData.append('user[password_confirmation]', user.value.password_confirmation)

    const { error, pending } = await usePostApi<UserResource>({
      url: '/users/',
      body: formData,
      locale: locale.value
    })

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (error.value.statusCode) {
        case 422:
          {
            const { errors } = error.value.data as ErrorsResource<ErrorMessages<ExternalErrorProperty>>
            if (errors) {
              setErrorMessages(errors)
            }
            break
          }
        case 500:
          flash.value.alert = error.value.message
          break
        default:
          flash.value.alert = error.value.message
      }
    }

    processing.value = pending.value
  }

  const authenticate = async () => {
    loginUser.value.token = accessToken.value
    // console.log(loginUser.value.token)

    if (loginUser.value.token) {
      const { token, data, error } = await useGetApi<UserResource>({
        url: '/account/profile',
        token: accessToken.value
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
        const userAttrs = data.value
        // console.log(userAttrs)

        if (userAttrs) {
          // console.log('test3')
          setJson2LoginUser(userAttrs, token.value)
          loggedIn.value = true
        }
      }
    }
  }

  const login = async () => {
    const postData = {
      user: {
        email: loginParams.value.email,
        password: loginParams.value.password
      }
    }

    const { token ,data, error } = await usePostApi<UserResource>({
      url: '/sessions/',
      body: postData,
      locale: locale.value
    })

    // console.log(token.value)

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (error.value.statusCode) {
        case 422:
          {
            const { errors } = error.value.data as ErrorsResource<ErrorMessages<ExternalErrorProperty>>
            if (errors) {
              setErrorMessages(errors)
            }
            break
          }
        case 500:
          flash.value.alert = error.value.message
          break
        default:
          flash.value.alert = error.value.message
      }

    } else if (data.value) {
      const userAttrs = data.value
      if (userAttrs) {
        setJson2LoginUser(userAttrs, token.value)
        loggedIn.value = true
        // console.log(loginUser.value)
        accessToken.value = loginUser.value.token
        loginMessages.value = []
      }
    }
  }

  const loginWithGoogle = async (response: CredentialResponse) => {
    const postData = {
      provider: 'google',
      credential: response.credential
    }

    const { token, data, error } = await usePostApi<UserResource>({
      url: '/oauth/sessions/',
      body: postData
    })

    // console.log(token.value)

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
      const userAttrs  = data.value
      setJson2LoginUser(userAttrs, token.value)
      loggedIn.value = true
      // console.log(loginUser.value)

      accessToken.value = loginUser.value.token
    }

    loginMessages.value = []
  }

  const resetLoginParams = () => {
    loginParams.value.email = ''
    loginParams.value.password = ''
  }

  const setJson2LoginUser = (resource: UserResource, token?: string | undefined) => {
    Object.assign(loginUser.value, resource)
    if(token) loginUser.value.token = token
  }

  const setUser = (loginUser: Ref<User>) => {
    Object.assign(user.value, loginUser.value)
  }

  const setToken2Cookie = () => {
    if (loginUser.value.token !== accessToken.value) {
      accessToken.value = loginUser.value.token
    }
  }

  const updateProfile = async () => {
    processing.value = true
    // console.log(user.image)

    const formData = new FormData()

    if (user.value.image) {
      formData.append('user[image]', user.value.image)
    }
    formData.append('user[name]', user.value.name)
    formData.append('user[email]', user.value.email)

    // console.log(user.value.token)

    const { data, error, pending } = await usePutApi<UserResource>({
      url: '/account/profile/',
      body: formData,
      token: accessToken.value,
      locale: locale.value
    })

    // console.log(data)
    // console.log(errors)

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (error.value.statusCode) {
        case 422:
          {
            const { errors } = error.value.data as ErrorsResource<ErrorMessages<ExternalErrorProperty>>
            if (errors) {
              setErrorMessages(errors)
            }
            break
          }
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const userAttrs = data.value as UserResource
      if (userAttrs) {
        setJson2LoginUser(userAttrs)
        setToken2Cookie()
      }
    }

    processing.value = pending.value
  }

  const updatePassword = async () => {
    processing.value = true
    // console.log(user.image)

    const formData = {
      user: {
        current_password: user.value.current_password,
        password: user.value.password,
        password_confirmation: user.value.password_confirmation
      }
    }

    // console.log(user.value.token)

    const { data, error, pending } = await usePutApi<UserResource>({
      url: '/account/password/',
      body: formData,
      token: accessToken.value,
      locale: locale.value
    })

    // console.log(data)
    // console.log(errors)

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (error.value.statusCode) {
        case 422:
          {
            const { errors } = error.value.data as ErrorsResource<ErrorMessages<ExternalErrorProperty>>
            if (errors) {
              setErrorMessages(errors)
            }
            break
          }

        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const userAttrs = data.value as UserResource
      if (userAttrs) {
        setJson2LoginUser(userAttrs)
        setToken2Cookie()
      }
    }

    processing.value = pending.value
  }

  const setErrorMessages = (errors: ErrorMessages<ExternalErrorProperty>) => {
    if (errors.image) {
      errorMessages.value.image = errors.image
    } else {
      errorMessages.value.image = []
    }
    if (errors.name) {
      errorMessages.value.name = errors.name
    } else {
      errorMessages.value.name = []
    }
    if (errors.email) {
      errorMessages.value.email = errors.email
    } else {
      errorMessages.value.email = []
    }
    if (errors.current_password) {
      errorMessages.value.current_password = errors.current_password
    } else {
      errorMessages.value.current_password = []
    }
    if (errors.password) {
      errorMessages.value.password = errors.password
    } else {
      errorMessages.value.password = []
    }
    if (errors.password_confirmation) {
      errorMessages.value.password_confirmation = errors.password_confirmation
    } else {
      errorMessages.value.password_confirmation = []
    }
  }

  const clearErrorMessages = () => {
    errorMessages.value.image = []
    errorMessages.value.name = []
    errorMessages.value.email = []
    errorMessages.value.current_password = []
    errorMessages.value.password = []
    errorMessages.value.password_confirmation = []
    errorMessages.value.base = []
  }

  const isSuccess = () => {
    let result = true

    if (errorMessages.value.image.length > 0 || errorMessages.value.name.length > 0 ||
      errorMessages.value.email.length > 0 || errorMessages.value.current_password.length > 0 ||
      errorMessages.value.password.length > 0 || errorMessages.value.password_confirmation.length > 0 ||
      errorMessages.value.base.length > 0
    ) {
      result = false
    }

    if (flash.value.alert) {
      result = false
    }

    return result
  }

  const logout = async () => {
    const { data, error } = await useDeleteApi<UserResource>({
      url: '/sessions/logout',
      token: accessToken.value
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
    } else  {
      clearLoginUser()
    }
  }

  const deleteAccount = async () => {
    const { data, error } = await useDeleteApi<UserResource>({
      url: '/account',
      token: accessToken.value
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
      const userAttrs = data.value
      if (userAttrs) {
        clearLoginUser()
      }
    }
  }

  const clearLoginUser = () => {
    loggedIn.value = false
    loginUser.value.name = ''
    loginUser.value.email = ''
    loginUser.value.token = null
    loginUser.value.id = null
    loginUser.value.image_thumb_url = null
    loginUser.value.image_one_url = null
    loginUser.value.image_three_url = null
    loginUser.value.social_login = false

    accessToken.value = null
  }

  const clearProfile = () => {
    user.value.name = ''
    user.value.email= ''
    user.value.token = null
    user.value.id = null
    user.value.image = null
    user.value.image_thumb_url= ''
    user.value.image_one_url = ''
    user.value.image_three_url= ''
    user.value.preview_url = null
    user.value.password = ''
    user.value.password_confirmation= ''
    user.value.social_login = false
  }

  return {
    loginUser,
    accessToken,
    user,
    loggedIn,
    loginParams,
    signup,
    authenticate,
    setUser,
    updateProfile,
    updatePassword,
    processing,
    isSuccess,
    flash,
    login,
    resetLoginParams,
    loginWithGoogle,
    logout,
    deleteAccount,
    clearLoginUser,
    clearProfile,
    clearErrorMessages,
    loginMessages,
    errorMessages,
    locale
  }
}

export type useAccountType = ReturnType<typeof useAccount>
