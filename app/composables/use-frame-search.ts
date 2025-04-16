import { format } from '@formkit/tempo'
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

  const { locale } = useLocale()

  const date_word = computed({
    get () {
      return format(new Date(), 'YYYY/MM/DD', locale.value)
    },
    set (value: any) {
      frame_query.value.word = format(value, 'YYYY/MM/DD', locale.value)
    }
  })

  const { flash, clearFlash } = useFlash()

  const searchFrame = async () => {
    const { data, error } = await useGetApi({
      url: '/frames',
      query: {
        q: frame_query.value.word,
        page: frame_query.value.page
      }
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
    } else if (data.value) {
      const { frames: frameList, meta } = data.value as any
      // console.log(frameList)

      if (frameList) {
        frames.value.splice(0)
        for (const frameAttrs of frameList as any[]) {
          frames.value.push(createFrameFromJson(frameAttrs))
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
    frame_query, date_word, searchFrame, frames
  }
}
