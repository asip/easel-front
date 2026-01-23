import type { Frame, FrameQuery ,FrameResource, FramesResource , ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

type SearchQuery = Partial<Record<'q' | 'page', string>>

export const useFrameSearch = () => {
  const { create } = useEntity<Frame, FrameResource>()

  const { flash, clearFlash } = useFlash()
  const { setAlert } = useAlert({ flash })

  const { loggedIn, accessToken } = useAccount()

  const makeFrame = ( { from, page }: { from: FrameResource, page: number }) : Frame => {
    const frame: Frame = create({ from })
    frame.file = null
    frame.preview_url = null
    frame.page = page
    return frame
  }

  const frameQuery = useState<FrameQuery>('search.frameQuery', () => {
    return {
      items: {},
      page: 1,
      pages: 1,
      total: 1
    }
  })

  const qItems = computed<FrameQuery['items']>(() => {
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

  const queryMap = computed<SearchQuery>(() => {
    const items = qItems.value
    const page = currentPage.value;
    const query: { q?: string, page?: string } = {};

    if (Object.keys(items).length) {
      query.q = JSON.stringify(items);
    }
    if (page !== undefined && page!= null && page !== 1) {
      query.page = page.toString();
    }
    return query;
  });

  const clearSearchCriteria = (): void => {
    const { items } = frameQuery.value;
    if (items.word) frameQuery.value.items.word = null
    if (items.frame_name) frameQuery.value.items.frame_name = null
    if (items.tag_name) frameQuery.value.items.tag_name = null
    if (items.user_name) frameQuery.value.items.user_name = null
    if (items.creator_name) frameQuery.value.items.creator_name = null
    if (items.date) frameQuery.value.items.date = null
  }

  const frameList = ref<Frame[]>([])
  const frames = useState<Frame[]>('frames', () => { return [] })

  const clearFrames = (): void => {
    frames.value.splice(0)
  }

  const { currentPage, pagePrev, pageNext, init, increment, decrement, minPage, maxPage } = useMoreScroll({
    page: frameQuery.value.page, pages: frameQuery.value.pages
  })

  const searchFrame = async (options?: { client?: boolean }): Promise<void> => {
    const getOptions: QueryAPIOptions = {
      url: '',
      query: queryMap.value,
      client: options?.client,
    }

    if ( loggedIn.value) {
      getOptions.url = '/frames/authenticated'
      getOptions.token = accessToken.value

    } else {
      getOptions.url = '/frames'
    }

    const { data, error } = await useQueryApi<FramesResource, ErrorsResource<ErrorMessages<string>>>(getOptions)

    clearFlash()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const { frames: frameRsList, meta } = data
      // console.log(frameList)

      if (frameRsList) {
        frameList.value.splice(0)
        for (const frameAttrs of frameRsList) {
          frameList.value.push(makeFrame({ from: frameAttrs, page: currentPage.value }))
        }
        // console.log(frames)
      }
      if (meta) {
        frameQuery.value.pages = meta.pagination.pages
        frameQuery.value.total = meta.pagination.count
      }
    }
  }

  const current = async (options?: { client?: boolean }): Promise<void> => {
    clearFrames()
    init()
    // console.log(`current page: ${currentPage.value}`)
    await searchFrame({ client: options?.client })
    frames.value = frames.value.concat(frameList.value)
  }

  const more = async (): Promise<void> => {
    await searchFrame({ client: true })
  }

  const prev = async (): Promise<void> => {
    decrement()
    await more()
    frames.value = frameList.value.concat(frames.value)
  }

  const next = async (): Promise<void> => { 
    increment()
    await more()
    frames.value = frames.value.concat(frameList.value)
  }

  return {
    frameQuery, searchFrame, current, prev, next, currentPage, pagePrev, pageNext, frames, queryMap, qItems, clearSearchCriteria,
    minPage, maxPage
  }
}
