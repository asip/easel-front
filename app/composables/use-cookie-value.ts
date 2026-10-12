import type { UseCookieOptions } from 'nuxt/app'

import { useCookieVal } from './cookie/value'

type CookieOptions = UseCookieOptions & { readonly?: false }

export const useCookieValue = (name: string, options?: CookieOptions) => {
  const cookieRef = useCookie(name, options)
  const cookie = useCookieVal(cookieRef)

  return cookie
}
