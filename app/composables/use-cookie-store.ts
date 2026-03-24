export const useCookieStore = function () {
  const accessToken = useCookie('access_token', { maxAge: 60 * 60, sameSite: 'lax' })

  const refItems = useCookie('ref', { maxAge: 60 * 60 * 24, sameSite: 'lax' })

  return { accessToken, refItems }
}
