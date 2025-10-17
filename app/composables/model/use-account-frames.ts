import type { AccountFrameQuery, Frame, FrameResource, FramesResource, Flash } from '~/interfaces'

export function useAccountFrames () {
  const { flash, clearFlash } = useFlash()
  const { accessToken, clearLoginUser } = useAccount()

  const UseAccountFrames = class {
    flash: Ref<Flash>
    clearLoginUser: UseAccountType['clearLoginUser']
    #setAlert: UseAlertType['setAlert']

    constructor() {
      const { setAlert } = useAlert({ flash, caller: this })

      this.flash = flash
      this.clearLoginUser = clearLoginUser

      this.#setAlert = setAlert
    }

    frameQuery = useState<AccountFrameQuery>('account.frameQuery', () => {
      return {
        page: 1,
        pages: 1,
        total: 1
      }
    })

    frames = ref<Frame[]>([])

    getFrames = async (options?: { more?: boolean }) => {
      const getOptions: GetAPIOptions = {
        url: '/account/frames',
        query: {
          page: this.frameQuery.value.page
        },
        token: accessToken.value,
        more: options?.more
      }

      const { data, error } = await useGetApi<FramesResource>(getOptions)

      clearFlash()

      if (error) {
        this.#setAlert({ error })

        throw createError({
          statusCode: error.statusCode,
          statusMessage: error.message,
          message: this.flash.value.alert
        })
      } else if (data) {
        const { frames: frameList, meta } = data
        // console.log(frameList)
        // console.log(meta)

        if (frameList) {
          this.frames.value.splice(0)
          for (const frame of frameList) {
            // console.log(comment);
            this.frames.value.push(this.#createFrameFromJson(frame))
          }
          // console.log(frames)
        }
        if (meta) {
          this.frameQuery.value.pages = meta.pagination.pages
          this.frameQuery.value.total = meta.pagination.count
        }
      }
    }

    #createFrameFromJson = (resource: FrameResource) : Frame => {
      const frame: Partial<Frame> = {}
      Object.assign(frame, resource)
      frame.file = null
      frame.preview_url = null
      return frame as Frame
    }
  }

  const self =new  UseAccountFrames()

  return self
}
