import { useLocale } from '~/composables/use-locale'
import type { RefQuery } from '~/interfaces/ref-query'
import type { Frame } from '~/interfaces/frame'
import type { ErrorMessages } from '~/types/error-messages'
import type { ErrorsResource, FrameResource } from '~/interfaces'
import { useAccount } from './use-account'

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

  const refQuery = useState<RefQuery>('frame.refQuery', () => {
    return {
      page: null,
      id: null
    }
  })

  const frameId = computed(() => {
    return frame.value.id
  })

  const errorMessages = ref<ErrorMessages<'name' | 'tags' | 'file' | 'base'>>({
    name: [],
    tags: [],
    file: [],
    base: []
  })

  const processing = ref<boolean>(false)

  const { $i18n } = useNuxtApp()

  const { locale } = useLocale()
  const { loggedIn, accessToken, clearLoginUser } = useAccount()
  const { flash, clearFlash } = useFlash()

  const getFrame = async (id: string, options?: { client?: boolean }) => {
    if(!loggedIn.value){
      const { data, error, refresh } = await useGetApi<FrameResource>({
        url: `/frames/${id}`
      })

      if(options?.client){
        await refresh()
      }

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
        const frameAttrs = data.value
        // console.log(frameAttrs)

        if (frameAttrs) {
          setJson2Frame(frameAttrs)
        }
      }
    } else {
      const { data, error, refresh } = await useGetApi<FrameResource>({
        url: `/account/frames/${id}`,
        token: accessToken.value
      })

      if(options?.client){
        await refresh()
      }

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
        const frameAttrs = data.value
        // console.log(frameAttrs)

        if (frameAttrs) {
          setJson2Frame(frameAttrs)
        }
      }
    }

  }

  const setJson2Frame = (resource: FrameResource) => {
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

    // console.log(loginUser.value.token)

    const { data, error, pending } = await usePostApi<FrameResource>({
      url: '/frames/',
      body: formData,
      token: accessToken.value,
      locale: locale.value
    })

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (error.value.statusCode) {
        case 422:
          {
            const { errors } = error.value.data as ErrorsResource<ErrorMessages<'name' | 'tag_list' | 'file'>>
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
      const frameAttrs = data.value
      if (frameAttrs) {
        frame.value.id = frameAttrs.id
      }
    }

    processing.value = pending.value
  }

  const setErrorMessages = (errors: ErrorMessages<'name' | 'tag_list' | 'file'>) => {
    if (errors.file) {
      errorMessages.value.file = errors.file
    } else {
      errorMessages.value.file = []
    }
    if (errors.name) {
      errorMessages.value.name = errors.name
    } else {
      errorMessages.value.name = []
    }
    if (errors.tag_list) {
      errorMessages.value.tags = errors.tag_list
    } else {
      errorMessages.value.tags = []
    }
  }

  const clearErrorMessages = () => {
    errorMessages.value.file = []
    errorMessages.value.name = []
    errorMessages.value.tags = []
    errorMessages.value.base = []
  }

  const isSuccess = () => {
    let result = true

    if (errorMessages.value.file.length > 0 || errorMessages.value.name.length > 0 ||
      errorMessages.value.tags.length > 0 || errorMessages.value.base.length > 0
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

    // console.log(loginUser.value.token)

    const { error, pending } = await usePutApi<FrameResource>({
      url: `/frames/${frame.value.id}`,
      body: postData,
      token: accessToken.value,
      locale: locale.value
    })

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (error.value.statusCode) {
        case 422:
          {
            const { errors } = error.value.data as ErrorsResource<ErrorMessages<'name' | 'tag_list' | 'file'>>
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
    }

    processing.value = pending.value
  }

  const deleteFrame = async () => {
    processing.value = true
    // console.log(frame.id)

    const { error, pending } = await useDeleteApi({
      url: `/frames/${frame.value.id}`,
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
    }

    // const frameAttrs = data.value

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
    errorMessages,
    processing,
    isSuccess,
    flash,
    locale
  }
}

export type UseFrameType = ReturnType<typeof useFrame>
