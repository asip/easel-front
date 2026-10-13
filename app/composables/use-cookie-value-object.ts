import type { UseCookieOptions } from 'nuxt/app'

import { useCookieVO } from './cookie/value'

export const useCookieValueObject = function <T extends object>(
  name: string,
  options?: UseCookieOptions & { readonly?: false },
) {
  const cookieRef = useCookie(name, options)
  const cookie = useCookieVO<T>(cookieRef)

  return cookie
}
