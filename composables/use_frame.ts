import { required, minLength, maxLength, tagArrayLength, tagLength } from '~~/utils/i18n-validators'
import { useLocale } from '~/composables/use_locale'
import type { RefQuery } from '~/interfaces/ref_query'
import type { Frame } from '~/interfaces/frame'

const frm_rules = {
  name: { required, minLength: minLength(1), maxLength: maxLength(20) },
  tags: { tagArrayLength: tagArrayLength(5), tagLength: tagLength(10) }
}

export const useFrame = () => {
  const frame: Frame = reactive<Frame>({
    id: 0,
    user_id: null,
    user_name: '',
    name: '',
    tag_list: '',
    tags: [],
    comment: '',
    shooted_at: '',
    shooted_at_html: '',
    file: null,
    file_url: '',
    file_two_url: '',
    file_three_url: '',
    preview_url: null,
    updated_at: ''
  })

  const refQuery = useState<RefQuery>('frame.ref_query', () => {
    return {
      page: null,
      id: null
    }
  })

  const frameId = computed(() => {
    return frame.id
  })

  interface ErrorMessages {
    name: string[]
    tags: string[]
    file: string[]
    base: string[]
  }

  const error_messages = reactive<ErrorMessages>({
    name: [],
    tags: [],
    file: [],
    base: []
  })

  const nuxtApp = useNuxtApp()

  const { backendApiURL } = useConstants()

  const { locale } = useLocale()
  const { login_user, clearLoginUser } = useLoginUser()
  const { flash, clearFlash } = useFlash()

  const getFrame = async (id: string) => {
    clearFlash()
    clearErrorMessages()

    const { data } = await useAsyncData('get_frame', () =>
      $fetch(`${backendApiURL.value}/frames/${id}`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const { data: frameJson } = data.value as any
    // console.log(frameJson)

    if (frameJson) {
      setJson2Frame(frameJson)
    }
  }

  const setJson2Frame = (frameJson: any) => {
    frame.id = frameJson.id
    Object.assign(frame, frameJson.attributes)
  }

  const createFrame = async () => {
    clearFlash()
    clearErrorMessages()

    const formData = new FormData()

    if (frame.file) {
      formData.append('frame[file]', frame.file)
    }
    formData.append('frame[name]', frame.name)
    formData.append('frame[tag_list]', frame.tag_list)
    formData.append('frame[comment]', frame.comment)
    formData.append('frame[shooted_at]', frame.shooted_at)

    // console.log(login_user.value.token)

    let statusCode!: number

    const { data, error } = await useAsyncData('create_frame', () =>
      $fetch(`${backendApiURL.value}/frames/`, {
        method: 'post',
        body: formData,
        headers: {
          'Accept-Language': locale.value,
          Authorization: `Bearer ${login_user.value.token}`
        },
        async onResponse ({ response }) {
          statusCode = response.status
        }
      })
    )

    if (error.value) {
      switch (statusCode) {
        case 401:
          flash.value.alert = nuxtApp.$i18n.t('action.comment.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: frameJson, errors } = data.value as any
      if (frameJson) {
        frame.id = frameJson.id
      } else if (errors) {
        setErrorMessages(errors)
      }
    }
  }

  const setErrorMessages = (errors: any) => {
    if (errors.file) {
      error_messages.file = errors.file
    } else {
      error_messages.file = []
    }
    if (errors.name) {
      error_messages.name = errors.name
    } else {
      error_messages.name = []
    }
    if (errors.tag_list) {
      error_messages.tags = errors.tag_list
    } else {
      error_messages.tags = []
    }
  }

  const clearErrorMessages = () => {
    error_messages.file = []
    error_messages.name = []
    error_messages.tags = []
    error_messages.base = []
  }

  const isSuccess = () => {
    let result = true

    if (error_messages.file.length > 0 || error_messages.name.length > 0 ||
      error_messages.tags.length > 0 || error_messages.base.length > 0
    ) {
      result = false
    }

    if (flash.value.alert) {
      result = false
    }

    return result
  }

  const updateFrame = async () => {
    clearFlash()
    clearErrorMessages()

    const postData = {
      frame: {
        name: frame.name,
        tag_list: frame.tag_list,
        comment: frame.comment,
        shooted_at: frame.shooted_at
      }
    }

    // console.log(login_user.value.token)

    let statusCode!: number

    const { data, error } = await useAsyncData('update_frame', () =>
      $fetch(`${backendApiURL.value}/frames/${frame.id}`, {
        method: 'put',
        body: postData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept-Language': locale.value,
          Authorization: `Bearer ${login_user.value.token}`
        },
        async onResponse ({ response }) {
          statusCode = response.status
        }
      })
    )

    if (error.value) {
      switch (statusCode) {
        case 401:
          flash.value.alert = nuxtApp.$i18n.t('action.comment.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: frameJson, errors } = data.value as any
      if (!frameJson && errors) {
        setErrorMessages(errors)
      }
    }
  }

  const deleteFrame = async () => {
    clearFlash()
    clearErrorMessages()
    // console.log(frame.id)

    let statusCode!: number

    const { error } = await useAsyncData('delete_frame', () =>
      $fetch(`${backendApiURL.value}/frames/${frame.id}`, {
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
      switch (statusCode) {
        case 401:
          flash.value.alert = nuxtApp.$i18n.t('action.comment.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    }

    // const { data: frameJson } = data.value
  }

  return {
    getFrame,
    frame,
    refQuery,
    frameId,
    frm_rules,
    updateFrame,
    createFrame,
    deleteFrame,
    error_messages,
    isSuccess,
    locale
  }
}
