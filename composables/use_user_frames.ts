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
    return {
      id: row_data.id,
      user_id: row_data.attributes.user_id,
      user_name: row_data.attributes.user_name,
      name: row_data.attributes.name,
      tag_list: row_data.attributes.tag_list,
      tags: row_data.attributes.tags,
      comment: row_data.attributes.comment,
      shooted_at: row_data.attributes.shooted_at,
      shooted_at_html: row_data.attributes.shooted_at_html,
      file: null,
      file_url: row_data.attributes.file_url,
      file_two_url: row_data.attributes.file_two_url,
      file_three_url: row_data.attributes.file_three_url,
      preview_url: null,
      updated_at: row_data.attributes.updated_at
    }
  }

  return {
    frame_query, getFrames, frames
  }
}
