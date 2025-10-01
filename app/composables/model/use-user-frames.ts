import type { Frame, FrameResource, FramesResource, UserFrameQuery } from '~/interfaces'

export function useUserFrames () {
  const frameQuery = useState<UserFrameQuery>('user.frameQuery', () => {
    return {
      user_id: null,
      page: 1,
      pages: 1,
      total: 1,
    }
  })

  const frames = ref<Frame[]>([])

  const { flash, clearFlash } = useFlash()

  const { setAlert } = useAlert({ flash })

  const getFrames = async (userId: string | undefined, options?: { more?: boolean }) => {
    const getOptions: GetAPIOptions = {
      url: `/users/${userId}/frames`,
      query: {
        page: frameQuery.value.page
      },
      more: options?.more
    }

    const { response, error } = await useGetApi<FramesResource>(getOptions)

    clearFlash()

    if (error) {
      setAlert({ error })

      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.message,
        message: flash.value.alert
      })
    } else if (response) {
      const { frames: frameList, meta } = response
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
        frameQuery.value.total = meta.pagination.count
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
