import type { FrameResource, FramesResource } from '~/interfaces'
import type { Frame } from '~/interfaces/frame'
import type { FrameQuery } from '~/interfaces/frame-query'

export const useFrameSearch = () => {
  const frameQuery = useState<FrameQuery>('frameQuery', () => {
    return {
      word: '',
      page: 1,
      pages: 1,
      items: 1
    }
  })

  const queryString = computed(() => {
    const { word, page } = frameQuery.value;
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

  const searchFrame = async (options?: { more?: boolean }) => {
    const getOptions: any = {
      url: '/frames',
      query: queryString.value,
      more: options?.more
    }

    const { data, error } = await useGetApi<FramesResource>(getOptions)

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
      const { frames: frameList, meta } = data.value
      // console.log(frameList)

      if (frameList) {
        frames.value.splice(0)
        for (const frameAttrs of frameList) {
          frames.value.push(createFrameFromJson(frameAttrs))
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
    frameQuery, searchFrame, frames, queryString
  }
}
