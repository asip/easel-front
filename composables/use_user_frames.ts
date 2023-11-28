import type { Frame } from '~/interfaces/frame'

interface UserFrameQuery {
  user_id: string | null
  page: number
  pages: number
}

export function useUserFrames () {
  const frame_query = useState<UserFrameQuery>('user.frame_query', () => {
    return {
      user_id: null,
      page: 1,
      pages: 1
    }
  })

  const frames = useState<Frame[]>('user.frames', () => { return [] })

  const { backendApiURL } = useConstants()

  const { flash, clearFlash } = useFlash()

  const getFrames = async (user_id: string | undefined) => {
    let statusCode!: number

    const { data, error } = await useAsyncData('get_frames_by_user_id', () =>
      $fetch(`${backendApiURL.value}/users/${user_id}/frames`, {
        method: 'get',
        query: {
          page: frame_query.value.page
        },
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        async onResponse ({ response }) {
          statusCode = response.status
        }
      })
    )

    clearFlash()

    if (error.value) {
      switch (statusCode) {
        case 500:
          flash.value.alert = error.value.message
          break
        default:
          flash.value.alert = error.value.message
      }

      throw createError({
        statusCode,
        statusMessage: error.value.message,
        message: flash.value.alert
      })
    } else if (data.value) {
      const { data: frameList, meta } = data.value as any
      // console.log(frameList)
      // console.log(meta)

      if (frameList) {
        frames.value.splice(0)
        for (const frame of frameList as []) {
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

  const createFrameFromJson = (row_data: any) : Frame => {
    const frame: Partial<Frame> = {}
    frame.id = row_data.id
    Object.assign(frame, row_data.attributes)
    frame.file = null
    frame.preview_url = null
    return frame as Frame
  }

  return {
    frame_query, getFrames, frames
  }
}
