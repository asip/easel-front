import type { Frame, FrameResource, Flash } from '~/interfaces'
import type { ErrorMessages } from '~/types'

type ErrorProperty = 'name' | 'tags' | 'creator_name' | 'file' | 'base'
type ExternalErrorProperty = 'name' | 'tag_list' | 'creator_name' | 'file'

export function useFrame() {
  const { upDTL, downDTL } = useDatetimeLocal()
  const { upTZ, downTZ, formatHtmlTZ } = useTimeZone()
  const { empty2pbr, pbr2empty } = useQuill()
  const { copy } = useEntity<Frame, FrameResource>()

  const { flash, clearFlash } = useFlash()
  const { loggedIn, accessToken, clearLoginUser } = useAccount()

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
    file: null,
    file_url: '',
    file_two_url: '',
    file_three_url: '',
    preview_url: null,
    private: false,
    created_at: '',
    updated_at: null
  })

  const upFrameTZ = (frame: Frame) => {
    frame.shooted_at = upTZ(frame.shooted_at)
    frame.created_at = formatHtmlTZ(frame.created_at)
    frame.updated_at = formatHtmlTZ(frame.updated_at)
  }

  const setFrame = ({ from }: { from: FrameResource }) => {
    copy({ from, to: frame.value })
    frame.value.tags = frame.value.tag_list?.split(',') ?? []
    upFrameTZ(frame.value)
  }

  const UseFrame = class {
    flash: Ref<Flash>

    clearLoginUser: UseAccountType['clearLoginUser']
    #setAlert: UseAlertType['setAlert']

    frame: Ref<Frame>

    constructor() {
      const { setAlert } = useAlert({ flash, caller: this })

      this.flash = flash

      this.clearLoginUser = clearLoginUser
      this.#setAlert = setAlert

      this.frame = frame
    }

    file = computed({
      get () {
        return frame.value.file
      },
      set (value: File | null) {
        frame.value.file = value
      }
    })

    previewUrl = computed({
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

    tags = computed<string[]>({
      get () {
        return frame.value.tags
      },
      set (value: string[]) {
        frame.value.tags = value
        frame.value.tag_list = value.join(',')
      }
    })

    shootedAt = computed({
      get () {
        return upDTL(frame.value.shooted_at)
      },
      set (value: string | null) {
        frame.value.shooted_at = downDTL(value)
      }
    })

    comment = computed({
      get () {
        return empty2pbr(frame.value.comment)
      },
      set (value: string | undefined) {
        frame.value.comment = pbr2empty(value)
      }
    })

    frameId = computed(() => {
      return frame.value.id
    })

    externalErrors = ref<ErrorMessages<ErrorProperty>>({
      name: [],
      tags: [],
      creator_name: [],
      file: [],
      base: []
    })

    processing = ref<boolean>(false)

    refresh = async () => {}

    setExternalErrors = (errors: ErrorMessages<ExternalErrorProperty>) => {
      this.externalErrors.value.file = errors.file ?? []
      this.externalErrors.value.name = errors.name ?? []
      this.externalErrors.value.creator_name = errors.creator_name ?? []
      this.externalErrors.value.tags = errors.tag_list ?? []
    }

    clearExternalErrors = () => {
      this.externalErrors.value.file = []
      this.externalErrors.value.name = []
      this.externalErrors.value.tags = []
      this.externalErrors.value.creator_name = []
      this.externalErrors.value.base = []
    }

    getFrame = async (id: string) => {
      // console.log(`token: ${loginUser.value.token}`)

      if (loggedIn.value) {
        const { data, error, refresh } = await useGetApi<FrameResource>({
          url: `/account/frames/${id}`,
          token: accessToken.value
        })

        clearFlash()

        if (error) {
          this.#setAlert({ error })

          throw createError({
            statusCode: error.statusCode,
            statusMessage: error.message,
            message: this.flash.value.alert
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
          this.#setAlert({ error })

          throw createError({
            statusCode: error.statusCode,
            statusMessage: error.message,
            message: this.flash.value.alert
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

    createFrame = async () => {
      this.processing.value = true

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
        formData.append('frame[shooted_at]', downTZ(frame.value.shooted_at))
      }

      // console.log(loginUser.value.token)

      const { data, error, pending } = await usePostApi<FrameResource>({
        url: '/frames/',
        body: formData,
        token: accessToken.value
      })

      clearFlash()
      this.clearExternalErrors()

      if (error) {
        this.#setAlert({ error })
      } else if (data) {
        const frameAttrs = data
        if (frameAttrs) {
          frame.value.id = frameAttrs.id
        }
      }

      this.processing.value = pending
    }

    isSuccess = () => {
      let result = true

      if (this.externalErrors.value.file.length > 0 || this.externalErrors.value.name.length > 0 ||
        this.externalErrors.value.tags.length > 0 || this.externalErrors.value.creator_name.length > 0 ||
        this.externalErrors.value.base.length > 0
      ) {
        result = false
      }

      if (this.flash.value.alert) {
        result = false
      }

      return result
    }

    updateFrame = async () => {
      this.processing.value = true

      const postData = {
        frame: {
          name: frame.value.name,
          tag_list: frame.value.tag_list,
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
      this.clearExternalErrors()

      if (error) {
        this.#setAlert({ error })
      }

      this.processing.value = pending
    }

    deleteFrame = async () => {
      this.processing.value = true
      // console.log(frame.id)

      const { error, pending } = await useDeleteApi({
        url: `/frames/${frame.value.id}`,
        token: accessToken.value
      })

      clearFlash()

      if (error) {
        this.#setAlert({ error })
      }

      // const frameAttrs = data.value

      this.processing.value = pending
    }
  }

  const self = new UseFrame()

  return self
}

export type UseFrameType = ReturnType<typeof useFrame>
