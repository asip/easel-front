import type { CredentialResponse } from 'vue3-google-signin'
import type { User, UserResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

interface LoginParams {
  email: string
  password: string
}

type ErrorProperty = 'image' | 'name' | 'email' | 'current_password' | 'password' | 'password_confirmation' | 'time_zone' | 'base'

export const useAccount = () => {
  const { empty2pbr, pbr2empty } = useQuill()
  const { copy } = useEntity<User, UserResource>()

  const { timeZone } = useTimeZone()
  const { flash, clearFlash } = useFlash()

  const user = ref<User>({
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
    profile: '',
    time_zone: '',
    social_login: false
  })

  const image: Ref<File | null | undefined> = computed({
    get () {
      return user.value.image
    },
    set (value: File | null) {
      user.value.image = value
    }
  })

  const profile = computed<string>({
    get () {
      return empty2pbr(user.value.profile)
    },
    set (value: string | undefined) {
      user.value.profile = pbr2empty(value)
    }
  })

  const previewUrl: Ref<string | null | undefined> = computed({
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

  const initTimeZone = (): void => {
    // console.log(user.value.time_zone)
    user.value.time_zone = ( user.value.time_zone == null || user.value.time_zone == '' ) ? timeZone.value.client : user.value.time_zone
    // console.log(user.value.time_zone)
  }

  const clearProfile = (): void => {
    user.value.id = null
    user.value.name = ''
    user.value.email= ''
    user.value.token = null
    user.value.image = null
    user.value.profile = ''
    user.value.time_zone = ''
    user.value.image_thumb_url= ''
    user.value.image_one_url = ''
    user.value.image_three_url= ''
    user.value.preview_url = null
    user.value.password = ''
    user.value.password_confirmation= ''
    user.value.social_login = false
  }

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
      profile: '',
      time_zone: '',
      social_login: false
    }
  })

  const accessToken = useCookie('access_token', { maxAge: 60 * 60, sameSite: 'lax' })

  const setTokenToCookie = (): void => {
    if (loginUser.value.token !== accessToken.value) {
      accessToken.value = loginUser.value.token
    }
  }

  const setLoginUser = ({ from, token }: { from: UserResource, token?: string | undefined }): void => {
    copy({ from, to: loginUser.value })
    if (token) {
      loginUser.value.token = token
    }
  }

  const clearLoginUser = (): void => {
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

  const setUser = (): void => {
    copy({ from: loginUser.value, to: user.value })
  }

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

  const setExternalErrors = (errors: ErrorMessages<ErrorProperty>): void => {
    externalErrors.value.image = errors.image ?? []
    externalErrors.value.name = errors.name ?? []
    externalErrors.value.email = errors.email ?? []
    externalErrors.value.current_password = errors.current_password ?? []
    externalErrors.value.password = errors.password ?? []
    externalErrors.value.password_confirmation = errors.password_confirmation ?? []
    externalErrors.value.time_zone = errors.time_zone ?? []
  }

  const clearExternalErrors = (): void => {
    externalErrors.value.image = []
    externalErrors.value.name = []
    externalErrors.value.email = []
    externalErrors.value.current_password = []
    externalErrors.value.password = []
    externalErrors.value.password_confirmation = []
    externalErrors.value.time_zone = []
    externalErrors.value.base = []
  }

  const { setAlert } = useAlert({ flash, caller: { setExternalErrors, clearLoginUser } })

  const loginParams = ref<LoginParams>({
    email: '',
    password: ''
  })

  const resetLoginParams = (): void => {
    loginParams.value.email = ''
    loginParams.value.password = ''
  }

  const loggedIn = useState<boolean>('loggedIn', () => {
    return false
  })

  const processing = ref<boolean>(false)

  const signup = async (): Promise<void> => {
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
    formData.append('user[profile]', user.value.profile)
    formData.append('user[time_zone]', user.value.time_zone)

    const { error, pending } = await usePostApi<UserResource, ErrorsResource<ErrorMessages<string>>>({
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

  const authenticate = async (): Promise<void> => {
    loginUser.value.token = accessToken.value
    // console.log(loginUser.value.token)

    if (loginUser.value.token) {
      const { token, data, error } = await useGetApi<UserResource, ErrorsResource<ErrorMessages<string>>>({
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
          setLoginUser({ from: userAttrs, token })
          loggedIn.value = true
        }
      }
    }
  }

  const login = async (): Promise<void> => {
    const postData = {
      user: {
        email: loginParams.value.email,
        password: loginParams.value.password
      }
    }

    const { token, data, error } = await usePostApi<UserResource, ErrorsResource<ErrorMessages<string>>>({
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
        setLoginUser({ from: userAttrs, token })
        loggedIn.value = true
        // console.log(loginUser.value)
        accessToken.value = loginUser.value.token
      }
    }
  }

  const loginWithGoogle = async (response: CredentialResponse): Promise<void> => {
    const postData = {
      provider: 'google',
      credential: response.credential
    }

    const { token, data, error } = await usePostApi<UserResource, ErrorsResource<ErrorMessages<string>>>({
      url: '/oauth/sessions/',
      body: postData
    })

    // console.log(token.value)

    clearFlash()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const userAttrs  = data
      setLoginUser({ from: userAttrs, token })
      loggedIn.value = true
      // console.log(loginUser.value)

      accessToken.value = loginUser.value.token
    }
  }

  const updateProfile = async (): Promise<void> => {
    processing.value = true
    // console.log(user.image)

    const formData = new FormData()

    if (user.value.image) {
      formData.append('user[image]', user.value.image)
    }
    formData.append('user[name]', user.value.name)
    formData.append('user[email]', user.value.email)
    formData.append('user[profile]', user.value.profile)
    formData.append('user[time_zone]', user.value.time_zone)

    // console.log(user.value.token)

    const { data, error, pending } = await usePutApi<UserResource, ErrorsResource<ErrorMessages<string>>>({
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
        setLoginUser({ from: userAttrs })
        setTokenToCookie()
      }
    }

    processing.value = pending
  }

  const updatePassword = async (): Promise<void> => {
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

    const { data, error, pending } = await usePutApi<UserResource, ErrorsResource<ErrorMessages<string>>>({
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
        setLoginUser({ from: userAttrs })
        setTokenToCookie()
      }
    }

    processing.value = pending
  }

  const isSuccess = (): boolean => {
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

  const logout = async (): Promise<void> => {
    const { error } = await useDeleteApi<UserResource, ErrorsResource<ErrorMessages<string>>>({
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

  const deleteAccount = async (): Promise<void> => {
    processing.value = true

    const { data, error, pending } = await useDeleteApi<UserResource, ErrorsResource<ErrorMessages<string>>>({
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
    clearLoginUser,
    user,
    image,
    profile,
    previewUrl,
    initTimeZone,
    clearProfile,
    setUser,
    loggedIn,
    loginParams,
    resetLoginParams,
    externalErrors,
    clearExternalErrors,
    signup,
    authenticate,
    updateProfile,
    updatePassword,
    login,
    loginWithGoogle,
    logout,
    deleteAccount,
    processing,
    isSuccess,
    flash
  }
}

export type UseAccountType = ReturnType<typeof useAccount>
