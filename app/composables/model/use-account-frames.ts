import type { AccountFrameQuery, Frame, FrameResource, FramesResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

export function useAccountFrames () {
  const { create } = useEntity<Frame, FrameResource>()

  const { flash, clearFlash } = useFlash()
  const { accessToken, clearLoginUser } = useAccount()

  const { setAlert } = useAlert({ flash, caller: { clearLoginUser } })

  const makeFrame = ({ from }: { from: FrameResource }) : Frame => {
    const frame: Frame = create({ from })
    frame.file = null
    frame.preview_url = null
    return frame
  }

  const frameQuery = useState<AccountFrameQuery>('account.frameQuery', () => {
    return {
      page: 1,
      pages: 1,
      total: 1
    }
  })

  const frames = ref<Frame[]>([])

  const getFrames = async (options?: { more?: boolean }): Promise<void> => {
    const getOptions: GetAPIOptions = {
      url: '/account/frames',
      query: {
        page: frameQuery.value.page
      },
      token: accessToken.value,
      more: options?.more
    }

    const { data, error } = await useGetApi<FramesResource, ErrorsResource<ErrorMessages<string>>>(getOptions)

    clearFlash()

    if (error) {
      setAlert({ error })

      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.message,
        message: flash.value.alert
      })
    } else if (data) {
      const { frames: frameList, meta } = data
      // console.log(frameList)
      // console.log(meta)

      if (frameList) {
        frames.value.splice(0)
        for (const frame of frameList) {
          // console.log(comment);
          frames.value.push(makeFrame({ from: frame }))
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
    frameQuery, frames, getFrames
  }
}
