export const useTokenCookie = function () {
  const token = useCookie('access_token', { maxAge: 60 * 60, sameSite: 'lax', refresh: true })

  const accessToken = computed({
    get() {
      return token.value
    },
    set(value: string | null | undefined) {
      token.value = value
    },
  })

  return { accessToken }
}
