import type { CookieRef } from 'nuxt/app'

export const useCookieVO = function <T extends object>(
  cookie: CookieRef<string | null | undefined>,
) {
  const cookieValue = computed<T | null | undefined, T | string | null | undefined>({
    get() {
      return cookie.value ? (JSON.parse(cookie.value) as T) : null
    },
    set(value: T | string | null | undefined) {
      if (typeof value == 'string') {
        cookie.value = value
      } else {
        cookie.value = value ? JSON.stringify(value) : null
      }
    },
  })

  return cookieValue
}
