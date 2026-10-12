import type { UseCookieOptions } from 'nuxt/app'

import { useCookieVO } from './cookie/value'

type CookieOptions = UseCookieOptions & { readonly?: false }

export const useCookieValueObject = function <T extends object>(
  name: string,
  options?: CookieOptions,
) {
  const cookieRef = useCookie(name, options)
  const cookie = useCookieVO<T>(cookieRef)

  return cookie
}
