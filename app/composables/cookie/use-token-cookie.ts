export const useTokenCookie = function () {
  const accessToken = useCookie('access_token', {
    maxAge: 60 * 60,
    sameSite: 'lax',
    refresh: true,
  })

  return { accessToken }
}
