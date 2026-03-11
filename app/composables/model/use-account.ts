import type { CredentialResponse } from 'vue3-google-signin'
import type { User, UserResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages, UserErrorProperty } from '~/types'
import { useCookieStore } from '../use-cookie-store'

interface LoginParams {
  email: string
  password: string
}

export const useAccount = () => {
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
    social_login: false,
  })

  const image: Ref<File | null | undefined> = computed({
    get() {
      return user.value.image
    },
    set(value: File | null) {
      user.value.image = value
    },
  })

  const previewUrl: Ref<string | null | undefined> = computed({
    get() {
      if (!user.value.image) {
        return `${user.value.image_three_url}`
      } else {
        return user.value.preview_url
      }
    },
    set(value: string | null) {
      user.value.preview_url = value
    },
  })

  const initTimeZone = (): void => {
    // console.log(user.value.time_zone)
    user.value.time_zone =
      user.value.time_zone == null || user.value.time_zone == ''
        ? timeZone.value.client
        : user.value.time_zone
    // console.log(user.value.time_zone)
  }

  const clearProfile = (): void => {
    user.value.id = null
    user.value.name = ''
    user.value.email = ''
    user.value.token = null
    user.value.image = null
    user.value.profile = ''
    user.value.image_thumb_url = ''
    user.value.image_one_url = ''
    user.value.image_three_url = ''
    user.value.preview_url = null
    user.value.password = ''
    user.value.password_confirmation = ''
    user.value.social_login = false
  }

  const account = useState<User>('account', () => {
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
      social_login: false,
    }
  })

  const { accessToken } = useCookieStore()

  const setTokenToCookie = (): void => {
    if (account.value.token !== accessToken.value) {
      accessToken.value = account.value.token
    }
  }

  const setAccount = ({
    from,
    token,
    to,
  }: {
    from?: UserResource
    token?: string | undefined
    to?: User
  }): void => {
    if (from) {
      copy({ from, to: account.value })
      if (token) {
        account.value.token = token
      }
    } else if (to) {
      copy({ from: account.value, to })
    }
  }

  const clearAccount = (): void => {
    loggedIn.value = false
    account.value.id = null
    account.value.name = ''
    account.value.email = ''
    account.value.token = null
    account.value.time_zone = ''
    account.value.image_thumb_url = null
    account.value.image_one_url = null
    account.value.image_three_url = null
    account.value.social_login = false

    accessToken.value = null
  }

  const setUser = (): void => {
    setAccount({ to: user.value })
  }

  const { externalErrors, clearExternalErrors, isSuccess } = useExternalErrors<UserErrorProperty>({
    flash,
  })

  const { setError } = useAlert({ flash, caller: { externalErrors, clearAccount } })

  const loginParams = ref<LoginParams>({
    email: '',
    password: '',
  })

  const clearLoginParams = (): void => {
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

    if (user.value.image) formData.append('user[image]', user.value.image)
    formData.append('user[name]', user.value.name)
    formData.append('user[email]', user.value.email)
    formData.append('user[password]', user.value.password)
    formData.append('user[password_confirmation]', user.value.password_confirmation)
    formData.append('user[profile]', user.value.profile)
    formData.append('user[time_zone]', user.value.time_zone)

    const { error, pending } = await useMutationApi<
      UserResource,
      ErrorsResource<ErrorMessages<string>>
    >('/users/', {
      method: 'post',
      body: formData,
    })

    clearFlash()
    clearExternalErrors()

    if (error) {
      setError(error)
    }

    processing.value = pending
  }

  const authenticate = async (): Promise<void> => {
    account.value.token = accessToken.value
    // console.log(account.value.token)

    if (account.value.token) {
      const { token, data, error } = await useQueryApi<
        UserResource,
        ErrorsResource<ErrorMessages<string>>
      >('/account/profile', {
        token: accessToken.value,
        fresh: true,
      })

      clearFlash()

      if (error) {
        setError(error)
      } else if (data) {
        const userAttrs = data
        // console.log(userAttrs)

        if (userAttrs) {
          setAccount({ from: userAttrs, token })
          loggedIn.value = true
        }
      }
    }
  }

  const login = async (): Promise<void> => {
    const postData = {
      user: {
        email: loginParams.value.email,
        password: loginParams.value.password,
      },
    }

    const { token, data, error } = await useMutationApi<
      UserResource,
      ErrorsResource<ErrorMessages<string>>
    >('/sessions/', {
      method: 'post',
      body: postData,
    })

    // console.log(token.value)

    clearFlash()
    clearExternalErrors()

    if (error) {
      setError(error)
    } else if (data) {
      const userAttrs = data
      if (userAttrs) {
        setAccount({ from: userAttrs, token })
        loggedIn.value = true
        // console.log(account.value)
        accessToken.value = account.value.token
      }
    }
  }

  const loginWithGoogle = async (response: CredentialResponse): Promise<void> => {
    const postData = {
      provider: 'google',
      credential: response.credential,
    }

    const { token, data, error } = await useMutationApi<
      UserResource,
      ErrorsResource<ErrorMessages<string>>
    >('/oauth/sessions/', {
      method: 'post',
      body: postData,
    })

    // console.log(token.value)

    clearFlash()

    if (error) {
      setError(error)
    } else if (data) {
      const userAttrs = data
      setAccount({ from: userAttrs, token })
      loggedIn.value = true
      // console.log(account.value)

      accessToken.value = account.value.token
    }
  }

  const updateProfile = async (): Promise<void> => {
    processing.value = true
    // console.log(user.image)

    const formData = new FormData()

    if (user.value.image) formData.append('user[image]', user.value.image)
    formData.append('user[name]', user.value.name)
    formData.append('user[email]', user.value.email)
    formData.append('user[profile]', user.value.profile)
    formData.append('user[time_zone]', user.value.time_zone)

    // console.log(user.value.token)

    const { data, error, pending } = await useMutationApi<
      UserResource,
      ErrorsResource<ErrorMessages<string>>
    >('/account/profile/', {
      method: 'put',
      body: formData,
      token: accessToken.value,
    })

    // console.log(data)
    // console.log(errors)

    clearFlash()
    clearExternalErrors()

    if (error) {
      setError(error)
    } else if (data) {
      const userAttrs = data
      if (userAttrs) {
        setAccount({ from: userAttrs })
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
        password_confirmation: user.value.password_confirmation,
      },
    }

    // console.log(user.value.token)

    const { data, error, pending } = await useMutationApi<
      UserResource,
      ErrorsResource<ErrorMessages<string>>
    >('/account/password/', {
      method: 'put',
      body: formData,
      token: accessToken.value,
    })

    // console.log(data)
    // console.log(errors)

    clearFlash()
    clearExternalErrors()

    if (error) {
      setError(error)
    } else if (data) {
      const userAttrs = data
      if (userAttrs) {
        setAccount({ from: userAttrs })
        setTokenToCookie()
      }
    }

    processing.value = pending
  }

  const logout = async (): Promise<void> => {
    const { error } = await useMutationApi<UserResource, ErrorsResource<ErrorMessages<string>>>(
      '/sessions/logout',
      {
        method: 'delete',
        token: accessToken.value,
      },
    )

    clearFlash()

    if (error) {
      setError(error)
    } else {
      clearAccount()
    }
  }

  const deleteAccount = async (): Promise<void> => {
    processing.value = true

    const { data, error, pending } = await useMutationApi<
      UserResource,
      ErrorsResource<ErrorMessages<string>>
    >('/account', {
      method: 'delete',
      token: accessToken.value,
    })

    clearFlash()

    if (error) {
      setError(error)
    } else if (data) {
      const userAttrs = data
      if (userAttrs) {
        clearAccount()
      }
    }

    processing.value = pending
  }

  return {
    account,
    accessToken,
    clearAccount,
    user,
    image,
    previewUrl,
    initTimeZone,
    clearProfile,
    setUser,
    loggedIn,
    loginParams,
    clearLoginParams,
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
    flash,
  }
}

export type UseAccountType = ReturnType<typeof useAccount>
