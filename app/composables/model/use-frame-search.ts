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

  const frames = useState<Frame[]>('frames', () => { return [] })

  const currentPage = useState<number>('currentPage', () => { return 1 } )

  const pagePrev = useState<boolean>('pagePrev', () => { return true } )
  const pageNext = useState<boolean>('pageNext', () => { return true } )

  const maxPage = ref<number>(1)
  const minPage = ref<number>(1)

  const frameList = useState<Frame[]>('frameList', () => { return [] })

  const searchFrame = async (options?: { client?: boolean }): Promise<void> => {
    const getOptions: GetAPIOptions = {
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

    const { data, error } = await useGetApi<FramesResource, ErrorsResource<ErrorMessages<string>>>(getOptions)

    clearFlash()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const { frames: frameRsList, meta } = data
      // console.log(frameList)

      if (frameRsList) {
        frames.value.splice(0)
        for (const frameAttrs of frameRsList) {
          frames.value.push(makeFrame({ from: frameAttrs, page: currentPage.value }))
        }
        // console.log(frames)
      }
      if (meta) {
        frameQuery.value.pages = meta.pagination.pages
        frameQuery.value.total = meta.pagination.count
      }
    }
  }

  const clearFrameList = (): void => {
    frameList.value.splice(0)
  }

  const minMaxPage = () => {
    maxPage.value = currentPage.value > frameQuery.value.page ? currentPage.value : frameQuery.value.page
    minPage.value = currentPage.value < frameQuery.value.page ? currentPage.value : frameQuery.value.page
  }

  const check = () => {
    if(currentPage.value == 1 ) pagePrev.value = false
    if(currentPage.value == frameQuery.value.pages ) pageNext.value = false
    // console.log(`page prev: ${pagePrev.value}`)
    // console.log(`page next: ${pageNext.value}`)
  }

  const current = async (options?: { client?: boolean }): Promise<void> => {
    pagePrev.value = true
    pageNext.value = true
    clearFrameList()
    minMaxPage()
    currentPage.value = frameQuery.value.page
    // console.log(`current page: ${currentPage.value}`)
    await searchFrame({ client: options?.client })
    check()
    frameList.value = frameList.value.concat(frames.value)
  }

  const more = async (): Promise<void> => {
    await searchFrame({ client: true })
    check()
  }

  const prev = async (): Promise<void> => {
    minMaxPage()
    currentPage.value = minPage.value - 1
    await more()
    frameList.value = frames.value.concat(frameList.value)
  }

  const next = async (): Promise<void> => { 
    minMaxPage()
    currentPage.value = maxPage.value + 1
    await more()
    frameList.value = frameList.value.concat(frames.value)
  }

  return {
    frameQuery, searchFrame, current, prev, next, currentPage, pagePrev, pageNext, frameList, queryMap, qItems, clearSearchCriteria
  }
}
