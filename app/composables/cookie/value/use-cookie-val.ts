import type { CookieRef } from 'nuxt/app'

export const useCookieVal = function (cookie: CookieRef<string | null | undefined>) {
  const cookieValue = computed<string | null | undefined>({
    get() {
      return cookie.value
    },
    set(value: string | null | undefined) {
      cookie.value = value
    },
  })

  return cookieValue
}
