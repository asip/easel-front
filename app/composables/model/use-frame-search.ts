import type { Frame, FrameQuery ,FrameResource, FramesResource , ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

type SearchQuery = Partial<Record<'q' | 'page', string>>

export const useFrameSearch = () => {
  const { create } = useEntity<Frame, FrameResource>()

  const { flash, clearFlash } = useFlash()
  const { setAlert } = useAlert({ flash })

  const { loggedIn, accessToken } = useAccount()

  const makeFrame = ( { from }: { from: FrameResource }) : Frame => {
    const frame: Frame = create({ from })
    frame.file = null
    frame.preview_url = null
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
    const { page } = frameQuery.value;
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
      const { frames: frameList, meta } = data
      // console.log(frameList)

      if (frameList) {
        frames.value.splice(0)
        for (const frameAttrs of frameList) {
          frames.value.push(makeFrame({ from: frameAttrs }))
        }
        // console.log(frames)
      }
      if (meta) {
        frameQuery.value.pages = meta.pagination.pages
        frameQuery.value.total = meta.pagination.count
      }
    }
  }

  return {
    frameQuery, searchFrame, frames, queryMap, qItems, clearSearchCriteria
  }
}
