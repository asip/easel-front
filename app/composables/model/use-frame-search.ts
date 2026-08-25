import type {
  Frame,
  FrameResource,
  FramesResource,
  BackendErrorsResource,
  QueryApiOptions,
} from '~/types'

import { useFrameQuery } from './query'

export const useFrameSearch = function () {
  const { queryApi } = useApi()

  const { create } = useEntity<Frame, FrameResource>()

  const { flash, clearFlash } = useFlash()
  const { backendErrorInfo } = useApiError(flash)

  const { loggedIn, accountToken } = useAccount()

  const {
    firstPage,
    pages,
    currentPage,
    prev: prevPage,
    next: nextPage,
    increment,
    decrement,
    minPage,
    maxPage,
  } = useMorePage()

  const { frameQuery, initFrameQuery, clearFrameQuery, qItems, queryMap } =
    useFrameQuery(currentPage)

  const makeFrame = ({ from, page }: { from: FrameResource; page: number }): Frame => {
    const frame: Frame = create({ from })
    frame.file = null
    frame.preview_url = null
    frame.page = page
    return frame
  }

  const frameList = ref<Frame[]>([])
  const frames = useState<Frame[]>('frames', () => {
    return []
  })

  const clearFrames = (): void => {
    frames.value.splice(0)
  }

  const searchFrame = async (options?: { cache?: boolean }): Promise<void> => {
    const url = ref('')

    const queryOptions: QueryApiOptions = {
      query: queryMap.value,
      cache: options?.cache ?? true,
    }

    if (loggedIn.value) {
      url.value = '/frames/authenticated'
      queryOptions.token = accountToken.value
    } else {
      url.value = '/frames'
    }

    const { token, data, error } = await queryApi<FramesResource, BackendErrorsResource>(
      url.value,
      queryOptions,
    )

    clearFlash()

    if (error) {
      backendErrorInfo.value = error
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
      accountToken.value = token
    }
  }

  const current = async (options?: { cache?: boolean }): Promise<void> => {
    clearFrames()
    firstPage.value = frameQuery.value.page
    // console.log(`current page: ${currentPage.value}`)
    await searchFrame({ cache: options?.cache ?? true })
    frames.value = frames.value.concat(frameList.value)
    pages.value = frameQuery.value.pages
  }

  const more = async (): Promise<void> => {
    await searchFrame({ cache: false })
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
    frameQuery,
    initFrameQuery,
    clearFrameQuery,
    searchFrame,
    current,
    prev,
    next,
    prevPage,
    nextPage,
    frames,
    queryMap,
    qItems,
    minPage,
    maxPage,
  }
}
