import { useGetApi } from './api/use_get_api'
import { usePostApi } from './api/use_post_api'
import { usePutApi } from './api/use_put_api'
import { useDeleteApi } from './api/use_delete_api'
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

  const processing = ref<boolean>(false)

  const { $i18n } = useNuxtApp()

  const { backendApiURL } = useConstants()

  const { locale } = useLocale()
  const { login_user, clearLoginUser } = useLoginUser()
  const { flash, clearFlash } = useFlash()

  const getFrame = async (id: string) => {
    const { data, error, statusCode } = await useGetApi({
      key: 'get_frame',
      url: `${backendApiURL.value}/frames/${id}`
    })

    clearFlash()

    if (error.value) {
      switch (statusCode) {
        case 404:
          flash.value.alert = error.value.message
          break
        default:
          flash.value.alert = error.value.message
      }

      throw createError({
        statusCode,
        statusMessage: error.value.message,
        message: flash.value.alert
      })
    } else if (data.value) {
      const { data: frameAttrs } = data.value as any
      // console.log(frameAttrs)

      if (frameAttrs) {
        setJson2Frame(frameAttrs.attributes)
      }
    }
  }

  const setJson2Frame = (resource: any) => {
    Object.assign(frame, resource)
  }

  const createFrame = async () => {
    processing.value = true

    const formData = new FormData()

    if (frame.file) {
      formData.append('frame[file]', frame.file)
    }
    if (frame.name) {
      formData.append('frame[name]', frame.name)
    }
    if (frame.tag_list) {
      formData.append('frame[tag_list]', frame.tag_list)
    }
    if (frame.comment) {
      formData.append('frame[comment]', frame.comment)
    }
    if (frame.shooted_at) {
      formData.append('frame[shooted_at]', frame.shooted_at)
    }

    // console.log(login_user.value.token)

    const { data, error, pending, statusCode } = await usePostApi({
      key: 'create_frame',
      url: `${backendApiURL.value}/frames/`,
      body: formData,
      token: login_user.value.token,
      locale: locale.value
    })

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (statusCode) {
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: frameAttrs, errors } = data.value as any
      if (frameAttrs) {
        frame.id = frameAttrs.attributes.id
      } else if (errors) {
        setErrorMessages(errors)
      }
    }

    processing.value = pending.value
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
    processing.value = true

    const postData = {
      frame: {
        name: frame.name,
        tag_list: frame.tag_list,
        comment: frame.comment,
        shooted_at: frame.shooted_at
      }
    }

    // console.log(login_user.value.token)

    const { data, error, pending, statusCode } = await usePutApi({
      key: 'update_frame',
      url: `${backendApiURL.value}/frames/${frame.id}`,
      body: postData,
      token: login_user.value.token,
      locale: locale.value
    })

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (statusCode) {
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: frameAttrs, errors } = data.value as any
      if (!frameAttrs && errors) {
        setErrorMessages(errors)
      }
    }

    processing.value = pending.value
  }

  const deleteFrame = async () => {
    processing.value = true
    // console.log(frame.id)

    const { error, pending, statusCode } = await useDeleteApi({
      key: 'delete_frame',
      url: `${backendApiURL.value}/frames/${frame.id}`,
      token: login_user.value.token
    })

    clearFlash()

    if (error.value) {
      switch (statusCode) {
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    }

    // const { data: frameAttrs } = data.value

    processing.value = pending.value
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
    processing,
    isSuccess,
    flash,
    locale
  }
}
