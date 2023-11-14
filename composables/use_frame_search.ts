import { cdate } from 'cdate'
import type { Frame } from '~/interfaces/frame'

export const useFrameSearch = () => {
  const frame_query = useState('frame_query', () => {
    return {
      word: '',
      page: 1,
      pages: 1
    }
  })

  const frames = useState<Frame[]>('frames', () => { return [] })

  const date_word = computed({
    get () {
      return cdate().format('YYYY/MM/DD')
    },
    set (value: any) {
      frame_query.value.word = cdate(value).format('YYYY/MM/DD')
    }
  })

  const { backendApiURL } = useConstants()

  const searchFrame = async () => {
    const { data } = await useAsyncData('search_frame', () =>
      $fetch(`${backendApiURL.value}/frames`, {
        method: 'get',
        query: {
          q: frame_query.value.word,
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
    let frame: any = {}
    frame.id = row_data.id
    Object.assign(frame, row_data.attributes)
    frame.file = null
    frame.preview_url = null
    return frame
  }

  return {
    frame_query, date_word, searchFrame, frames
  }
}
