import type { Frame } from '~/interfaces/frame'
import type { FrameQuery } from '~/interfaces/frame-query'

export const useFrameSearch = () => {
  const frame_query = useState<FrameQuery>('frame_query', () => {
    return {
      word: '',
      page: 1,
      pages: 1
    }
  })

  const queryString = computed(() => {
    const { word, page } = frame_query.value;
    const query: { q?: string, page?: number | null } = {};

    if (word) {
      query.q = word;
    }
    if (page !== undefined && page!= null && page !== 1) {
      query.page = page;
    }
    return query;
  });

  const frames = useState<Frame[]>('frames', () => { return [] })

  const { flash, clearFlash } = useFlash()

  const router = useRouter()

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
    frame_query, searchFrame, frames, queryString
  }
}
