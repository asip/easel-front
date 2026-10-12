export const useTokenCookie = function () {
  const accessToken = useCookieValue('access_token', {
    maxAge: 60 * 60,
    sameSite: 'lax',
    refresh: true,
  })

  return { accessToken }
}
