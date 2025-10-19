import type { CredentialResponse } from 'vue3-google-signin'
import type { User, UserResource, Flash } from '~/interfaces'
import type { ErrorMessages } from '~/types'

type ErrorProperty = 'image' | 'name' | 'email' | 'current_password' | 'password' | 'password_confirmation' | 'time_zone' | 'base'
type ExternalErrorProperty = 'image' | 'name' | 'email' | 'current_password' | 'password' | 'password_confirmation' | 'time_zone'

export const useAccount = () => {
  const { timeZone } = useTimeZone()
  const { flash, clearFlash } = useFlash()
  const { copy } = useEntity<User, UserResource>()

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
    time_zone: '',
    social_login: false
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

  const accessToken = useCookie('access_token', { maxAge: 60 * 60, sameSite: 'lax' })

  const setLoginUser = ({ from, token }: { from: UserResource, token?: string | undefined }) => {
    copy({ from, to: loginUser.value })
    if (token) {
      loginUser.value.token = token
    }
  }

  const setTokenToCookie = () => {
    if (loginUser.value.token !== accessToken.value) {
      accessToken.value = loginUser.value.token
    }
  }

  const UseAccount = class {
    flash: Ref<Flash>

    #setAlert: UseAlertType['setAlert']

    loginUser: Ref<User>
    accessToken: Ref<string | null | undefined>
    user: Ref<User>

    constructor() {
      const { setAlert } = useAlert({ flash, caller: this })

      this.flash = flash

      this.#setAlert = setAlert

      this.loginUser = loginUser
      this.accessToken = accessToken
      this.user = user
    }

    loginParams = ref({
      email: '',
      password: ''
    })

    loggedIn = useState<boolean>('loggedIn', () => {
      return false
    })

    image = computed({
      get () {
        return user.value.image
      },
      set (value: File | null) {
        user.value.image = value
      }
    })

    previewUrl = computed({
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

    externalErrors = ref<ErrorMessages<ErrorProperty>>({
      image: [],
      name: [],
      email: [],
      current_password: [],
      password: [],
      password_confirmation: [],
      time_zone: [],
      base: []
    })

    processing = ref<boolean>(false)

    clearLoginUser = () => {
      this.loggedIn.value = false
      this.loginUser.value.id = null
      this.loginUser.value.name = ''
      this.loginUser.value.email = ''
      this.loginUser.value.token = null
      this.loginUser.value.time_zone = ''
      this.loginUser.value.image_thumb_url = null
      this.loginUser.value.image_one_url = null
      this.loginUser.value.image_three_url = null
      this.loginUser.value.social_login = false

      accessToken.value = null
    }

    clearProfile = () => {
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

    setExternalErrors = (errors: ErrorMessages<ExternalErrorProperty>) => {
      this.externalErrors.value.image = errors.image ?? []
      this.externalErrors.value.name = errors.name ?? []
      this.externalErrors.value.email = errors.email ?? []
      this.externalErrors.value.current_password = errors.current_password ?? []
      this.externalErrors.value.password = errors.password ?? []
      this.externalErrors.value.password_confirmation = errors.password_confirmation ?? []
      this.externalErrors.value.time_zone = errors.time_zone ?? []
    }

    clearExternalErrors = () => {
      this.externalErrors.value.image = []
      this.externalErrors.value.name = []
      this.externalErrors.value.email = []
      this.externalErrors.value.current_password = []
      this.externalErrors.value.password = []
      this.externalErrors.value.password_confirmation = []
      this.externalErrors.value.time_zone = []
      this.externalErrors.value.base = []
    }

    signup = async () => {
      this.processing.value = true
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
      this.clearExternalErrors()

      if (error) {
        this.#setAlert({ error })
      }

      this.processing.value = pending
    }

    authenticate = async () => {
      this.loginUser.value.token = this.accessToken.value
      // console.log(loginUser.value.token)

      if (this.loginUser.value.token) {
        const { token, data, error } = await useGetApi<UserResource>({
          url: '/account/profile',
          token: this.accessToken.value,
          fresh: true
        })

        clearFlash()

        if (error) {
          this.#setAlert({ error })
        } else if (data) {
          const userAttrs = data
          // console.log(userAttrs)

          if (userAttrs) {
            setLoginUser({ from: userAttrs, token })
            this.loggedIn.value = true
          }
        }
      }
    }

    login = async () => {
      const postData = {
        user: {
          email: this.loginParams.value.email,
          password: this.loginParams.value.password
        }
      }

      const { token, data, error } = await usePostApi<UserResource>({
       url: '/sessions/',
        body: postData
      })

      // console.log(token.value)

      clearFlash()
      this.clearExternalErrors()

      if (error) {
        this.#setAlert({ error })
      } else if (data) {
        const userAttrs = data
        if (userAttrs) {
          setLoginUser({ from: userAttrs, token })
          this.loggedIn.value = true
          // console.log(loginUser.value)
          this.accessToken.value = this.loginUser.value.token
        }
      }
    }

    loginWithGoogle = async (response: CredentialResponse) => {
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
        this.#setAlert({ error })
      } else if (data) {
        const userAttrs  = data
        setLoginUser({ from: userAttrs, token })
        this.loggedIn.value = true
        // console.log(loginUser.value)

        this.accessToken.value = this.loginUser.value.token
      }
    }

    resetLoginParams = () => {
      this.loginParams.value.email = ''
      this.loginParams.value.password = ''
    }

    setUser = (loginUser: Ref<User>) => {
      copy({ from: loginUser.value, to: user.value })
    }

    initTimeZone = () => {
      // console.log(user.value.time_zone)
      user.value.time_zone = ( user.value.time_zone == null || user.value.time_zone == '' ) ? timeZone.value.client : user.value.time_zone
      // console.log(user.value.time_zone)
    }

    updateProfile = async () => {
      this.processing.value = true
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
        token: this.accessToken.value
      })

      // console.log(data)
      // console.log(errors)

      clearFlash()
      this.clearExternalErrors()

      if (error) {
        this.#setAlert({ error })
      } else if (data) {
        const userAttrs = data
        if (userAttrs) {
          setLoginUser({ from: userAttrs })
          setTokenToCookie()
        }
      }

      this.processing.value = pending
    }

    updatePassword = async () => {
      this.processing.value = true
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
        token: this.accessToken.value
      })

      // console.log(data)
      // console.log(errors)

      clearFlash()
      this.clearExternalErrors()

      if (error) {
        this.#setAlert({ error })
      } else if (data) {
        const userAttrs = data
        if (userAttrs) {
          setLoginUser({ from: userAttrs })
          setTokenToCookie()
        }
      }

      this.processing.value = pending
    }

    isSuccess = () => {
      let result = true

      if (this.externalErrors.value.image.length > 0 || this.externalErrors.value.name.length > 0 ||
        this.externalErrors.value.email.length > 0 || this.externalErrors.value.current_password.length > 0 ||
        this.externalErrors.value.password.length > 0 || this.externalErrors.value.password_confirmation.length > 0 ||
        this.externalErrors.value.time_zone.length > 0 || this.externalErrors.value.base.length > 0
      ) {
        result = false
      }

      if (this.flash.value.alert) {
        result = false
      }

      return result
    }

    logout = async () => {
      const { error } = await useDeleteApi<UserResource>({
        url: '/sessions/logout',
        token: this.accessToken.value
      })

      clearFlash()

      if (error) {
        this.#setAlert({ error })
      } else  {
        this.clearLoginUser()
      }
    }

    deleteAccount = async () => {
      this.processing.value = true

      const { data, error, pending } = await useDeleteApi<UserResource>({
        url: '/account',
        token: this.accessToken.value
      })

      clearFlash()

      if (error) {
        this.#setAlert({ error })
      } else if (data) {
        const userAttrs = data
        if (userAttrs) {
          this.clearLoginUser()
        }
      }

      this.processing.value = pending
    }
  }

  const self = new UseAccount()

  return self
}

export type UseAccountType = ReturnType<typeof useAccount>
