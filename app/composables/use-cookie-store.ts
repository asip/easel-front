export const useCookieStore = () => {
  const accessToken = useCookie('access_token', { maxAge: 60 * 60, sameSite: 'lax' })

  return { accessToken }
}
