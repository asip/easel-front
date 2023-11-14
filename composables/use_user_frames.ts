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

  const getFrames = async (user_id: string | undefined) => {
    const { data } = await useAsyncData('get_frames_by_user_id', () =>
      $fetch(`${backendApiURL.value}/users/${user_id}/frames`, {
        method: 'get',
        query: {
          page: frame_query.value.page
        },
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const { data: frameList, meta } = data.value as any
    // console.log(frameList)
    // console.log(meta)

    if (frameList) {
      frames.value.splice(0, frames.value.length)
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

  const createFrameFromJson = (row_data: any) : Frame => {
    const frame: any = {}
    frame.id = row_data.id
    Object.assign(frame, row_data.attributes)
    frame.file = null
    frame.preview_url = null
    return frame
  }

  return {
    frame_query, getFrames, frames
  }
}
