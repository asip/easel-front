import type { NuxtError } from '#app';
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

  const searchFrame = async (options?: { more?: boolean }) => {
    const getOptions: GetAPIOptions = {
      url: '/frames',
      query: queryMap.value,
      more: options?.more
    }

    const { data, error } = await useGetApi<FramesResource>(getOptions)

    clearFlash()

    if (error.value) {
      setAlert(error.value)
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

  const setAlert = (error: NuxtError) => {
    switch (error.statusCode) {
      // case 500:
      //  flash.value.alert = error.value.message
      //  break
      default:
        flash.value.alert = error.message
    }
  }

  return {
    frameQuery, searchFrame, frames, queryMap
  }
}
