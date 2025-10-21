import type { Frame, FrameQuery ,FrameResource, FramesResource } from '~/interfaces'

export const useFrameSearch = () => {
  const { create } = useEntity<Frame, FrameResource>()

  const { flash, clearFlash } = useFlash()
  const { setAlert } = useAlert({ flash })

  const frameQuery = useState<FrameQuery>('search.frameQuery', () => {
    return {
      items: {},
      page: 1,
      pages: 1,
      total: 1
    }
  })

  const qItems = computed(() => {
    const { items } = frameQuery.value;

    const qItems: FrameQuery['items'] = {}

    if (items.word) qItems.word = items.word
    if (items.frame_name) qItems.frame_name = items.frame_name
    if (items.tag_name) qItems.tag_name = items.tag_name
    if (items.user_name) qItems.user_name = items.user_name
    if (items.creator_name) qItems.creator_name = items.creator_name
    if (items.date) qItems.date = items.date

    return qItems
  })

  const queryMap = computed(() => {
    const items = qItems.value
    const { page } = frameQuery.value;
    const query: { q?: string, page?: number | null } = {};

    if (Object.keys(items).length) {
      query.q = JSON.stringify(items);
    }
    if (page !== undefined && page!= null && page !== 1) {
      query.page = page;
    }
    return query;
  });

  const resetSearchCriteria = () => {
    const { items } = frameQuery.value;
    if (items.word) frameQuery.value.items.word = null
    if (items.frame_name) frameQuery.value.items.frame_name = null
    if (items.tag_name) frameQuery.value.items.tag_name = null
    if (items.user_name) frameQuery.value.items.user_name = null
    if (items.creator_name) frameQuery.value.items.creator_name = null
    if (items.date) frameQuery.value.items.date = null
  }

  const frames = useState<Frame[]>('frames', () => { return [] })

  const searchFrame = async (options?: { more?: boolean }) => {
    const getOptions: GetAPIOptions = {
      url: '/frames',
      query: queryMap.value,
      more: options?.more
    }

    const { data, error } = await useGetApi<FramesResource>(getOptions)

    clearFlash()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const { frames: frameList, meta } = data
      // console.log(frameList)

      if (frameList) {
        frames.value.splice(0)
        for (const frameAttrs of frameList) {
          frames.value.push(createFrame({ from: frameAttrs }))
        }
        // console.log(frames)
      }
      if (meta) {
        frameQuery.value.pages = meta.pagination.pages
        frameQuery.value.total = meta.pagination.count
      }
    }
  }

  const createFrame = ( { from }: { from: FrameResource }) : Frame => {
    const frame: Frame = create({ from })
    frame.tags = frame.tag_list?.split(',') ?? []
    frame.file = null
    frame.preview_url = null
    return frame
  }

  return {
    frameQuery, searchFrame, frames, queryMap, qItems, resetSearchCriteria
  }
}
