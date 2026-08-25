import type { AccountFrameQuery } from '~/types'

export const useAccountFrameQuery = function () {
  const frameQuery = useState<AccountFrameQuery>('account.frameQuery', () => {
    return {
      page: 1,
      pages: 1,
      total: 1,
    }
  })

  return { frameQuery }
}
