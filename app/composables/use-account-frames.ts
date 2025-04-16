import type { Frame } from '~/interfaces/frame'
import type { User } from '~/interfaces/user'

interface AccountFrameQuery {
  page: number
  pages: number
}

export function useAccountFrames () {
  const frame_query = useState<AccountFrameQuery>('account.frame_query', () => {
    return {
      page: 1,
      pages: 1
    }
  })

  const frames = ref<Frame[]>([])

  const { flash, clearFlash } = useFlash()

  const getFrames = async (user: User | undefined) => {
    const { data, error } = await useGetApi({
      url: `/account/frames`,
      query: {
        page: frame_query.value.page
      },
      token: user?.token
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        case 500:
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
      const { frames: frameList, meta } = data.value as any
      // console.log(frameList)
      // console.log(meta)

      if (frameList) {
        frames.value.splice(0)
        for (const frame of frameList as any[]) {
        // console.log(comment);
          frames.value.push(createFrameFromJson(frame))
        }
      // console.log(frames)
      }
      if (meta) {
        frame_query.value.pages = meta.pagination.pages
      }
    }
  }

  const createFrameFromJson = (resource: any) : Frame => {
    const frame: Partial<Frame> = {}
    Object.assign(frame, resource)
    frame.file = null
    frame.preview_url = null
    return frame as Frame
  }

  return {
    frame_query, getFrames, frames
  }
}
