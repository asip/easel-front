import type { CredentialResponse } from 'vue3-google-signin'
import type { User, UserResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

type ErrorProperty = 'image' | 'name' | 'email' | 'current_password' | 'password' | 'password_confirmation' | 'time_zone' | 'base'
type ExternalErrorProperty = 'image' | 'name' | 'email' | 'current_password' | 'password' | 'password_confirmation' | 'time_zone'

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
      time_zone: '',
      social_login: false
    }
  })

  const loggedIn = useState<boolean>('loggedIn', () => {
    return false
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
      time_zone: '',
      social_login: false
    }
  )

  const image = computed({
    get () {
      return user.value.image
    },
    set (value: File | null) {
      user.value.image = value
    }
  })

  const previewUrl = computed({
    get () {
      if (!user.value.image) {
        return `${user.value.image_three_url}`
      } else {
        return user.value.preview_url
      }
    },
    set (value: string | null){
      user.value.preview_url = value
    }
  })

  const externalErrors = ref<ErrorMessages<ErrorProperty>>({
    image: [],
    name: [],
    email: [],
    current_password: [],
    password: [],
    password_confirmation: [],
    time_zone: [],
    base: []
  })

  const processing = ref<boolean>(false)

  const accessToken = useCookie('access_token', { maxAge: 60 * 60, sameSite: 'lax' })

  const { timeZone } = useTimeZone()
  const { flash, clearFlash } = useFlash()

  const clearLoginUser = () => {
    loggedIn.value = false
    loginUser.value.id = null
    loginUser.value.name = ''
    loginUser.value.email = ''
    loginUser.value.token = null
    loginUser.value.time_zone = ''
    loginUser.value.image_thumb_url = null
    loginUser.value.image_one_url = null
    loginUser.value.image_three_url = null
    loginUser.value.social_login = false

    accessToken.value = null
  }

  const clearProfile = () => {
    user.value.id = null
    user.value.name = ''
    user.value.email= ''
    user.value.token = null
    user.value.image = null
    user.value.time_zone = ''
    user.value.image_thumb_url= ''
    user.value.image_one_url = ''
    user.value.image_three_url= ''
    user.value.preview_url = null
    user.value.password = ''
    user.value.password_confirmation= ''
    user.value.social_login = false
  }

  const setExternalErrors = (errors: ErrorMessages<ExternalErrorProperty>) => {
    externalErrors.value.image = errors.image ?? []
    externalErrors.value.name = errors.name ?? []
    externalErrors.value.email = errors.email ?? []
    externalErrors.value.current_password = errors.current_password ?? []
    externalErrors.value.password = errors.password ?? []
    externalErrors.value.password_confirmation = errors.password_confirmation ?? []
    externalErrors.value.time_zone = errors.time_zone ?? []
  }

  const clearExternalErrors = () => {
    externalErrors.value.image = []
    externalErrors.value.name = []
    externalErrors.value.email = []
    externalErrors.value.current_password = []
    externalErrors.value.password = []
    externalErrors.value.password_confirmation = []
    externalErrors.value.time_zone = []
    externalErrors.value.base = []
  }

  const { setAlert } = useAlert<ExternalErrorProperty>({ flash, clearLU: clearLoginUser, setEE: setExternalErrors })

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
    formData.append('user[time_zone]', user.value.time_zone)

    const { error, pending } = await usePostApi<UserResource>({
      url: '/users/',
      body: formData
    })

    clearFlash()
    clearExternalErrors()

    if (error) {
      setAlert({ error })
    }

    processing.value = pending
  }

  const authenticate = async () => {
    loginUser.value.token = accessToken.value
    // console.log(loginUser.value.token)

    if (loginUser.value.token) {
      const { token, data, error } = await useGetApi<UserResource>({
        url: '/account/profile',
        token: accessToken.value,
        fresh: true
      })

      clearFlash()

      if (error) {
        setAlert({ error })
      } else if (data) {
        const userAttrs = data
        // console.log(userAttrs)

        if (userAttrs) {
          setJson2LoginUser(userAttrs, token)
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

    const { token, data, error } = await usePostApi<UserResource>({
      url: '/sessions/',
      body: postData
    })

    // console.log(token.value)

    clearFlash()
    clearExternalErrors()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const userAttrs = data
      if (userAttrs) {
        setJson2LoginUser(userAttrs, token)
        loggedIn.value = true
        // console.log(loginUser.value)
        accessToken.value = loginUser.value.token
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

    if (error) {
      setAlert({ error })
    } else if (data) {
      const userAttrs  = data
      setJson2LoginUser(userAttrs, token)
      loggedIn.value = true
      // console.log(loginUser.value)

      accessToken.value = loginUser.value.token
    }
  }

  const resetLoginParams = () => {
    loginParams.value.email = ''
    loginParams.value.password = ''
  }

  const setJson2LoginUser = (resource: UserResource, token?: string | undefined) => {
    Object.assign(loginUser.value, resource)
    if (token) {
      loginUser.value.token = token
    }
  }

  const setUser = (loginUser: Ref<User>) => {
    Object.assign(user.value, loginUser.value)
  }

  const initTimeZone = () => {
    // console.log(user.value.time_zone)
    user.value.time_zone = ( user.value.time_zone == null || user.value.time_zone == '' ) ? timeZone.value.client : user.value.time_zone
    // console.log(user.value.time_zone)
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
    formData.append('user[time_zone]', user.value.time_zone)

    // console.log(user.value.token)

    const { data, error, pending } = await usePutApi<UserResource>({
      url: '/account/profile/',
      body: formData,
      token: accessToken.value
    })

    // console.log(data)
    // console.log(errors)

    clearFlash()
    clearExternalErrors()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const userAttrs = data
      if (userAttrs) {
        setJson2LoginUser(userAttrs)
        setToken2Cookie()
      }
    }

    processing.value = pending
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
      token: accessToken.value
    })

    // console.log(data)
    // console.log(errors)

    clearFlash()
    clearExternalErrors()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const userAttrs = data
      if (userAttrs) {
        setJson2LoginUser(userAttrs)
        setToken2Cookie()
      }
    }

    processing.value = pending
  }

  const isSuccess = () => {
    let result = true

    if (externalErrors.value.image.length > 0 || externalErrors.value.name.length > 0 ||
      externalErrors.value.email.length > 0 || externalErrors.value.current_password.length > 0 ||
      externalErrors.value.password.length > 0 || externalErrors.value.password_confirmation.length > 0 ||
      externalErrors.value.time_zone.length > 0 || externalErrors.value.base.length > 0
    ) {
      result = false
    }

    if (flash.value.alert) {
      result = false
    }

    return result
  }

  const logout = async () => {
    const { error } = await useDeleteApi<UserResource>({
      url: '/sessions/logout',
      token: accessToken.value
    })

    clearFlash()

    if (error) {
      setAlert({ error })
    } else  {
      clearLoginUser()
    }
  }

  const deleteAccount = async () => {
    processing.value = true

    const { data, error, pending } = await useDeleteApi<UserResource>({
      url: '/account',
      token: accessToken.value
    })

    clearFlash()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const userAttrs = data
      if (userAttrs) {
        clearLoginUser()
      }
    }

    processing.value = pending
  }

  return {
    loginUser,
    accessToken,
    user,
    image,
    previewUrl,
    loggedIn,
    loginParams,
    signup,
    authenticate,
    setUser,
    initTimeZone,
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
    clearExternalErrors,
    externalErrors
  }
}

export type UseAccountType = ReturnType<typeof useAccount>
