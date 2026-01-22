import type { Frame, FrameResource, FramesResource, UserFrameQuery, ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

export function useUserFrames () {
  const { create } = useEntity<Frame, FrameResource>()

  const { flash, clearFlash } = useFlash()

  const { setAlert } = useAlert({ flash })

  const makeFrame = ({ from, page }: { from: FrameResource, page: number }) : Frame => {
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

  const { currentPage, pagePrev, pageNext, minMaxPage, minPage, maxPage, check } = useMoreScroll({
    key: 'UserProfile', page: frameQuery.value.page, pages: frameQuery.value.pages
  })

  const getFrames = async (userId: string | undefined, options?: { client?: boolean }): Promise<void> => {
    const getOptions: QueryAPIOptions = {
      url: `/users/${userId}/frames`,
      query: {
        page: currentPage.value
      },
      client: options?.client
    }

    const { data, error } = await useQueryApi<FramesResource, ErrorsResource<ErrorMessages<string>>>(getOptions)

    clearFlash()

    if (error) {
      setAlert({ error })

      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.message,
        message: flash.value.alert
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

  const current = async (userId: string | undefined, options?: { client?: boolean }): Promise<void> => {
    pagePrev.value = true
    pageNext.value = true
    clearFrames()
    minMaxPage()
    currentPage.value = frameQuery.value.page
    // console.log(`current page: ${currentPage.value}`)
    await getFrames(userId, { client: options?.client })
    check()
    frames.value = frames.value.concat(frameList.value)
  }

  const more = async (userId: string | undefined): Promise<void> => {
    await getFrames(userId, { client: true })
    check()
  }

  const prev = async (userId: string | undefined): Promise<void> => {
    minMaxPage()
    currentPage.value = minPage.value - 1
    await more(userId)
    frames.value = frameList.value.concat(frames.value)
  }

  const next = async (userId: string | undefined): Promise<void> => { 
    minMaxPage()
    currentPage.value = maxPage.value + 1
    await more(userId)
    frames.value = frames.value.concat(frameList.value)
  }

  return {
    frameQuery, getFrames, current, prev, next, currentPage, pagePrev, pageNext, frames
  }
}
