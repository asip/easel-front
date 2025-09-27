import type { Frame, FrameQuery ,FrameResource, FramesResource } from '~/interfaces'

export const useFrameSearch = () => {
  const frameQuery = useState<FrameQuery>('search.frameQuery', () => {
    return {
      items: {},
      page: 1,
      pages: 1,
      total: 1
    }
  })

  const queryMap = computed(() => {
    const { items, page } = frameQuery.value;
    const query: { q?: string, page?: number | null } = {};

    if (items.word) {
      query.q = JSON.stringify(items);
    }
    if (page !== undefined && page!= null && page !== 1) {
      query.page = page;
    }
    return query;
  });

  const frames = useState<Frame[]>('frames', () => { return [] })

  const { flash, clearFlash } = useFlash()

  const { setAlert } = useAlert({ flash: flash.value })

  const searchFrame = async (options?: { more?: boolean }) => {
    const getOptions: GetAPIOptions = {
      url: '/frames',
      query: queryMap.value,
      more: options?.more
    }

    const { response, error } = await useGetApi<FramesResource>(getOptions)

    clearFlash()

    if (error) {
      setAlert({ error })
    } else if (response) {
      const { frames: frameList, meta } = response
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
    frameQuery, searchFrame, frames, queryMap
  }
}
