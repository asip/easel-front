import type { Frame, FrameResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages, FrameErrorProperty } from '~/types'

export function useFrame() {
  const { $i18n } = useNuxtApp()

  const { upDTL, downDTL } = useDatetimeLocal()
  const { copy } = useEntity<Frame, FrameResource>()

  const { upTZ, downTZ, formatHtmlTZ } = useTimeZone()
  const { flash, clearFlash } = useFlash()
  const { loggedIn, accessToken, clearLoginUser } = useAccount()

  const frame: Ref<Frame> = ref<Frame>({
    id: 0,
    user_id: null,
    user_name: '',
    name: '',
    tag_list: [],
    comment: '',
    creator_name: '',
    shooted_at: '',
    file: null,
    file_url: '',
    file_two_url: '',
    file_three_url: '',
    file_six_url: '',
    preview_url: null,
    private: false,
    created_at: '',
    updated_at: null
  })

  const file: Ref<File | null | undefined> = computed({
    get () {
      return frame.value.file
    },
    set (value: File | null) {
      frame.value.file = value
    }
  })

  const previewUrl: Ref<string | null | undefined> = computed({
    get () {
      if (!frame.value.file) {
        return `${frame.value.file_three_url}`
      } else {
        return frame.value.preview_url
      }
    },
    set (value: string | null) {
      frame.value.preview_url = value
    }
  })

  const tagList = computed<string[]>({
    get () {
      return frame.value.tag_list
    },
    set (value: string[]) {
      frame.value.tag_list = value
    }
  })

  const shootedAt = computed<string | null>({
    get () {
      return upDTL(frame.value.shooted_at)
    },
    set (value: string | null) {
      frame.value.shooted_at = downDTL(value)
    }
  })

  const frameId = computed<number | undefined>(() => {
    return frame.value.id
  })

  const upFrameTZ = (frame: Frame): void => {
    frame.shooted_at = upTZ(frame.shooted_at)
    frame.created_at = formatHtmlTZ(frame.created_at)
    frame.updated_at = formatHtmlTZ(frame.updated_at)
  }

  const setFrame = ({ from }: { from: FrameResource }): void => {
    copy({ from, to: frame.value })
    upFrameTZ(frame.value)
  }

  const { externalErrors, setExternalErrors, clearExternalErrors, isSuccess } = useExternalErrors<FrameErrorProperty>({ flash })

  const { backendErrorInfo, setAlert } = useAlert({ flash, caller: { clearLoginUser, setExternalErrors } })

  const set404Alert = (): void => {
    if (backendErrorInfo.value.status == 404 && backendErrorInfo.value.source == 'Frame') {
      flash.value.alert = $i18n.t('action.error.not_found', { source: $i18n.t('misc.page') })
    }
  }

  const processing = ref<boolean>(false)

  const refresh = async (): Promise<void> => {}

  const getFrame = async (id: string): Promise<{ refresh: (() => Promise<void>) | undefined }> => {
    // console.log(`token: ${loginUser.value.token}`)
    const getOptions: GetAPIOptions = {
      url: ''
    }

    if (loggedIn.value) {
      getOptions.url = `/frames/${id}/authenticated`
      getOptions.token = accessToken.value
    } else {
      getOptions.url = `/frames/${id}`
    }

    const { data, error, refresh } = await useGetApi<FrameResource, ErrorsResource<ErrorMessages<string>>>(getOptions)

    clearFlash()

    if (error) {
      setAlert({ error })

      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.message,
        message: flash.value.alert
      })
    } else if (data) {
      const frameAttrs = data
      // console.log(frameAttrs)

      if (frameAttrs) {
        setFrame({ from: frameAttrs })
      }
    }

    return { refresh }
  }

  const createFrame = async (): Promise<void> => {
    processing.value = true

    const formData = new FormData()

    if (frame.value.file) formData.append('frame[file]', frame.value.file)
    if (frame.value.name) formData.append('frame[name]', frame.value.name)
    if (frame.value.tag_list) formData.append('frame[tag_list]', frame.value.tag_list.join(','))
    if (frame.value.comment) formData.append('frame[comment]', frame.value.comment)
    if (frame.value.creator_name) formData.append('frame[creator_name]', frame.value.creator_name)
    if (frame.value.shooted_at) formData.append('frame[shooted_at]', downTZ(frame.value.shooted_at))
    if (frame.value.private) formData.append('frame[private]', frame.value.private.toString())

    // console.log(loginUser.value.token)

    const { data, error, pending } = await usePostApi<FrameResource, ErrorsResource<ErrorMessages<string>>>({
      url: '/frames/',
      body: formData,
      token: accessToken.value
    })

    clearFlash()
    clearExternalErrors()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const frameAttrs = data
      if (frameAttrs) {
        frame.value.id = frameAttrs.id
      }
    }

    processing.value = pending
  }

  const updateFrame = async (): Promise<void> => {
    processing.value = true

    const postData = {
      frame: {
        name: frame.value.name,
        tag_list: frame.value.tag_list.join(','),
        comment: frame.value.comment,
        creator_name: frame.value.creator_name,
        shooted_at: downTZ(frame.value.shooted_at),
        private: frame.value.private
      }
    }

    // console.log(loginUser.value.token)

    const { error, pending } = await usePutApi<FrameResource, ErrorsResource<ErrorMessages<string>>>({
      url: `/frames/${frame.value.id}`,
      body: postData,
      token: accessToken.value
    })

    clearFlash()
    clearExternalErrors()

    if (error) {
      setAlert({ error })
    }

    processing.value = pending
  }

  const deleteFrame = async (): Promise<void> => {
    processing.value = true
    // console.log(frame.id)

    const { error, pending } = await useDeleteApi<FrameResource, ErrorsResource<ErrorMessages<string>>>({
      url: `/frames/${frame.value.id}`,
      token: accessToken.value
    })

    clearFlash()

    if (error) {
      setAlert({ error })
    }

    // const frameAttrs = data.value

    processing.value = pending
  }

  return {
    frame,
    file,
    tagList,
    previewUrl,
    shootedAt,
    frameId,
    externalErrors,
    backendErrorInfo,
    refresh,
    getFrame,
    updateFrame,
    createFrame,
    deleteFrame,
    processing,
    isSuccess,
    set404Alert,
    flash
  }
}

export type UseFrameType = ReturnType<typeof useFrame>
