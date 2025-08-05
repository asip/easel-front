import type { Frame, FrameResource, FramesResource } from '~/interfaces'

interface AccountFrameQuery {
  page: number
  pages: number
  items: number
}

export function useAccountFrames () {
  const { accessToken } = useAccount()

  const frameQuery = useState<AccountFrameQuery>('account.frameQuery', () => {
    return {
      page: 1,
      pages: 1,
      items: 1
    }
  })

  const frames = ref<Frame[]>([])

  const { flash, clearFlash } = useFlash()

  const getFrames = async (options?: { more?: boolean }) => {
    const getOptions: GetAPIOptions = {
      url: `/account/frames`,
      query: {
        page: frameQuery.value.page
      },
      token: accessToken.value,
      more: options?.more
    }

    const { data, error } = await useGetApi<FramesResource>(getOptions)

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        // case 500:
        //  flash.value.alert = error.value.message
        //  break
        default:
          flash.value.alert = error.value.message
      }

      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.message,
        message: flash.value.alert
      })
    } else if (data.value) {
      const { frames: frameList, meta } = data.value
      // console.log(frameList)
      // console.log(meta)

      if (frameList) {
        frames.value.splice(0)
        for (const frame of frameList) {
        // console.log(comment);
          frames.value.push(createFrameFromJson(frame))
        }
      // console.log(frames)
      }
      if (meta) {
        frameQuery.value.pages = meta.pagination.pages
        frameQuery.value.items = meta.pagination.count
      }
    }
  }

  const createFrameFromJson = (resource: FrameResource) : Frame => {
    const frame: Partial<Frame> = {}
    Object.assign(frame, resource)
    frame.file = null
    frame.preview_url = null
    return frame as Frame
  }

  return {
    frameQuery, getFrames, frames
  }
}
