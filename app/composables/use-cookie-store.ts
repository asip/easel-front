import { useTokenCookie, useRefCookie } from './cookie'

export const useCookieStore = function () {
  const { accessToken } = useTokenCookie()
  const { refItems } = useRefCookie()

  return { accessToken, refItems }
}
