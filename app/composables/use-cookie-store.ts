import type { RefItems } from '~/types'

export const useCookieStore = function () {
  const token = useCookie('access_token', { maxAge: 60 * 60, sameSite: 'lax', refresh: true })

  const accessToken = computed({
    get() {
      // eslint-disable-next-line no-self-assign
      token.value = token.value
      return token.value
    },
    set(value: string | null | undefined) {
      token.value = value
    },
  })

  const refItems = useCookie('ref', { maxAge: 60 * 60 * 24, sameSite: 'lax' })

  const refMap = computed<RefItems>({
    get() {
      return refItems.value ? (JSON.parse(refItems.value) as RefItems) : {}
    },
    set(value: RefItems) {
      refItems.value = JSON.stringify(value)
    },
  })

  return { accessToken, refItems, refMap }
}
