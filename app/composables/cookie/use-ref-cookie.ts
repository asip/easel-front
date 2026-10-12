import type { RefItems } from '~/types'

export const useRefCookie = function () {
  const refItems = useCookieValueObject<RefItems>('ref', { maxAge: 60 * 60 * 24, sameSite: 'lax' })

  return { refItems }
}
