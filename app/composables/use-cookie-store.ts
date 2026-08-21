import type { RefItems } from '~/types'

export const useCookieStore = function () {
  const token = useCookie('access_token', { maxAge: 60 * 60, sameSite: 'lax', refresh: true })

  const accessToken = computed({
    get() {
      return token.value
    },
    set(value: string | null | undefined) {
      token.value = value
    },
  })

  const refCookie = useCookie('ref', { maxAge: 60 * 60 * 24, sameSite: 'lax' })

  const refItems = computed<RefItems, RefItems | string | undefined>({
    get() {
      return refCookie.value ? (JSON.parse(refCookie.value) as RefItems) : {}
    },
    set(value: RefItems | string | undefined) {
      if (typeof value == 'string') {
        refCookie.value = value
      } else {
        refCookie.value = JSON.stringify(value ?? {})
      }
    },
  })

  return { accessToken, refItems }
}
