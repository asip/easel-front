import { format, parse } from '@formkit/tempo'

import type { Frame, RefQuery, FrameResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

import { useAccount } from './use-account'

type ErrorProperty = 'name' | 'tags' | 'creator_name' | 'file' | 'base'
type ExternalErrorProperty = 'name' | 'tag_list' | 'creator_name' | 'file'

export const useFrame = () => {
  const frame: Ref<Frame> = ref<Frame>({
    id: 0,
    user_id: null,
    user_name: '',
    name: '',
    tag_list: '',
    tags: [],
    comment: '',
    creator_name: '',
    shooted_at: '',
    shooted_at_html: '',
    file: null,
    file_url: '',
    file_two_url: '',
    file_three_url: '',
    preview_url: null,
    private: false,
    created_at: '',
    updated_at: null
  })

  const { locale } = useLocale()

  const shootedAt = computed({
    get () {
      return frame.value.shooted_at ? format(parse(frame.value.shooted_at, 'YYYY/MM/DD HH:mm:ss', locale.value), 'YYYY-MM-DDTHH:mm', locale.value) : null
    },
    set (value: string | null) {
      frame.value.shooted_at = value ? format(parse(value, 'YYYY-MM-DDTHH:mm', locale.value), 'YYYY/MM/DD HH:mm:ss', locale.value): ''
    }
  })

  const refQuery = useState<RefQuery>('frame.refQuery', () => {
    return {
      from: null,
      id: null
    }
  })

  const frameId = computed(() => {
    return frame.value.id
  })

  const externalErrors = ref<ErrorMessages<ErrorProperty>>({
    name: [],
    tags: [],
    creator_name: [],
    file: [],
    base: []
  })

  const processing = ref<boolean>(false)

  const { $i18n } = useNuxtApp()

  const { loggedIn, accessToken, clearLoginUser } = useAccount()
  const { flash, clearFlash } = useFlash()

  const refresh = async () => {}

  const getFrame = async (id: string) => {
    // console.log(`token: ${loginUser.value.token}`)

    if (loggedIn.value) {
      const { data, error, refresh } = await useGetApi<FrameResource>({
        url: `/account/frames/${id}`,
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

      return { refresh }
    } else {
      const { data, error, refresh } = await useGetApi<FrameResource>({
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
        const frameAttrs = data.value
        // console.log(frameAttrs)

        if (frameAttrs) {
          setJson2Frame(frameAttrs)
        }
      }

      return { refresh }
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
    if (frame.value.creator_name) {
      formData.append('frame[creator_name]', frame.value.creator_name)
    }
    if (frame.value.shooted_at) {
      formData.append('frame[shooted_at]', frame.value.shooted_at)
    }

    // console.log(loginUser.value.token)

    const { data, error, pending } = await usePostApi<FrameResource>({
      url: '/frames/',
      body: formData,
      token: accessToken.value
    })

    clearFlash()
    clearExternalErrors()

    if (error.value) {
      switch (error.value.statusCode) {
        case 422:
          {
            const { errors } = error.value.data as ErrorsResource<ErrorMessages<ExternalErrorProperty>>
            if (errors) {
              setExternalErrors(errors)
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

  const setExternalErrors = (errors: ErrorMessages<ExternalErrorProperty>) => {
    externalErrors.value.file = errors.file ?? []
    externalErrors.value.name = errors.name ?? []
    externalErrors.value.creator_name = errors.creator_name ?? []
    externalErrors.value.tags = errors.tag_list ?? []
  }

  const clearExternalErrors = () => {
    externalErrors.value.file = []
    externalErrors.value.name = []
    externalErrors.value.tags = []
    externalErrors.value.creator_name = []
    externalErrors.value.base = []
  }

  const isSuccess = () => {
    let result = true

    if (externalErrors.value.file.length > 0 || externalErrors.value.name.length > 0 ||
      externalErrors.value.tags.length > 0 || externalErrors.value.creator_name.length > 0 ||
      externalErrors.value.base.length > 0
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
        creator_name: frame.value.creator_name,
        shooted_at: frame.value.shooted_at
      }
    }

    // console.log(loginUser.value.token)

    const { error, pending } = await usePutApi<FrameResource>({
      url: `/frames/${frame.value.id}`,
      body: postData,
      token: accessToken.value
    })

    clearFlash()
    clearExternalErrors()

    if (error.value) {
      switch (error.value.statusCode) {
        case 422:
          {
            const { errors } = error.value.data as ErrorsResource<ErrorMessages<ExternalErrorProperty>>
            if (errors) {
              setExternalErrors(errors)
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
    refresh,
    frame,
    shootedAt,
    refQuery,
    frameId,
    updateFrame,
    createFrame,
    deleteFrame,
    externalErrors,
    processing,
    isSuccess,
    flash
  }
}

export type UseFrameType = ReturnType<typeof useFrame>
