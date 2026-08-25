import type { UserFrameQuery } from '~/types'

export const useUserFrameQuery = function () {
  const frameQuery = useState<UserFrameQuery>('user.frameQuery', () => {
    return {
      user_id: null,
      page: 1,
      pages: 1,
      total: 1,
    }
  })

  const initFrameQuery = ({ userId }: { userId: string | undefined }): void => {
    if (userId) {
      if (frameQuery.value.user_id !== userId) {
        frameQuery.value.page = 1
        frameQuery.value.pages = 1
      }
      frameQuery.value.user_id = userId
    }
  }

  return { frameQuery, initFrameQuery }
}
