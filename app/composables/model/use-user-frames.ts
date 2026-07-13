import type {
  Frame,
  FrameResource,
  FramesResource,
  UserFrameQuery,
  BackendErrorsResource,
  QueryApiOptions,
} from '~/types'

export const useUserFrames = function () {
  const { queryApi } = useApi()
  const { create } = useEntity<Frame, FrameResource>()

  const { flash, clearFlash } = useFlash()

  const { backendErrorInfo } = useApiError(flash)

  const initFrameQuery = ({ userId }: { userId: string | undefined }): void => {
    if (userId) {
      if (frameQuery.value.user_id !== userId) {
        frameQuery.value.page = 1
        frameQuery.value.pages = 1
      }
      frameQuery.value.user_id = userId
    }
  }

  const makeFrame = ({ from, page }: { from: FrameResource; page: number }): Frame => {
    const frame: Frame = create({ from })
    frame.file = null
    frame.preview_url = null
    frame.page = page
    return frame
  }

  const frameQuery = useState<UserFrameQuery>('user.frameQuery', () => {
    return {
      user_id: null,
      page: 1,
      pages: 1,
      total: 1,
    }
  })

  const frameList = ref<Frame[]>([])
  const frames = ref<Frame[]>([])

  const clearFrames = (): void => {
    frames.value.splice(0)
  }

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
  } = useMoreScroll({
    key: 'userProfile',
  })

  const getFrames = async (
    userId: string | undefined,
    options?: { cache?: boolean },
  ): Promise<void> => {
    const queryOptions: QueryApiOptions = {
      query: {
        page: currentPage.value,
      },
      cache: options?.cache ?? true,
    }

    const { data, error } = await queryApi<FramesResource, BackendErrorsResource>(
      `/users/${userId}/frames`,
      queryOptions,
    )

    clearFlash()

    if (error) {
      backendErrorInfo.value = error

      throw createError({
        status: error.status,
        statusText: error.message,
        message: flash.value.alert,
      })
    } else if (data) {
      const { frames: frameRsList, meta } = data
      // console.log(frameList)
      // console.log(meta)

      if (frameRsList) {
        frameList.value.splice(0)
        for (const frame of frameRsList) {
          // console.log(comment);
          frameList.value.push(makeFrame({ from: frame, page: currentPage.value }))
        }
        // console.log(frames)
      }
      if (meta) {
        frameQuery.value.pages = meta.pagination.pages
        frameQuery.value.total = meta.pagination.count
      }
    }
  }

  const current = async (
    userId: string | undefined,
    options?: { cache?: boolean },
  ): Promise<void> => {
    clearFrames()
    firstPage.value = frameQuery.value.page
    // console.log(`current page: ${currentPage.value}`)
    await getFrames(userId, { cache: options?.cache ?? true })
    frames.value = frames.value.concat(frameList.value)
    pages.value = frameQuery.value.pages
  }

  const more = async (userId: string | undefined): Promise<void> => {
    await getFrames(userId, { cache: false })
  }

  const prev = async (userId: string | undefined): Promise<void> => {
    decrement()
    await more(userId)
    frames.value = frameList.value.concat(frames.value)
  }

  const next = async (userId: string | undefined): Promise<void> => {
    increment()
    await more(userId)
    frames.value = frames.value.concat(frameList.value)
  }

  return {
    frameQuery,
    initFrameQuery,
    getFrames,
    current,
    prev,
    next,
    prevPage,
    nextPage,
    frames,
    minPage,
    maxPage,
  }
}
