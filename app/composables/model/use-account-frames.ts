import type {
  AccountFrameQuery,
  Frame,
  FrameResource,
  FramesResource,
  ErrorsResource,
} from '~/interfaces'
import type { ErrorMessages } from '~/types'

export function useAccountFrames() {
  const { create } = useEntity<Frame, FrameResource>()

  const { flash, clearFlash } = useFlash()
  const { accessToken, clearLoginUser } = useAccount()

  const { setAlert } = useAlert({ flash, caller: { clearLoginUser } })

  const makeFrame = ({ from, page }: { from: FrameResource; page: number }): Frame => {
    const frame: Frame = create({ from })
    frame.file = null
    frame.preview_url = null
    frame.page = page
    return frame
  }

  const frameQuery = useState<AccountFrameQuery>('account.frameQuery', () => {
    return {
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

  const { currentPage, pagePrev, pageNext, init, decrement, increment, minPage, maxPage } =
    useMoreScroll({
      key: 'profile',
      page: frameQuery.value.page,
      pages: frameQuery.value.pages,
    })

  const getFrames = async (options?: { cache?: boolean }): Promise<void> => {
    const getOptions: QueryAPIOptions = {
      url: '/account/frames',
      query: {
        page: currentPage.value,
      },
      token: accessToken.value,
      cache: options?.cache ?? true,
    }

    const { data, error } = await useQueryApi<
      FramesResource,
      ErrorsResource<ErrorMessages<string>>
    >(getOptions)

    clearFlash()

    if (error) {
      setAlert({ error })

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

  const current = async (options?: { cache?: boolean }): Promise<void> => {
    clearFrames()
    init()
    // console.log(`current page: ${currentPage.value}`)
    await getFrames({ cache: options?.cache ?? true })
    frames.value = frames.value.concat(frameList.value)
  }

  const more = async (): Promise<void> => {
    await getFrames({ cache: false })
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
    getFrames,
    current,
    prev,
    next,
    currentPage,
    pagePrev,
    pageNext,
    frames,
    minPage,
    maxPage,
  }
}
