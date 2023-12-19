import { cdate } from 'cdate'
import { useGetApi } from './api/use_get_api'
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

  const { flash, clearFlash } = useFlash()

  const searchFrame = async () => {
    const { data, error, statusCode } = await useGetApi({
      key: 'search_frame',
      url: `${backendApiURL.value}/frames`,
      query: {
        q: frame_query.value.word,
        page: frame_query.value.page
      }
    })

    clearFlash()

    if (error.value) {
      switch (statusCode) {
        case 500:
          flash.value.alert = error.value.message
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: frameList, meta } = data.value as any
      // console.log(frameList)

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
    frame_query, date_word, searchFrame, frames
  }
}
