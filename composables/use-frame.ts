import { useGetApi } from './api/use-get-api'
import { usePostApi } from './api/use-post-api'
import { usePutApi } from './api/use-put-api'
import { useDeleteApi } from './api/use-delete-api'
import { useLocale } from '~/composables/use-locale'
import type { RefQuery } from '~/interfaces/ref-query'
import type { Frame } from '~/interfaces/frame'
import type { ErrorMessages } from '~/interfaces/error-messages'

export const useFrame = () => {
  const frame: Ref<Frame> = ref<Frame>({
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
    private: false,
    updated_at: ''
  })

  const refQuery = useState<RefQuery>('frame.ref_query', () => {
    return {
      page: null,
      id: null
    }
  })

  const frameId = computed(() => {
    return frame.value.id
  })

  const error_messages = ref<ErrorMessages<'name' | 'tags' | 'file' | 'base'>>({
    name: [],
    tags: [],
    file: [],
    base: []
  })

  const processing = ref<boolean>(false)

  const { $i18n } = useNuxtApp()

  const { locale } = useLocale()
  const { logged_in, login_user, clearLoginUser } = useLoginUser()
  const { flash, clearFlash } = useFlash()

  const getFrame = async (id: string) => {
    if(!logged_in){
      const { data, error } = await useGetApi({
        url: `/frames/${id}`
      })

      clearFlash()

      if (error.value) {
        switch (error.value.statusCode) {
          case 404:
            flash.value.alert = error.value.message
            break
          default:
            flash.value.alert = error.value.message
        }

        throw createError({
          statusCode: error.value.statusCode,
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
    } else {
      const { data, error } = await useGetApi({
        url: `/account/frames/${id}`,
        token: login_user?.value.token
      })

      clearFlash()

      if (error.value) {
        switch (error.value.statusCode) {
          case 404:
            flash.value.alert = error.value.message
            break
          default:
            flash.value.alert = error.value.message
        }

        throw createError({
          statusCode: error.value.statusCode,
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

  }

  const setJson2Frame = (resource: any) => {
    Object.assign(frame.value, resource)
  }

  const createFrame = async () => {
    processing.value = true

    const formData = new FormData()

    if (frame.value.file) {
      formData.append('frame[file]', frame.value.file)
    }
    if (frame.value.name) {
      formData.append('frame[name]', frame.value.name)
    }
    if (frame.value.tag_list) {
      formData.append('frame[tag_list]', frame.value.tag_list)
    }
    if (frame.value.comment) {
      formData.append('frame[comment]', frame.value.comment)
    }
    if (frame.value.shooted_at) {
      formData.append('frame[shooted_at]', frame.value.shooted_at)
    }

    // console.log(login_user.value.token)

    const { data, error, pending } = await usePostApi({
      url: '/frames/',
      body: formData,
      token: login_user.value.token,
      locale: locale.value
    })

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
      const { data: frameAttrs, errors } = data.value as any
      if (frameAttrs) {
        frame.value.id = frameAttrs.attributes.id
      } else if (errors) {
        setErrorMessages(errors)
      }
    }

    processing.value = pending.value
  }

  const setErrorMessages = (errors: any) => {
    if (errors.file) {
      error_messages.value.file = errors.file
    } else {
      error_messages.value.file = []
    }
    if (errors.name) {
      error_messages.value.name = errors.name
    } else {
      error_messages.value.name = []
    }
    if (errors.tag_list) {
      error_messages.value.tags = errors.tag_list
    } else {
      error_messages.value.tags = []
    }
  }

  const clearErrorMessages = () => {
    error_messages.value.file = []
    error_messages.value.name = []
    error_messages.value.tags = []
    error_messages.value.base = []
  }

  const isSuccess = () => {
    let result = true

    if (error_messages.value.file.length > 0 || error_messages.value.name.length > 0 ||
      error_messages.value.tags.length > 0 || error_messages.value.base.length > 0
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
        name: frame.value.name,
        tag_list: frame.value.tag_list,
        comment: frame.value.comment,
        shooted_at: frame.value.shooted_at
      }
    }

    // console.log(login_user.value.token)

    const { data, error, pending } = await usePutApi({
      url: `/frames/${frame.value.id}`,
      body: postData,
      token: login_user.value.token,
      locale: locale.value
    })

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

    const { error, pending } = await useDeleteApi({
      url: `/frames/${frame.value.id}`,
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
    }

    // const { data: frameAttrs } = data.value

    processing.value = pending.value
  }

  return {
    getFrame,
    frame,
    refQuery,
    frameId,
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

export type UseFrameType = ReturnType<typeof useFrame>
