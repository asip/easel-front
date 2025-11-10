import type { Frame, FrameResource, Flash } from '~/interfaces'
import type { ErrorMessages } from '~/types'

type ErrorProperty = 'name' | 'tag_list' | 'creator_name' | 'file' | 'base'
type ExternalErrorProperty = 'name' | 'tag_list' | 'creator_name' | 'file'

export function useFrame() {
  const { upDTL, downDTL } = useDatetimeLocal()
  const { empty2pbr, pbr2empty } = useQuill()
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

  const file = computed({
    get () {
      return frame.value.file
    },
    set (value: File | null) {
      frame.value.file = value
    }
  })

  const previewUrl = computed({
    get () {
      if (!frame.value.file) {
        return `${frame.value.file_three_url}`
      } else {
        return frame.value.preview_url
      }
    },
    set (value: string | null){
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

  const shootedAt = computed({
    get () {
      return upDTL(frame.value.shooted_at)
    },
    set (value: string | null) {
      frame.value.shooted_at = downDTL(value)
    }
  })

  const comment = computed({
    get () {
      return empty2pbr(frame.value.comment)
    },
    set (value: string | undefined) {
      frame.value.comment = pbr2empty(value)
    }
  })

  const frameId = computed(() => {
    return frame.value.id
  })

  const upFrameTZ = (frame: Frame) => {
    frame.shooted_at = upTZ(frame.shooted_at)
    frame.created_at = formatHtmlTZ(frame.created_at)
    frame.updated_at = formatHtmlTZ(frame.updated_at)
  }

  const setFrame = ({ from }: { from: FrameResource }) => {
    copy({ from, to: frame.value })
    upFrameTZ(frame.value)
  }

  const externalErrors = ref<ErrorMessages<ErrorProperty>>({
    name: [],
    tag_list: [],
    creator_name: [],
    file: [],
    base: []
  })

  const setExternalErrors = (errors: ErrorMessages<ExternalErrorProperty>) => {
    externalErrors.value.file = errors.file ?? []
    externalErrors.value.name = errors.name ?? []
    externalErrors.value.creator_name = errors.creator_name ?? []
    externalErrors.value.tag_list = errors.tag_list ?? []
  }

  const clearExternalErrors = () => {
    externalErrors.value.file = []
    externalErrors.value.name = []
    externalErrors.value.tag_list = []
    externalErrors.value.creator_name = []
    externalErrors.value.base = []
  }

  const { setAlert } = useAlert({ flash, caller: { clearLoginUser, setExternalErrors } })

  const processing = ref<boolean>(false)

  const refresh = async () => {}

  const getFrame = async (id: string) => {
    // console.log(`token: ${loginUser.value.token}`)

    if (loggedIn.value) {
      const { data, error, refresh } = await useGetApi<FrameResource>({
        url: `/account/frames/${id}`,
        token: accessToken.value
      })

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
    } else {
      const { data, error, refresh } = await useGetApi<FrameResource>({
        url: `/frames/${id}`
      })

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
      formData.append('frame[tag_list]', frame.value.tag_list.join(','))
    }
    if (frame.value.comment) {
      formData.append('frame[comment]', frame.value.comment)
    }
    if (frame.value.creator_name) {
      formData.append('frame[creator_name]', frame.value.creator_name)
    }
    if (frame.value.shooted_at) {
      formData.append('frame[shooted_at]', downTZ(frame.value.shooted_at))
    }

    // console.log(loginUser.value.token)

    const { data, error, pending } = await usePostApi<FrameResource>({
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

  const isSuccess = () => {
    let result = true

    if (externalErrors.value.file.length > 0 || externalErrors.value.name.length > 0 ||
      externalErrors.value.tag_list.length > 0 || externalErrors.value.creator_name.length > 0 ||
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
        tag_list: frame.value.tag_list.join(','),
        comment: frame.value.comment,
        creator_name: frame.value.creator_name,
        shooted_at: downTZ(frame.value.shooted_at)
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

    if (error) {
      setAlert({ error })
    }

    processing.value = pending
  }

  const deleteFrame = async () => {
    processing.value = true
    // console.log(frame.id)

    const { error, pending } = await useDeleteApi({
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
    comment,
    shootedAt,
    frameId,
    externalErrors,
    refresh,
    getFrame,
    updateFrame,
    createFrame,
    deleteFrame,
    processing,
    isSuccess,
    flash
  }
}

export type UseFrameType = ReturnType<typeof useFrame>
